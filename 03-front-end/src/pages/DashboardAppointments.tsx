import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { DashboardNavbar, LoadingSpinner } from '../components';
import { useAppointmentsForLast6Months, useUpcomingAppointments } from '../hooks';
import { formatTimeRange } from '../utils';

const DashboardAppointments = () => {
  const { data: recentAppointments, isFetching, error } = useAppointmentsForLast6Months();
  const { data: upcomingAppointments, isFetching: isFetchingUpcoming, error: upcomingAppError } = useUpcomingAppointments();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (upcomingAppError) {
      toast.error(upcomingAppError.message);
    }
  }, [error, upcomingAppError]);

  return (
    <>
      <DashboardNavbar />
      <div className="flex overflow-hidden bg-white">
        <div className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64 min-h-screen">
          <main>
            {isFetching || isFetchingUpcoming ? (
              <div className="flex justify-center mt-[100px]">
                <LoadingSpinner noOverlay />
              </div>
            ) : (
              <>
                <div className="pt-20 lg:pt-16 px-4">
                  <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-82 col-span-3">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Upcoming Appointment</h3>
                          <span className="text-base font-normal text-gray-500">This is a list of appointments upcoming appointments</span>
                        </div>
                      </div>
                      <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                          <div className="align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Name
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Scheduled
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Type
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Status
                                    </th>
                                  </tr>
                                </thead>

                                <tbody className="bg-white">
                                  {upcomingAppointments && upcomingAppointments.results ? (
                                    upcomingAppointments?.results.map(item => (
                                      <tr key={item._id}>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          <span className="font-semibold"> {item.user && item.user.name ? item.user.name : 'No User'}</span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                          {formatTimeRange(item.startTimeAndDate, item.endTimeAndDate)}
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.type}</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.status}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td>
                                        <p className="p-5">No appointments for selected date!</p>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-10 px-4 pb-10">
                  <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-82 col-span-3">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Recent Appointment</h3>
                          <span className="text-base font-normal text-gray-500">This is a list of appointments for last 6 months</span>
                        </div>
                      </div>
                      <div className="flex flex-col mt-8">
                        <div className="overflow-x-auto rounded-lg">
                          <div className="align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Name
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Scheduled
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Type
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Status
                                    </th>
                                  </tr>
                                </thead>

                                <tbody className="bg-white">
                                  {recentAppointments && recentAppointments.results ? (
                                    recentAppointments?.results.map(item => (
                                      <tr key={item._id}>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          <span className="font-semibold"> {item.user && item.user.name ? item.user.name : 'No User'}</span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                          {formatTimeRange(item.startTimeAndDate, item.endTimeAndDate)}
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.type}</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.status}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td>
                                        <p className="p-5">No appointments for selected date!</p>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
          <div />
        </div>
      </div>
    </>
  );
};

export default DashboardAppointments;
