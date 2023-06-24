import { useEffect } from 'react';
import { DashboardNavbar, LoadingSpinner } from '../components';
import { useUserPatients, useUserProfile } from '../hooks';
import { toast } from 'react-toastify';

const DashboardPatients = () => {
  const { data: loggedUser } = useUserProfile();
  const { data: users, isFetching, error } = useUserPatients(loggedUser?.results.role);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <>
      <DashboardNavbar />
      <div className="flex overflow-hidden bg-white">
        <div className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64 min-h-screen">
          <main>
            <div className="pt-20 lg:pt-16 px-4">
              <div className="w-full  gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-82 col-span-1">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Patients</h3>
                      <span className="text-base font-normal text-gray-500">This is a list of all patients</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-8">
                    <div className="overflow-x-auto rounded-lg">
                      <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                          {isFetching ? (
                            <div className="flex justify-center">
                              <LoadingSpinner noOverlay />
                            </div>
                          ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                  </th>
                                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                  </th>
                                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gender
                                  </th>
                                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                  </th>
                                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Address
                                  </th>
                                </tr>
                              </thead>

                              <tbody className="bg-white">
                                {users?.results ? (
                                  users?.results.map(item => (
                                    <tr key={item._id}>
                                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                        <span className="font-semibold"> {item.name}</span>
                                      </td>
                                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.email}</td>
                                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">{item.gender}</td>
                                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.phone}</td>
                                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.address}</td>
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
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div />
        </div>
      </div>
    </>
  );
};

export default DashboardPatients;
