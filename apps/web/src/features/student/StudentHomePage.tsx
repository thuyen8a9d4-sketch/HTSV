import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { GlassModal } from '../../components/GlassModal';
import { ChatBubble, GridSquares, Plus } from '../../components/Icons';
import { AcademicRecordPanel } from './AcademicRecordPanel';
import { AdvisorPortalPanel } from './AdvisorPortalPanel';
import { CampusMapPanel } from './CampusMapPanel';
import { CareerGuidancePanel } from './CareerGuidancePanel';
import { ClassSectionsPanel } from './ClassSectionsPanel';
import { ConductScorePanel } from './ConductScorePanel';
import { CvBuilderPanel } from './CvBuilderPanel';
const DepthGallery = lazy(() => import('./depth-gallery').then((m) => ({ default: m.DepthGallery })));
import { DevelopmentPathPanel } from './DevelopmentPathPanel';
import { GradeAppealPanel } from './GradeAppealPanel';
import { InterviewPracticePanel } from './InterviewPracticePanel';
import { JobsPanel } from './JobsPanel';
import { LecturerPortalPanel } from './LecturerPortalPanel';
import { LibraryPanel } from './LibraryPanel';
import { OfficePortalPanel } from './OfficePortalPanel';
import { PersonalPathPanel } from './PersonalPathPanel';
import { RequestTracker } from './RequestTracker';
import { ScholarshipPanel } from './ScholarshipPanel';
import { studentFaqs, studentServices } from './student-mock-data';
import { StudentIcon } from './StudentIcon';
import { StudentSearch } from './StudentSearch';
import { StudentSupportPanel } from './StudentSupportPanel';
import { StudentLifePanel } from './StudentLifePanel';
import type { StudentPortalContext, StudentService } from './student-types';
import { TuitionPanel } from './TuitionPanel';
import { WeeklySchedule } from './WeeklySchedule';
import { HomeContentSection } from './HomeContentSection';

export type StudentView = 'home' | 'schedule' | 'services' | 'requests' | 'faq' | 'support' | 'tuition' | 'dorm' | 'announcements' | 'conduct-score' | 'grade-appeal' | 'class-sections' | 'transcript' | 'scholarship' | 'jobs' | 'cv-builder' | 'career-guidance' | 'development-path' | 'personal-path' | 'interview-practice' | 'staff-lecturer' | 'staff-advisor' | 'staff-office' | 'campus-map' | 'library';

const titles: Record<StudentView, string> = {
  home: 'Trang chủ',
  schedule: 'Lịch học & Lịch thi',
  services: 'Tiện ích sinh viên',
  requests: 'Theo dõi yêu cầu & phản ánh',
  faq: 'Hỏi đáp & Quy chế cộng đồng',
  support: 'Cổng hỗ trợ & Báo cáo vi phạm',
  tuition: 'Học phí & BHYT',
  dorm: 'Đời sống sinh viên',
  announcements: 'Thông báo',
  'conduct-score': 'Điểm rèn luyện',
  'grade-appeal': 'Phúc khảo điểm',
  'class-sections': 'Lớp học phần của tôi',
  transcript: 'Bảng điểm',
  scholarship: 'Học bổng',
  jobs: 'Việc làm & thực tập',
  'cv-builder': 'Trình tạo hồ sơ xin việc',
  'career-guidance': 'Hướng nghiệp',
  'development-path': 'Lộ trình phát triển',
  'personal-path': 'Bản đồ kỹ năng & Lộ trình cá nhân',
  'interview-practice': 'Luyện phỏng vấn',
  'staff-lecturer': 'Cổng giảng viên (demo)',
  'staff-advisor': 'Cổng cố vấn học tập (demo)',
  'staff-office': 'Cổng phòng ban (demo)',
  'campus-map': 'Sơ đồ khuôn viên',
  library: 'Thư viện',
};

