import { DashboardNavbar } from '../components';

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <div className="flex overflow-hidden bg-white">
        <div className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64 min-h-screen">
          <main>
            <div className="pt-20 lg:pt-16 px-4"></div>
          </main>
          <div />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
