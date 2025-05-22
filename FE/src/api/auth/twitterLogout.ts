import axiosInstance from './axiosInstance';
import { OAuthResponse } from '@/types/oauth';

export const getTwitterLogout = () => {
  const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
  const state = import.meta.env.VITE_STATE_URL;

  return (
    `https://api.x.com/2/oauth2/revoke?token=SlhYbnlxcU5ZRmQyMGhDY29ScXdjV1VpN0NGcXlkWFZNV3NfbXZ5dENNSUNLOjE3NDczMDA5ODYxMDg6MTowOmF0OjE` +
    `?client_id=${clientId}` +
    `&state=${state}`
  );
};

export const twitterLogout = async (code: string): Promise<OAuthResponse> => {
  const response = await axiosInstance.get(`/auth/kakao/logout/callback?code=${code}`);
  return response.data;
};
