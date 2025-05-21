import { NotificationResponse } from '@/types/notification';
import axiosInstance from '../auth/axiosInstance';

interface NotificationParams {
  page?: number;
  size?: number;
  sort?: string;
}

export const getNotification = async ({
  page = 0,
  size = 10,
  sort = 'notificationId,desc',
}: NotificationParams = {}) => {
  const response = await axiosInstance.get<NotificationResponse>(
    `/notification/list?page=${page}&size=${size}&sort=${sort}`
  );
  return response.data;
};

export const postNotificationRead = async (notificationId: number) => {
  const response = await axiosInstance.post(`/notification/read/${notificationId}`);
  return response.data;
};
