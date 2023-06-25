import { useEffect, useState } from 'react';
import { Button, Footer, LoadingSpinner, Navbar } from '../components';
import { DayPicker } from 'react-day-picker';
import { toast } from 'react-toastify';

import dentistChair from '../assets/dentistChair.jpg';
import { useAppointmentsByDate, useUpdateAppointment } from '../hooks';
import { formatTimeRange } from '../utils';
import { useQueryClient } from '@tanstack/react-query';

const Appointment = () => {
  const [selected, setSelected] = useState<Date>();

  const queryClient = useQueryClient();

  let formattedDate = '';

  let footer = <p>Please pick a day.</p>;

  if (selected) {
    const date = new Date(selected);
    date.setUTCHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1);

    formattedDate = date.toISOString().split('T')[0];

    const formattedDateFooter = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    footer = <p>You picked {formattedDateFooter}.</p>;
  }

  const isPastDay = (day: Date) => {
    const today = new Date();
    return day < today;
  };

  const { data: appointments, isFetching, error } = useAppointmentsByDate(formattedDate);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const { mutate: updateApp } = useUpdateAppointment();

  const updateAppointment = (appointmentId: string, type: string) => {
    updateApp(
      {
        _id: appointmentId,
        status: 'Pending',
        type: type,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['appointments'] });
          queryClient.invalidateQueries({ queryKey: ['upcomingAppointments'] });
          toast.success('Successfully booked appointment');
        },
        onError: error => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-white pt-[120px] pb-[110px] lg:pt-[150px] bg-dentistChair bg-no-repeat bg-cover shadow-inset-white">
          <div className="container mx-auto">
            <div className=" flex flex-wrap">
              <div className="w-full px-4 lg:w-5/12">
                <div className="hero-content">
                  <h1 className="mb-10 text-4xl font-bold leading-snug text-dark sm:text-[42px] lg:text-[40px] xl:text-[42px]">
                    Appointment
                  </h1>
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={footer}
                    disabled={day => isPastDay(day)}
                    showOutsideDays
                    fixedWeeks
                  />
                </div>
              </div>
              <div className="hidden px-4 lg:block lg:w-1/12"></div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="lg:ml-auto lg:text-right">
                  <div className="relative z-10 inline-block pt-11 lg:pt-0">
                    <img src={dentistChair} alt="hero" className="max-w-full lg:ml-auto" />
                    <span className="absolute -left-8 -bottom-8 z-[-1]">
                      <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="2.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="2.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="2.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="2.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="24.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="24.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="24.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="24.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="24.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="46.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="46.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="46.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="46.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="46.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="68.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="68.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="68.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="68.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="68.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="90.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="90.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="90.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="90.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                        <circle cx="90.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 text-center ">
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px] px-4">Available Appointments on day...</h2>
            </div>
          </div>
        </div>
        <section className="p-4 text-gray-600 body-font flex justify-center items-center">
          <div className="container px-5 pb-24 mx-auto pt-1">
            {isFetching ? (
              <LoadingSpinner noOverlay />
            ) : (
              <div className="flex flex-wrap -m-4 text-center justify-between mb-10">
                {appointments && appointments.results.length !== 0 ? (
                  appointments.results
                    .filter(item => item.status === 'Free')
                    .map(item => (
                      <div key={item._id} className="sm:w-full lg:w-[32%] w-full py-5 hover:scale-105 duration-500">
                        <div className="flex items-center p-4 rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white">
                          <div className="mx-auto py-5">
                            <h2 className="text-[#1cc7c1] text-xl font-semibold">{item.type}</h2>
                            <p className="text-md m-1 text-black font-semibold">
                              {formatTimeRange(item.startTimeAndDate, item.endTimeAndDate)}
                            </p>
                            <Button
                              type="button"
                              className="mt-2 text-sm sm:text-base"
                              onClick={() => updateAppointment(item._id, item.type)}>
                              BOOK APPOINTMENT
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="mx-auto text-xl font-semibold">No Appointments on this day. Try another one!</p>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Appointment;
