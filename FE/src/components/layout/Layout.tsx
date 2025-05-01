import { Outlet } from 'react-router-dom';
import NavBar from '../common/NavBar/NavBar';
import styled from 'styled-components';
import scale from '@/utils/scale';

const LayoutContainer = styled.div`
  padding-bottom: ${scale(72)}px;
`;

export default function Layout() {
  return (
    <LayoutContainer>
      <Outlet />
      <NavBar />
    </LayoutContainer>
  );
}
