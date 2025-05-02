import { createBrowserRouter } from 'react-router-dom';
//onboarding
import SplashScreen from '@/pages/onboarding/SplashPage';
import SignInPage from '@/pages/onboarding/SignInPage';
import NicknamePage from '@/pages/onboarding/NicknamePage';
import ProfileImagePage from '@/pages/onboarding/ProfileImagePage';
import MyGroupPage from '@/pages/onboarding/MyGroupPage';
import MyMemberPage from '@/pages/onboarding/MyMemberPage';
import CompletePage from '@/pages/onboarding/CompletePage';
import GroupSelectPage from '@/pages/main/components/Group/GroupSelectPage';
//main
import Layout from '@/components/layout/Layout';
import MainPage from '@/pages/main/MainPage';
import DetailPage from '@/pages/main/DetailPage';
//sell
import SellPage from '@/pages/sell/SellPage';
//message
import MessagePage from '@/pages/message/MessagePage';
//map
import MapPage from '@/pages/map/MapPage';
//profile
import ProfilePage from '@/pages/profile/ProfilePage';
import ProfileDetailPage from '@/pages/profile/ProfileDetailPage';
import ProfileEditPage from '@/pages/profile/ProfileEditPage';
import MySaleListPage from '@/pages/profile/MySaleListPage';
import MyCompleteListPage from '@/pages/profile/MyCompleteListPage';

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
        path: 'detail/:postId',
        element: <DetailPage />,
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
    path: 'profileEdit',
    element: <ProfileEditPage />,
  },
  {
    path: 'mySaleList',
    element: <MySaleListPage />,
  },
  {
    path: 'myCompleteList',
    element: <MyCompleteListPage />,
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
