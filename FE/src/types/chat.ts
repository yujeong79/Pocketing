export interface ChatMessage {
  messageId: number;
  roomId: number;
  senderId: number;
  receiverId: number | null;
  messageContent: string;
  createdAt: string;
}

export interface ChatRoom {
  roomId: number;
  receiverId: number;
  receiverNickname: string;
  postId: number | null;
  exchangeId: number | null;
  imageUrl: string;
  lastMessageContent: string;
  lastMessageTime: string;
  unreadMessageCount: number;
}

export interface ChatParticipant {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isMyInfo: boolean;
}

export interface LinkedPost {
  postId: number;
  photocard: {
    cardId: number;
    memberName: string;
    albumTitle: string;
    cardImageUrl: string;
  };
  price: number;
  status: string;
}

export interface LinkedExchange {
  exchangeRequestId: number;
  requester: {
    userId: number;
    groupName: string;
    memberName: string;
    albumName: string;
    exchangeImageUrl: string;
  };
  responder: {
    userId: number;
    groupName: string;
    memberName: string;
    albumName: string;
    exchangeImageUrl: string;
  };
}

export interface MessagePage {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  messageList: ChatMessage[];
}

export interface ChatRoomDetail {
  participants: ChatParticipant[];
  linkedPost: LinkedPost | null;
  linkedExchange: LinkedExchange | null;
  messagePage: MessagePage;
}
