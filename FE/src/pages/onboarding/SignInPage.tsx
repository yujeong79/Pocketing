import * as S from './SignInPageStyle';
import { ThreeDLogo, TextLogo, KakaoLoginButton, XLoginButton } from '@/assets/assets';
import { getKakaoLoginUrl } from '@/api/auth/kakaoLogin';
import { getTwitterLoginUrl } from '@/api/auth/twitterLogin';

const SignInPage = () => {
  const handleKakaoLoginClick = () => {
    window.location.href = getKakaoLoginUrl();
  };

  const handleTwitterLoginClick = () => {
    window.location.href = getTwitterLoginUrl();
  };

  return (
    <S.SignInPageContainer>
      <S.LogoContainer>
        <S.LogoImage src={ThreeDLogo} alt="포켓팅 로고" />
        <S.LogoText src={TextLogo} alt="포켓팅 로고" />
      </S.LogoContainer>
      <S.LoginButtonContainer>
        <S.KakaoLoginButton
          onClick={handleKakaoLoginClick}
          src={KakaoLoginButton}
          alt="카카오 로그인 버튼"
        />
        <S.XLoginButton onClick={handleTwitterLoginClick} src={XLoginButton} alt="X 로그인 버튼" />
      </S.LoginButtonContainer>
    </S.SignInPageContainer>
  );
};

export default SignInPage;
