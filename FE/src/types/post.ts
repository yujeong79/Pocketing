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

export interface PostDetail {
  postId: number;
  postImageUrl: string;
  price: number;
  createdAt: string;
  status: string;
  isMine: boolean;
  card: Card;
  seller: Seller;
}

export interface Card {
  cardId: number;
  cardImageUrl: string;
  memberName: string;
  groupNameKo: string;
  groupNameEn: string;
  groupImageUrl: string;
  albumTitle: string;
}

export interface Seller {
  nickname: string;
  isVerified: boolean;
  profileImageUrl: string;
  sellerId: number;
}

export type PostDetailResponse = ApiResponse<PostDetail>;
