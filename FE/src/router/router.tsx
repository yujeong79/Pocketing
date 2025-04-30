import { createBrowserRouter } from 'react-router-dom';

import NicknamePage from '@/pages/onboarding/NicknamePage';
import ProfileImagePage from '@/pages/onboarding/ProfileImagePage';

import MainPage from '../pages/main/MainPage';
import MapPage from '../pages/map/MapPage';
import MessagePage from '../pages/message/MessagePage';
import ProfilePage from '../pages/profile/ProfilePage';
import SellPage from '../pages/sell/SellPage';
import SplashScreen from '@/pages/onboarding/SplashPage';
import SignInPage from '@/pages/onboarding/SignInPage';
import Layout from '@/components/layout/Layout';

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
    path: '/signup',
    children: [
      {
        path: 'nickname',
        element: <NicknamePage />,
      },
      {
        path: 'profileimage',
        element: <ProfileImagePage />,
      },
    ],
  },

  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'message',
        element: <MessagePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'sell',
        element: <SellPage />,
      },
    ],
  },
]);

export default router;
