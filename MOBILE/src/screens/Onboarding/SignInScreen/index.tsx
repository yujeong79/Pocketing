import * as S from './style';
import { LOGO_3D_X3, LOGO_TEXT_X3, KAKAO_LOGIN_BUTTON_X4, X_LOGIN_BUTTON_X3 } from '@constants/icons';

import { useOnboardingNavigation } from '@hooks/useNavigationHooks';

const SignInScreen = () => {
  const navigation = useOnboardingNavigation();  

  return (
    <S.Container>
      <S.LogoContainer>
        <S.LogoImage source={LOGO_3D_X3} />
        <S.LogoText source={LOGO_TEXT_X3} />
      </S.LogoContainer>
      <S.LoginButtonContainer>
        <S.KakaoLoginButton onPress={() => navigation.navigate('Nickname')}>
          <S.ButtonImage source={KAKAO_LOGIN_BUTTON_X4} />
        </S.KakaoLoginButton>
        <S.XLoginButton onPress={() => navigation.navigate('Nickname')}>
          <S.ButtonImage source={X_LOGIN_BUTTON_X3} />
        </S.XLoginButton>
      </S.LoginButtonContainer>
    </S.Container>
  )
}

export default SignInScreen;