import { fetchAlbums } from '@/api/artist/album';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { AlbumResponse } from '@/types/album';
import { useQuery } from '@tanstack/react-query';

// 그룹의 앨범 조회
export const useAlbums = (groupId: number) => {
  return useQuery<AlbumResponse>({
    queryKey: [QUERY_KEYS.MEMBERS, groupId],
    queryFn: () => fetchAlbums(groupId),
  });
};
