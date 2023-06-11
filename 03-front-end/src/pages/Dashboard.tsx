import { DashboardSidebar } from '../components';
import { useUserProfile } from '../hooks';

const Dashboard = () => {
  const { data: user } = useUserProfile();

  return (
    <>
      <DashboardSidebar user={user?.results} />
    </>
  );
};

export default Dashboard;
