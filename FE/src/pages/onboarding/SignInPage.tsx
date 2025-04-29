import * as S from './SignInPageStyle';
import { ThreeDLogo, TextLogo, KakaoLoginButton, XLoginButton } from '@/assets/assets';

const SignInPage = () => {
  return (
    <S.SignInPageContainer>
      <S.LogoContainer>
        <S.LogoImage src={ThreeDLogo} alt="포켓팅 로고" />
        <S.LogoText src={TextLogo} alt="포켓팅 로고" />
      </S.LogoContainer>
      <S.LoginButtonContainer>
        <S.KakaoLoginButton src={KakaoLoginButton} alt="카카오 로그인 버튼" />
        <S.XLoginButton src={XLoginButton} alt="X 로그인 버튼" />
      </S.LoginButtonContainer>
    </S.SignInPageContainer>
  );
};

export default SignInPage;
