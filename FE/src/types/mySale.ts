export interface MySale {
  id: number;
  group: string;
  member: string;
  album: string;
  version: string;
  date: string;
  price: number;
  image: string;
  sale: boolean;
}

export interface MySaleListResponse {
  postId: number;
  groupNameKo: string;
  groupNameEn: string;
  memberName: string;
  albumTitle: string;
  postImageUrl: string;
  price: number;
  createdAt: string;
}

export interface MySaleListResult {
  isSuccess: boolean;
  code: string;
  message: string;
  result: [MySaleListResponse];
}
