import { fetchPostDetail } from '@/api/posts/post';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PostDetail } from '@/types/post';
import { useQuery } from '@tanstack/react-query';

export const usePostDetail = (postId: number) => {
  return useQuery<PostDetail>({
    queryKey: [QUERY_KEYS.POST_DETAIL, postId],
    queryFn: () => fetchPostDetail(postId),
  });
};
