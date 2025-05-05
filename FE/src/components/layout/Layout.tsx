import { Outlet } from 'react-router-dom';
import NavBar from '../common/NavBar/NavBar';
import styled from 'styled-components';
import scale from '@/utils/scale';
import ChatbotButton from '../chatbot/ChatbotButton';

const LayoutContainer = styled.div`
  padding-bottom: ${scale(32)}px;
`;

export default function Layout() {
  return (
    <LayoutContainer>
      <Outlet />
      <ChatbotButton />
      <NavBar />
    </LayoutContainer>
  );
}
