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

// 판매글 상태 업데이트
export const updatePostStatus = async (roomId: number, status: string) => {
  const response = await axiosInstance.put('/posts/status', { roomId, status });
  return response.data.result;
};

// 판매글 가격 업데이트
export const updatePostPrice = async (postId: number, price: number) => {
  const response = await axiosInstance.put(`/posts/${postId}`, { price });
  return response.data;
};

// 판매글 삭제
export const deletePost = async (postId: number) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};
