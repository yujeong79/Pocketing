import { fetchLikedGroups, fetchtLikedMembers } from '@/api/user/like';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

// 관심 그룹 전체 조회
export const useLikedGroups = () => {
  return useQuery<UserResponse>({
    queryKey: [QUERY_KEYS.LIKED_GROUPS],
    queryFn: fetchLikedGroups,
  });
};

// 관심 그룹 내 관심 멤버 조회
export const useLikedMembers = (groupId: number) => {
  return useQuery<UserResponse>({
    queryKey: [QUERY_KEYS.LIKED_MEMBERS, groupId],
    queryFn: () => fetchtLikedMembers(groupId),
  });
};
