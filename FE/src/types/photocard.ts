export interface PhotocardResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    photoCards: Photocard[];
  };
}

export interface Photocard {
  cardId: number;
  cardImageUrl: string;
}

