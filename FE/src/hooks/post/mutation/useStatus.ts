import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostStatus } from '@/api/posts/post';
import { QUERY_KEYS } from '@/constants/queryKeys';

export function useUpdatePostStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, status }: { roomId: number; status: string }) =>
      updatePostStatus(roomId, status),
    onSuccess: () => {
      // 전체 포스트 리스트를 다시 가져와야 하는 페이지
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POST_LIST] });

      // 내 판매글 목록에 쓰는 쿼리 키
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_SALES] });

      // 채팅방 목록에도 포스트 상태
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POST_CHAT_ROOMS] });

      // 현재 보고 있는 채팅방 상세 다시 갱신하
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT_ROOM_DETAIL] });
    },
  });
}
