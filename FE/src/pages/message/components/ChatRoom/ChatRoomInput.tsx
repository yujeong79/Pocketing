import React, { useState, FormEvent } from 'react';
import * as S from '../../ChatRoomPageStyle';
import { SendIcon } from '@/assets/assets';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage('');
  };

  return (
    <S.InputForm onSubmit={handleSubmit}>
      <S.Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <S.SendButton type="submit">
        <img src={SendIcon} alt="send" />
      </S.SendButton>
    </S.InputForm>
  );
};

export default MessageInput;
