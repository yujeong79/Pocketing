import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

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
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      navigate('/');
    }
  }, [location, navigate, queryClient]);

  return <div>로그인 처리 중...</div>;
};

export default TwitterCallbackPage;
