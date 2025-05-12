export interface Exchange {
  userId: number;
  nickname: string;
  distance: number;
  matchType: 'EXACT' | 'SUPPLEMENT';
  card: {
    cardId: number;
    isOwned: boolean;
    group: string;
    album: string;
    member: string;
    content: string;
    imageUrl: string;
  };
}

export interface ExchangeRequest {
  isOwned: boolean;
  groupId: number;
  albumId: number;
  memberId: number;
  description: string | null;
  exchangeImageUrl: string | null;
}

export interface ExchangeResponse {
  exchangeCardId: number;
  isOwned: boolean;
  group: string | null;
  album: string | null;
  member: string | null;
}

// 나의 포카 등록 데이터
export interface MyCardData {
  cardImage?: string;
  cardGroup?: string;
  cardMember?: string;
  cardAlbum?: string;
}

// 원하는 포카 등록 데이터
export interface OthersCardData {
  cardGroup?: string;
  cardMember?: string;
  cardAlbum?: string;
}
