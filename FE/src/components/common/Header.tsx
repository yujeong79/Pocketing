import { BackIcon, LogoText, Logo2d, ModifyIcon } from '@/assets/assets';
import * as S from './HeaderStyle.ts';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useState } from 'react';
import { useChatStore } from '@/store/chatStore';

interface HeaderProps {
  type:
    | 'artist'
    | 'main'
    | 'detail'
    | 'post'
    | 'chat'
    | 'exchange'
    | 'profile'
    | 'sell'
    | 'profileDetail'
    | 'profileEdit'
    | 'mySaleList'
    | 'alarm';
  onBack?: () => void;
  title?: string;
  hasBorder?: boolean;
  onRegister?: () => void;
  rightElement?: React.ReactNode;
  roomId?: string | number;
}

export default function Header({
  type,
  onBack,
  title,
  hasBorder = true,
  onRegister,
  rightElement,
  roomId,
}: HeaderProps) {
  const navigate = useNavigate();
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const { removeChatRoom } = useChatStore();

  const renderLeftContent = () => {
    switch (type) {
      case 'artist':
      case 'post':
        return (
          <S.LeftSection>
            <S.BackButton onClick={() => navigate('/guide')}>
              <img src={BackIcon} alt="뒤로가기" />
            </S.BackButton>
          </S.LeftSection>
        );
      case 'exchange':
      case 'alarm':
        return (
          <S.LeftSection>
            <S.BackButton onClick={() => navigate(-1)}>
              <img src={BackIcon} alt="뒤로가기" />
            </S.BackButton>
            {title && <S.Title>{title}</S.Title>}
          </S.LeftSection>
        );
      case 'profile':
        return (
          <S.LeftSection>
            <img src={LogoText} alt="포켓팅 로고" />
          </S.LeftSection>
        );
      case 'detail':
      case 'profileDetail':
        return (
          <S.LeftSection>
            <S.BackButton onClick={() => navigate('/profile')}>
              <img src={BackIcon} alt="뒤로가기" />
            </S.BackButton>
          </S.LeftSection>
        );
      case 'chat':
      case 'mySaleList':
        return (
          <S.LeftSection>
            <S.BackButton onClick={onBack ?? (() => navigate(-1))}>
              <img src={BackIcon} alt="뒤로가기" />
            </S.BackButton>
            {title && <S.Title>{title}</S.Title>}
          </S.LeftSection>
        );
      case 'profileEdit':
        return (
          <S.LeftSection>
            <S.BackButton onClick={() => navigate(-1)}>
              <img src={BackIcon} alt="뒤로가기" />
            </S.BackButton>
          </S.LeftSection>
        );
      case 'sell':
        return (
          <S.LeftSection>
            <S.BackButton onClick={onBack}>
              <img src={BackIcon} alt="뒤로가기" />
            </S.BackButton>
            {title && <S.Title>{title}</S.Title>}
          </S.LeftSection>
        );
      case 'main':
        return (
          <S.LeftSection>
            <img src={LogoText} alt="포켓팅 로고" />
          </S.LeftSection>
        );
      default:
        return null;
    }
  };

  const renderRightContent = () => {
    if (rightElement) {
      return <S.RightSection>{rightElement}</S.RightSection>;
    }
    switch (type) {
      case 'main':
      case 'detail':
        return (
          <S.RightSection>
            <S.ImageLogo src={Logo2d} alt="2D로고" />
          </S.RightSection>
        );
      case 'post':
        return (
          <S.RightSection>
            <S.RegisterButton onClick={onRegister}>등록하기</S.RegisterButton>
          </S.RightSection>
        );
      case 'chat':
        return (
          <S.RightSection>
            <S.LeaveButton onClick={() => setIsLeaveModalOpen(true)}>방 나가기</S.LeaveButton>
          </S.RightSection>
        );
      case 'profile':
        return <S.RightSection></S.RightSection>;
      case 'profileDetail':
        return (
          <S.RightSection>
            <S.ModifyButton src={ModifyIcon} alt="수정" onClick={() => navigate('/profileEdit')} />
          </S.RightSection>
        );
      case 'profileEdit':
        return <S.RightSection></S.RightSection>;
      default:
        return null;
    }
  };

  return (
    <>
      <S.HeaderContainer $hasBorder={hasBorder}>
        {renderLeftContent()}
        {renderRightContent()}
      </S.HeaderContainer>
      <ConfirmModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={() => {
          if (roomId) {
            removeChatRoom(Number(roomId));
            const leavedRooms = JSON.parse(localStorage.getItem('leavedRooms') || '[]');
            localStorage.setItem('leavedRooms', JSON.stringify([...leavedRooms, Number(roomId)]));
          }
          navigate('/message');
        }}
        text="정말 이 채팅방에서 나가시겠습니까?"
        title="채팅방 나가기"
        confirmText="나가기"
        cancelText="취소"
      />
    </>
  );
}
