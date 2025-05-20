import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { requestFcmToken } from '@/fcm';
import { LogoBounceWrapper, Logo } from '@/pages/sell/UploadPageStyle';
import { Logo2d } from '@/assets/assets';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(location.search);
      const isRegistered = searchParams.get('isRegistered') === 'true';
      const oauthProvider = searchParams.get('oauthProvider');

      if (isRegistered) {
        const accessToken = searchParams.get('accessToken');
        const userId = searchParams.get('userId');

        if (!accessToken) {
          console.error('액세스 토큰이 없습니다.');
          navigate('/signin', { replace: true });
          return;
        }

        localStorage.setItem('accessToken', accessToken);

        if (userId) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              userId: Number(userId),
              oauthProvider: oauthProvider,
            })
          );
        }

        // FCM 토큰 발급 & 서버 매핑
        try {
          await requestFcmToken();
          console.log('FCM 토큰 매핑 완료');
        } catch (e) {
          console.warn('FCM 토큰 매핑 실패', e);
        }

        navigate('/main', { replace: true });
      } else {
        const oauthProvider = searchParams.get('oauthProvider');
        const providerId = searchParams.get('providerId');

        if (!oauthProvider || !providerId) {
          console.error('OAuth 정보가 없습니다.');
          navigate('/signin', { replace: true });
          return;
        }

        // OAuth 정보를 React Query에 저장
        queryClient.setQueryData([QUERY_KEYS.OAUTH], {
          providerId,
          oauthProvider,
        });

        navigate('/signup/nickname', { replace: true });
      }
    })();
  }, [navigate, location, queryClient]);

  return (
    <LogoBounceWrapper>
      <Logo src={Logo2d} alt="로고1" delay="-0.32s" />
      <Logo src={Logo2d} alt="로고2" delay="-0.16s" />
      <Logo src={Logo2d} alt="로고3" delay="0s" />
    </LogoBounceWrapper>
  );
};

export default KakaoCallbackPage;
