import { Outlet } from 'react-router-dom';
import NavBar from '../common/NavBar/NavBar';

export default function Layout() {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
}
