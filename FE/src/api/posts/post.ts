import { PostDetail, PostDetailResponse } from '@/types/post';
import axiosInstance from '@/api/auth/axiosInstance';

// 판매글 상세 조회
export const fetchPostDetail = async (postId: number): Promise<PostDetail> => {
  console.log('fetchPostDetail 호출:', postId);
  const response = await axiosInstance.get<PostDetailResponse>(`/posts/${postId}`);
  console.log('API 응답:', response.data);

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }
  return response.data.result;
};

export const updatePostStatus = async (roomId: number, status: string) => {
  const response = await axiosInstance.put('/posts/status', { roomId, status });
  return response.data.result;
};
