import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingSkeleton } from './components/LoadingSkeleton';
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
import { ChatbotWidget } from './features/chatbot/ChatbotWidget';
import { useAuthBootstrap } from './lib/use-current-user';

const StudentHomePage = lazy(() => import('./features/student/StudentHomePage').then((module) => ({ default: module.StudentHomePage })));

function App() {
  const ready = useAuthBootstrap();
  if (!ready) return <main className="ambient-canvas min-h-screen px-4 py-12"><div className="mx-auto max-w-2xl"><LoadingSkeleton count={2} /></div></main>;

  return (
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
        <Route path="/conduct-score" element={<StudentHomePage view="conduct-score" />} />
        <Route path="/grade-appeal" element={<StudentHomePage view="grade-appeal" />} />
        <Route path="/class-sections" element={<StudentHomePage view="class-sections" />} />
        <Route path="/transcript" element={<StudentHomePage view="transcript" />} />
        <Route path="/scholarship" element={<StudentHomePage view="scholarship" />} />
        <Route path="/jobs" element={<StudentHomePage view="jobs" />} />
        <Route path="/cv-builder" element={<StudentHomePage view="cv-builder" />} />
        <Route path="/career-guidance" element={<StudentHomePage view="career-guidance" />} />
        <Route path="/development-path" element={<StudentHomePage view="development-path" />} />
        <Route path="/personal-path" element={<StudentHomePage view="personal-path" />} />
        <Route path="/interview-practice" element={<StudentHomePage view="interview-practice" />} />
        <Route path="/staff/lecturer" element={<StudentHomePage view="staff-lecturer" />} />
        <Route path="/staff/advisor" element={<StudentHomePage view="staff-advisor" />} />
        <Route path="/staff/office" element={<StudentHomePage view="staff-office" />} />
        <Route path="/campus-map" element={<StudentHomePage view="campus-map" />} />
        <Route path="/library" element={<StudentHomePage view="library" />} />
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
    <ChatbotWidget />
    </Suspense>
  );
}

export default App;
