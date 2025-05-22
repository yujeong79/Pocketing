export interface MyInfo {
  name: string;
  nickname: string;
  profileImageUrl: string;
  isVerified: boolean;
  address: string;
  bank: string;
  account: string;
}

export interface EditMyInfoRequest {
  nickname: string;
  profileImageUrl: string;
  address: string;
  bank: string;
  account: string;
}

export interface EditMyInfoResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}
