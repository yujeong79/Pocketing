import { createBrowserRouter } from 'react-router-dom';

import MainPage from '../pages/main/MainPage';
import MapPage from '../pages/map/MapPage';
import MessagePage from '../pages/message/MessagePage';
import ProfilePage from '../pages/profile/ProfilePage';
import SellPage from '../pages/sell/SellPage';
import SplashScreen from '@/pages/onboarding/SplashPage';
import SignInPage from '@/pages/onboarding/SignInPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
  {
    path: '/message',
    element: <MessagePage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/sell',
    element: <SellPage />,
  },
]);

export default router;
