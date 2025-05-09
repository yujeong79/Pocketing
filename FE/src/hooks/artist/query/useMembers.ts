import { getMembersAll } from '@/api/artist/member';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { MemberResponse } from '@/types/member';
import { useQuery } from '@tanstack/react-query';

// 모든 멤버 조회(토큰 필요 X)
export const useMembersAll = (groupId: number) => {
  return useQuery<MemberResponse>({
    queryKey: [QUERY_KEYS.MEMBERS, groupId],
    queryFn: () => getMembersAll(groupId),
  });
};
