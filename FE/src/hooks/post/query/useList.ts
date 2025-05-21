import { fetchPostList, fetchSellerList } from '@/api/posts/list';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Page } from '@/types/api';
import { PostContent } from '@/types/post';
import { SellerList } from '@/types/seller';
import { useQuery } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useSellerList = (cardId: number) => {
  return useQuery<SellerList>({
    queryKey: [QUERY_KEYS.SELLER_LIST, cardId],
    queryFn: () => fetchSellerList(cardId),
  });
};

export const useInfinitePostList = (
  memberId: number | null,
  groupId: number,
  albumId: number | null,
  size: number
) => {
  return useInfiniteQuery<Page<PostContent>>({
    queryKey: [QUERY_KEYS.POST_LIST, memberId, groupId, albumId],
    queryFn: ({ pageParam = 0 }) =>
      fetchPostList({ memberId, groupId, albumId, page: pageParam as number, size }),
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
    enabled: groupId > 0,
    initialPageParam: 0,
  });
};
