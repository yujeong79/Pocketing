export interface MemberResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Member[];
}

export interface Member {
  memberId: number;
  name: string;
  groupNameKo: string;
  groupNameEn: string;
  interest: boolean;
}

export interface SelectedGroupMembers {
  groupId: number;
  likedMemberList: number[];
}

export interface LikedInfo {
  likedGroupList: SelectedGroupMembers[];
}
