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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function splitBotTextToItems(text: string) {
    // "현재 모든 포토카드는"으로 시작하는 안내문 분리
    const guideMatch = text.match(/^(현재 모든 포토카드는[^\n]*)/);
    let guide = '';
    let rest = text;
    if (guideMatch) {
      guide = guideMatch[1];
      rest = text.replace(guide, '').trim();
    }

    // "1. "으로 시작하는 부분을 기준으로 분리
    const items = rest
      .split(/(?=\d+\.\s)/g)
      .map((item) => item.trim())
      .filter(Boolean);

    // 안내문이 있으면 맨 앞에 추가
    if (guide) {
      return [guide, ...items];
    }
    return items;
  }

  function formatBold(text: string) {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  }

  function processBotText(text: string) {
    // "더 자세한 내용은"으로 분리
    const detailSplit = text.split(/(더 자세한 내용은.*)/);
    const mainText = detailSplit[0].trim();
    const detailText = detailSplit[1]?.trim();

    // 모든 - 앞에 줄바꿈 추가 (맨 앞 - 제외)
    const formattedMain = mainText.replace(/(?<!^)-/g, '<br/>-');

    return {
      main: formattedMain,
      detail: detailText,
    };
  }

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
                {message.isUser ? (
                  <S.Message
                    isUser={true}
                    dangerouslySetInnerHTML={{ __html: formatBold(message.text) }}
                  />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '100%',
                    }}
                  >
                    <S.Message
                      isUser={false}
                      dangerouslySetInnerHTML={{ __html: formatBold(message.text) }}
                      style={{ marginBottom: message.image ? 8 : 0 }}
                    />
                    {message.image &&
                      (message.postId ? (
                        <S.ModalSellerListItemWrapper>
                          <ChatbotSellerListItem
                            postId={message.postId}
                            nickname={message.nickname || ''}
                            price={message.price || 0}
                            postImageUrl={message.image}
                            isVerified={false}
                            onClose={onClose}
                          />
                        </S.ModalSellerListItemWrapper>
                      ) : (
                        <S.ChatbotPhotoCard src={message.image} alt="포카 이미지" />
                      ))}
                  </div>
                )}
                {message.images && message.images.length > 0 && (
                  <S.PhotoCardImage>
                    {message.images.map((img, idx) => (
                      <S.ChatbotPhotoCard key={idx} src={img} alt={`포카 이미지 ${idx + 1}`} />
                    ))}
                  </S.PhotoCardImage>
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
