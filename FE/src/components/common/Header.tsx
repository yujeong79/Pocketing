import { BackIcon, LogoText, Logo2d, ModifyIcon } from '@/assets/assets';
import * as S from './HeaderStyle.ts';

interface HeaderProps {
  type: 'artist' | 'main' | 'detail' | 'post' | 'chat' | 'exchange' | 'profile' | 'sell';
  onBack?: () => void;
  title?: string;
}

export default function Header({ type, onBack, title }: HeaderProps) {
  const renderLeftContent = () => {
    switch (type) {
      case 'artist':
      case 'detail':
      case 'post':
      case 'chat':
      case 'exchange':
      case 'profile':
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
            <S.RegisterButton>등록하기</S.RegisterButton>
          </S.RightSection>
        );
      case 'chat':
        return (
          <S.RightSection>
            <S.LeaveButton>방 나가기</S.LeaveButton>
          </S.RightSection>
        );
      case 'profile':
        return (
          <S.RightSection>
            <img src={ModifyIcon} alt="수정" />
          </S.RightSection>
        );
      default:
        return null;
    }
  };

  return (
    <S.HeaderContainer>
      {renderLeftContent()}
      {renderRightContent()}
    </S.HeaderContainer>
  );
}
