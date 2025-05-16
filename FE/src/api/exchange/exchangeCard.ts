import axiosInstance from '@/api/auth/axiosInstance';
import { ExchangeRequest, ExchangeResponse, GetRegisteredCardResponse } from '@/types/exchange';
import { ApiResponse } from '@/types/api';

// 교환 카드 생성
export const createExchangeCard = async (
  exchangeCard: ExchangeRequest
): Promise<ExchangeResponse> => {
  const response = await axiosInstance.post('/exchange/card/register', exchangeCard);
  return response.data;
};

// 등록 카드 확인
export const getMyCard = async (): Promise<ApiResponse<GetRegisteredCardResponse>> => {
  const response = await axiosInstance.get('/exchange/card?isOwned=true');
  return response.data;
};

export const getOthersCard = async (): Promise<ApiResponse<GetRegisteredCardResponse>> => {
  const response = await axiosInstance.get('/exchange/card?isOwned=false');
  return response.data;
};
