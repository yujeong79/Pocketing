import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { requestFcmToken } from '@/firebase';
import { registerFcmToken } from '@/fcm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const initFcm = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('❌ 알림 권한 거부됨');
        return;
      }

      const token = await requestFcmToken();
      if (token) {
        await registerFcmToken(token);
      }
    };

    initFcm();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
