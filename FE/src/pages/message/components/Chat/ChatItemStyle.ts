import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import styled from 'styled-components';
import scale from '@/utils/scale';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: ${scale(16)}px;
  border-bottom: ${scale(1)}px solid ${colors.gray100};
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray100};
  }
`;

const CardImage = styled.img`
  width: ${scale(30)}px;
  height: ${scale(48)}px;
  border-radius: ${scale(5)}px;
  object-fit: cover;
`;

const DefaultProfileImage = styled.div`
  width: ${scale(30)}px;
  height: ${scale(48)}px;
  border-radius: ${scale(5)}px;
  background-color: ${colors.gray200};
`;

const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: ${scale(12)}px;
  text-align: left;
`;

const UserName = styled.div`
  ${FontStyles.bodySmall};
  font-weight: bold;
`;

const LastMessage = styled.div`
  margin-top: ${scale(4)}px;
  ${FontStyles.bodySmall};
  color: ${colors.gray800};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${scale(16)}px;
  height: ${scale(16)}px;
  padding: 0 ${scale(4)}px;
  border-radius: ${scale(8)}px;
  background-color: ${colors.primary};
  color: white;
  ${FontStyles.captionMedium};
`;

export const LastMessageRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const LastTime = styled.div`
  ${FontStyles.captionSmall};
  color: ${colors.gray400};
  margin-left: 8px;
  min-width: 40px;
  text-align: right;
`;

export {
  Container,
  CardImage,
  DefaultProfileImage,
  ContentWrapper,
  UserName,
  LastMessage,
  UnreadBadge,
};
