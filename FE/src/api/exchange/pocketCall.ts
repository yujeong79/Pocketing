import axiosInstance from '../auth/axiosInstance';
import { PocketCallRequest, PocketCallResponse } from '@/types/exchange';
import { AcceptOrRejectRequest, AcceptOrRejectResponse } from '@/types/exchange';

// 교환 요청
export const postPocketCall = async (
  pocketCall: PocketCallRequest
): Promise<PocketCallResponse> => {
  const response = await axiosInstance.post('/exchange/request', pocketCall);
  return response.data;
};

// 요청 수락/거절
export const acceptOrRejectPocketCall = async (
  acceptOrReject: AcceptOrRejectRequest
): Promise<AcceptOrRejectResponse> => {
  const response = await axiosInstance.post('/exchange/respond', acceptOrReject);
  return response.data;
};
