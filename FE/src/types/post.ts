import { ApiResponse, Page } from '@/types/api';

export interface PostContent {
  postId: number;
  cardId: number;
  groupNameKo: string;
  groupNameEn: string;
  groupImageUrl: string;
  memberName: string;
  albumTitle: string;
  postImageUrl: string;
  avgPrice: number;
}

export type Post = Page<PostContent>;

export type PostResponse = ApiResponse<Post>;
