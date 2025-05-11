import axiosInstance from "./api/auth/axiosInstance";

export const registerFcmToken = async (fcmToken: string): Promise<void> => {
  if (!fcmToken) return;

  try {
    const response = await axiosInstance.post('/api/notification/fcm-token',
      { fcmToken }
    );
    console.log('FCM 토큰 등록 성공:', response.data);
  } catch (error) {
    console.error('FCM 토큰 등록 실패:', error);
  }
};
