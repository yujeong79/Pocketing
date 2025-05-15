import axiosInstance from './axiosInstance';
import { OAuthResponse } from '@/types/oauth';

export const getKakaoLogout = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const redirectUri = `${baseUrl}/auth/kakao/logout/callback`;
  const state = import.meta.env.VITE_STATE_URL;

  return (
    `https://kauth.kakao.com/oauth/logout` +
    `?client_id=${clientId}` +
    `&logout_redirect_uri=${redirectUri}` +
    `&state=${state}`
  );
};

export const kakaoLogout = async (code: string): Promise<OAuthResponse> => {
  const response = await axiosInstance.get(`/auth/kakao/logout/callback?code=${code}`);
  return response.data;
};
