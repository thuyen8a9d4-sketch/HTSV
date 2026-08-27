import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { PortalLayout } from './layouts/PortalLayout';
import { DashboardPage } from './features/admin/DashboardPage';
import { ForumAdminPage } from './features/admin/ForumAdminPage';
import { LibraryAdminPage } from './features/admin/LibraryAdminPage';
import { PermissionsPage } from './features/admin/PermissionsPage';
import { ReportsPage } from './features/admin/ReportsPage';
import { RevenuePage } from './features/admin/RevenuePage';
import { RolesPage } from './features/admin/RolesPage';
import { SubjectsPage } from './features/admin/SubjectsPage';
import { UsersPage } from './features/admin/UsersPage';
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { ResetPasswordPage } from './features/auth/ResetPasswordPage';
import { VerifyOtpPage } from './features/auth/VerifyOtpPage';
import { ExamCreatePage } from './features/exam/ExamCreatePage';
import { ExamListPage } from './features/exam/ExamListPage';
import { ExamResultPage } from './features/exam/ExamResultPage';
import { MyAttemptsPage } from './features/exam/MyAttemptsPage';
import { QuestionBankPage } from './features/exam/QuestionBankPage';
import { TakeExamPage } from './features/exam/TakeExamPage';
import { FlashcardEditorPage } from './features/flashcards/FlashcardEditorPage';
import { FlashcardSetDetailPage } from './features/flashcards/FlashcardSetDetailPage';
import { FlashcardSetsPage } from './features/flashcards/FlashcardSetsPage';
import { FlashcardStudyPage } from './features/flashcards/FlashcardStudyPage';
import { MyFlashcardSetsPage } from './features/flashcards/MyFlashcardSetsPage';
import { ForumCreatePage } from './features/forum/ForumCreatePage';
import { ForumDetailPage } from './features/forum/ForumDetailPage';
import { ForumFeedPage } from './features/forum/ForumFeedPage';
import { LibraryCatalogPage } from './features/library/LibraryCatalogPage';
import { MaterialDetailPage } from './features/library/MaterialDetailPage';
import { MyUploadsPage } from './features/library/MyUploadsPage';
import { UploadMaterialPage } from './features/library/UploadMaterialPage';
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
        <Route path="/" element={<Navigate to="/library" replace />} />
        <Route path="/forum" element={<ForumFeedPage />} />
        <Route path="/forum/:id" element={<ForumDetailPage />} />
        <Route path="/library" element={<LibraryCatalogPage />} />
        <Route path="/library/:id" element={<MaterialDetailPage />} />
        <Route path="/flashcards" element={<FlashcardSetsPage />} />
        <Route path="/flashcards/:id" element={<FlashcardSetDetailPage />} />
        <Route path="/exam" element={<ExamListPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/forum/new" element={<ForumCreatePage />} />
          <Route path="/flashcards/new" element={<FlashcardEditorPage />} />
          <Route path="/flashcards/my" element={<MyFlashcardSetsPage />} />
          <Route path="/flashcards/:id/edit" element={<FlashcardEditorPage />} />
          <Route path="/flashcards/:id/study" element={<FlashcardStudyPage />} />
          <Route path="/exam/:id/take" element={<TakeExamPage />} />
          <Route path="/exam/attempts/:id" element={<ExamResultPage />} />
          <Route path="/exam/my-attempts" element={<MyAttemptsPage />} />
        </Route>

        <Route element={<ProtectedRoute roles={['LECTURER', 'ADMIN']} />}>
          <Route path="/library/upload" element={<UploadMaterialPage />} />
          <Route path="/library/my-uploads" element={<MyUploadsPage />} />
          <Route path="/exam/new" element={<ExamCreatePage />} />
          <Route path="/exam/questions" element={<QuestionBankPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/forum" element={<ForumAdminPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/library" element={<LibraryAdminPage />} />
          <Route path="/admin/subjects" element={<SubjectsPage />} />
          <Route path="/admin/revenue" element={<RevenuePage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/roles" element={<RolesPage />} />
          <Route path="/admin/permissions" element={<PermissionsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
