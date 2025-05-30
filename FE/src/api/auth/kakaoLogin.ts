import { OAuthResponse } from '@/types/oauth';
import axiosInstance from '@/api/auth/axiosInstance';

// 카카오 로그인 URL 생성 함수
export const getKakaoLoginUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const redirectUri = `${baseUrl}/auth/kakao/callback`;
  const state = import.meta.env.VITE_STATE_URL;

  return `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;
};

// 카카오 로그인 처리
export const kakaoLogin = async (code: string): Promise<OAuthResponse> => {
  const response = await axiosInstance.get(`/auth/kakao/callback?code=${code}`);
  return response.data;
};
