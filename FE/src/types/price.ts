// types/price.ts
export interface PriceResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
  };
}
