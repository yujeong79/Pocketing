import axiosInstance from '@/api/auth/axiosInstance';
import { PriceResponse } from '@/types/price';

// 시세 조회
export const getPhotoCardPrice = async (cardId: number): Promise<PriceResponse> => {
  const response = await axiosInstance.get('/photocards/price', {
    params: {
      cardId,
    },
  });
  return response.data;
};
