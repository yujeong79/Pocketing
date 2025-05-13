import { PostDetail, PostDetailResponse } from '@/types/post';
import axiosInstance from '../auth/axiosInstance';

// 판매글 상세 조회
export const fetchPostDetail = async (postId: number): Promise<PostDetail> => {
  const { data } = await axiosInstance.get<PostDetailResponse>(`/posts/${postId}`);
  return data.result;
};
