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
  padding-bottom: ${scale(24)}px;
  text-align: left;

  ${FontStyles.headingMedium};
  color: ${colors.gray800};
`;

export const SearchContainer = styled.div`
  display: flex;
  width: ${scale(266)}px;
  height: ${scale(36)}px;
  padding: ${scale(8)}px;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${colors.primary200};
  border-radius: ${scale(10)}px;
  background-color: ${colors.white};
`;

export const SearchInput = styled.input`
  border: none;
  background-color: transparent;

  ${FontStyles.bodySmall};
  color: ${colors.gray800};
`;

export const SearchIcon = styled.img`
  width: ${scale(16)}px;
  height: ${scale(16)}px;
`;

export const GroupListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${scale(28)}px;
  height: ${scale(300)}px;
  gap: ${scale(24)}px;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface GroupInfoProps {
  $isSelected?: boolean;
}

export const GroupInfo = styled.div<GroupInfoProps>`
  display: flex;
  flex-direction: column;
  gap: ${scale(12)}px;
  width: ${scale(72)}px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export const GroupImage = styled.img<GroupInfoProps>`
  width: ${scale(72)}px;
  height: ${scale(72)}px;
  border-radius: 50%;
  background-color: none;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? colors.primary : colors.gray200)};
  border-color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.white)};

  box-shadow: ${scale(2)}px ${scale(2)}px ${scale(2)}px rgba(0, 0, 0, 0.3);
`;

export const GroupName = styled.div`
  ${FontStyles.captionMedium};
  color: ${colors.gray800};
`;
