import { Routes, Route } from 'react-router-dom';
import { AuthGuard, RoleGuard } from './components';
import {
  NotFound,
  SignIn,
  Home,
  SignUp,
  Appointment,
  DashboardPatients,
  DashboardPrescriptions,
  DashboardAdmin,
  DashboardAppointmentsAdmin,
  DashboardAppointments,
  DashboardUserProfile,
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
          path="/dashboard/appointments"
          element={
            <RoleGuard allowedRoles={['Patient']}>
              <DashboardAppointments />
            </RoleGuard>
          }
        />
        <Route
          path="/dashboard/appointments/admin"
          element={
            <RoleGuard allowedRoles={['Doctor']}>
              <DashboardAppointmentsAdmin />
            </RoleGuard>
          }
        />
        <Route
          path="/dashboard/patients"
          element={
            <RoleGuard allowedRoles={['Doctor']}>
              <DashboardPatients />
            </RoleGuard>
          }
        />
        <Route path="/dashboard/prescriptions" element={<DashboardPrescriptions />} />
        <Route path="/dashboard/user/profile" element={<DashboardUserProfile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
