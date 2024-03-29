import { useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import Sidebar from './Sidebar';
import { Link, useLocation } from 'react-router-dom';
import flouride from '../../assets/flouride.png';
import { SessionService } from '../../services';
import { useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSessionValid, setSessionValid] = useState<boolean | undefined>(false);

  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (SessionService.isSessionValid()) {
      setSessionValid(true);
    }
  }, [setSessionValid]);

  useEffect(() => {
    const sectionId = location.hash;

    if (sectionId) {
      const element = document.querySelector(sectionId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleSignOut = async () => {
    queryClient.removeQueries();
    await SessionService.clearSession();
    setSessionValid(false);
  };

  const handleBurgerClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="px-4 py-4 flex justify-between items-center bg-white sticky top-0 z-50">
      <Link className="text-3xl font-bold leading-none" to="/">
        <img src={flouride} alt="flourideIcon" className="h-10" />
      </Link>
      <div className="lg:hidden">
        <button className="navbar-burger flex items-center text-[#1cc7c1] p-3" onClick={handleBurgerClick}>
          <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <nav className={`${menuOpen ? '' : 'hidden'} absolute top-full left-0 w-full lg:static lg:w-auto lg:flex`}>
        <NavLinks handleSignOut={handleSignOut} isSessionValid={isSessionValid} />
      </nav>
      {menuOpen && <Sidebar onClose={handleCloseClick} handleSignOut={handleSignOut} isSessionValid={isSessionValid} />}
    </header>
  );
};

export default Navbar;
