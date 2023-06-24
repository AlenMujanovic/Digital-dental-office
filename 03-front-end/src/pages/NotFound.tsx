import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 flex flex-col align-middle justify-center items-center h-screen">
      <h1 className="text-4xl font-semibold mb-4">404</h1>
      <h2 className="text">The page you were looking for doesn't exist.</h2>
      <h2 className="text">You may have mistyped the address or the page may have moved.</h2>
      <div className="mt-5">
        <Button type="button" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
