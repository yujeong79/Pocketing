import React, { useState, useEffect, useRef } from 'react';
import { ThreeDLogo, CloseIcon, SendIcon } from '@/assets/assets';
import * as S from './ChatbotModalStyle';
import useScrollToBottom from '@/hooks/useScrollToBottom';

// WebSocket 주소 설정 (API 서버 주소)
const SOCKET_URL = 'wss://k12a406.p.ssafy.io/chatbot/ws';

interface Photocard {
  card_id: number;
  cheapest_post: {
    post_id: number | null;
    price: number | null;
    post_image_url: string | null;
    card_image_url: string | null;
    nickname: string;
    last_updated: string;
  };
}

interface ChatbotMeta {
  user_id: number;
  total_results: number;
  in_response_to: number;
  new_chat_message_id: number;
}

interface ChatbotResponse {
  status: string;
  code: number;
  message: string;
  result?: {
    text: string;
    photocards?: Photocard[];
    meta?: ChatbotMeta;
  };
}

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
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // 로컬스토리지에서 user_id 가져오기
  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).userId : null;

  const chatContainerRef = useRef<HTMLDivElement>(null);
  useScrollToBottom(chatContainerRef, [messages]);

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
  const handleIncomingMessage = (data: ChatbotResponse) => {
    if (data.status === 'SUCCESS' && data.result) {
      const result = data.result;
      setMessages((prevMessages) => [...prevMessages, { text: result.text, isUser: false }]);
      if (result.photocards && result.photocards.length > 0) {
        // 포토카드 데이터 처리 (추가 작업)
      }
    } else {
      console.error('에러 발생:', data.message);
    }
  };

  // 사용자가 보낸 메시지 처리 및 웹소켓으로 전송
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit 호출됨');
    if (!inputText.trim() || !userId) return; // userId가 없으면 메시지 보내지 않음

    setMessages([...messages, { text: inputText, isUser: true }]);
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        user_id: userId, // 로컬스토리지에서 가져온 user_id 사용
        chat_message: inputText,
      };
      socket.send(JSON.stringify(message)); // 서버로 메시지 전송
    } else {
      console.error('WebSocket이 열려 있지 않습니다.');
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
