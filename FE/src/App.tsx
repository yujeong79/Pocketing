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

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    registerServiceWorker();
    initForegroundMessageListener();
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
