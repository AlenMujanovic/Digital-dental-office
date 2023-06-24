import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { SessionService } from '../services';

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const user = SessionService.getProfileFromStorage();

  if (allowedRoles.includes(user.role)) {
    return <>{children}</>;
  } else {
    return <Navigate to="*" />;
  }
};

export default RoleGuard;
