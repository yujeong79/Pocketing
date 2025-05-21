import { useGlobalStore } from '@/store/globalStore';
import { getNotification, postNotificationRead } from '@/api/notification/notification';

export function useNotification() {
  const setNotification = useGlobalStore((state) => state.setNotification);

  const fetchNotification = async () => {
    const response = await getNotification();
    if (response.isSuccess) {
      setNotification(response.result.content); // 전역 상태에 저장
    }
  };

  // ...필요시 notification 상태도 반환
  const notification = useGlobalStore((state) => state.notification);

  return { notification, fetchNotification };
}

export const useNotificationRead = () => {
  const { notification, setNotification } = useGlobalStore();

  const readNotification = async () => {
    await postNotificationRead(); // 읽음 처리만 하고
    const response = await getNotification(); // 최신 알림 리스트 다시 조회
    setNotification(response.result.content);
  };

  return { notification, readNotification };
};
