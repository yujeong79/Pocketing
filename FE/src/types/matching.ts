// types/matching.ts
export interface MatchingRequestItem {
  groupName: string;
  memberName: string;
}

export interface MatchingResultItem {
  groupId: number;
  groupDisplayName?: string| null;
  groupNameKo: string;
  groupNameEn: string;
  memberId: number | null;
  memberName: string | null;
}
