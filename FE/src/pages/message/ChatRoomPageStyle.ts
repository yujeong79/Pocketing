import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  padding: ${scale(16)}px;
  padding-top: ${scale(60)}px;
  padding-bottom: 0;
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: ${scale(64)}px;
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

export const MessageContainer = styled.div<{ $isUser: boolean; $continued?: boolean }>`
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  align-items: flex-start;
  gap: ${scale(4)}px;
  margin-top: ${({ $continued }) => ($continued ? scale(4) : scale(16))}px;
`;

export const ProfileImage = styled.img`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(100)}px;
`;

export const NickName = styled.div<{ $isUser: boolean }>`
  ${FontStyles.captionSmall}
  margin-bottom: ${scale(2)}px;
  justify-content: flex-start;
`;

export const Message = styled.div<{ $isUser: boolean }>`
  ${FontStyles.captionMedium}
  padding: ${scale(10)}px ${scale(16)}px;
  border-radius: ${scale(14)}px;
  background-color: ${({ $isUser }) => ($isUser ? colors.primary200 : colors.primary50)};
  max-width: ${scale(180)}px;
  text-align: left;
  word-break: break-all;
  display: flex;
`;

export const InputForm = styled.form`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100vw;
  width: 100vw;
  padding: ${scale(8)}px ${scale(16)}px;
  background-color: ${colors.white};
  z-index: 10;
  box-shadow: 0 -${scale(2)}px ${scale(6)}px rgba(0, 0, 0, 0.05);
`;

export const PlusButton = styled.img`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  margin-right: ${scale(4)}px;
  margin-left: -${scale(8)}px;
`;

export const PlusButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  ${FontStyles.captionMedium}
  flex: 1;
  min-width: 0;
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

export const SendButtonContainer = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SendButton = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${scale(2)}px;
  margin-right: ${scale(2)}px;
  width: ${scale(20)}px;
  height: ${scale(20)}px;
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: ${scale(8)}px;
  margin: ${scale(8)}px 0;
  background-color: ${colors.gray100};
  border: none;
  border-radius: ${scale(8)}px;
  cursor: pointer;
  ${FontStyles.captionMedium}
  color: ${colors.gray600};

  &:hover {
    background-color: ${colors.gray200};
  }
`;

export const DateDivider = styled.div`
  text-align: center;
  color: ${colors.gray600};
  justify-content: center;
  align-items: center;
  ${FontStyles.captionSmall};
  margin: ${scale(16)}px 0 ${scale(4)}px 0;
`;

export const TimeTextRight = styled.span`
  ${FontStyles.captionSmall};
  color: ${colors.gray400};
  margin-left: ${scale(2)}px;
  margin-top: ${scale(4)}px;
  align-self: flex-end;
`;

export const TimeTextLeft = styled.span`
  ${FontStyles.captionSmall};
  color: ${colors.gray400};
  margin-right: ${scale(2)}px;
  margin-top: ${scale(4)}px;
  align-self: flex-end;
`;
