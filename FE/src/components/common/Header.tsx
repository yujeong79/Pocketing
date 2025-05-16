import { BackIcon, LogoText, Logo2d, ModifyIcon } from '@/assets/assets';
import * as S from './HeaderStyle.ts';
import { useNavigate } from 'react-router-dom';

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
}

export default function Header({ type, onBack, title, hasBorder = true, onRegister }: HeaderProps) {
  const navigate = useNavigate();

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
            <S.LeaveButton>방 나가기</S.LeaveButton>
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
    <S.HeaderContainer $hasBorder={hasBorder}>
      {renderLeftContent()}
      {renderRightContent()}
    </S.HeaderContainer>
  );
}
