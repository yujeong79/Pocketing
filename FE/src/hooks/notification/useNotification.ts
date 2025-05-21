import { useGlobalStore } from '@/store/globalStore';
import { getNotification } from '@/api/notification/notification';

export const useNotification = () => {
  const { notification, setNotification } = useGlobalStore();

  const fetchNotification = async () => {
    const response = await getNotification();
    setNotification(response.result.content);
  };

  return { notification, fetchNotification };
};
