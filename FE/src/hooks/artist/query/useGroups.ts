import { getGroups } from '@/api/artist/group';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { GroupResponse } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

export const useGroups = () => {
  return useQuery<GroupResponse>({
    queryKey: [QUERY_KEYS.GROUPS],
    queryFn: getGroups,
  });
};
