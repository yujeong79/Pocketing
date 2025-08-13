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
      const timer = setTimeout(() => {
        navigation.navigate('SignIn' as never);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, navigation]);

  return (
    <>
        <S.Logo source={LOGO_3D_X3} />
    </>
  ); 
}

export default SplashScreen;