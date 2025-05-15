import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import * as S from './SplashPageStyle';
import { TextLogo, ThreeDLogo } from '@/assets/assets';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signin');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <S.SplashPageContainer>
      <S.LogoContainer>
        <S.Logo src={ThreeDLogo} alt="포켓팅 로고" />
        <S.LogoText src={TextLogo} alt="포켓팅 로고" />
      </S.LogoContainer>
    </S.SplashPageContainer>
  );
};

export default SplashPage;
