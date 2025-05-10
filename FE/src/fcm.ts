// import axiosInstance from "./api/axiosInstance";
import axios from 'axios';

export const registerFcmToken = async (fcmToken: string): Promise<void> => {
  if (!fcmToken) return;

  try {
    const response = await axios.post(
      'http://localhost:8080/api/notification/fcm-token',
      //   "/api/notification/fcm-token",
      { fcmToken }
    );
    console.log('FCM 토큰 등록 성공:', response.data);
  } catch (error) {
    console.error('FCM 토큰 등록 실패:', error);
  }
};
