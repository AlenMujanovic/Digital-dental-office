import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authStore } from '../stores/authStore';
import { SessionService } from '../services';

const AuthGuard = () => {
  const setAuthStoreSession = useSetRecoilState(authStore);
  const location = useLocation();
  let session = SessionService.getSessionFromStorage();

  useEffect(() => {
    if (SessionService.isSessionValid()) {
      session = SessionService.getSessionFromStorage();
      setAuthStoreSession(() => session);
      return;
    }

    SessionService.clearSession();
    setAuthStoreSession(() => null);
  }, [location, setAuthStoreSession]);

  return session ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
};

export default AuthGuard;
