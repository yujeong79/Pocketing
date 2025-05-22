import { useQuery } from '@tanstack/react-query';
import { PostDetail } from '@/types/post';
import { fetchPostDetail } from '@/api/posts/post';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const usePostDetail = (postId: number) => {
  return useQuery<PostDetail, Error>({
    queryKey: [QUERY_KEYS.POST_DETAIL, postId],
    queryFn: () => fetchPostDetail(postId),
    enabled: !!postId,
    retry: 1,
  });
};
