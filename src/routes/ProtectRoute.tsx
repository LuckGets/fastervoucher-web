import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import useAuthStore from '../stores/auth-store';
import { Navigate } from 'react-router-dom';
import { paths } from '../config/path';

interface JwtPayload {
  role: string;
  sub: string;
}

interface ProtectRouteProps {
  element: JSX.Element;
  allow: string[];
}

function ProtectRoute({ element, allow }: ProtectRouteProps) {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      const decoded = decodeJwt(accessToken);
      const role = decoded?.role;
      console.log('UserRole :>> ', role);
      if (role && allow.includes(role)) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    } else {
      setIsAllowed(false);
    }
  }, [accessToken, allow]);

  function decodeJwt(token: string): JwtPayload {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }

  if (isAllowed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to={paths.main.home.path} />;
  }

  return element;
}

export default ProtectRoute;
