import * as S from './style';
import { LOGO_3D_X3 } from '../../../constants/icons';

const SplashScreen = () => {
  return (
    <S.Container>
        <S.Logo source={LOGO_3D_X3} />
    </S.Container>
  ); 
}

export default SplashScreen;