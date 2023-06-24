import { Routes, Route } from 'react-router-dom';
import { AuthGuard, RoleGuard } from './components';
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
  DashboardAdmin,
} from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route element={<AuthGuard />}>
        <Route path="/appointment" element={<Appointment />} />
        <Route
          path="/dashboard/admin"
          element={
            <RoleGuard allowedRoles={['Doctor']}>
              <DashboardAdmin />
            </RoleGuard>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RoleGuard allowedRoles={['Patient']}>
              <Dashboard />
            </RoleGuard>
          }
        />
        <Route path="/dashboard/appointments" element={<DashboardAppointments />} />
        <Route
          path="/dashboard/patients"
          element={
            <RoleGuard allowedRoles={['Doctor']}>
              <DashboardPatients />
            </RoleGuard>
          }
        />
        <Route path="/dashboard/prescriptions" element={<DashboardPrescriptions />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
