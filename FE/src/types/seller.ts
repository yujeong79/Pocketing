import { ApiResponse, Page } from '@/types/api';

export interface SellerListItem {
  postId: number;
  nickname: string;
  isVerified: boolean;
  price: number;
  status: string;
  groupDisplayName?: string | null;
  groupNameKo: string;
  groupNameEn: string;
  groupImageUrl: string;
  memberName: string;
  albumTitle: string;
  postImageUrl: string;
}

export interface SellerList {
  avgPrice: number;
  content: Page<SellerListItem>;
}

export type SellerListResponse = ApiResponse<SellerList>;
