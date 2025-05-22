import axiosInstance from '../auth/axiosInstance';
import { MyInfo, EditMyInfoRequest, EditMyInfoResponse } from '@/types/myInfo';
import { ApiResponse } from '@/types/api';

export const getMyInfo = async () => {
  const response = await axiosInstance.get<ApiResponse<MyInfo>>('/user/mypage');
  return response.data;
};

export const putMyInfo = async (request: EditMyInfoRequest): Promise<EditMyInfoResponse> => {
  const response = await axiosInstance.put<ApiResponse<EditMyInfoResponse>>(
    '/user/mypage',
    request
  );
  return response.data;
};
