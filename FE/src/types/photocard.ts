export interface Photocard {
  cardId: number;
  cardImageUrl: string;
}

export interface PhotocardResult {
  photoCards: Photocard[];
}

export interface PhotocardResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PhotocardResult | null;
}
