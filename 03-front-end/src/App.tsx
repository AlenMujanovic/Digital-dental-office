import { Routes, Route } from 'react-router-dom';
import './styles/index.css';
import { AuthGuard, Footer, Navbar } from './components';
import { NotFound, SignIn, Home } from './pages';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route element={<AuthGuard />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
