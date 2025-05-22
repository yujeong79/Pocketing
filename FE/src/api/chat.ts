import axiosInstance from '@/api/auth/axiosInstance';
import { ChatRoom, ChatRoomDetail, MessagePage } from '../types/chat';
import { ApiResponse } from '@/types/api';

// 채팅방 생성 또는 조회
export const createOrGetChatRoom = async (
  user1Id: number,
  user2Id: number,
  postId?: number,
  exchangeId?: number
): Promise<ApiResponse<{ roomId: number }>> => {
  const response = await axiosInstance.post('/chat/room', {
    user1Id,
    user2Id,
    postId,
    exchangeId,
  });
  return response.data;
};

// 안읽은 메시지 전체 개수 조회
export const getUnreadMessageCount = async (): Promise<ApiResponse<number>> => {
  const response = await axiosInstance.get('/chat/unread/count');
  return response.data;
};

// 교환하기 채팅방 전체 조회
export const getExchangeChatRooms = async (): Promise<ApiResponse<ChatRoom[]>> => {
  const response = await axiosInstance.get('/chat/room/exchange');
  return response.data;
};

// 거래하기 채팅방 전체 조회
export const getPostChatRooms = async (): Promise<ApiResponse<ChatRoom[]>> => {
  const response = await axiosInstance.get('/chat/room/post');
  return response.data;
};

// 특정 채팅방 입장 및 조회
export const enterChatRoom = async (
  roomId: number,
  page = 0,
  size = 30
): Promise<ApiResponse<ChatRoomDetail>> => {
  console.log('enterChatRoom 요청:', {
    roomId,
    page,
    size,
    token: localStorage.getItem('accessToken'),
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  try {
    const response = await axiosInstance.post(
      `/chat/room/${roomId}/enter?page=${page}&size=${size}`
    );
    console.log('enterChatRoom 응답:', response);
    return response.data;
  } catch (error) {
    console.error('enterChatRoom 에러:', error);
    throw error;
  }
};

// 과거 메시지 더 불러오기
export const loadMoreMessages = async (
  roomId: number,
  page: number,
  size = 30
): Promise<ApiResponse<MessagePage>> => {
  const response = await axiosInstance.get(
    `/chat/room/${roomId}/messages?page=${page}&size=${size}`
  );
  return response.data;
};
