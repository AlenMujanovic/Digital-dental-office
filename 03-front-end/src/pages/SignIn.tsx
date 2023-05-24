import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { SessionService } from '../services';
import { authStore } from '../stores/authStore';
import { useSignIn } from '../hooks/user';

export interface ISignIn {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const setSession = useSetRecoilState(authStore);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutate: loginUser } = useSignIn();

  useEffect(() => {
    if (SessionService.isSessionValid()) {
      navigate('/home');
    }
  }, [navigate, setSession]);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(() => true);

    loginUser(
      { email, password },
      {
        onSuccess(data) {
          SessionService.saveSession(data.results, data.token);
          setSession(() => data.results);
          navigate('/home');
        },
        onError(err) {
          alert(err);
        },
      }
    );

    setIsLoading(() => false);
  };

  return (
    <div className="min-h-full lg:h-screen lg:-mt-24 flex items-center justify-center py-12 px-4">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">DigitalDentalOffice</h2>
        </div>
        <form className="mt-8 space-y-2" onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Your email address"
            autoComplete="email"
            required={true}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            autoComplete="current-password"
            required={true}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit" className="btn mx-auto w-full">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
