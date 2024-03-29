import { Link, NavLink } from 'react-router-dom';
import Dropdown from '../UIElements/Dropdown';

interface NavLinksProps {
  handleSignOut: () => void;
  isSessionValid: boolean | undefined;
}

const NavLinks = ({ handleSignOut, isSessionValid }: NavLinksProps) => {
  return (
    <>
      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
        <li>
          <NavLink to="/#home" className="text-sm text-gray-400 hover:text-gray-500">
            Home
          </NavLink>
        </li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <NavLink to="/#services" className="text-sm text-black font-bold">
            Services
          </NavLink>
        </li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <NavLink to="/#about" className="text-sm text-black font-bold">
            About
          </NavLink>
        </li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <NavLink to="/#reviews" className="text-sm text-black font-bold">
            Reviews
          </NavLink>
        </li>

        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <NavLink to="/#contact" className="text-sm text-black font-bold">
            Contact
          </NavLink>
        </li>
      </ul>

      {isSessionValid ? (
        // <button
        //   type="button"
        //   onClick={handleSignOut}
        //   className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-slate-700 hover:bg-opacity-90 text-sm text-white font-bold rounded-xl transition duration-200">
        //   Sign Out
        // </button>
        <Dropdown handleSignOut={handleSignOut} />
      ) : (
        <Link
          className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-slate-700 hover:bg-opacity-90 text-sm text-white font-bold rounded-xl transition duration-200"
          to="/signIn">
          Sign In
        </Link>
      )}
      <Link
        className="hidden lg:inline-block py-2 px-6 bg-theme-green hover:bg-opacity-90 text-sm text-white font-bold rounded-xl transition duration-200"
        to="/signUp">
        Sign up
      </Link>
    </>
  );
};

export default NavLinks;
