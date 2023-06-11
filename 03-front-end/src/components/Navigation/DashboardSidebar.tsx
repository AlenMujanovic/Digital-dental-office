import { useState } from 'react';
import userProfile from '../../assets/userProfile.png';
import { IUser } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { SessionService } from '../../services';

interface DashboardProps {
  user: IUser | undefined;
}

const DashboardSidebar = ({ user }: DashboardProps) => {
  const [sidebar, setSidebar] = useState(true);

  const navigate = useNavigate();

  const toggleSidenav = () => {
    setSidebar(!sidebar);
  };

  const handleSignOut = async () => {
    await SessionService.clearSession();
    navigate('/');
  };

  return (
    <div id="view" className="h-full w-screen flex flex-row">
      <button
        onClick={toggleSidenav}
        className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden">
        <svg className="w-5 h-5 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"></path>
        </svg>
      </button>
      <div
        id="sidebar"
        className={`bg-[#1cc7c1] h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-72 overflow-x-hidden transition-transform duration-300 ease-in-out ${
          sidebar ? '' : 'transform -translate-x-full'
        }`}>
        <div className="space-y-6 md:space-y-10 mt-10">
          <div id="profile" className="space-y-3">
            <img src={userProfile} alt="Avatar user" className="w-10 md:w-16 rounded-full mx-auto" />
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-black">{user?.name}</h2>
              <p className="text-xs text-white text-center">{user?.role}</p>
            </div>
          </div>
          <div id="menu" className="flex flex-col space-y-5">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-white py-2 px-2  hover:bg-gray-700 rounded-md transition duration-150 ease-in-out">
              <svg
                className="w-6 h-6 fill-current inline-block mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="">Dashboard</span>
            </Link>
            <Link
              to="/dashboard/appointments"
              className="text-sm font-medium text-white py-2 px-2  hover:bg-gray-700 hover:scale-105 rounded-md transition duration-150 ease-in-out">
              <svg
                className="w-6 h-6 fill-current inline-block mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"></path>
              </svg>
              <span className="">Appointments</span>
            </Link>
            <Link
              to="/dashboard/patients"
              className="text-sm font-medium text-white py-2 px-2 hover:bg-gray-700 hover:scale-105 rounded-md transition duration-150 ease-in-out">
              <svg
                className="w-6 h-6 fill-current inline-block mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
              <span className="">Patients</span>
            </Link>
            <Link
              to="/dashboard/prescription"
              className="text-sm font-medium text-white py-2 px-2  hover:bg-gray-700 hover:scale-105 rounded-md transition duration-150 ease-in-out">
              <svg
                className="w-6 h-6 fill-current inline-block mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"></path>
              </svg>
              <span className="">Prescriptions</span>
            </Link>

            <button
              className="absolute bottom-16 text-sm text-left font-medium text-white py-2 px-2 hover:scale-105 rounded-md transition duration-150 ease-in-out"
              onClick={handleSignOut}>
              <svg className="w-6 h-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9-4-4m4 4-4 4m4-4H9"
                />
              </svg>
              <span className="">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
