import { NavLink } from 'react-router-dom';
import { NavItemWrapper, IconWrapper, NavText } from './NavBarStyle';

interface NavBarItemProps {
  to: string;
  alt: string;
  activeIcon: string;
  inactiveIcon: string;
  isActive: boolean;
  onClick: () => void;
}

export default function NavBarItem({
  to,
  alt,
  activeIcon,
  inactiveIcon,
  isActive,
  onClick,
}: NavBarItemProps) {
  return (
    <NavLink
      to={to}
      style={{ textDecoration: 'none' }}
      // 접근성 속성 : 스크린 리더 사용자에게 현재 페이지 정보를 제공
      aria-label={`${alt} 메뉴로 이동`}
      aria-current={isActive ? 'page' : undefined}
    >
      <NavItemWrapper $isActive={isActive} onClick={onClick}>
        <IconWrapper $isActive={isActive}>
          <img src={isActive ? activeIcon : inactiveIcon} alt={alt} width={20} height={20} />
        </IconWrapper>
        <NavText $isActive={isActive}>{alt}</NavText>
      </NavItemWrapper>
    </NavLink>
  );
}
