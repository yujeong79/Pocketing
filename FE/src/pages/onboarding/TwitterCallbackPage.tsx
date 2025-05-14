import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { requestFcmToken } from '@/fcm';

const TwitterCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isRegistered = searchParams.get('isRegistered') === 'true';

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
          })
        );
      }

      requestFcmToken()
        .catch((err) => console.error('FCM 토큰 등록 실패:', err))
        .finally(() => navigate('/main', { replace: true }));
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
  }, [navigate, location, queryClient]);

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      로그인 처리 중...
    </div>
  );
};

export default TwitterCallbackPage;
