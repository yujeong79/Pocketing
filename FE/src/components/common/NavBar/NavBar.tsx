import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MainIcon,
  ChatIcon,
  ExchangeIcon,
  PostIcon,
  MyPageIcon,
  InactiveMainIcon,
  InactiveChatIcon,
  InactiveExchangeIcon,
  InactivePostIcon,
  InactiveMyPageIcon,
} from '@/assets/assets';
import NavBarItem from './NavBarItem';
import { NavBarContainer } from './NavBarStyle';

const navItems = [
  {
    id: 'pocket',
    to: '/main',
    alt: '포켓팅',
    activeIcon: MainIcon,
    inactiveIcon: InactiveMainIcon,
  },
  {
    id: 'exchange',
    to: '/map',
    alt: '교환',
    activeIcon: ExchangeIcon,
    inactiveIcon: InactiveExchangeIcon,
  },
  {
    id: 'sell',
    to: '/sell',
    alt: '판매',
    activeIcon: PostIcon,
    inactiveIcon: InactivePostIcon,
  },
  {
    id: 'chat',
    to: '/message',
    alt: '채팅',
    activeIcon: ChatIcon,
    inactiveIcon: InactiveChatIcon,
  },
  {
    id: 'profile',
    to: '/profile',
    alt: '프로필',
    activeIcon: MyPageIcon,
    inactiveIcon: InactiveMyPageIcon,
  },
];

export default function NavBar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>(getCurrentPathId(location.pathname));

  // 경로에 따른 활성화될 아이콘 설정
  function getCurrentPathId(pathname: string) {
    const path = pathname.split('/')[1];

    switch (path) {
      case 'main':
        return 'pocket';
      case 'map':
        return 'exchange';
      case 'sell':
        return 'sell';
      case 'message':
        return 'chat';
      case 'profile':
        return 'profile';
      default:
        return 'pocket';
    }
  }

  return (
    <NavBarContainer>
      {navItems.map((item) => (
        <NavBarItem
          key={item.id}
          to={item.to}
          alt={item.alt}
          activeIcon={item.activeIcon}
          inactiveIcon={item.inactiveIcon}
          isActive={activeItem === item.id}
          onClick={() => setActiveItem(item.id)}
        />
      ))}
    </NavBarContainer>
  );
}
