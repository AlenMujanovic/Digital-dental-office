import { toast } from 'react-toastify';
import { Button, RadioButton, Input, LoadingSpinner, Navbar } from '../components';
import { useSignUp } from '../hooks/user';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  address: string;
}

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    phone: Yup.string().matches(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/, 'Phone number is not valid'),
    gender: Yup.string().required().oneOf(['Male', 'Female'], 'Gender must be Male or Female'),
    address: Yup.string().required('Address is required'),
  });
  const { mutate: signUpUser, isLoading } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      gender: '',
      address: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ name, email, password, phone, gender, address }) => {
    signUpUser(
      { name, email, password, phone, gender, address },
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <main className="py-20 lg:py-[120px] bg-pixeledTeeth bg-center">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-[#F4F7FF] py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <h1 className="text-2xl font-bold">Digital Dental Office</h1>
                  <h2 className="text-lg font-bold">Sign Up</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6 text-left">
                    <Input label="Name" type="text" register={register} errors={errors} id="name" />
                  </div>
                  <div className="mb-6 text-left">
                    <Input label="Email" type="email" register={register} errors={errors} id="email" />
                  </div>
                  <div className="mb-6 text-left">
                    <Input label="Password" type="password" register={register} errors={errors} id="password" />
                  </div>
                  <div className="mb-6 text-left">
                    <Input label="Phone" type="phone" register={register} errors={errors} id="phone" />
                  </div>
                  <div className="mb-6 text-left">
                    <Input label="Address" type="text" register={register} errors={errors} id="address" />
                  </div>
                  <div role="radiogroup" className="mx-auto flex py-7">
                    <label className="text-md text-gray-700">Gender:</label>
                    <RadioButton id="male" name="gender" value="Male" label="Male" register={register} errors={errors} showError />
                    <RadioButton id="female" name="gender" value="Female" label="Female" register={register} errors={errors} />
                  </div>
                  <div className="mb-10">
                    <Button type="submit" className="w-full mt-7 bg-slate-700">
                      Sign In
                    </Button>
                  </div>
                </form>
                <p className="mb-6 text-base text-[#adadad]">Connect With</p>
                <ul className="-mx-2 mb-12 flex justify-between">
                  <li className="w-full px-2">
                    <a href="#" className="flex h-11 items-center justify-center rounded-md bg-[#4064AC] hover:bg-opacity-90">
                      <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.29878 8H7.74898H7.19548V7.35484V5.35484V4.70968H7.74898H8.91133C9.21575 4.70968 9.46483 4.45161 9.46483 4.06452V0.645161C9.46483 0.290323 9.24343 0 8.91133 0H6.89106C4.70474 0 3.18262 1.80645 3.18262 4.48387V7.29032V7.93548H2.62912H0.747223C0.359774 7.93548 0 8.29032 0 8.80645V11.129C0 11.5806 0.304424 12 0.747223 12H2.57377H3.12727V12.6452V19.129C3.12727 19.5806 3.43169 20 3.87449 20H6.47593C6.64198 20 6.78036 19.9032 6.89106 19.7742C7.00176 19.6452 7.08478 19.4194 7.08478 19.2258V12.6774V12.0323H7.66596H8.91133C9.2711 12.0323 9.54785 11.7742 9.6032 11.3871V11.3548V11.3226L9.99065 9.09677C10.0183 8.87097 9.99065 8.6129 9.8246 8.35484C9.76925 8.19355 9.52018 8.03226 9.29878 8Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="w-full px-2">
                    <a href="#" className="flex h-11 items-center justify-center rounded-md bg-[#1C9CEA] hover:bg-opacity-90">
                      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19.5516 2.75538L20.9 1.25245C21.2903 0.845401 21.3968 0.53229 21.4323 0.375734C20.3677 0.939335 19.3742 1.1272 18.7355 1.1272H18.4871L18.3452 1.00196C17.4935 0.344423 16.429 0 15.2935 0C12.8097 0 10.8581 1.81605 10.8581 3.91389C10.8581 4.03914 10.8581 4.22701 10.8935 4.35225L11 4.97847L10.2548 4.94716C5.7129 4.82192 1.9871 1.37769 1.38387 0.782779C0.390323 2.34834 0.958064 3.85127 1.56129 4.79061L2.76774 6.54403L0.851613 5.6047C0.887097 6.91977 1.45484 7.95303 2.55484 8.7045L3.5129 9.33072L2.55484 9.67515C3.15806 11.272 4.50645 11.9296 5.5 12.18L6.8129 12.4932L5.57097 13.2446C3.58387 14.4971 1.1 14.4031 0 14.3092C2.23548 15.6869 4.89677 16 6.74194 16C8.12581 16 9.15484 15.8748 9.40322 15.7808C19.3387 13.7143 19.8 5.8865 19.8 4.32094V4.10176L20.0129 3.97652C21.2194 2.97456 21.7161 2.44227 22 2.12916C21.8935 2.16047 21.7516 2.22309 21.6097 2.2544L19.5516 2.75538Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="w-full px-2">
                    <a href="#" className="flex h-11 items-center justify-center rounded-md bg-[#D64937] hover:bg-opacity-90">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M17.8477 8.17132H9.29628V10.643H15.4342C15.1065 14.0743 12.2461 15.5574 9.47506 15.5574C5.95916 15.5574 2.8306 12.8821 2.8306 9.01461C2.8306 5.29251 5.81018 2.47185 9.47506 2.47185C12.2759 2.47185 13.9742 4.24567 13.9742 4.24567L15.7024 2.47185C15.7024 2.47185 13.3783 0.000145544 9.35587 0.000145544C4.05223 -0.0289334 0 4.30383 0 8.98553C0 13.5218 3.81386 18 9.44526 18C14.4212 18 17.9967 14.7141 17.9967 9.79974C18.0264 8.78198 17.8477 8.17132 17.8477 8.17132Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>

                <p className="text-base text-[#adadad]">
                  Already have account?
                  <Link to="/signIn" className="text-primary hover:underline">
                    Sign In
                  </Link>
                </p>

                <div>
                  <span className="absolute top-1 right-1">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="1.39737" cy="38.6026" r="1.39737" transform="rotate(-90 1.39737 38.6026)" fill="#1cc7c1" />
                      <circle cx="1.39737" cy="1.99122" r="1.39737" transform="rotate(-90 1.39737 1.99122)" fill="#1cc7c1" />
                      <circle cx="13.6943" cy="38.6026" r="1.39737" transform="rotate(-90 13.6943 38.6026)" fill="#1cc7c1" />
                      <circle cx="13.6943" cy="1.99122" r="1.39737" transform="rotate(-90 13.6943 1.99122)" fill="#1cc7c1" />
                      <circle cx="25.9911" cy="38.6026" r="1.39737" transform="rotate(-90 25.9911 38.6026)" fill="#1cc7c1" />
                      <circle cx="25.9911" cy="1.99122" r="1.39737" transform="rotate(-90 25.9911 1.99122)" fill="#1cc7c1" />
                      <circle cx="38.288" cy="38.6026" r="1.39737" transform="rotate(-90 38.288 38.6026)" fill="#1cc7c1" />
                      <circle cx="38.288" cy="1.99122" r="1.39737" transform="rotate(-90 38.288 1.99122)" fill="#1cc7c1" />
                      <circle cx="1.39737" cy="26.3057" r="1.39737" transform="rotate(-90 1.39737 26.3057)" fill="#1cc7c1" />
                      <circle cx="13.6943" cy="26.3057" r="1.39737" transform="rotate(-90 13.6943 26.3057)" fill="#1cc7c1" />
                      <circle cx="25.9911" cy="26.3057" r="1.39737" transform="rotate(-90 25.9911 26.3057)" fill="#1cc7c1" />
                      <circle cx="38.288" cy="26.3057" r="1.39737" transform="rotate(-90 38.288 26.3057)" fill="#1cc7c1" />
                      <circle cx="1.39737" cy="14.0086" r="1.39737" transform="rotate(-90 1.39737 14.0086)" fill="#1cc7c1" />
                      <circle cx="13.6943" cy="14.0086" r="1.39737" transform="rotate(-90 13.6943 14.0086)" fill="#1cc7c1" />
                      <circle cx="25.9911" cy="14.0086" r="1.39737" transform="rotate(-90 25.9911 14.0086)" fill="#1cc7c1" />
                      <circle cx="38.288" cy="14.0086" r="1.39737" transform="rotate(-90 38.288 14.0086)" fill="#1cc7c1" />
                    </svg>
                  </span>
                  <span className="absolute left-1 bottom-1">
                    <svg width="29" height="40" viewBox="0 0 29 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="2.288" cy="25.9912" r="1.39737" transform="rotate(-90 2.288 25.9912)" fill="#1cc7c1" />
                      <circle cx="14.5849" cy="25.9911" r="1.39737" transform="rotate(-90 14.5849 25.9911)" fill="#1cc7c1" />
                      <circle cx="26.7216" cy="25.9911" r="1.39737" transform="rotate(-90 26.7216 25.9911)" fill="#1cc7c1" />
                      <circle cx="2.288" cy="13.6944" r="1.39737" transform="rotate(-90 2.288 13.6944)" fill="#1cc7c1" />
                      <circle cx="14.5849" cy="13.6943" r="1.39737" transform="rotate(-90 14.5849 13.6943)" fill="#1cc7c1" />
                      <circle cx="26.7216" cy="13.6943" r="1.39737" transform="rotate(-90 26.7216 13.6943)" fill="#1cc7c1" />
                      <circle cx="2.288" cy="38.0087" r="1.39737" transform="rotate(-90 2.288 38.0087)" fill="#1cc7c1" />
                      <circle cx="2.288" cy="1.39739" r="1.39737" transform="rotate(-90 2.288 1.39739)" fill="#1cc7c1" />
                      <circle cx="14.5849" cy="38.0089" r="1.39737" transform="rotate(-90 14.5849 38.0089)" fill="#1cc7c1" />
                      <circle cx="26.7216" cy="38.0089" r="1.39737" transform="rotate(-90 26.7216 38.0089)" fill="#1cc7c1" />
                      <circle cx="14.5849" cy="1.39761" r="1.39737" transform="rotate(-90 14.5849 1.39761)" fill="#1cc7c1" />
                      <circle cx="26.7216" cy="1.39761" r="1.39737" transform="rotate(-90 26.7216 1.39761)" fill="#1cc7c1" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;