import { Navigate, Outlet } from 'react-router-dom';

export const RequireAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken ? <Outlet /> : <Navigate to="/signin" replace />;
};
