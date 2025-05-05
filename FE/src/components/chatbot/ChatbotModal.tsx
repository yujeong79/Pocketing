import React, { useState, useEffect } from 'react';
import { ThreeDLogo } from '@/assets/assets';
import * as S from './ChatbotModalStyle';
import { CloseIcon } from '@/assets/assets';

interface ChatMessage {
  text: string;
  isUser: boolean;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "안녕하세요! 궁금하신 포카 정보에 대해 물어보시면 일치하는 포카를 알려드릴게요 ' ^ '",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([...messages, { text: inputText, isUser: true }]);
    setInputText('');
  };

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>Pocketing AI</S.Title>
          <S.CloseButton onClick={onClose}>
            <img src={CloseIcon} alt="닫기" />
          </S.CloseButton>
        </S.Header>

        <S.Container>
          <S.ChatContainer>
            {messages.map((message, index) => (
              <S.MessageWrapper key={index} isUser={message.isUser}>
                {!message.isUser && <S.BotIcon src={ThreeDLogo} alt="Bot" />}
                <S.Message isUser={message.isUser}>{message.text}</S.Message>
              </S.MessageWrapper>
            ))}
          </S.ChatContainer>

          <S.InputForm onSubmit={handleSubmit}>
            <S.Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="메세지를 입력해주세요..."
            />
          </S.InputForm>
        </S.Container>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ChatbotModal;
