import { useGlobalStore } from '@/store/globalStore';
import { getNotification, postNotificationRead } from '@/api/notification/notification';

export const useNotification = () => {
  const { notification, setNotification } = useGlobalStore();

  const fetchNotification = async () => {
    const response = await getNotification();
    setNotification(response.result.content);
  };

  return { notification, fetchNotification };
};

export const useNotificationRead = () => {
  const { notification, setNotification } = useGlobalStore();

  const readNotification = async () => {
    await postNotificationRead(); // 읽음 처리만 하고
    const response = await getNotification(); // 최신 알림 리스트 다시 조회
    setNotification(response.result.content);
  };

  return { notification, readNotification };
};
