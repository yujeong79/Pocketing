import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import * as S from './SplashPageStyle';
import { ThreeDLogo } from '@/assets/assets';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signin');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <S.SplashPageContainer>
      <S.Logo src={ThreeDLogo} alt="포켓팅 로고" />
    </S.SplashPageContainer>
  );
};

export default SplashPage;
