import { Woodz1, Woodz2 } from '@/assets/assets';

export const mockExchange = {
  isSuccess: true,
  code: 'EXCHANGE2003',
  message: '반경 내 교환 가능 사용자 목록입니다.',
  result: {
    myCard: {
      cardId: 15,
      isOwned: true,
      group: 'WOODZ',
      album: 'COLORFUL TRAUMA',
      member: '우즈',
      content: '안녕입니다.',
      imageUrl: Woodz1,
    },
    otherCard: {
      cardId: 16,
      isOwned: true,
      group: 'WOODZ',
      album: 'OO-LI',
      member: '우즈',
      content: '우즈우즈 입니다.',
      imageUrl: Woodz2,
    },
  },
};
