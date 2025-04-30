import { Link } from 'react-router-dom';
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
    <Link to={to} style={{ textDecoration: 'none' }}>
      <NavItemWrapper isActive={isActive} onClick={onClick}>
        <IconWrapper isActive={isActive}>
          <img src={isActive ? activeIcon : inactiveIcon} alt={alt} width={20} height={20} />
        </IconWrapper>
        <NavText isActive={isActive}>{alt}</NavText>
      </NavItemWrapper>
    </Link>
  );
}
