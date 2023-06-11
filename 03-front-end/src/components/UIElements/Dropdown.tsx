import { useEffect, useState } from 'react';
import userProfile from '../../assets/userProfile.png';
import { Link } from 'react-router-dom';
interface DropdownProps {
  handleSignOut: () => void;
}

const Dropdown = ({ handleSignOut }: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={`relative inline-block text-left dropdown-container mx-5 ${dropdownOpen ? 'open' : ''}`}>
      <button onClick={toggleDropdown} className="flex items-center  text-base font-semibold text-white rounded-full">
        <img src={userProfile} className="w-10"></img>
      </button>
      <div
        className={`absolute left-0 z-40 mt-2 rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all ${
          dropdownOpen ? 'top-full opacity-100 visible' : 'top-[110%] invisible opacity-0'
        }`}>
        <Link to="/dashboard" className="block w-full py-2 px-5 text-base font-semibold text-black hover:bg-[#1cc7c1] rounded">
          Dashboard
        </Link>
        <button onClick={handleSignOut} className="block w-full py-2 px-5 text-base  font-semibold text-black hover:bg-[#1cc7c1] rounded">
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;