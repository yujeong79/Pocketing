import { Photocard } from '@/types/photocard';
import axiosInstance from '../auth/axiosInstance';

export const fetchPhotocards = async (
  albumId: number,
  memberId: number
): Promise<Photocard[]> => {
  const response = await axiosInstance.get('/photocards', {
    params: {
      albumId,
      memberId,
    },
  });
  return response.data.result.photoCards;
};
