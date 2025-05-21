import { createBrowserRouter, Navigate } from 'react-router-dom';

//auth
// import { RequireAuth } from '@/router/RequireAuth';

//onboarding
import SplashScreen from '@/pages/onboarding/SplashPage';
import SignInPage from '@/pages/onboarding/SignInPage';
import NicknamePage from '@/pages/onboarding/NicknamePage';
import ProfileImagePage from '@/pages/onboarding/ProfileImagePage';
import MyGroupPage from '@/pages/onboarding/MyGroupPage';
import MyMemberPage from '@/pages/onboarding/MyMemberPage';
import CompletePage from '@/pages/onboarding/CompletePage';
import KakaoCallbackPage from '@/pages/onboarding/KakaoCallbackPage';
import GroupSelectPage from '@/pages/main/components/Group/GroupSelectPage';
import TwitterCallbackPage from '@/pages/onboarding/TwitterCallbackPage';
//main
import Layout from '@/components/layout/Layout';
import MainPage from '@/pages/main/MainPage';
import DetailPage from '@/pages/main/DetailPage';
//sell
import PostPage from '@/pages/sell/PostPage';
import SellPage from '@/pages/sell/SellPage';
import GuidePage from '@/pages/sell/GuidePage';
import UploadPage from '@/pages/sell/UploadPage';
import CameraPage from '@/pages/sell/CameraPage';
import ResportMissingPage from '@/pages/sell/ReportMissingPage';
//message
import MessagePage from '@/pages/message/MessagePage';
import ChatRoomPage from '@/pages/message/ChatRoomPage';
//map
import MapPage from '@/pages/map/MapPage';
import AlarmPage from '@/pages/map/AlarmPage';
//profile
import ProfilePage from '@/pages/profile/ProfilePage';
import ProfileDetailPage from '@/pages/profile/ProfileDetailPage';
import ProfileEditPage from '@/pages/profile/ProfileEditPage';
import MySaleListPage from '@/pages/profile/MySaleListPage';
import MyCompleteListPage from '@/pages/profile/MyCompleteListPage';
import MyGroupEditPage from '@/pages/profile/MyGroupEditPage';
import MyMemberEditPage from '@/pages/profile/MyMemberEditPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <SplashScreen />,
    },
    {
      path: 'signin',
      element: <SignInPage />,
    },
    {
      path: 'kakao/callback',
      element: <KakaoCallbackPage />,
    },
    {
      path: 'twitter/callback',
      element: <TwitterCallbackPage />,
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
    // {
    //   path: '/',
    //   element: <RequireAuth />,
    //   children: [
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
          children: [
            {
              index: true,
              element: <Navigate to="/message/trade" replace />,
            },
            {
              path: 'trade',
              element: <MessagePage type="trade" />,
            },
            {
              path: 'exchange',
              element: <MessagePage type="exchange" />,
            },
          ],
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
      path: 'message/:roomId',
      element: <ChatRoomPage />,
    },
    {
      path: 'alarm',
      element: <AlarmPage />,
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
      path: 'upload',
      element: <UploadPage />,
    },
    {
      path: 'camera',
      element: <CameraPage />,
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
    {
      path:'/report-missing',
      element: <ResportMissingPage />,
    },
  ]
  // },
  // ]
);

export default router;
