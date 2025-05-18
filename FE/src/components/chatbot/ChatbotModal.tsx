import React, { useState, useEffect, useRef } from 'react';
import { ThreeDLogo, CloseIcon, SendIcon } from '@/assets/assets';
import * as S from './ChatbotModalStyle';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import ChatBotLoader from '@/components/common/ChatBotLoader';
import { ChatbotResponse, ChatMessage, ChatbotModalProps } from '@/types/chatbot';
import { splitBotTextToItems, processBotText } from '@/utils/chatbot';
import ChatbotMessageList from './ChatbotMessageList';

// WebSocket 주소 설정 (API 서버 주소)
// const SOCKET_URL = import.meta.env.VITE_CHATBOT_SOCKET_URL;
const SOCKET_URL = 'wss://k12a406.p.ssafy.io/chatbot/ws';

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "안녕하세요! 궁금하신 포카 정보에 대해 물어보시면 일치하는 포카를 알려드릴게요 ' ^ '",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 로컬스토리지에서 user_id 가져오기
  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).userId : null;

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { scrollToBottom } = useScrollToBottom(chatContainerRef, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  // 컴포넌트가 열리면 웹소켓 연결을 설정
  useEffect(() => {
    if (isOpen) {
      const ws = new WebSocket(SOCKET_URL);
      setSocket(ws);

      ws.onopen = () => {
        console.log('웹소켓 연결 성공');
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleIncomingMessage(data);
      };

      ws.onclose = (event) => {
        console.log('웹소켓 연결 종료', event);
      };

      ws.onerror = (error) => {
        console.error('웹소켓 오류', error);
      };

      return () => {
        ws.close(); // 컴포넌트 언마운트 시 웹소켓 연결 종료
      };
    }

    // 이펙트가 실행될 때마다 overflow 속성 변경
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 서버에서 받은 메시지 처리
  const handleIncomingMessage = (data: ChatbotResponse & { type?: string }) => {
    setIsLoading(false);
    if (data.status === 'SUCCESS' && data.result) {
      const items = splitBotTextToItems(data.result.text);
      const photocards = data.result.photocards || [];

      const newMessages: ChatMessage[] = [];

      // 1. 맨 처음 텍스트(설명)만 텍스트 메시지로 추가
      if (items.length > 0) {
        newMessages.push({
          text: items[0],
          isUser: false,
        });
      }

      // 2. 1. 2. 3. ... 항목부터 이미지/판매글과 쌍으로 추가
      for (let i = 1; i < items.length; i++) {
        const card = photocards[i - 1]; // i-1로 맞춰야 텍스트와 이미지가 1:1 매칭됨
        let image: string | undefined = undefined;
        let postId: number | undefined = undefined;
        let price: number | undefined = undefined;
        let nickname: string | undefined = undefined;

        if (card) {
          image =
            card.cheapest_post.post_image_url || card.cheapest_post.card_image_url || undefined;
          postId = card.cheapest_post.post_id ?? undefined;
          price = card.cheapest_post.price ?? undefined;
          nickname = card.cheapest_post.nickname ?? undefined;
        }

        const { main, detail } = processBotText(items[i]);

        newMessages.push({
          text: main,
          isUser: false,
          image,
          postId,
          price,
          nickname,
        });

        // "더 자세한 내용은..."이 있으면 별도 메시지로 추가
        if (detail) {
          newMessages.push({
            text: detail,
            isUser: false,
          });
        }
      }

      setMessages((prev) => [...prev, ...newMessages]);
    } else if (data.status === 'SUCCESS' && data.type === 'CONNECTION_ESTABLISHED') {
      console.info('웹소켓 연결 성공:', data.message);
    } else {
      console.error('에러 발생:', data.message);
    }
  };

  // 사용자가 보낸 메시지 처리 및 웹소켓으로 전송
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !userId) return;
    setMessages([...messages, { text: inputText, isUser: true }]);
    setIsLoading(true);
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = { user_id: userId, chat_message: inputText };
      socket.send(JSON.stringify(message));
    }
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
          <S.ChatContainer ref={chatContainerRef}>
            <ChatbotMessageList messages={messages} onClose={onClose} />
            {isLoading && (
              <S.MessageWrapper isUser={false}>
                <S.BotIcon src={ThreeDLogo} alt="Bot" />
                <ChatBotLoader />
              </S.MessageWrapper>
            )}
          </S.ChatContainer>

          <S.InputForm onSubmit={handleSubmit}>
            <S.Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="메세지를 입력해주세요..."
            />
            <S.SendButtonContainer type="submit">
              <S.SendButton src={SendIcon} alt="send" />
            </S.SendButtonContainer>
          </S.InputForm>
        </S.Container>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ChatbotModal;
