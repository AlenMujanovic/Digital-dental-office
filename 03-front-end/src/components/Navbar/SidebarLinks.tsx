import { NavLink } from 'react-router-dom';

interface SidebarLinksProps {
  scrollToSection(sectionId: string): void;
}

const SidebarLinks = ({ scrollToSection }: SidebarLinksProps) => {
  return (
    <ul>
      <li className="mb-1">
        <NavLink
          className="block p-4 text-sm font-semibold text-black hover:bg-[#1cc7c1] rounded"
          to="#"
          onClick={() => scrollToSection('#home')}>
          Home
        </NavLink>
      </li>
      <ul>
        <li className="mb-1">
          <NavLink
            className="block p-4 text-sm font-semibold text-black hover:bg-[#1cc7c1] rounded"
            to="#"
            onClick={() => scrollToSection('#services')}>
            Services
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink
            className="block p-4 text-sm font-semibold text-black hover:bg-[#1cc7c1] rounded"
            to="#"
            onClick={() => scrollToSection('#about')}>
            About
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink
            className="block p-4 text-sm font-semibold text-black hover:bg-[#1cc7c1] rounded"
            to="#"
            onClick={() => scrollToSection('#reviews')}>
            Reviews
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink
            className="block p-4 text-sm font-semibold text-black hover:bg-[#1cc7c1] rounded"
            to="#"
            onClick={() => scrollToSection('#contact')}>
            Contact
          </NavLink>
        </li>
      </ul>
    </ul>
  );
};

export default SidebarLinks;