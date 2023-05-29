import SidebarLinks from './SidebarLinks';
import flouride from '../../assets/flouride.png';
import { Link } from 'react-router-dom';
interface SidebarProps {
  onClose: () => void;
  scrollToSection(sectionId: string): void;
}

const Sidebar = ({ onClose, scrollToSection }: SidebarProps) => {
  return (
    <>
      <div className="navbar-backdrop fixed inset-0  opacity-25" onClick={onClose} />
      <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto z-[1000]">
        <div className="flex items-center mb-8">
          <a className="mr-auto text-3xl font-bold leading-none" href="#">
            <img src={flouride} alt="logo" className="h-10" />
          </a>
          <button className="navbar-close" onClick={onClose}>
            <svg
              className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div>
          <SidebarLinks scrollToSection={scrollToSection} />
        </div>
        <div className="mt-auto">
          <div className="pt-6">
            <Link
              className="py-2 px-6 bg-slate-700 hover:bg-opacity-90 text-sm text-white font-bold rounded-lg w-full block text-center mb-1"
              to="/signIn">
              Sign In
            </Link>
            <Link
              type="button"
              className="py-2 px-6 bg-[#1cc7c1] hover:bg-opacity-90 text-sm text-white font-bold rounded-lg w-full block text-center"
              to="/signUp">
              Sign Up
            </Link>
          </div>
          <p className="my-4 text-xs text-center text-gray-400">
            <span>Copyright © 2023</span>
          </p>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
