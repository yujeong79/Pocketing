import { createBrowserRouter } from 'react-router-dom';

import MainPage from '../pages/main/MainPage';
import MapPage from '../pages/map/MapPage';
import MessagePage from '../pages/message/MessagePage';
import OnboardingPage from '../pages/onboarding/OnboardingPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SellPage from '../pages/sell/SellPage';

const router = createBrowserRouter([
  {
    path: '/',
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
    path: '/onboarding',
    element: <OnboardingPage />,
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
