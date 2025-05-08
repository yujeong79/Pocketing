import axiosInstance from './auth/axiosInstance';

export const checkNicknameDuplicate = async (nickname: string) => {
  const response = await axiosInstance.get('/auth/check/nickname', { params: { nickname } });
  return response.data;
};