function ServiceGrid({ title, subtitle, services, onService }: { title: string; subtitle: string; services: StudentService[]; onService: StudentPortalContext['openService'] }) {
  return (
    <section aria-label={title}>
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">{subtitle}</p>
          <h2>{title}</h2>
        </div>
        <span className="text-xs text-slate-500">{services.length} chức năng</span>
      </div>
      <div className="student-service-grid">
        {services.map((service) => (
          <button
            type="button"
            key={service.id}
            className="student-service liquid-glass-card cursor-pointer"
            onClick={() => onService(service)}
          >
            <span className={`student-service-icon tone-${service.tone}`}>
              <StudentIcon name={service.icon} className="h-6 w-6" />
            </span>
            <span className="mt-3 block text-[13px] font-semibold text-slate-800">{service.name}</span>
            <span className="mt-1 block text-[11px] leading-relaxed text-slate-500">{service.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function StudentHomePage({ view = 'home' }: { view?: StudentView }) {
  const { openRequest, openService } = useOutletContext<StudentPortalContext>();
  const location = useLocation();
  const [servicesModalOpen, setServicesModalOpen] = useState(false);
  const home = view === 'home';

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target instanceof HTMLDetailsElement) target.open = true;
      target?.scrollIntoView({ block: 'center' });
      target?.querySelector('summary')?.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.hash]);

  // Home Page: Pure Full-Screen 3D Atmospheric Depth Gallery
  if (home) {
    return (
      <div className="relative min-h-screen w-full">
        {/* Full-Screen 3D Depth Gallery with Zero Annotations */}
        <Suspense fallback={<div className="h-[100dvh] bg-slate-950" aria-label="Đang tải trang chủ" />}><DepthGallery /></Suspense>

        {/* Extended Content: DNC Announcements, Featured Forum Posts, Quick Services, Comprehensive Footer */}
        <HomeContentSection
          onOpenServiceModal={() => setServicesModalOpen(true)}
          openRequest={openRequest}
        />

        {/* Subtle Liquid Glass Floating Action Button to Quick Services Panel */}
        <aside aria-label="Phím tắt tiện ích sinh viên" className="student-utilities-shortcut">
          <button
            type="button"
            onClick={() => setServicesModalOpen(true)}
            className="student-utilities-pill focus-ring"
            title="Mở bảng tiện ích sinh viên"
            aria-label="Tiện ích & Dịch vụ"
            aria-haspopup="dialog"
            aria-expanded={servicesModalOpen}
          >
            <GridSquares className="h-5 w-5" strokeWidth={2} />
            <span className="pill-label">Tiện ích</span>
            <span className="pill-pulse" aria-hidden="true" />
          </button>
        </aside>

        {/* Quick Services Liquid Glass Modal */}
        <GlassModal
          open={servicesModalOpen}
          onClose={() => setServicesModalOpen(false)}
          title="Tiện ích & Dịch vụ Sinh viên HTSV"
        >
          <div className="space-y-6 pb-8">
            <div>
              <StudentSearch
                onSelect={() => setServicesModalOpen(false)}
                onService={(s) => {
                  setServicesModalOpen(false);
                  openService(s);
                }}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {studentServices.map((service) => (
                <button
                  type="button"
                  key={service.id}
                  className="student-service liquid-glass-card cursor-pointer p-4 text-left transition-all hover:scale-[1.02]"
                  onClick={() => {
                    setServicesModalOpen(false);
                    openService(service);
                  }}
                >
                  <span className={`student-service-icon tone-${service.tone} inline-flex p-2 rounded-xl`}>
                    <StudentIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span className="mt-2 block text-xs font-semibold text-slate-800">{service.name}</span>
                  <span className="mt-0.5 block text-[11px] leading-relaxed text-slate-500">{service.description}</span>
                </button>
              ))}
            </div>
          </div>
        </GlassModal>
      </div>
    );
  }

  // Other Dedicated Views (/services, /requests, /faq, /support, /schedule, /dorm, /tuition)
  return (
    <div className="student-workspace space-y-7">
      <div className="mb-2">
        <Link to="/" className="text-xs font-medium text-slate-500 hover:text-blue-700">Trang chủ /</Link>
        <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">{titles[view]}</h1>
      </div>

      <div id="portal-services-overview" className="space-y-7">
        {/* Real Core Support & Community Services */}
        {view === 'services' && (
          <ServiceGrid
            title="Tiện ích hỗ trợ sinh viên"
            subtitle="Chức năng chính trên cổng HTSV"
            services={studentServices}
            onService={openService}
          />
        )}

        {/* Real Student Request Tracker */}
        {view === 'requests' && <RequestTracker onCreate={() => openRequest()} />}

        {/* Community FAQ & Rules Accordion */}
        {view === 'support' && <StudentSupportPanel openRequest={openRequest} />}
        {view === 'dorm' && <StudentLifePanel openRequest={openRequest} />}
        {view === 'conduct-score' && <ConductScorePanel />}
        {view === 'grade-appeal' && <GradeAppealPanel />}
        {view === 'class-sections' && <ClassSectionsPanel />}
        {view === 'transcript' && <AcademicRecordPanel />}
        {view === 'tuition' && <TuitionPanel />}
        {view === 'scholarship' && <ScholarshipPanel />}
        {view === 'jobs' && <JobsPanel />}
        {view === 'cv-builder' && <CvBuilderPanel />}
        {view === 'career-guidance' && <CareerGuidancePanel />}
        {view === 'development-path' && <DevelopmentPathPanel />}
        {view === 'personal-path' && <PersonalPathPanel />}
        {view === 'interview-practice' && <InterviewPracticePanel />}
        {view === 'staff-lecturer' && <LecturerPortalPanel />}
        {view === 'staff-advisor' && <AdvisorPortalPanel />}
        {view === 'staff-office' && <OfficePortalPanel />}
        {view === 'campus-map' && <CampusMapPanel />}
        {view === 'library' && <LibraryPanel />}
        {view === 'faq' && (
          <section aria-label="Hỏi đáp và quy chế cộng đồng" className="student-faq-section">
            <div className="student-section-heading">
              <div>
                <p className="student-eyebrow">Quy chế & Hỏi đáp thường gặp</p>
                <h2>Giải đáp nhanh các thắc mắc</h2>
              </div>
              <span className="text-xs text-slate-500">{studentFaqs.length} câu hỏi</span>
            </div>
            <div className="student-faq-list">
              {studentFaqs.map((faq, index) => (
                <details key={faq.id} id={`faq-${faq.id}`} className="student-faq" name="student-faq">
                  <summary>
                    <span className="text-xs font-semibold tabular-nums text-blue-700">0{index + 1}</span>
                    <span className="flex-1 text-slate-800">{faq.question}</span>
                    <Plus className="faq-plus h-4 w-4 shrink-0 text-slate-400" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Tiêu chuẩn cộng đồng được thiết lập nhằm duy trì môi trường trao đổi tôn trọng, văn minh và an toàn cho sinh viên.
            </p>
          </section>
        )}

        {/* Explanatory Fallback for external ERP Views */}
        {(view === 'schedule' || view === 'announcements') && (
          <section className="space-y-5">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-500/20 dark:bg-blue-500/10">
              <div className="flex items-start gap-3">
                <StudentIcon name="bulb" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Tính năng này thuộc hệ thống quản trị đào tạo ERP của trường và chưa được kết nối API chính thức.
                  </p>
                  <p className="mt-1 text-sm text-blue-700/80 dark:text-blue-300/80">
                    Bạn có thể truy cập trực tiếp hệ thống đào tạo của trường để xem thông tin chính thức.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://qldt.nctu.edu.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-glass btn-primary inline-flex items-center gap-2 text-sm"
              >
                <StudentIcon name="laptop" className="h-4 w-4" />
                Truy cập Cổng Đào tạo qldt.nctu.edu.vn
                <span aria-hidden="true">↗</span>
              </a>
              <Link to="/forum" className="btn-liquid-glass text-sm">
                <ChatBubble className="h-4 w-4" />
                Khám phá Diễn đàn
              </Link>
            </div>
            {view === 'schedule' && (
              <div className="mt-2">
                <WeeklySchedule />
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
