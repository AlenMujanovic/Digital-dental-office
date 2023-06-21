import { DashboardNavbar } from '../components';
import { usePrescriptions } from '../hooks/Prescription';
import userProfile from '../assets/userProfile.png';
import { formatDateTime } from '../utils';

const DashboardPrescriptions = () => {
  const { data: prescriptions, isFetching, error } = usePrescriptions();

  console.log(prescriptions);

  return (
    <>
      <DashboardNavbar />
      <div className="flex overflow-hidden bg-white">
        <div className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64 min-h-screen">
          <main>
            <div className="pt-20 lg:pt-16 px-4">
              <div className="w-full">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-82 col-span-3 ">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Prescriptions</h3>
                      <span className="text-base font-normal text-gray-500">This is a list of your prescriptions</span>
                    </div>
                  </div>
                  <div className="p-4 text-gray-600 body-font flex justify-center items-center">
                    <div className="container px-5 pb-24 mx-auto pt-1">
                      <div className="flex flex-wrap -m-4 text-center justify-between">
                        {prescriptions?.results.map(item => (
                          <div className="sm:w-full lg:w-[49%] w-full hover:scale-105 duration-500 mt-3 lg:mt-0" key={item._id}>
                            <div className="rounded-xl border p-5 shadow-md  bg-white">
                              <div className="flex w-full items-center justify-between border-b pb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="h-8 w-8 rounded-full">
                                    <img src={userProfile} alt="Avatar user" className="w-10 md:w-16 rounded-full mx-auto" />
                                  </div>
                                  <div className="text-lg font-bold text-slate-700">{item.user?.name}</div>
                                </div>
                                <div className="flex items-center space-x-8">
                                  <div className="text-xs text-neutral-500">{formatDateTime(item.createdAt)}</div>
                                </div>
                              </div>

                              <div className="mt-4 mb-6">
                                <div className="mb-3 text-xl font-bold">Prescription for {item.user?.name}</div>
                                <div className="text-sm text-neutral-600">{item.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
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

export default DashboardPrescriptions;
