import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { initForegroundMessageListener } from '@/fcm';
import { registerServiceWorker } from './serviceWorkerRegistration';
import ToastContainer from './components/common/ToastContainer';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    (async () => {
      // 서비스워커 등록
      await registerServiceWorker();
     

      // 포그라운드 알림 리스너
      initForegroundMessageListener();
      
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
