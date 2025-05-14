import { updatePostStatus } from '@/api/posts/post';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { QueryClient, useMutation } from '@tanstack/react-query';

export function useUpdatePostStatus() {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: ({ roomId, status }: { roomId: number; status: string }) =>
      updatePostStatus(roomId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POST_LIST] });
    },
  });
}
