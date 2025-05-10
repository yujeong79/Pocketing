import { fetchPhotocards } from '@/api/artist/photocard';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PhotocardResponse } from '@/types/photocard';
import { useQuery } from '@tanstack/react-query';

// 포토카드 목록 조회
export const usePhotocards = (albumId: number, memberId: number) => {
  return useQuery<PhotocardResponse>({
    queryKey: [QUERY_KEYS.PHOTOCARDS],
    queryFn: () => fetchPhotocards(albumId, memberId),
  });
};
