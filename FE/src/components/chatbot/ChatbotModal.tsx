import React, { useState, useEffect, useRef } from 'react';
import { ThreeDLogo, CloseIcon, SendIcon } from '@/assets/assets';
import * as S from './ChatbotModalStyle';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import ChatBotLoader from '@/components/common/ChatBotLoader';
import ChatbotSellerListItem from '@/components/chatbot/ChatbotSellerList';

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
  image?: string;
  postId?: number;
  price?: number;
  nickname?: string;
  images?: string[];
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
      // 텍스트 메시지 추가
      const newMessages: ChatMessage[] = [{ text: data.result!.text, isUser: false }];

      const uniquePhotocards = data.result.photocards
        ? data.result.photocards.filter(
            (card, idx, arr) => arr.findIndex((c) => c.card_id === card.card_id) === idx
          )
        : [];

      // 1. 판매글 있는 포카 메시지 배열
      const withPostMessages: ChatMessage[] = uniquePhotocards
        .filter((card) => card.cheapest_post.post_id)
        .map((card) => ({
          text: '',
          image: card.cheapest_post.post_image_url
            ? card.cheapest_post.post_image_url
            : card.cheapest_post.card_image_url
              ? card.cheapest_post.card_image_url
              : undefined,
          postId: card.cheapest_post.post_id ?? undefined,
          price: card.cheapest_post.price ?? undefined,
          nickname: card.cheapest_post.nickname,
          isUser: false,
        }));

      // 2. 판매글 없는 포카 메시지 (images 배열)
      const noPostImages = uniquePhotocards
        .filter((card) => !card.cheapest_post.post_id)
        .map((card) => card.cheapest_post.post_image_url || card.cheapest_post.card_image_url)
        .filter((url): url is string => !!url);

      if (withPostMessages.length > 0) {
        newMessages.push(...withPostMessages);
      }
      if (noPostImages.length > 0) {
        newMessages.push({
          text: '',
          isUser: false,
          images: noPostImages,
        });
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
            {messages.map((message, index) => (
              <S.MessageWrapper key={index} isUser={message.isUser}>
                {!message.isUser &&
                  (message.image || (message.images && message.images.length > 0) ? (
                    <S.BotIconSpacer />
                  ) : (
                    <S.BotIcon src={ThreeDLogo} alt="Bot" />
                  ))}
                {message.text && <S.Message isUser={message.isUser}>{message.text}</S.Message>}
                {message.image &&
                  (message.postId ? (
                    <S.ModalSellerListItemWrapper
                      style={{
                        maxWidth: 220,
                        transform: 'scale(0.85)',
                        transformOrigin: 'left top',
                      }}
                    >
                      <ChatbotSellerListItem
                        postId={message.postId}
                        nickname={message.nickname || ''}
                        isVerified={false}
                        price={message.price || 0}
                        postImageUrl={message.image}
                      />
                    </S.ModalSellerListItemWrapper>
                  ) : (
                    <S.ChatbotPhotoCard src={message.image} alt="포카 이미지" />
                  ))}
                {message.images && message.images.length > 0 && (
                  <S.HorizontalScroll>
                    {message.images.map((img, idx) => (
                      <S.ChatbotPhotoCard key={idx} src={img} alt={`포카 이미지 ${idx + 1}`} />
                    ))}
                  </S.HorizontalScroll>
                )}
              </S.MessageWrapper>
            ))}
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
