import { fetchPostList } from '@/api/post/postList';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Post } from '@/types/post';
import { useQuery } from '@tanstack/react-query';

export const usePostList = (
  memberId: number,
  groupId: number,
  albumTitle: string | null,
  page: number,
  size: number
) => {
  return useQuery<Post>({
    queryKey: [QUERY_KEYS.POST_LIST, memberId, groupId, albumTitle, page, size],
    queryFn: () => fetchPostList({ memberId, groupId, albumTitle, page, size }),
    enabled: groupId > 0,
  });
};
