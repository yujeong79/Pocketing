import { SignUpRequest, SignUpResponse } from '@/types/signUp';
import axiosInstance from './auth/axiosInstance';

export const checkNicknameDuplicate = async (nickname: string) => {
  const response = await axiosInstance.get('/auth/check/nickname', { params: { nickname } });
  return response.data;
};

export const postSignUp = async (signUpData: SignUpRequest): Promise<SignUpResponse> => {
  const response = await axiosInstance.post('/auth/signup', signUpData);
  return response.data;
};
