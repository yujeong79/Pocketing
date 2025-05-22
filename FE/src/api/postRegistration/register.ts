import axiosInstance from '@/api/auth/axiosInstance';
import { ApiResponse } from '@/types/api';
import { RegisterPostItem, RegisterPostResponse } from '@/types/postRegistration';

/**
 * 여러 포토카드 판매글을 한 번에 등록합니다.
 * @param posts 등록할 카드 리스트
 * @returns 등록된 postId 목록
 */
export const registerPhotoCardPosts = async (
  posts: RegisterPostItem[]
): Promise<RegisterPostResponse[]> => {
  const response = await axiosInstance.post<ApiResponse<RegisterPostResponse[]>>(
    '/posts', 
    posts
  );
  return response.data.result;
};
