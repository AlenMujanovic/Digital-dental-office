import { Routes, Route } from 'react-router-dom';
import { AuthGuard } from './components';
import {
  NotFound,
  SignIn,
  Home,
  SignUp,
  Appointment,
  Dashboard,
  DashboardAppointments,
  DashboardPatients,
  DashboardPrescriptions,
} from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route element={<AuthGuard />}>
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/appointments" element={<DashboardAppointments />} />
        <Route path="/dashboard/patients" element={<DashboardPatients />} />
        <Route path="/dashboard/prescriptions" element={<DashboardPrescriptions />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
