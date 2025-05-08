export interface AuthResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    isRegistered: boolean;
    oauthProvider: string;
    providerId: string;
    nickname: string | null;
    profileImageUrl: string | null;
    accessToken: string | null;
  };
}
