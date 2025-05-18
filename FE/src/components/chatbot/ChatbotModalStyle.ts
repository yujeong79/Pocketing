import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(223, 223, 223, 0.47);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: ${scale(20)}px ${scale(20)}px 0 0;
  padding: ${scale(20)}px;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  gap: ${scale(12)}px;
  margin-bottom: ${scale(20)}px;
  align-items: center;
  margin-top: ${scale(2)}px;
`;

export const Title = styled.h1`
  font-family: 'Baloo 2', cursive;
  font-weight: 900;
  line-height: ${scale(22)}px;
  letter-spacing: -0.1rem;
  font-size: ${scale(22)}px;
  color: ${colors.primary};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${scale(20)}px;
  right: ${scale(20)}px;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${scale(4)}px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(85vh - ${scale(120)}px);
`;

export const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  margin-bottom: ${scale(8)}px;
  padding-right: ${scale(8)}px;
  padding-bottom: ${scale(20)}px;

  &::-webkit-scrollbar {
    width: ${scale(4)}px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray200};
    border-radius: ${scale(2)}px;
  }
`;

export const MessageWrapper = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  align-items: flex-start;
  gap: ${scale(4)}px;
`;

export const BotIcon = styled.img<{ offsetLeft?: boolean }>`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  ${({ offsetLeft }) => offsetLeft && `margin-left: ${scale(8)}px;`}
`;

export const Message = styled.div<{ isUser: boolean }>`
  ${FontStyles.captionMedium};
  background-color: ${({ isUser }) => (isUser ? colors.primary200 : colors.primary50)};
  padding: ${scale(8)}px;
  border-radius: ${scale(5)}px;
  max-width: 70%;
  text-align: ${({ isUser }) => (isUser ? 'right' : 'left')};
`;

export const InputForm = styled.form`
  position: absolute;
  left: 50%;
  margin-bottom: -${scale(40)}px;
  transform: translateX(-50%);
  width: 105%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const Input = styled.input`
  ${FontStyles.captionMedium};
  width: 100%;
  height: ${scale(40)}px;
  padding: ${scale(8)}px;
  padding-right: ${scale(40)}px;
  border: 1px solid ${colors.primary50};
  border-radius: ${scale(5)}px;
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
  position: absolute;
  top: 50%;
  right: ${scale(8)}px;
  transform: translateY(-50%);
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`;

export const SendButton = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const ModalSellerListItemWrapper = styled.div`
  margin-bottom: -${scale(35)}px;
  margin-left: ${scale(8)}px;
  width: ${scale(300)}px;
`;

export const ChatbotPhotoCard = styled.img`
  max-width: ${scale(90)}px;
  border-radius: ${scale(8)}px;
  margin: ${scale(2)}px 0;
  margin-left: ${scale(8)}px;
`;

export const HorizontalScroll = styled.div`
  display: flex;
  gap: ${scale(8)}px;
  overflow-x: auto;
  padding-bottom: ${scale(4)}px;
  max-width: 100%;
  &::-webkit-scrollbar {
    height: ${scale(4)}px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.gray200};
    border-radius: ${scale(2)}px;
  }
`;

export const BotIconSpacer = styled.div`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
  flex-shrink: 0;
`;
