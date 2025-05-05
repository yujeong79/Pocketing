// ChatbotButton.tsx
import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import * as S from './ChatbotButtonStyle';
import { ThreeDLogo } from '@/assets/assets';

const VISIBLE_PATHS = ['/main', '/sell', '/message', '/profile'];

const ChatbotButton: React.FC = () => {
  const { pathname } = useLocation();
  const isVisible = VISIBLE_PATHS.some((path) => matchPath({ path, end: true }, pathname));

  if (!isVisible) return null;

  const handleClick = () => {
    console.log('챗봇 버튼 클릭');
  };

  return (
    <S.Button onClick={handleClick}>
      <S.Icon src={ThreeDLogo} alt="챗봇 열기" />
    </S.Button>
  );
};

export default ChatbotButton;
