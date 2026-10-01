import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { PortalLayout } from './layouts/PortalLayout';
import { useAuthBootstrap } from './lib/use-current-user';

const DashboardPage = lazy(() => import('./features/admin/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const ForumAdminPage = lazy(() => import('./features/admin/ForumAdminPage').then((m) => ({ default: m.ForumAdminPage })));
const PermissionsPage = lazy(() => import('./features/admin/PermissionsPage').then((m) => ({ default: m.PermissionsPage })));
const ReportsPage = lazy(() => import('./features/admin/ReportsPage').then((m) => ({ default: m.ReportsPage })));
const RolesPage = lazy(() => import('./features/admin/RolesPage').then((m) => ({ default: m.RolesPage })));
const UsersPage = lazy(() => import('./features/admin/UsersPage').then((m) => ({ default: m.UsersPage })));
const ForgotPasswordPage = lazy(() => import('./features/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const LoginPage = lazy(() => import('./features/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./features/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ResetPasswordPage = lazy(() => import('./features/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));
const VerifyOtpPage = lazy(() => import('./features/auth/VerifyOtpPage').then((m) => ({ default: m.VerifyOtpPage })));
const ForumCreatePage = lazy(() => import('./features/forum/ForumCreatePage').then((m) => ({ default: m.ForumCreatePage })));
const ForumDetailPage = lazy(() => import('./features/forum/ForumDetailPage').then((m) => ({ default: m.ForumDetailPage })));
const ForumFeedPage = lazy(() => import('./features/forum/ForumFeedPage').then((m) => ({ default: m.ForumFeedPage })));
const ChatbotWidget = lazy(() => import('./features/chatbot/ChatbotWidget').then((m) => ({ default: m.ChatbotWidget })));

const StudentHomePage = lazy(() => import('./features/student/StudentHomePage').then((module) => ({ default: module.StudentHomePage })));

function App() {
  const ready = useAuthBootstrap();
  if (!ready) return <main className="ambient-canvas min-h-screen px-4 py-12"><div className="mx-auto max-w-2xl"><LoadingSkeleton count={2} /></div></main>;

  return (
    <>
      <Suspense fallback={<main className="ambient-canvas min-h-screen px-4 py-12"><div className="mx-auto max-w-2xl"><LoadingSkeleton count={2} /></div></main>}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<PortalLayout />}>
            <Route path="/" element={<StudentHomePage />} />
            <Route path="/schedule" element={<StudentHomePage view="schedule" />} />
            <Route path="/services" element={<StudentHomePage view="services" />} />
            <Route path="/requests" element={<StudentHomePage view="requests" />} />
            <Route path="/faq" element={<StudentHomePage view="faq" />} />
            <Route path="/support" element={<StudentHomePage view="support" />} />
            <Route path="/tuition" element={<StudentHomePage view="tuition" />} />
            <Route path="/dorm" element={<StudentHomePage view="dorm" />} />
            <Route path="/announcements" element={<StudentHomePage view="announcements" />} />
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
      </Suspense>
      <Suspense fallback={null}><ChatbotWidget /></Suspense>
    </>
  );
}

export default App;
