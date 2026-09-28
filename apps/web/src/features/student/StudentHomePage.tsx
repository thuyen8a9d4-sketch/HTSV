import { useEffect } from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { ArrowRight, ChatBubble, GraduationCap, Plus, Shield } from '../../components/Icons';
import { useAuthStore } from '../../lib/auth-store';
import { FeaturedPosts } from './FeaturedPosts';
import { RequestTracker } from './RequestTracker';
import { studentFaqs, studentServices } from './student-mock-data';
import { StudentIcon } from './StudentIcon';
import { StudentSearch } from './StudentSearch';
import type { StudentPortalContext, StudentService } from './student-types';

export type StudentView = 'home' | 'schedule' | 'services' | 'requests' | 'faq' | 'support' | 'tuition' | 'dorm' | 'announcements';

const titles: Record<StudentView, string> = {
  home: 'Trang chủ',
  schedule: 'Lịch học & Lịch thi',
  services: 'Tiện ích sinh viên',
  requests: 'Theo dõi yêu cầu & phản ánh',
  faq: 'Hỏi đáp & Quy chế cộng đồng',
  support: 'Cổng hỗ trợ & Báo cáo vi phạm',
  tuition: 'Học phí & BHYT',
  dorm: 'Ký túc xá sinh viên',
  announcements: 'Thông báo',
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
  const user = useAuthStore((s) => s.user);
  const location = useLocation();
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

  return (
    <div className="student-workspace">
      {!home && (
        <div className="mb-2">
          <Link to="/" className="text-xs font-medium text-slate-500 hover:text-blue-700">Trang chủ /</Link>
          <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">{titles[view]}</h1>
        </div>
      )}

      {/* Hero Section */}
      {home && (
        <section className="student-hero" aria-labelledby="welcome-heading">
          <div className="student-hero-content relative z-10">
            <p className="student-eyebrow">Cổng hỗ trợ & Diễn đàn sinh viên · HTSV</p>
            <h1 id="welcome-heading">
              Xin chào{user ? `, ${user.fullName.split(' ').filter(Boolean).at(-1)}` : ' bạn'}!<br />
              <span>Cùng kết nối và sẻ chia hôm nay.</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
              Không gian lắng nghe những câu chuyện giảng đường, hỗ trợ giải đáp thắc mắc và tiếp nhận báo cáo phản ánh vì một môi trường văn minh.
            </p>

            {/* Quick Action Pills */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Link to="/forum" className="btn-liquid-glass btn-primary text-xs font-semibold">
                <ChatBubble className="h-4 w-4" />
                Vào Diễn đàn Confession
              </Link>
              <Link to={user ? '/forum/new' : '/login'} className="btn-liquid-glass text-xs font-semibold">
                <Plus className="h-4 w-4" />
                Đăng tâm sự ẩn danh
              </Link>
              <button
                type="button"
                className="btn-liquid-glass text-xs font-semibold"
                onClick={() => openRequest('Báo cáo vi phạm nội dung')}
              >
                <Shield className="h-4 w-4 text-rose-600" />
                Báo cáo vi phạm
              </button>
            </div>

            {/* Quick Search */}
            <div className="mt-6 max-w-xl">
              <StudentSearch onService={openService} />
            </div>
          </div>

          <div className="student-hero-art" aria-hidden="true">
            <div className="hero-orbit" />
            <div className="hero-notebook">
              <div className="notebook-lines" />
              <GraduationCap className="h-16 w-16" />
              <span>Lắng nghe.<br />Chia sẻ.<br />Đồng hành.</span>
            </div>
            <div className="hero-mini-card">
              <StudentIcon name="headset" className="h-7 w-7 text-blue-600" />
              <span>Hỗ trợ sinh viên<br /><strong>luôn sẵn sàng.</strong></span>
            </div>
          </div>
        </section>
      )}

      {/* Featured Confession Posts (Promoted to Top for Real Backend Content!) */}
      {home && <FeaturedPosts />}

      {/* Real Core Support & Community Services */}
      {(home || view === 'services') && (
        <ServiceGrid
          title="Tiện ích hỗ trợ sinh viên"
          subtitle="Chức năng chính trên cổng HTSV"
          services={studentServices}
          onService={openService}
        />
      )}

      {/* Support & Reporting View */}
      {view === 'support' && (
        <section className="liquid-glass-card max-w-2xl p-6 sm:p-8">
          <StudentIcon name="headset" className="mb-4 h-10 w-10 text-blue-700" />
          <h2 className="text-xl font-bold text-slate-800">Cổng tiếp nhận hỗ trợ & Báo cáo vi phạm</h2>
          <p className="my-4 text-sm leading-relaxed text-slate-600">
            Bạn có thể báo cáo bài viết vi phạm tiêu chuẩn cộng đồng, yêu cầu gỡ nội dung nhạy cảm hoặc gửi thắc mắc cần trợ giúp.
            Hồ sơ được ghi nhận và theo dõi trực tiếp trên hệ thống.
          </p>
          <div className="flex flex-wrap gap-3">
            <GlassButton variant="primary" onClick={() => openRequest('Báo cáo vi phạm nội dung')}>
              <Shield className="h-4 w-4" />
              Báo cáo bài viết vi phạm
            </GlassButton>
            <GlassButton onClick={() => openRequest('Hỗ trợ học vụ')}>
              <Plus className="h-4 w-4" />
              Gửi thắc mắc hỗ trợ
            </GlassButton>
          </div>
        </section>
      )}

      {/* Request Tracker */}
      {(home || view === 'requests') && <RequestTracker onCreate={() => openRequest()} />}

      {/* Community FAQ / Rules */}
      {(home || view === 'faq') && (
        <section aria-labelledby="faq-heading">
          <div className="student-section-heading">
            <div>
              <p className="student-eyebrow">Quy chế & Hướng dẫn</p>
              <h2 id="faq-heading">Hỏi đáp cộng đồng sinh viên</h2>
            </div>
            {home && (
              <Link to="/faq" className="student-text-link">
                Xem toàn bộ hỏi đáp <ArrowRight />
              </Link>
            )}
          </div>
          <div className="student-faq-list rounded-2xl overflow-hidden border border-slate-200">
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
      {(view === 'schedule' || view === 'tuition' || view === 'dorm' || view === 'announcements') && (
        <section className="rounded-2xl border border-slate-200 bg-white p-8">
          <StudentIcon name="bulb" className="mb-4 h-9 w-9 text-amber-600" />
          <h2 className="text-xl font-bold text-slate-800">{titles[view]}</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            Tính năng này thuộc hệ thống quản trị đào tạo ERP của trường và chưa được kết nối API chính thức vào cổng HTSV.
            Hiện tại, cổng HTSV tập trung phục vụ <strong>Diễn đàn Confession sinh viên</strong> và <strong>Cổng tiếp nhận hỗ trợ / báo cáo vi phạm</strong>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/forum" className="btn-liquid-glass btn-primary text-xs">
              <ChatBubble className="h-4 w-4" />
              Khám phá Diễn đàn Confession
            </Link>
            <Link to="/" className="btn-liquid-glass text-xs">
              Về Trang chủ
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
