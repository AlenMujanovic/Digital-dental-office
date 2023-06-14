import { DayPicker } from 'react-day-picker';
import { DashboardNavbar } from '../components';
import { useState } from 'react';

import { useAppointmentsForUser } from '../hooks';
import { formatTimeRange } from '../utils';

const DashboardAppoiontments = () => {
  const [selected, setSelected] = useState<Date>();

  let formattedDate = '';
  let footer = <p>Please pick a day.</p>;
  let tableDateShow = '';

  if (selected) {
    const date = new Date(selected);
    date.setUTCHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1);

    formattedDate = date.toISOString().split('T')[0];

    const formattedDateFooter = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    tableDateShow = formattedDateFooter;
    footer = <p>You picked {formattedDateFooter}.</p>;
  }

  const { data: appointments } = useAppointmentsForUser(formattedDate);

  console.log(appointments);

  return (
    <>
      <DashboardNavbar />
      <div className="flex overflow-hidden bg-white">
        <div className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64 min-h-screen">
          <main>
            <div className="pt-20 lg:pt-16 px-4">
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-2 2xl:col-span-1">
                  <div className="mt-12">
                    <DayPicker mode="single" selected={selected} onSelect={setSelected} footer={footer} showOutsideDays fixedWeeks />
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-82 col-span-2 xl:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Appointments</h3>
                      <span className="text-base font-normal text-gray-500">This is a list of appointments for selected date</span>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">{tableDateShow}</span>
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
                              {appointments && appointments.results.length > 1 ? (
                                appointments?.results.map(item => (
                                  <tr key={item._id}>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                      <span className="font-semibold">{item.user.name}</span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      {formatTimeRange(item.startTimeAndDate, item.endTimeAndDate)}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.type}</td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.status}</td>
                                  </tr>
                                ))
                              ) : (
                                <p className="p-5">No appointments for selected date!</p>
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
          </main>
          <div />
        </div>
      </div>
    </>
  );
};

export default DashboardAppoiontments;
