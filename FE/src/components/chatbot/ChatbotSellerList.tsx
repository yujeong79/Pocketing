import React from 'react';
import * as S from './ChatbotSellerListStyle';
import { useNavigate } from 'react-router-dom';
import { BracketIcon } from '@/assets/assets';

interface ChatbotSellerListItemProps {
  postId: number;
  nickname: string;
  isVerified: boolean;
  price: number;
  postImageUrl: string;
  onClose: () => void;
}

const ChatbotSellerListItem: React.FC<ChatbotSellerListItemProps> = ({
  postId,
  nickname,
  price,
  postImageUrl,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClose();
    navigate(`/detail/${postId}`);
  };

  return (
    <S.ModalSellerCard onClick={handleClick}>
      <S.ModalSellerImage src={postImageUrl} alt="포카 이미지" />
      <S.ModalSellerInfo>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <S.ModalSellerNickname>{nickname}</S.ModalSellerNickname>
          <S.ModalSellerPriceWrapper>
            <S.ModalSellerPrice>{price.toLocaleString()}원</S.ModalSellerPrice>
            <S.BracketIconWrapper src={BracketIcon} alt=">" />
          </S.ModalSellerPriceWrapper>
        </div>
      </S.ModalSellerInfo>
    </S.ModalSellerCard>
  );
};

export default ChatbotSellerListItem;
