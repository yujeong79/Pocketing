// ChatbotButton.tsx
import React, { useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import * as S from './ChatbotButtonStyle';
import { ThreeDLogo } from '@/assets/assets';
import ChatbotModal from './ChatbotModal';

const VISIBLE_PATHS = ['/main', '/sell', '/message', '/profile'];

const ChatbotButton: React.FC = () => {
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isVisible = VISIBLE_PATHS.some((path) => matchPath({ path, end: true }, pathname));
  if (!isVisible) return null;

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <S.Button onClick={handleClick}>
        <S.Icon src={ThreeDLogo} alt="챗봇 열기" />
      </S.Button>
      <ChatbotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ChatbotButton;
