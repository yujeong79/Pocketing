import React, { useState, FormEvent } from 'react';
import * as S from '../../ChatRoomPageStyle';
import { PlusIcon, SendIcon } from '@/assets/assets';
import AccountAddressModal from '@/pages/message/components/AccountAddressModal';
import { useProfile } from '@/hooks/user/useProfile';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { myProfile } = useProfile();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setModalOpen(true);
      return;
    }
    onSendMessage(message);
    setMessage('');
  };

  const handleSelect = (type: 'account' | 'address') => {
    if (!myProfile) return;
    if (type === 'account') {
      if (!myProfile.bank || !myProfile.account) {
        alert('등록된 계좌정보가 없습니다.');
        return;
      }
      onSendMessage(`계좌번호 : ${myProfile.bank} ${myProfile.account}`);
    } else {
      if (!myProfile.address) {
        onSendMessage('등록된 주소정보가 없습니다.');
        return;
      }
      onSendMessage(`주소 : ${myProfile.address}`);
    }
    setMessage('');
  };

  return (
    <>
      <S.InputForm onSubmit={handleSubmit}>
        <S.PlusButtonContainer>
          <S.PlusButton src={PlusIcon} alt="plus" onClick={() => setModalOpen(true)} />
        </S.PlusButtonContainer>
        <S.Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <S.SendButtonContainer type="submit">
          <S.SendButton src={SendIcon} alt="send" />
        </S.SendButtonContainer>
      </S.InputForm>
      <AccountAddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
};

export default MessageInput;
