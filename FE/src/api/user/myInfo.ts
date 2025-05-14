import axiosInstance from '../auth/axiosInstance';
import { MyInfo } from '@/types/myInfo';
import { ApiResponse } from '@/types/api';

export const getMyInfo = async () => {
  const response = await axiosInstance.get<ApiResponse<MyInfo>>('/user/mypage');
  return response.data;
};
