import { deleteLikedGroups, deleteLikedMembers, updateLikedMembers } from '@/api/user/like';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { LikedGroupListRequest } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateLikedMembers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: LikedGroupListRequest) => updateLikedMembers(request),
    onSuccess: () => {
      //캐시 무효화(관심 그룹 리스트 다시 불러오기)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKED_GROUPS] });
    },
  });
}

export function useDeleteLikedMembers() {
  return useMutation({
    mutationFn: (memberId: number) => deleteLikedMembers(memberId),
  });
}

export function useDeleteLikedGroups() {
  return useMutation({
    mutationFn: (groupId: number) => deleteLikedGroups(groupId),
  });
}
