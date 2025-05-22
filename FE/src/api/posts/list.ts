/**
 * 판매글 목록 조회 관련 함수
 */

import { Post } from '@/types/post';
import axiosInstance from '@/api/auth/axiosInstance';
import { ApiResponse } from '@/types/api';
import { SellerList, SellerListResponse } from '@/types/seller';

interface PostListParams {
  memberId: number | null;
  groupId: number;
  albumId?: number | null;
  page?: number;
  size?: number;
}

interface PostListRequestParams {
  memberId: number | null;
  groupId: number;
  albumId?: number;
  page: number;
  size: number;
}

// 판매글 목록 조회
export const fetchPostList = async ({
  memberId,
  groupId,
  albumId,
  page = 0,
  size = 10,
}: PostListParams): Promise<Post> => {
  const params: PostListRequestParams = {
    memberId,
    groupId,
    page,
    size,
  };

  if (albumId !== null && albumId !== undefined) {
    params.albumId = albumId;
  }

  const response = await axiosInstance.get<ApiResponse<Post>>('/posts', {
    params,
  });
  return response.data.result;
};

//특정 포토카드 판매자 리스트 조회
export const fetchSellerList = async (cardId: number): Promise<SellerList> => {
  const { data } = await axiosInstance.get<SellerListResponse>('/posts/sellers', {
    params: { cardId },
  });
  return data.result;
};
