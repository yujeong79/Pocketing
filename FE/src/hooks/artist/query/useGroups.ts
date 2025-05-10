import { fetchGroups, fetchGroupsAll } from '@/api/artist/group';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { GroupResponse } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

// 모든 그룹 조회(토큰 필요X)
export const useGroupsAll = () => {
  return useQuery<GroupResponse>({
    queryKey: [QUERY_KEYS.GROUPS],
    queryFn: fetchGroupsAll,
  });
};

// 모든 그룹 조회(토큰 필요O)
export const useGroups = () => {
  return useQuery<GroupResponse>({
    queryKey: [QUERY_KEYS.GROUPS],
    queryFn: fetchGroups,
  });
};
