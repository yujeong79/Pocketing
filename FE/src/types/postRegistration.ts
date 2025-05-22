export interface RegisterPostItem {
  cardId: number;        // = versionId
  postImageUrl: string;  // 실물 이미지
  price: number;         // 숫자형
}

export interface RegisterPostResponse {
  postId: number;
}
