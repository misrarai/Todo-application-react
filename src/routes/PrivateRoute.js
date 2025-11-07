import { Navigate } from 'react-router-dom';

const isLoggedIn = () => !!localStorage.getItem('token');

export default function PrivateRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" />;
  return children;
}
