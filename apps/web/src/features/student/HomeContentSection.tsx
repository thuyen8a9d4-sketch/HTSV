import { Link } from 'react-router-dom';
import { ArrowRight, Bell, FileText, GraduationCap, Headset, Home, Lock, Shield, Sparkles } from '../../components/Icons';
import { FeaturedPosts } from './FeaturedPosts';
import type { StudentPortalContext } from './student-types';

interface HomeContentSectionProps {
  onOpenServiceModal: () => void;
  openRequest: StudentPortalContext['openRequest'];
}

export function HomeContentSection({ onOpenServiceModal, openRequest }: HomeContentSectionProps) {
  const announcements = [
    {
      id: 1,
      tag: 'Học bổng',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-400/30',
      title: 'Thông báo xét cấp Học bổng Khuyến khích học tập & Tài năng DNC năm học 2025 - 2026',
      date: '30/09/2026',
      unit: 'Phòng Đào tạo & Quản lý Khoa học',
      summary: 'Nhà trường thông báo kế hoạch tiếp nhận hồ sơ xét cấp học bổng khuyến khích và học bổng doanh nghiệp cho sinh viên đạt điểm rèn luyện và thành tích học tập loại Giỏi, Xuất sắc.',
      link: 'https://qldt.nctu.edu.vn',
    },
    {
      id: 2,
      tag: 'Đào tạo & Khảo thí',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-400/30',
      title: 'Kế hoạch thi kết thúc học phần & Quy chế phòng thi tín chỉ học kỳ mới',
      date: '28/09/2026',
      unit: 'Phòng Khảo thí & Đảm bảo Chất lượng',
      summary: 'Sinh viên theo dõi danh sách phòng thi, số báo danh và quy chế mang thẻ sinh viên khi vào phòng thi. Thắc mắc liên hệ văn phòng một cửa.',
      link: 'https://qldt.nctu.edu.vn',
    },
    {
      id: 3,
      tag: 'Sự kiện & Doanh nghiệp',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-400/30',
      title: 'Ngày hội Việc làm & Kết nối Doanh nghiệp tại Showroom Ô tô Nam Cần Thơ DNC',
      date: '25/09/2026',
      unit: 'Trung tâm Hướng nghiệp & Việc làm',
      summary: 'Cơ hội phỏng vấn trực tiếp với hơn 40 doanh nghiệp đối tác hàng đầu trong các lĩnh vực Công nghệ, Y Dược, Kỹ thuật Ô tô, Kinh tế và Truyền thông.',
      link: '/forum',
    },
    {
      id: 4,
      tag: 'Đời sống KTX',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-400/30',
      title: 'Thông báo tiếp nhận đăng ký lưu trú Ký túc xá sinh viên phòng máy lạnh tiêu chuẩn',
      date: '22/09/2026',
      unit: 'Ban Quản lý Ký túc xá DNC',
      summary: 'Khu Ký túc xá trang bị đầy đủ máy lạnh, wifi tốc độ cao, hệ thống an ninh 24/7 và các tiện ích thể thao đa năng dành cho sinh viên nội trú.',
      link: '/services',
    },
  ];

  return (
    <div id="home-content-section" className="relative z-10 w-full bg-slate-50/90 dark:bg-[#16181c] scroll-mt-20 pt-16 pb-24 md:pb-16 transition-colors duration-200 border-t border-slate-200/80 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── Block 1: Thông báo mới nhất từ Nhà trường ── */}
        <section aria-labelledby="announcements-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-700 dark:text-blue-400 uppercase">
                <Bell className="h-4 w-4" />
                <span>Bản tin Nhà trường DNC</span>
              </div>
              <h2 id="announcements-heading" className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Thông báo mới nhất
              </h2>
            </div>
            <a
              href="https://qldt.nctu.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 transition-colors"
            >
              <span>Xem Cổng Đào tạo qldt.nctu.edu.vn</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {announcements.map((item) => (
              <article
                key={item.id}
                className="liquid-glass-card glass-hover group relative flex flex-col justify-between p-6 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs mb-3">
                    <span className={`rounded-full border px-2.5 py-0.5 font-medium ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <time className="text-slate-500 font-mono">{item.date}</time>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-500 font-medium">
                    Ban hành: {item.unit}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {item.summary}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline inline-flex items-center gap-1.5">
                    Chi tiết thông báo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Block 2: Tiêu điểm Diễn đàn Confession ── */}
        <section aria-label="Tiêu điểm diễn đàn sinh viên" className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 sm:p-8 backdrop-blur-sm shadow-sm dark:border-white/10 dark:bg-[#1a2028]">
          <FeaturedPosts />
        </section>

        {/* ── Block 3: Phím tắt Dịch vụ Sinh viên Nhanh ── */}
        <section aria-labelledby="services-hub-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-700 dark:text-blue-400 uppercase">
                <Sparkles className="h-4 w-4" />
                <span>Tiện ích hỗ trợ một cửa</span>
              </div>
              <h2 id="services-hub-heading" className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Dịch vụ sinh viên trực tuyến
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenServiceModal}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 transition-colors"
            >
              <span>Xem tất cả tiện ích</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => openRequest('Xin giấy xác nhận sinh viên')}
              className="liquid-glass-card glass-hover group flex flex-col items-start p-5 transition-all text-left"
            >
              <div className="p-3 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300 mb-4 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Giấy tờ sinh viên</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Xin giấy xác nhận tạm hoãn NVQS, vay vốn ngân hàng chính sách, làm vé xe buýt.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                Tạo hồ sơ mẫu →
              </span>
            </button>

            <a
              href="https://qldt.nctu.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-card glass-hover group flex flex-col items-start p-5 transition-all text-left"
            >
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Cổng Đào tạo ERP</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Tra cứu thời khóa biểu, lịch thi, điểm học phần và học phí chính thức tại qldt.nctu.edu.vn.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline inline-flex items-center gap-1">
                Truy cập cổng đào tạo <span aria-hidden="true">↗</span>
              </span>
            </a>

            <Link
              to="/services"
              className="liquid-glass-card glass-hover group flex flex-col items-start p-5 transition-all text-left"
            >
              <div className="p-3 rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300 mb-4 group-hover:scale-110 transition-transform">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Ký túc xá & Đời sống</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Nội quy KTX, đăng ký phòng ở máy lạnh, hỗ trợ tiện ích đời sống sinh viên.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                Xem chi tiết →
              </span>
            </Link>

            <button
              type="button"
              onClick={() => openRequest('Hỗ trợ học vụ')}
              className="liquid-glass-card glass-hover group flex flex-col items-start p-5 transition-all text-left"
            >
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 mb-4 group-hover:scale-110 transition-transform">
                <Headset className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Hỗ trợ & Phản ánh</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Giải đáp khúc mắc học đường, tư vấn học vụ và tiếp nhận ý kiến đóng góp.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                Gửi phản ánh →
              </span>
            </button>
          </div>
        </section>

        {/* ── Block 4: Chân trang Toàn diện & Pháp lý Đại học Nam Cần Thơ ── */}
        <footer aria-label="Thông tin nhà trường và pháp lý" className="pt-12 border-t-2 border-slate-200/80 dark:border-white/10">
          <div className="grid gap-10 lg:grid-cols-4 sm:grid-cols-2">
            
            {/* Cột 1: Thông tin trường DNC */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={`${import.meta.env.BASE_URL}assets/logo-dnc-transparent.png`}
                  alt="Đại học Nam Cần Thơ"
                  width={48}
                  height={42}
                  className="h-10 w-auto"
                />
                <div>
                  <p className="font-black tracking-tight text-slate-900 dark:text-white text-base leading-tight">
                    ĐẠI HỌC NAM CẦN THƠ
                  </p>
                  <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                    Nam Can Tho University · DNC
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Cổng Thông tin Hỗ trợ Sinh viên (HTSV) — Nền tảng số kết nối, hỗ trợ học vụ, tiện ích đời sống và diễn đàn giao lưu văn minh cho sinh viên DNC.
              </p>
              <div className="text-xs font-medium text-slate-500 pt-2">
                <p>Khẩu hiệu hành động:</p>
                <p className="text-blue-700 dark:text-blue-400 font-bold italic">
                  “Trí tuệ – Sáng tạo – Hội nhập – Phát triển”
                </p>
              </div>
            </div>

            {/* Cột 2: Trụ sở & Liên hệ chính thức */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Trụ sở & Liên hệ
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-slate-700 shrink-0">📍 Địa chỉ:</span>
                  <span>Số 168, Nguyễn Văn Cừ nối dài, P. An Bình, Q. Ninh Kiều, TP. Cần Thơ</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 shrink-0">📞 Tổng đài:</span>
                  <span>(0292) 3 798 222 - (0292) 3 798 668</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 shrink-0">☎ Hotline HTSV:</span>
                  <span className="font-bold text-blue-700 dark:text-blue-400">(0292) 3 798 168</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 shrink-0">✉ Email:</span>
                  <span>dnc@nctu.edu.vn | htsv@nctu.edu.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 shrink-0">🌐 Website:</span>
                  <a href="https://nctu.edu.vn" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    https://nctu.edu.vn ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Cột 3: Hệ sinh thái DNC */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Hệ sinh thái DNC
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <a href="https://qldt.nctu.edu.vn" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span>Cổng Đào tạo tín chỉ (qldt.nctu.edu.vn)</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <span className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Bệnh viện Đại học Nam Cần Thơ (300 giường)</span>
                </li>
                <li>
                  <span className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Showroom Ô tô Nam Cần Thơ DNC</span>
                </li>
                <li>
                  <span className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Viện Nghiên cứu & Phát triển Dược liệu</span>
                </li>
                <li>
                  <span className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Khu Thể thao Đa năng & Hồ bơi Chuẩn Olympic</span>
                </li>
              </ul>
            </div>

            {/* Cột 4: Chính sách bảo mật & Điều khoản pháp lý */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Chính sách & Bảo mật</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <Link to="/faq#anonymous-safety" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Chính sách bảo mật danh tính sinh viên</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq#moderation-process" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Quy chế duyệt bài & Tiêu chuẩn cộng đồng</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq#account-security" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>An toàn tài khoản & Phòng chống lừa đảo</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq#report-content" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                    <span>Quy trình xử lý phản ánh & Báo cáo vi phạm</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Dòng bản quyền đáy */}
          <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © 2026 Trường Đại học Nam Cần Thơ (Nam Can Tho University). Bản quyền thuộc về Cổng HTSV DNC.
            </p>
            <p className="flex items-center gap-4">
              <span>Bảo mật dữ liệu sinh viên</span>
              <span>·</span>
              <span>Tiêu chuẩn cộng đồng</span>
              <span>·</span>
              <span>Phiên bản 2.4.0</span>
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
