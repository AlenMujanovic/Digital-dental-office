import { Link } from 'react-router-dom';

interface DashboardSidebarLinksProps {
  handleSignOut: () => void;
}

const DashboardSidebarLinks = ({ handleSignOut }: DashboardSidebarLinksProps) => {
  return (
    <>
      <ul className="space-y-2 pb-2">
        <li>
          <Link to="/dashboard" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
            <svg
              className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span className="ml-3">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/appointments"
            className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
            <svg
              className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />{' '}
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
            </svg>
            <span className="ml-3 flex-1 whitespace-nowrap">Appointments</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/patients"
            className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
            <svg
              className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="ml-3 flex-1 whitespace-nowrap">Patients</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/prescriptions"
            className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
            <svg
              className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
            </svg>
            <span className="ml-3 flex-1 whitespace-nowrap">Prescriptions</span>
          </Link>
        </li>
      </ul>
      <div className="space-y-2 pt-2">
        <Link
          to=""
          onClick={handleSignOut}
          className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
          <span className="ml-4">Sign Out</span>
        </Link>
      </div>
    </>
  );
};

export default DashboardSidebarLinks;
