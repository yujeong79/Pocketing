import * as S from './ChatbotModalStyle';
import ChatbotSellerListItem from './ChatbotSellerList';
import { ThreeDLogo } from '@/assets/assets';
import { ChatMessage } from '@/types/chatbot';

interface ChatbotMessageItemProps {
  message: ChatMessage;
  onClose: () => void;
}

function formatBold(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
}

const ChatbotMessageItem: React.FC<ChatbotMessageItemProps> = ({ message, onClose }) => (
  <S.MessageWrapper isUser={message.isUser}>
    {!message.isUser && <S.BotIcon src={ThreeDLogo} alt="Bot" />}
    {message.isUser ? (
      <S.Message isUser={true} dangerouslySetInnerHTML={{ __html: formatBold(message.text) }} />
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
    {/* images 등 추가 */}
  </S.MessageWrapper>
);
export default ChatbotMessageItem;
