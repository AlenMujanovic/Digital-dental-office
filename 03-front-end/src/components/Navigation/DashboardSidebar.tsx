import { useNavigate } from 'react-router-dom';
import { SessionService } from '../../services';
import DashboardSidebarLinks from './DashboardSidebarLinks';
import { IUser } from '../../types';
import userProfile from '../../assets/userProfile.png';

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  user: IUser | undefined;
}

const DashboardSidebar = ({ sidebarOpen, user }: DashboardSidebarProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await SessionService.clearSession();
    navigate('/');
  };

  return (
    <div>
      <div className="flex overflow-hidden bg-white">
        <aside
          className={`fixed z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 ${
            sidebarOpen ? 'flex' : 'hidden'
          }`}
          aria-label="Sidebar">
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white divide-y space-y-1">
                <DashboardSidebarLinks handleSignOut={handleSignOut} />
              </div>
              <div className="space-y-3 mb-10">
                <img src={userProfile} alt="Avatar user" className="w-10 md:w-16 rounded-full mx-auto" />
                <div>
                  <h2 className="font-bold text-sm text-center text-black ">{user?.name}</h2>
                  <p className="text-sm text-black text-center">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardSidebar;
