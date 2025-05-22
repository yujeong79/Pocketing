export interface SignUpRequest {
  oauthProvider: string;
  providerId: string;
  nickname: string;
  profileImageUrl: string;
  likedInfo: {
    likedGroupList: {
      groupId: number;
      likedMemberList: number[];
    }[];
  };
}

export interface SignUpResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: SignUp;
}

export interface SignUp {
  isRegistered: boolean;
  oauthProvider: string | null;
  providerId: string | null;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  accessToken: string;
}
