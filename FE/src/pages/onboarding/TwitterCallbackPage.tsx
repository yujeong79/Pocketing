import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { requestFcmToken } from '@/fcm';

const TwitterCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isRegistered = params.get('isRegistered') === 'true';
    const providerId = params.get('providerId');
    const oauthProvider = params.get('oauthProvider');
    const accessToken = params.get('accessToken');

    if (!isRegistered) {
      queryClient.setQueryData([QUERY_KEYS.OAUTH], {
        providerId,
        oauthProvider,
      });
      navigate('/signup/nickname');
    } else {
      if (!accessToken) {
        navigate('/sigin', {replace: true});
        return;
      }

      localStorage.setItem('accessToken', accessToken);

      // FCM 토큰 등록 -> 완료 후 메인으로 이동
      requestFcmToken().finally(() => {
        navigate('/main', {replace: true});
      });
    }
  }, [location, navigate, queryClient]);

  return <div>로그인 처리 중...</div>;
};

export default TwitterCallbackPage;
