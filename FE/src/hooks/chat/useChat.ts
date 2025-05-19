import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createOrGetChatRoom,
  getUnreadMessageCount,
  getExchangeChatRooms,
  getPostChatRooms,
  enterChatRoom,
  loadMoreMessages,
} from '@/api/chat';
import { QUERY_KEYS } from '@/constants/queryKeys';

// 거래 채팅방 전체 조회
export const usePostChatRooms = () =>
  useQuery({
    queryKey: [QUERY_KEYS.POST_CHAT_ROOMS],
    queryFn: getPostChatRooms,
    refetchInterval: 2000, // 2초마다 자동 갱신
  });

// 교환 채팅방 전체 조회
export const useExchangeChatRooms = () =>
  useQuery({
    queryKey: [QUERY_KEYS.EXCHANGE_CHAT_ROOMS],
    queryFn: getExchangeChatRooms,
  });

// 특정 채팅방 상세 조회(입장)
export const useEnterChatRoom = (roomId: number, page = 0, size = 30) =>
  useQuery({
    queryKey: [QUERY_KEYS.CHAT_ROOM_DETAIL, roomId, page, size],
    queryFn: () => enterChatRoom(roomId, page, size),
    enabled: !!roomId,
  });

// 안읽은 메시지 전체 개수
export const useUnreadMessageCount = () =>
  useQuery({
    queryKey: [QUERY_KEYS.UNREAD_MESSAGE_COUNT],
    queryFn: getUnreadMessageCount,
  });

// 채팅방 생성/조회 (mutation)
export const useCreateOrGetChatRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      user1Id,
      user2Id,
      postId,
      exchangeId,
    }: {
      user1Id: number;
      user2Id: number;
      postId?: number;
      exchangeId?: number;
    }) => createOrGetChatRoom(user1Id, user2Id, postId, exchangeId),
    onSuccess: () => {
      // 필요시 관련 쿼리 invalidate
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POST_CHAT_ROOMS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXCHANGE_CHAT_ROOMS] });
    },
  });
};

// 과거 메시지 더 불러오기
export const useLoadMoreMessages = () =>
  useMutation({
    mutationFn: ({ roomId, page, size }: { roomId: number; page: number; size?: number }) =>
      loadMoreMessages(roomId, page, size),
  });
