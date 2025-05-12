import axiosInstance from '@/api/auth/axiosInstance';
import { ExchangeRequest, ExchangeResponse } from '@/types/exchange';

// 교환 카드 생성
export const createExchangeCard = async (
  exchangeCard: ExchangeRequest
): Promise<ExchangeResponse> => {
  const response = await axiosInstance.post('/exchange/card/register', exchangeCard);
  return response.data;
};
