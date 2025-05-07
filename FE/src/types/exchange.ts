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
