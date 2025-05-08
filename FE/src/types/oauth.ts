export interface OAuthResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: OAuthResult;
}

export interface OAuthResult {
  isRegistered: boolean;
  oauthProvider: string;
  providerId: string;
  userId: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  accessToken: string;
}
