import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isRegistered = searchParams.get('isRegistered') === 'true';

    if (isRegistered) {
      const accessToken = searchParams.get('accessToken');

      if (!accessToken) {
        console.error('액세스 토큰이 없습니다.');
        navigate('/signin', { replace: true });
        return;
      }

      localStorage.setItem('accessToken', accessToken);

      window.history.replaceState(null, '', '/main');
      navigate('/main', { replace: true });
    } else {
      const oauthProvider = searchParams.get('oauthProvider');
      const providerId = searchParams.get('providerId');
      console.log(providerId, oauthProvider);

      if (!oauthProvider || !providerId) {
        console.error('OAuth 정보가 없습니다.');
        navigate('/signin', { replace: true });
        return;
      }

      window.history.replaceState(null, '', '/signup/nickname');
      navigate('/signup/nickname', {
        state: {
          oauthProvider,
          providerId,
        },
        replace: true,
      });
    }
  }, [navigate, location]);

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      로그인 처리 중...
    </div>
  );
};

export default KakaoCallbackPage;
