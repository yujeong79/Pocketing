import { MyInfo } from '@/types/myInfo';
import { Artist } from '@/types/artist';
import { MySale } from '@/types/mySale';

import { Winter1, Winter2, Winter3, Winter4 } from '@/assets/assets';

export const myInfo: MyInfo = {
  name: '한병현',
  nickname: '포카캌',
  profileImageUrl: 'https://cataas.com/cat/orange,cute',
  isVerified: true,
  address: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
  bank: '농협',
  account: '11012345678901234567',
};

export const myArtist: Artist[] = [
  {
    groupId: 1,
    name: '에스파',
    image: 'https://pocketing-bucket.s3.ap-northeast-2.amazonaws.com/AESPA_logo.jpg',
    members: ['카리나', '윈터', '닝닝', '지젤'],
  },
  {
    groupId: 2,
    name: '블랙핑크',
    image: 'https://pocketing-bucket.s3.ap-northeast-2.amazonaws.com/BLACKPINK_logo.jpg',
    members: ['로제', '제니', '리사', '지수'],
  },
];

export const mySale: MySale[] = [
  {
    id: 1,
    group: '에스파',
    member: '윈터',
    album: 'Drama',
    version: 'Ver.1',
    date: '2025.04.01',
    price: 15000,
    image: Winter1,
    sale: false,
  },
  {
    id: 2,
    group: '에스파',
    member: '윈터',
    album: 'Drama',
    version: 'Ver.2',
    date: '2025.04.03',
    price: 17000,
    image: Winter2,
    sale: false,
  },
  {
    id: 3,
    group: '에스파',
    member: '윈터',
    album: 'Drama',
    version: 'Ver.3',
    date: '2025.04.12',
    price: 20000,
    image: Winter3,
    sale: true,
  },
  {
    id: 4,
    group: '에스파',
    member: '윈터',
    album: 'Drama',
    version: 'Ver.1',
    date: '2025.04.20',
    price: 15000,
    image: Winter4,
    sale: true,
  },
  {
    id: 5,
    group: '에스파',
    member: '윈터',
    album: 'Drama',
    version: 'Ver.1',
    date: '2025.04.21',
    price: 15000,
    image: Winter1,
    sale: false,
  },
  {
    id: 6,
    group: '에스파',
    member: '윈터',
    album: 'Drama',
    version: 'Ver.3',
    date: '2025.04.30',
    price: 17000,
    image: Winter3,
    sale: true,
  },
];
