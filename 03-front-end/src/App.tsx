import { Routes, Route } from 'react-router-dom';
import './styles/index.css';
import { AuthGuard } from './components';
import { NotFound, SignIn, Home, SignUp } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route element={<AuthGuard />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
