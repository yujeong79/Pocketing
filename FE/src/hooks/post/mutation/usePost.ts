import { useMutation } from '@tanstack/react-query';
import { updatePostPrice, deletePost } from '@/api/posts/post';

// 판매글 가격 수정 훅
export const useUpdatePostPrice = () => {
  return useMutation({
    mutationFn: ({ postId, price }: { postId: number; price: number }) =>
      updatePostPrice(postId, price),
  });
};

// 판매글 삭제 훅
export const useDeletePost = () => {
  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
  });
};
