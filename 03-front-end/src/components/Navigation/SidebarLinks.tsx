import { NavLink } from 'react-router-dom';
import { SessionService } from '../../services';

const SidebarLinks = () => {
  const user = SessionService.getProfileFromStorage();

  return (
    <ul>
      <li className="mb-1">
        <NavLink className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded" to="/#home">
          Home
        </NavLink>
      </li>
      <ul>
        <li className="mb-1">
          <NavLink className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded" to="/#services">
            Services
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded" to="/#about">
            About
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded" to="/#reviews">
            Reviews
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded" to="/#contact">
            Contact
          </NavLink>
        </li>
        <li className="mb-1">
          {user?.role === 'Doctor' ? (
            <NavLink className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded" to="/dashboard/admin">
              Dashboard
            </NavLink>
          ) : (
            <NavLink className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded" to="/dashboard/appointments">
              Dashboard
            </NavLink>
          )}
        </li>
      </ul>
    </ul>
  );
};

export default SidebarLinks;
