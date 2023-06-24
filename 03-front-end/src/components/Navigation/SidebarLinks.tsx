import { NavLink } from 'react-router-dom';
import { SessionService } from '../../services';

interface SidebarLinksProps {
  scrollToSection(sectionId: string): void;
}

const SidebarLinks = ({ scrollToSection }: SidebarLinksProps) => {
  const user = SessionService.getProfileFromStorage();

  return (
    <ul>
      <li className="mb-1">
        <NavLink
          className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded"
          to="#"
          onClick={() => scrollToSection('#home')}>
          Home
        </NavLink>
      </li>
      <ul>
        <li className="mb-1">
          <NavLink
            className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded"
            to="#"
            onClick={() => scrollToSection('#services')}>
            Services
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink
            className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded"
            to="#"
            onClick={() => scrollToSection('#about')}>
            About
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink
            className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded"
            to="#"
            onClick={() => scrollToSection('#reviews')}>
            Reviews
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink
            className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded"
            to="#"
            onClick={() => scrollToSection('#contact')}>
            Contact
          </NavLink>
        </li>
        <li className="mb-1">
          {user?.role === 'Doctor' ? (
            <NavLink className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded" to="/dashboard/admin">
              Dashboard
            </NavLink>
          ) : (
            <NavLink className="block p-4 text-sm font-semibold text-black hover:bg-theme-green rounded" to="/dashboard">
              Dashboard
            </NavLink>
          )}
        </li>
      </ul>
    </ul>
  );
};

export default SidebarLinks;
