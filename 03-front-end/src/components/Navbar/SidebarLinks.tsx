import { Link } from 'react-router-dom';

const SidebarLinks = () => {
  return (
    <ul>
      <li className="mb-1">
        <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">
          Home
        </Link>
      </li>
      <ul>
        <li className="mb-1">
          <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">
            About
          </Link>
        </li>
        <li className="mb-1">
          <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">
            Services
          </Link>
        </li>
        <li className="mb-1">
          <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">
            Reviews
          </Link>
        </li>
        <li className="mb-1">
          <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">
            Contact
          </Link>
        </li>
      </ul>
    </ul>
  );
};

export default SidebarLinks;
