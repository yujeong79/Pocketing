export const mockChat = {
  isSuccess: true,
  code: 'CHAT2002',
  message: '채팅방 입장 성공입니다.',
  result: {
    linkedPost: {
      postId: 1,
      photocard: {
        cardId: 1,
        memberName: '카리나',
        albumTitle: 'Whiplash',
        cardImageUrl:
          'https://pocketing-bucket.s3.ap-northeast-2.amazonaws.com/%EC%B9%B4%EB%A6%AC%EB%82%98_%EC%9C%84%ED%94%8C%EB%9E%98%EC%8B%9C_%EB%B9%84%ED%8A%B8%EB%B2%84%EC%A0%84.png',
      },
      price: 10000,
      status: 'AVAILABLE',
    },
    linkedExchange: null,
    messagePage: {
      currentPage: 0,
      totalPages: 1,
      hasNext: false,
      messageList: [
        {
          messageId: 1,
          roomId: 8,
          senderId: 2,
          receiverId: 1,
          messageContent: '안녕하세요! 혹시 거래 가능하신가요?',
          createdAt: '2025-05-05T22:30:00.000000',
        },
        {
          messageId: 2,
          roomId: 8,
          senderId: 1,
          receiverId: 2,
          messageContent: '안녕하세요! 카리나사랑해님!',
          createdAt: '2025-05-05T22:33:11.59568',
        },
        {
          messageId: 3,
          roomId: 8,
          senderId: 1,
          receiverId: 2,
          messageContent: '카리나사랑해님 저 거래하고 싶은데요',
          createdAt: '2025-05-05T22:36:38.999939',
        },
        {
          messageId: 4,
          roomId: 8,
          senderId: 2,
          receiverId: 1,
          messageContent: '네! 얼마에 거래 원하시나요?',
          createdAt: '2025-05-05T22:37:10.000000',
        },
      ],
    },
  },
};
