import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userProfile from '../assets/userProfile.png';
import { Button, DashboardNavbar, LoadingSpinner, Modal, Textarea } from '../components';
import { useUserPatients, useUserProfile } from '../hooks';
import { useCreatePrescription, usePrescriptions } from '../hooks/Prescription';
import { IUser } from '../types';
import { formatDateTime } from '../utils';
import { useQueryClient } from '@tanstack/react-query';

const DashboardPrescriptions = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<IUser | null | string>(null);

  const location = useLocation();

  const queryClient = useQueryClient();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userIdParam = searchParams.get('userId');

    if (userIdParam) {
      setUserId(userIdParam);
    }
  }, [location.search]);

  const { data: loggedUser } = useUserProfile();
  const { data: prescriptions } = usePrescriptions(userId, loggedUser?.results.role);
  const { data: users, isFetching } = useUserPatients(loggedUser?.results.role);

  const handleViewPrescription = (userId: string) => {
    setUserId(userId);
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      description: '',
    },
  });

  const handleOpenModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const { mutate: createPrescription } = useCreatePrescription();

  const onSubmit: SubmitHandler<FieldValues> = ({ description }) => {
    createPrescription(
      { description, user: selectedUserId as IUser },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({ queryKey: ['prescriptions', selectedUserId] });
          toast.success(data.message);
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
    reset();
    setIsModalOpen(() => false);
  };

  return (
    <>
      <DashboardNavbar />
      <div className="flex overflow-hidden bg-white">
        <div className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64 min-h-screen">
          <main>
            <div className="pt-20 lg:pt-16 px-4">
              <div className="w-full">
                {loggedUser?.results.role === 'Doctor' ? (
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
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      All Prescriptions
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Action
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
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.gender}</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.phone}</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.address}</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                          <button
                                            type="button"
                                            className="px-4 py-2 bg-theme-green text-white rounded-md"
                                            onClick={() => handleViewPrescription(item._id)}>
                                            View
                                          </button>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                          <button
                                            type="button"
                                            className="px-4 py-2 bg-theme-green text-white rounded-md"
                                            onClick={() => handleOpenModal(item._id)}>
                                            Add Prescription
                                          </button>

                                          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Prescription">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                              <div className="mb-9 text-left w-3/6 mx-auto">
                                                <Textarea
                                                  rows={5}
                                                  register={register}
                                                  errors={errors}
                                                  name="description"
                                                  label="Add description"
                                                />
                                              </div>
                                              <div className="flex justify-center">
                                                <Button type="submit">Save</Button>
                                              </div>
                                            </form>
                                          </Modal>
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
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-82 col-span-3 mt-3 ">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Prescriptions</h3>
                      <span className="text-base font-normal text-gray-500">This is a list of prescriptions</span>
                    </div>
                  </div>
                  <div className="p-4 text-gray-600 body-font flex justify-center items-center">
                    <div className="container px-5 pb-24 mx-auto pt-1">
                      {prescriptions?.results && prescriptions.results.length > 0 ? (
                        <div className="flex flex-wrap -m-4 text-center justify-between">
                          {prescriptions?.results.map(item => (
                            <div className="sm:w-full lg:w-[49%] w-full hover:scale-105 duration-500 mt-3 lg:mt-0" key={item._id}>
                              <div className="rounded-xl border p-5 shadow-md  bg-white my-5">
                                <div className="flex w-full items-center justify-between border-b pb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="h-8 w-8 rounded-full">
                                      <img src={userProfile} alt="Avatar user" className="w-10 md:w-16 rounded-full mx-auto" />
                                    </div>
                                    <div className="text-lg font-bold text-slate-700">{item.user?.name}</div>
                                  </div>
                                  <div className="flex items-center space-x-8">
                                    <div className="text-xs text-neutral-500">{formatDateTime(item.createdAt || '')}</div>
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
                      ) : (
                        <p>No prescriptions</p>
                      )}
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
