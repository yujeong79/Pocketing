/**
 * 판매글 목록 조회 관련 함수
 */

import { Post } from '@/types/post';
import axiosInstance from '../auth/axiosInstance';
import { ApiResponse } from '@/types/api';

interface PostListParams {
  memberId: number;
  groupId: number;
  albumTitle?: string | null;
  page?: number;
  size?: number;
}

interface PostListRequestParams {
  memberId: number;
  groupId: number;
  albumTitle?: string;
  page: number;
  size: number;
}

// 판매글 목록 조회
export const fetchPostList = async ({
  memberId,
  groupId,
  albumTitle,
  page = 0,
  size = 10,
}: PostListParams): Promise<Post> => {
  const params: PostListRequestParams = {
    memberId,
    groupId,
    page,
    size,
  };

  if (albumTitle) {
    params.albumTitle = albumTitle;
  }

  const response = await axiosInstance.get<ApiResponse<Post>>('/posts', {
    params,
  });
  return response.data.result;
};
