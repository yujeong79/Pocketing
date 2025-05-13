export interface LocationRequest {
  latitude: number;
  longitude: number;
  isAutoDetected: boolean;
  locationName: string | null;
}

export interface LocationResponse {
  latitude: number;
  longitude: number;
}
