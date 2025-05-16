import { useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { requestFcmToken, initForegroundMessageListener, syncFcmToken } from '@/fcm';
import { registerServiceWorker } from './serviceWorkerRegistration';
import ToastContainer from './components/common/ToastContainer';

const queryClient = new QueryClient();

function App() {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;     // ← StrictMode 중복 실행 방지
    hasInitialized.current = true;

    (async () => {
      try {
        // 1) 서비스 워커 등록
        const registration = await registerServiceWorker();
        if (!registration) {
          console.warn('⚠️ 서비스 워커 등록에 실패하여 FCM 초기화를 건너뜁니다.');
          return;
        }

        // 2) 개발 모드 분기: 토큰 발급/동기화 대신 리스너만
        if (process.env.NODE_ENV === 'development') {
          initForegroundMessageListener();
          return;
        }

        // 3) 권한이 granted 또는 default 상태일 때만 토큰 로직
        if (Notification.permission === 'granted' || Notification.permission === 'default') {
          // 최초 FCM 토큰 요청 (권한 요청/발급/서버 저장 포함)
          await requestFcmToken(registration);

          // SDK 내부에서 바뀐 토큰이 있으면 동기화
          await syncFcmToken(registration);
        }

        // 4) 포그라운드 알림 리스너 등록
        initForegroundMessageListener();
      } catch (e) {
        console.warn('⚠️ FCM 초기화 중 오류 발생:', e);
      }
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
