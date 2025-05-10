import styled from 'styled-components';

import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding-top: ${scale(24)}px;
  padding-left: ${scale(16)}px;
  padding-right: ${scale(16)}px;
  padding-bottom: ${scale(64)}px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  padding-top: ${scale(60)}px;
  padding-bottom: ${scale(36)}px;
  text-align: left;

  ${FontStyles.headingMedium};
  color: ${colors.gray800};
`;

export const MemberListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${scale(320)}px;
  gap: ${scale(24)}px;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MemberItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${scale(24)}px;

  text-align: left;
  ${FontStyles.headingLarge};
  color: ${(props) => (props.$isSelected ? colors.primary : colors.primary200)};
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
  }
`;

export const SelectedMemberContainer = styled.div`
  text-align: left;
  ${FontStyles.headingLarge};
  color: ${colors.primary};
`;

export const SelectedIcon = styled.img`
  width: ${scale(24)}px;
  height: ${scale(32)}px;
`;
