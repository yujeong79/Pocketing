import { updateLikedMembers } from '@/api/user/like';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { LikedGroupList } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateLikedMembers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (likedGroupList: LikedGroupList) => updateLikedMembers(likedGroupList),
    onSuccess: () => {
      //캐시 무효화(관심 그룹 리스트 다시 불러오기)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKED_GROUPS] });
    },
  });
}
