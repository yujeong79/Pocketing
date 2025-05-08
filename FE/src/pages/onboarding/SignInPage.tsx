import { useNavigate } from 'react-router-dom';

import * as S from './SignInPageStyle';
import { ThreeDLogo, TextLogo, KakaoLoginButton, XLoginButton } from '@/assets/assets';

const TWITTER_AUTH_URL =
  'https://twitter.com/i/oauth2/authorize' +
  '?response_type=code' +
  '&client_id=Z2JsUmp1aXRHazB6X3RnQTlTX2s6MTpjaQ' +
  '&redirect_uri=https://k12a406.p.ssafy.io/api/auth/twitter/callback' +
  '&scope=users.read%20tweet.read' +
  '&state=random_value' +
  '&code_challenge=challenge' +
  '&code_challenge_method=plain';

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <S.SignInPageContainer>
      <S.LogoContainer>
        <S.LogoImage src={ThreeDLogo} alt="포켓팅 로고" />
        <S.LogoText src={TextLogo} alt="포켓팅 로고" />
      </S.LogoContainer>
      <S.LoginButtonContainer>
        <S.KakaoLoginButton
          onClick={() => navigate('/signup/nickname')}
          src={KakaoLoginButton}
          alt="카카오 로그인 버튼"
        />
        <S.XLoginButton
          onClick={() => (window.location.href = TWITTER_AUTH_URL)}
          src={XLoginButton}
          alt="X 로그인 버튼"
        />
      </S.LoginButtonContainer>
    </S.SignInPageContainer>
  );
};

export default SignInPage;
