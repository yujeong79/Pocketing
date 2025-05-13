import axiosInstance from '@/api/auth/axiosInstance';
import { Exchange } from '@/types/exchange';
import { ApiResponse } from '@/types/api';

export const getExchangeUserList = async (range: number): Promise<ApiResponse<Exchange[]>> => {
  const response = await axiosInstance.get(`/exchange/card/list?range=${range}`);
  return response.data;
};
