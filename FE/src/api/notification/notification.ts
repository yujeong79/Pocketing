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
  console.log('알림 조회 API 호출');
  const response = await axiosInstance.get<NotificationResponse>(
    `/notification/list?page=${page}&size=${size}&sort=${sort}`
  );
  console.log('알림 조회 API 응답:', response.data);
  return response.data;
};

export const postNotificationRead = async () => {
  console.log('읽음 처리 API 호출');
  const response = await axiosInstance.post('/notification/read');
  console.log('읽음 처리 API 응답:', response.data);
  return response.data;
};
