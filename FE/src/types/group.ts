import { Member } from '@/types/member';

export interface GroupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Group[];
}

export interface Group {
  groupId: number;
  groupNameKo: string;
  groupNameEn: string;
  groupImageUrl: string;
  members: Member[] | null;
  interest: boolean;
}
