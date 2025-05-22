import { OAuthResponse } from '@/types/oauth';
import axiosInstance from '@/api/auth/axiosInstance';

// 트위터 로그인 URL 생성 함수
export const getTwitterLoginUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const redirectUri = `${baseUrl}/auth/twitter/callback`;
  const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
  const state = import.meta.env.VITE_STATE_URL;
  return (
    `https://twitter.com/i/oauth2/authorize` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=users.read%20tweet.read` +
    `&state=${state}` +
    `&code_challenge=challenge` +
    `&code_challenge_method=plain`
  );
};

// 트위터 로그인 처리
export const twitterLogin = async (code: string): Promise<OAuthResponse> => {
  const response = await axiosInstance.get(`/auth/twitter/callback?code=${code}`);
  return response.data;
};
