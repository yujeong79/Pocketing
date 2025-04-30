import styled from 'styled-components';
import { theme } from '@/styles/theme';
import scale from '@/utils/scale';

export const NavBarContainer = styled.nav`
  width: 100%;
  height: ${scale(72)}px;
  padding: 0 ${scale(24)}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: ${scale(12)}px;
  border-top-right-radius: ${scale(12)}px;
  border: 1px solid ${theme.colors.primary100};
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
`;

export const NavItemWrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const IconWrapper = styled.div<{ isActive: boolean }>`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  margin-bottom: ${scale(4)}px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
`;

export const NavText = styled.span<{ isActive: boolean }>`
  font-weight: 700;
  font-size: ${scale(10)}px;
  color: ${({ isActive }) => (isActive ? theme.colors.primary : theme.colors.primary100)};
`;
