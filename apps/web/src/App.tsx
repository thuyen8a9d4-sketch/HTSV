import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { PortalLayout } from './layouts/PortalLayout';
import { useAuthBootstrap } from './lib/use-current-user';

/* ── Lazy-loaded pages ── */
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
const StudentHomePage = lazy(() => import('./features/student/StudentHomePage').then((m) => ({ default: m.StudentHomePage })));
const ProfilePage = lazy(() => import('./features/student/ProfilePage').then((m) => ({ default: m.ProfilePage })));

/* ── Fallback dùng chung ── */
const PageFallback = (
  <main className="ambient-canvas min-h-screen px-4 py-12">
    <div className="mx-auto max-w-2xl">
      <LoadingSkeleton count={2} />
    </div>
  </main>
);

/* ── Routes StudentHomePage (tự sinh từ mảng, bớt lặp) ── */
const studentViewRoutes = [
  'schedule', 'services', 'requests', 'faq', 'support', 'tuition',
  'dorm', 'conduct-score', 'grade-appeal', 'class-sections', 'transcript',
  'scholarship', 'jobs', 'cv-builder', 'career-guidance', 'development-path',
  'personal-path', 'interview-practice', 'campus-map', 'library', 'announcements',
] as const;

const studentStaffRoutes = [
  { path: 'staff/lecturer', view: 'staff-lecturer' },
  { path: 'staff/advisor', view: 'staff-advisor' },
  { path: 'staff/office', view: 'staff-office' },
] as const;

function App() {
  const ready = useAuthBootstrap();
  if (!ready) return PageFallback;

  return (
    <>
      <Suspense fallback={PageFallback}>
        <Routes>
          {/* ── Auth ── */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* ── Portal (Student + Forum) ── */}
          <Route element={<PortalLayout />}>
            <Route path="/" element={<StudentHomePage />} />
            {studentViewRoutes.map((view) => (
              <Route key={view} path={`/${view}`} element={<StudentHomePage view={view} />} />
            ))}
            {studentStaffRoutes.map(({ path, view }) => (
              <Route key={path} path={`/${path}`} element={<StudentHomePage view={view} />} />
            ))}

            <Route path="/forum" element={<ForumFeedPage />} />
            <Route path="/forum/:id" element={<ForumDetailPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/forum/new" element={<ForumCreatePage />} />
             <Route path="/profile" element={<ProfilePage />} />

            </Route>
          </Route>

          {/* ── Admin ── */}
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
