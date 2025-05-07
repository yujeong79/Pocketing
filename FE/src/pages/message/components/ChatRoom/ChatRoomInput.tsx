import React, { useState, useRef, FormEvent } from 'react';
import * as S from '@/pages/message/ChatRoomPageStyle';
import { SendIcon } from '@/assets/assets';
import { ChatRoom } from '@/types/chatRoom';

interface ChatRoomInputProps {
  myUserId: number;
  receiverId: number;
  roomId: number;
  onSendMessage: (message: ChatRoom) => void;
}

/**
 * 메시지 입력 컴포넌트
 */
const ChatRoomInput: React.FC<ChatRoomInputProps> = ({
  myUserId,
  receiverId,
  roomId,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: ChatRoom = {
      messageId: Date.now(),
      roomId,
      senderId: myUserId,
      receiverId,
      messageContent: inputValue,
      createdAt: new Date().toISOString(),
    };

    onSendMessage(newMessage);
    setInputValue('');
  };

  return (
    <S.InputForm onSubmit={handleSubmit}>
      <S.Input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        ref={inputRef}
      />
      <S.SendButton type="submit">
        <img src={SendIcon} alt="전송" width="24" height="24" />
      </S.SendButton>
    </S.InputForm>
  );
};

export default ChatRoomInput;
