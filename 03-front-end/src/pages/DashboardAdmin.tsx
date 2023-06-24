import FocusTrap from 'focus-trap-react';
import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DashboardNavbar, LoadingSpinner } from '../components';
import { useAppointmentsByRole, useUserPatients, useUserProfile } from '../hooks';
import { formatTimeRange } from '../utils';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateAppointmentStatus } from '../hooks/Appointment';

type AppointmentStatus = 'Pending' | 'Canceled' | 'Done' | 'Free';

const DashboardAdmin = () => {
  const [selected, setSelected] = useState<Date>();
  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);
  const [statusList, setStatusList] = useState<AppointmentStatus[]>([]);

  const queryClient = useQueryClient();

  const todayDate = new Date();
  todayDate.setUTCHours(0, 0, 0, 0);
  todayDate.setDate(todayDate.getDate());
  const todayDateFormatted = todayDate.toISOString().split('T')[0];

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    setIsPopperOpen(!isPopperOpen);
  };

  let formattedDate = '';
  let tableDateShow = '';

  if (selected) {
    const date = new Date(selected);
    date.setUTCHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1);

    formattedDate = date.toISOString().split('T')[0];
    tableDateShow = formattedDate;
  }

  const { data: loggedUser } = useUserProfile();
  const { data: appointments, isFetching, error } = useAppointmentsByRole(formattedDate || todayDateFormatted);
  const { data: patients } = useUserPatients(loggedUser?.results.role);
  const { mutate: updateAppStatus } = useUpdateAppointmentStatus();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const getPendingAppointments = () => {
    const pendingAppointments = appointments?.results?.filter(item => item.status === 'Pending');
    return pendingAppointments?.length;
  };

  const getCanceledAppointments = () => {
    const canceledAppointments = appointments?.results?.filter(item => item.status === 'Canceled');
    return canceledAppointments?.length;
  };

  const getTodayAppointments = () => {
    return appointments?.results.length;
  };

  const getActivePatients = () => {
    return patients?.results.length;
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number): void => {
    const updatedStatusList = [...statusList];
    updatedStatusList[index] = event.target.value as AppointmentStatus;
    setStatusList(updatedStatusList);
  };

  useEffect(() => {
    // Initialize the statusList state with the initial status values
    const initialStatuses = appointments?.results.map(item => item.status) || [];
    setStatusList(initialStatuses);
  }, [appointments]);

  const handleRowSubmit = (status: string, id: string) => {
    updateAppStatus(
      {
        _id: id,
        status: status as AppointmentStatus,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['appointmentsByRole', formattedDate] });
          toast.success('Successfully updated status');
        },
        onError: error => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <>
      <DashboardNavbar />
      <div className="flex overflow-hidden bg-white pt-16">
        <div className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64 min-h-screen">
          <main>
            <div className="pt-6 px-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dashboard</h3>
                </div>
              </div>

              <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-red-500 shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-5xl leading-none font-bold text-white">{getCanceledAppointments()}</span>
                      <h3 className="text-white">Canceled Appointments</h3>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-500 shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-5xl leading-none font-bold text-white">{getPendingAppointments()}</span>
                      <h3 className="text-white">Pending Appointments</h3>
                    </div>
                  </div>
                </div>
                <div className="bg-green-500 shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-5xl leading-none font-bold text-white">{getTodayAppointments()}</span>
                      <h3 className="text-white">Today's Appointments</h3>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-400 shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-5xl leading-none font-bold text-white">{getActivePatients()}</span>
                      <h3 className="text-white">Active Patients</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">
                    {isPopperOpen && (
                      <FocusTrap
                        active
                        focusTrapOptions={{
                          // initialFocus: false,
                          allowOutsideClick: false,
                          clickOutsideDeactivates: true,
                          // onDeactivate: closePopper,
                          // fallbackFocus: fallbackFocus,
                        }}>
                        <div className="absolute mt-16 bg-white right-4">
                          <DayPicker mode="single" selected={selected} onSelect={setSelected} showOutsideDays fixedWeeks />
                        </div>
                      </FocusTrap>
                    )}
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      {isFetching ? (
                        <div className="flex justify-center">
                          <LoadingSpinner noOverlay />
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-row sm:justify-between">
                            <div className="flex flex-col">
                              <p className="text-xl font-bold text-gray-900 mb-2 p-5 ">Recent Appointments</p>
                              <span className="px-5 pb-2 -mt-3">{tableDateShow}</span>
                            </div>
                            <div ref={popperRef}>
                              <button ref={buttonRef} type="button" aria-label="Pick a date" onClick={handleButtonClick}>
                                <svg className="w-10 h-8 mt-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />{' '}
                                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <table className="min-w-full divide-y divide-gray-200 bg-white">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Time
                                </th>
                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Name
                                </th>
                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Contact
                                </th>
                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Prescription
                                </th>
                                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Action
                                </th>
                              </tr>
                            </thead>

                            <tbody className="bg-white">
                              {appointments?.results && appointments.results.length > 1 ? (
                                appointments?.results.map((item, index) => (
                                  <tr key={item._id}>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                      <span className="font-semibold"> {formatTimeRange(item.startTimeAndDate, item.endTimeAndDate)}</span>
                                    </td>

                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      {item.user && item.user.name ? item.user.name : 'No User'}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.user?.phone}</td>

                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      {item.user?._id ? (
                                        <Link
                                          to={{
                                            pathname: '/dashboard/prescriptions',
                                            search: `?userId=${item.user._id}`,
                                          }}
                                          className="bg-theme-green py-[10px] px-5 rounded-lg text-white">
                                          View
                                        </Link>
                                      ) : (
                                        'No Prescriptions'
                                      )}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex">
                                      <div className="flex justify-center">
                                        <select
                                          id="status"
                                          className="p-2 border w-full"
                                          value={statusList[index]}
                                          onChange={event => handleStatusChange(event, index)}>
                                          {item.status !== statusList[index] && <option value={item.status}>{item.status}</option>}
                                          <option value="Canceled">Canceled</option>
                                          <option value="Done">Done</option>
                                          <option value="Pending">Pending</option>
                                          <option value="Free">Free</option>
                                        </select>
                                        <button
                                          className="bg-green-500 rounded-lg ml-1"
                                          type="button"
                                          onClick={() => handleRowSubmit(statusList[index], item._id)}>
                                          <svg
                                            className="w-8 ml-[6px] mt-1"
                                            fill="white"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                          </svg>
                                        </button>
                                      </div>
                                    </td>
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
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
