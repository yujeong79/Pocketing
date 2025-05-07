export const mockTradeChats = [
  {
    roomId: 10,
    receiverId: 3,
    receiverNickname: '카리나사랑해',
    postId: 2,
    exchangeId: null,
    imageUrl:
      'https://pocketing-bucket.s3.ap-northeast-2.amazonaws.com/%EC%B9%B4%EB%A6%AC%EB%82%98_%EC%9C%84%ED%94%8C%EB%9E%98%EC%8B%9C_%EC%8A%A4%EB%AF%B8%EB%8B%88%EB%B2%84%EC%A0%84.png',
    lastMessageContent: '안녕하세요! 혹시 거래 전일까요?',
    unreadMessageCount: 1,
  },
  {
    roomId: 8,
    receiverId: 3,
    receiverNickname: '카리나사랑해',
    postId: 1,
    exchangeId: null,
    imageUrl:
      'https://pocketing-bucket.s3.ap-northeast-2.amazonaws.com/%EC%B9%B4%EB%A6%AC%EB%82%98_%EC%9C%84%ED%94%8C%EB%9E%98%EC%8B%9C_%EB%B9%84%ED%8A%B8%EB%B2%84%EC%A0%84.png',
    lastMessageContent: '16000원에 거래하고 싶습니다아아아아아아!',
    unreadMessageCount: 2,
  },
];

export const mockExchangeChats = [
  {
    roomId: 9,
    otherUser: {
      userId: 'b123',
      nickname: '맠프',
    },
    lastMessage: '마크 구해요',
    unreadCount: 3,
    updatedAt: '2025-04-23T19:00:00',
  },
  {
    roomId: 3,
    otherUser: {
      userId: 'b124',
      nickname: '정프',
    },
    lastMessage: '정우 구해요',
    unreadCount: 1,
    updatedAt: '2025-04-23T19:00:00',
  },
];
