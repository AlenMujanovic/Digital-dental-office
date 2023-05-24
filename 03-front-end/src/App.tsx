import { Routes, Route } from 'react-router-dom';
import './styles/index.css';
import { AuthGuard } from './components';
import { NotFound, SignIn, Home } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route element={<AuthGuard />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
