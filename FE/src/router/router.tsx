import { createBrowserRouter } from 'react-router-dom';

import NicknamePage from '@/pages/onboarding/NicknamePage';
import ProfileImagePage from '@/pages/onboarding/ProfileImagePage';
import MyGroupPage from '@/pages/onboarding/MyGroupPage';
import MyMemberPage from '@/pages/onboarding/MyMemberPage';
import CompletePage from '@/pages/onboarding/CompletePage';
import GroupSelectPage from '@/pages/main/components/Group/GroupSelectPage';

import MainPage from '../pages/main/MainPage';
import MapPage from '../pages/map/MapPage';
import MessagePage from '../pages/message/MessagePage';
import SellPage from '../pages/sell/SellPage';
import SplashScreen from '@/pages/onboarding/SplashPage';
import SignInPage from '@/pages/onboarding/SignInPage';
import Layout from '@/components/layout/Layout';

import ProfilePage from '../pages/profile/ProfilePage';
import ProfileDetailPage from '../pages/profile/ProfileDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: 'signup',
    children: [
      {
        path: 'nickname',
        element: <NicknamePage />,
      },
      {
        path: 'profileimage',
        element: <ProfileImagePage />,
      },
      {
        path: 'complete',
        element: <CompletePage />,
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
  {
    path: 'profileDetail',
    element: <ProfileDetailPage />,
  },
  {
    path: 'group',
    element: <MyGroupPage />,
  },
  {
    path: 'group/select',
    element: <GroupSelectPage onGroupSelect={() => {}} selectedAllGroup={null} />,
  },
  {
    path: 'member/:groupId',
    element: <MyMemberPage />,
  },
]);

export default router;
