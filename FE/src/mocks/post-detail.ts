import { sellerListMock } from './seller-list';

export interface PostDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    postId: number;
    postImageUrl: string;
    price: number;
    createdAt: string;
    status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
    card: {
      cardId: number;
      cardImageUrl: string;
      memberName: string;
      groupNameKo: string;
      groupNameEn: string;
      groupImageUrl: string;
      albumTitle: string;
    };
    seller: {
      nickname: string;
      isVerified: boolean;
      profileImageUrl: string;
    };
  };
}

export const postDetailMock: { [key: number]: PostDetailResponse } = {};

// sellerListMock의 각 항목을 기반으로 postDetailMock 생성
sellerListMock.result.content.forEach((item) => {
  postDetailMock[item.postId] = {
    isSuccess: true,
    code: 'POST2003',
    message: '판매글 상세 조회 성공',
    result: {
      postId: item.postId,
      postImageUrl: item.postImageUrl,
      price: item.price,
      createdAt: '2025-04-23T14:20:00',
      status: 'IN_PROGRESS',
      card: {
        cardId: item.postId,
        cardImageUrl: item.postImageUrl,
        memberName: item.memberName,
        groupNameKo: item.groupNameKo,
        groupNameEn: item.groupNameEn || item.groupNameKo,
        groupImageUrl: 'https://cdn.com/group_aespa.png',
        albumTitle: item.albumTitle,
      },
      seller: {
        nickname: item.nickname,
        isVerified: item.isVerified,
        profileImageUrl: 'https://cataas.com/cat/orange,cute',
      },
    },
  };
});
