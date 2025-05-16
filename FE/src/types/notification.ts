import { ApiResponse, Page } from '@/types/api';

export interface NotificationContent {
  notificationId: number;
  notificationType: 'ACCEPTED_ACTIVE' | 'ACCEPTED_PASSIVE' | 'REJECTED' | 'RECEIVED';
  exchangeRequest: {
    exchangeRequestId: number;
  };
  user: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  };
  read: boolean;
}

export type Notification = Page<NotificationContent>;

export type NotificationResponse = ApiResponse<Notification>;
