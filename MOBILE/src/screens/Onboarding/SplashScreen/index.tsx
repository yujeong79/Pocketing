import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as S from './style';
import { LOGO_3D_X3 } from '@constants/icons';
import { useFontLoader } from '@hooks/useFontLoader';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fontsLoaded = useFontLoader();

  useEffect(() => {
    if (fontsLoaded) {
      // 폰트 로딩이 완료되면 1초 후 SignInScreen으로 이동
      const timer = setTimeout(() => {
        navigation.navigate('SignIn' as never);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, navigation]);

  return (
    <S.Container>
        <S.Logo source={LOGO_3D_X3} />
    </S.Container>
  ); 
}

export default SplashScreen;