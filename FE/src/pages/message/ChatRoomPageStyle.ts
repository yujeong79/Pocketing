import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  position: relative;
  padding: ${scale(16)}px;
  overflow: hidden;
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: ${scale(40)}px;
  margin-bottom: ${scale(4)}px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: ${scale(4)}px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray200};
    border-radius: ${scale(10)}px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const MessageWrapper = styled.div<{ isUser: boolean; continued?: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  align-items: flex-start;
  gap: ${scale(4)}px;
  margin-top: ${({ continued }) => (continued ? scale(4) : scale(16))}px;
`;

export const ProfileImage = styled.img`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(100)}px;
`;

export const NickNameText = styled.div<{ isUser: boolean }>`
  ${FontStyles.captionSmall}
  margin-bottom: ${scale(2)}px;
  justify-content: flex-start;
`;

export const MessageText = styled.div<{ isUser: boolean }>`
  ${FontStyles.captionMedium}
  padding: ${scale(8)}px ${scale(12)}px;
  border-radius: ${scale(12)}px;
  background-color: ${({ isUser }) => (isUser ? colors.primary200 : colors.primary50)};
  max-width: 65%;
  text-align: left;
  word-break: break-all;
`;

export const InputForm = styled.form`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${scale(8)}px ${scale(16)}px;

  background-color: ${colors.white};
  z-index: 10;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
`;

export const Input = styled.input`
  flex: 1;
  padding: ${scale(8)}px ${scale(12)}px;
  border: 1px solid ${colors.primary50};
  border-radius: ${scale(20)}px;
  background-color: ${colors.primary50};
  color: ${colors.gray800};

  &::placeholder {
    color: ${colors.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary100};
  }
`;

export const SendButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${scale(30)}px;
  height: ${scale(30)}px;
`;
