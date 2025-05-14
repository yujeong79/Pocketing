export interface Photocard {
  cardId: number;
  cardImageUrl: string;
}

export interface PhotocardResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Photocard[];
}
