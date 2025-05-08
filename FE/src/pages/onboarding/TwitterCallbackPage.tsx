import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TwitterCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isRegistered = params.get('isRegistered') === 'true';
    const providerId = params.get('providerId');
    const oauthProvider = params.get('oauthProvider');
    const accessToken = params.get('accessToken');

    if (!isRegistered) {
      navigate('/signup/nickname', {
        state: { providerId, oauthProvider },
      });
    } else {
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      navigate('/');
    }
  }, [location, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default TwitterCallbackPage;
