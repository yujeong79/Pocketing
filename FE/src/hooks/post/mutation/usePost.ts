import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostPrice, deletePost } from '@/api/posts/post';
import { QUERY_KEYS } from '@/constants/queryKeys';

// 판매글 가격 수정 훅
export const useUpdatePostPrice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, price }: { postId: number; price: number }) =>
      updatePostPrice(postId, price),
    onSuccess: (_data, variables) => {
      // 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL, variables.postId],
      });
    },
  });
};

// 판매글 삭제 훅
export const useDeletePost = () => {
  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
  });
};
