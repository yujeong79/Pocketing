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
  height: ${scale(330)}px;
  gap: ${scale(24)}px;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${scale(8)}px ${scale(16)}px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: ${scale(8)}px;
  background-color: ${colors.white};

  &:hover {
    background-color: ${colors.gray100};
  }
`;

export const MemberContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const MemberItemText = styled.div<{ $isSelected: boolean }>`
  ${FontStyles.headingLarge};
  color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.gray600)};
  text-align: left;
  transition: color 0.2s ease-in-out;
`;

export const MemberItemIcon = styled.img`
  width: ${scale(22)}px;
  height: ${scale(28)}px;
  margin-left: ${scale(8)}px;
  transition: opacity 0.2s ease-in-out;
  opacity: 1;
`;

export const SelectedMemberContainer = styled.div`
  text-align: left;
  ${FontStyles.headingLarge};
  color: ${colors.primary};
`;

export const SelectedIcon = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const DeleteButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  padding: ${scale(4)}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.gray100};
    border-radius: 50%;
  }

  img {
    width: ${scale(20)}px;
    height: ${scale(20)}px;
  }
`;
