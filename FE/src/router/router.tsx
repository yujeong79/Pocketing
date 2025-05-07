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
import PostPage from '@/pages/sell/PostPage';
import SellPage from '@/pages/sell/SellPage';
import GuidePage from '@/pages/sell/GuidePage';
//message
import MessagePage from '@/pages/message/MessagePage';
import ChatRoomPage from '@/pages/message/ChatRoomPage';
//map
import MapPage from '@/pages/map/MapPage';
//profile
import ProfilePage from '@/pages/profile/ProfilePage';
import ProfileDetailPage from '@/pages/profile/ProfileDetailPage';
import ProfileEditPage from '@/pages/profile/ProfileEditPage';
import MySaleListPage from '@/pages/profile/MySaleListPage';
import MyCompleteListPage from '@/pages/profile/MyCompleteListPage';
import MyGroupEditPage from '@/pages/profile/MyGroupEditPage';
import MyMemberEditPage from '@/pages/profile/MyMemberEditPage';

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
    path: 'guide',
    element: <GuidePage />,
  },
  {
    path: 'post',
    element: <PostPage />,
  },
  {
    path: 'message/:roomId',
    element: <ChatRoomPage />,
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
    path: 'myGroupEdit',
    element: <MyGroupEditPage />,
  },
  {
    path: 'myMemberEdit/:groupId',
    element: <MyMemberEditPage />,
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
