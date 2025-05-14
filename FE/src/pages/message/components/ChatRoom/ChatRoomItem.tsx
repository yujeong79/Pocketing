import React from 'react';
import * as S from '@/pages/message/ChatRoomPageStyle';
import { ChatMessage } from '@/types/chat';
import scale from '@/utils/scale';

interface ChatRoomItemProps {
  message: ChatMessage;
  isUser: boolean;
  continued: boolean;
  opponentNickname: string;
  opponentProfile: string;
}

// 개별 채팅 메세지 컴포넌트
const ChatRoomItem: React.FC<ChatRoomItemProps> = ({
  message,
  isUser,
  continued,
  opponentNickname,
  opponentProfile,
}) => {
  return (
    <S.MessageContainer $isUser={isUser} $continued={continued}>
      {!isUser && (
        <>
          {/* 연속된 메시지가 아닐 때만 프로필 이미지 표시 */}
          {!continued ? (
            <S.ProfileImage src={opponentProfile} alt="프로필" />
          ) : (
            <div style={{ width: `${scale(32)}px` }} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* 연속된 메시지가 아닐 때만 닉네임 표시 */}
            {!continued && <S.NickName $isUser={isUser}>{opponentNickname}</S.NickName>}
            <S.Message $isUser={isUser}>{message.messageContent}</S.Message>
          </div>
        </>
      )}
      {isUser && <S.Message $isUser={isUser}>{message.messageContent}</S.Message>}
    </S.MessageContainer>
  );
};

export default ChatRoomItem;
