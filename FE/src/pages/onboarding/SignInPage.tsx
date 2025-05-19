import * as S from './SignInPageStyle';
import { ThreeDLogo, TextLogo, KakaoLoginButton, XLoginButton } from '@/assets/assets';
import { getKakaoLoginUrl } from '@/api/auth/kakaoLogin';
import { getTwitterLoginUrl } from '@/api/auth/twitterLogin';

const SignInPage = () => {
  // 공통 로그인 핸들러
  const handleSocialLogin = (getUrl: () => string) => async () => {
    // 권한 처리 결과와 관계없이 로그인 페이지로 이동
    window.location.href = getUrl();
  };

  return (
    <S.SignInPageContainer>
      <S.LogoContainer>
        <S.LogoImage src={ThreeDLogo} alt="포켓팅 로고" />
        <S.LogoText src={TextLogo} alt="포켓팅 로고" />
      </S.LogoContainer>
      <S.LoginButtonContainer>
        <S.KakaoLoginButton
          onClick={handleSocialLogin(getKakaoLoginUrl)}
          src={KakaoLoginButton}
          alt="카카오 로그인 버튼"
        />
        <S.XLoginButton
          onClick={handleSocialLogin(getTwitterLoginUrl)}
          src={XLoginButton}
          alt="X 로그인 버튼"
        />
      </S.LoginButtonContainer>
    </S.SignInPageContainer>
  );
};

export default SignInPage;
