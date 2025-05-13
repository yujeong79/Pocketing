export interface UserResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: UserLikedGroup[] | UserLikedMember[] | null;
}

// 관심 그룹, 멤버
export interface UserLikedGroup {
  userId: number;
  groupId: number;
  groupNameKo: string;
  groupNameEn: string;
  groupImageUrl: string | null;
}

export interface UserLikedMember {
  memberId: number;
  name: string;
}

export interface LikedGroupList {
  groupId: number;
  likedMemberList: number[];
}

export interface LikedGroupListRequest {
  likedGroupList: LikedGroupList[];
}
