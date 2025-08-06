import * as S from './style';
import { LOGO_3D_X3, LOGO_TEXT_X3, KAKAO_LOGIN_BUTTON_X4, X_LOGIN_BUTTON_X3 } from '@constants/icons';

const SignInScreen = () => {
    return (
        <S.Container>
            <S.LogoContainer>
                <S.LogoImage source={LOGO_3D_X3} />
                <S.LogoText source={LOGO_TEXT_X3} />
            </S.LogoContainer>
            <S.LoginButtonContainer>
                <S.KakaoLoginButton source={KAKAO_LOGIN_BUTTON_X4} />
                <S.XLoginButton source={X_LOGIN_BUTTON_X3} />
            </S.LoginButtonContainer>
        </S.Container>
    )
}

export default SignInScreen;