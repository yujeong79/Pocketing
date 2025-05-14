import axiosInstance from '../auth/axiosInstance';
import { PocketCallRequest, PocketCallResponse } from '@/types/exchange';

// 교환 요청
export const postPocketCall = async (
  pocketCall: PocketCallRequest
): Promise<PocketCallResponse> => {
  const response = await axiosInstance.post('/exchange/request', pocketCall);
  return response.data;
};
