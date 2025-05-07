import { colors } from '@/styles/theme';
import styled from 'styled-components';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';

const TabContainer = styled.div<{ activeTab: 'trade' | 'exchange' }>`
  display: flex;
  position: relative;
  border-bottom: ${scale(1)}px solid ${colors.gray100};

  &::after {
    content: '';
    position: absolute;
    bottom: -${scale(1)}px;
    left: ${({ activeTab }) => (activeTab === 'trade' ? '0%' : '50%')};
    width: 50%;
    height: ${scale(2)}px;
    background-color: ${colors.primary};
    transition: left 0.2s ease-in-out;
  }
`;

const Tab = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 0px 0px ${scale(8)}px 0px;
  ${FontStyles.bodyMedium};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'semibold')};
  color: ${({ isActive }) => (isActive ? colors.primary : colors.gray600)};
  background: none;
  border: none;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${colors.primary};
  }

  &:active {
    transform: translateY(${scale(2)}px);
    filter: brightness(0.9);
  }
`;

export { TabContainer, Tab };
