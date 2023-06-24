import { Button, DashboardNavbar, Input } from '../components';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEditUserProfile, useUserProfile } from '../hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useChangeUserPassword } from '../hooks/User';

const DashboardUserProfile = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleShowPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowPassword(event.target.checked);
  };

  const validationSchemaUserProfile = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    phone: Yup.string().matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/, 'Phone number is not valid'),
    address: Yup.string().required('Address is required'),
  });

  const validationSchemaChangePassword = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().required('New password is required').min(6, 'New password must be at least 6 characters long'),
    confirmNewPassword: Yup.string()
      .required('Confirm new password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const { mutate: editUserProfile } = useEditUserProfile();
  const { mutate: changeUserPassword } = useChangeUserPassword();
  const { data: user } = useUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchemaUserProfile),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user?.results.name,
        email: user?.results.email,
        phone: user?.results.phone,
        address: user?.results.address,
      });
    }
  }, [user, reset]);

  const onSubmitUserProfile: SubmitHandler<FieldValues> = ({ name, email, phone, address }) => {
    editUserProfile(
      { name, email, phone, address },
      {
        onSuccess(data) {
          queryClient.invalidateQueries(['user', 'profile']);
          toast.success(data.message);
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  };

  const {
    register: registerPassword,
    handleSubmit: handleSubmitChangePassword,
    formState: { errors: errorsChangePassword },
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchemaChangePassword),
  });

  const onSubmitChangePassword: SubmitHandler<FieldValues> = ({ oldPassword, newPassword, confirmNewPassword }) => {
    changeUserPassword(
      { oldPassword, newPassword, confirmNewPassword },
      {
        onSuccess(data) {
          toast.success(data.message);
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <>
      <DashboardNavbar />
      <div className="flex overflow-hidden bg-white">
        <div className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64 min-h-screen">
          <main>
            <div className="pt-20 lg:pt-16 px-4">
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-82 col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">User Profile</h3>
                      <span className="text-base font-normal text-gray-500">You can change your profile information</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-8">
                    <div className="overflow-x-auto rounded-lg">
                      <div className="align-middle inline-block min-w-full">
                        <div className="mx-auto w-full max-w-lg">
                          <form onSubmit={handleSubmit(onSubmitUserProfile)} className="mt-10">
                            <div className="grid gap-10 sm:grid-cols-2">
                              <div className="relative z-0">
                                <Input label="Name" type="text" id="name" register={register} errors={errors} />
                              </div>
                              <div className="relative z-0">
                                <Input label="Email" type="email" id="email" disabled register={register} errors={errors} />
                              </div>
                              <div className="relative z-0">
                                <Input label="Address" type="text" id="address" register={register} errors={errors} />
                              </div>
                              <div className="relative z-0">
                                <Input label="Phone" type="tel" id="phone" register={register} errors={errors} />
                              </div>
                            </div>
                            <div className="flex mt-10 justify-center">
                              <Button type="submit">Save</Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-82 col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Security</h3>
                      <span className="text-base font-normal text-gray-500">You can change your password here</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-8">
                    <div className="overflow-x-auto rounded-lg">
                      <div className="align-middle inline-block min-w-full">
                        <div className="mx-auto w-full max-w-lg">
                          <form onSubmit={handleSubmitChangePassword(onSubmitChangePassword)} className="mt-10">
                            <div className="grid gap-10 sm:grid-cols-2">
                              <div className="relative z-0">
                                <Input
                                  label="Old password"
                                  type={showPassword ? 'text' : 'password'}
                                  id="oldPassword"
                                  register={registerPassword}
                                  errors={errorsChangePassword}
                                />
                              </div>
                              <div className="relative z-0">
                                <Input
                                  label="New password"
                                  type={showPassword ? 'text' : 'password'}
                                  id="newPassword"
                                  register={registerPassword}
                                  errors={errorsChangePassword}
                                />
                              </div>
                              <div className="relative z-0 col-span-2">
                                <Input
                                  label="Confirm new password"
                                  type={showPassword ? 'text' : 'password'}
                                  id="confirmNewPassword"
                                  register={registerPassword}
                                  errors={errorsChangePassword}
                                />
                              </div>
                            </div>
                            <div className="flex items-center mt-8">
                              <input
                                type="checkbox"
                                id="show-password"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                onChange={handleShowPasswordChange}
                              />
                              <label htmlFor="show-password" className="ml-2 block text-sm text-gray-900">
                                Show password
                              </label>
                            </div>
                            <div className="flex mt-10 justify-center">
                              <Button type="submit">Save</Button>
                            </div>
                          </form>
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

export default DashboardUserProfile;
