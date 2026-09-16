import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { PortalLayout } from './layouts/PortalLayout';
import { DashboardPage } from './features/admin/DashboardPage';
import { ForumAdminPage } from './features/admin/ForumAdminPage';
import { PermissionsPage } from './features/admin/PermissionsPage';
import { ReportsPage } from './features/admin/ReportsPage';
import { RolesPage } from './features/admin/RolesPage';
import { UsersPage } from './features/admin/UsersPage';
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { ResetPasswordPage } from './features/auth/ResetPasswordPage';
import { VerifyOtpPage } from './features/auth/VerifyOtpPage';
import { ForumCreatePage } from './features/forum/ForumCreatePage';
import { ForumDetailPage } from './features/forum/ForumDetailPage';
import { ForumFeedPage } from './features/forum/ForumFeedPage';
import { useAuthBootstrap } from './lib/use-current-user';

function App() {
  const ready = useAuthBootstrap();
  if (!ready) return null;

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<PortalLayout />}>
        <Route path="/" element={<Navigate to="/forum" replace />} />
        <Route path="/forum" element={<ForumFeedPage />} />
        <Route path="/forum/:id" element={<ForumDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/forum/new" element={<ForumCreatePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/forum" element={<ForumAdminPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/roles" element={<RolesPage />} />
          <Route path="/admin/permissions" element={<PermissionsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
