import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, FileText, GraduationCap, Headset, Home } from '../../components/Icons';
import { FeaturedPosts } from './FeaturedPosts';
import { HomeScrollReveal } from './HomeScrollReveal';
import type { StudentPortalContext } from './student-types';
import './home-content.css';

interface HomeContentSectionProps {
  onOpenServiceModal: () => void;
  openRequest: StudentPortalContext['openRequest'];
}

const announcements = [
  {
    id: 1,
    category: 'Học bổng',
    title: 'Thông báo xét cấp Học bổng Khuyến khích học tập & Tài năng DNC năm học 2025 - 2026',
    date: '30/09/2026',
    dateTime: '2026-09-30',
    unit: 'Phòng Đào tạo & Quản lý Khoa học',
    summary: 'Nhà trường thông báo kế hoạch tiếp nhận hồ sơ xét cấp học bổng khuyến khích và học bổng doanh nghiệp cho sinh viên đạt điểm rèn luyện và thành tích học tập loại Giỏi, Xuất sắc.',
    link: 'https://qldt.nctu.edu.vn',
  },
  {
    id: 2,
    category: 'Đào tạo và khảo thí',
    title: 'Kế hoạch thi kết thúc học phần & Quy chế phòng thi tín chỉ học kỳ mới',
    date: '28/09/2026',
    dateTime: '2026-09-28',
    unit: 'Phòng Khảo thí & Đảm bảo Chất lượng',
    summary: 'Sinh viên theo dõi danh sách phòng thi, số báo danh và quy chế mang thẻ sinh viên khi vào phòng thi. Thắc mắc liên hệ văn phòng một cửa.',
    link: 'https://qldt.nctu.edu.vn',
  },
  {
    id: 3,
    category: 'Việc làm và sự kiện',
    title: 'Ngày hội Việc làm & Kết nối Doanh nghiệp tại Showroom Ô tô Nam Cần Thơ DNC',
    date: '25/09/2026',
    dateTime: '2026-09-25',
    unit: 'Trung tâm Hướng nghiệp & Việc làm',
    summary: 'Cơ hội phỏng vấn trực tiếp với hơn 40 doanh nghiệp đối tác hàng đầu trong các lĩnh vực Công nghệ, Y Dược, Kỹ thuật Ô tô, Kinh tế và Truyền thông.',
    link: '/forum',
  },
  {
    id: 4,
    category: 'Ký túc xá',
    title: 'Thông báo tiếp nhận đăng ký lưu trú Ký túc xá sinh viên phòng máy lạnh tiêu chuẩn',
    date: '22/09/2026',
    dateTime: '2026-09-22',
    unit: 'Ban Quản lý Ký túc xá DNC',
    summary: 'Khu Ký túc xá trang bị đầy đủ máy lạnh, wifi tốc độ cao, hệ thống an ninh 24/7 và các tiện ích thể thao đa năng dành cho sinh viên nội trú.',
    link: '/services',
  },
];

export function HomeContentSection({ onOpenServiceModal, openRequest }: HomeContentSectionProps) {
  return (
    <div id="home-content-section" className="home-content">
      <div className="home-content-inner">
        <section aria-labelledby="announcements-heading" className="home-section">
          <HomeScrollReveal>
            <div className="home-section-heading">
              <div>
                <h2 id="announcements-heading" className="home-section-title">Thông báo mới nhất</h2>
                <p className="home-section-description">Học vụ, học bổng và hoạt động tại DNC.</p>
              </div>
              <a href="https://qldt.nctu.edu.vn" target="_blank" rel="noopener noreferrer" className="home-section-link">
                Cổng đào tạo <ExternalLink aria-hidden="true" />
              </a>
            </div>
          </HomeScrollReveal>

          <div className="home-announcement-grid">
            {announcements.map((item, index) => (
              <HomeScrollReveal key={item.id} delay={(index % 2) * 80}>
                <article className="liquid-glass-card glass-hover home-card home-announcement-card">
                  <div className="home-card-meta">
                    <span className="home-category">{item.category}</span>
                    <time dateTime={item.dateTime}>{item.date}</time>
                  </div>
                  <h3 className="home-card-title">{item.title}</h3>
                  <p className="home-card-unit">{item.unit}</p>
                  <p className="home-card-summary">{item.summary}</p>
                  <div className="home-card-bottom">
                    {item.link.startsWith('https://') ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="home-card-link" aria-label={`Xem thông báo: ${item.title}`}>
                        Xem thông báo <ExternalLink aria-hidden="true" />
                      </a>
                    ) : (
                      <Link to={item.link} className="home-card-link" aria-label={`Xem thông báo: ${item.title}`}>
                        Xem thông báo <ArrowRight aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </article>
              </HomeScrollReveal>
            ))}
          </div>
        </section>

        <FeaturedPosts />

        <section aria-labelledby="services-hub-heading" className="home-section">
          <HomeScrollReveal>
            <div className="home-section-heading">
              <div>
                <h2 id="services-hub-heading" className="home-section-title">Dịch vụ sinh viên</h2>
                <p className="home-section-description">Giấy tờ, học vụ và các thông tin cần thiết.</p>
              </div>
              <button type="button" onClick={onOpenServiceModal} className="home-section-link">
                Tất cả tiện ích <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </HomeScrollReveal>
          <div className="home-service-grid">
            <HomeScrollReveal>
              <button type="button" onClick={() => openRequest('Xin giấy xác nhận sinh viên')} className="liquid-glass-card glass-hover home-card home-service-card">
                <span className="home-service-icon"><FileText aria-hidden="true" /></span>
                <span className="home-card-title">Giấy tờ sinh viên</span>
                <span className="home-service-description">Xin giấy xác nhận tạm hoãn NVQS, vay vốn ngân hàng chính sách, làm vé xe buýt.</span>
                <span className="home-service-action">Tạo hồ sơ mẫu <ArrowRight aria-hidden="true" /></span>
              </button>
            </HomeScrollReveal>
            <HomeScrollReveal delay={60}>
              <a href="https://qldt.nctu.edu.vn" target="_blank" rel="noopener noreferrer" className="liquid-glass-card glass-hover home-card home-service-card">
                <span className="home-service-icon"><GraduationCap aria-hidden="true" /></span>
                <h3 className="home-card-title">Cổng Đào tạo ERP</h3>
                <p className="home-service-description">Tra cứu thời khóa biểu, lịch thi, điểm học phần và học phí chính thức tại qldt.nctu.edu.vn.</p>
                <span className="home-service-action">Truy cập cổng đào tạo <ExternalLink aria-hidden="true" /></span>
              </a>
            </HomeScrollReveal>
            <HomeScrollReveal delay={120}>
              <Link to="/services" className="liquid-glass-card glass-hover home-card home-service-card">
                <span className="home-service-icon"><Home aria-hidden="true" /></span>
                <h3 className="home-card-title">Ký túc xá & Đời sống</h3>
                <p className="home-service-description">Nội quy KTX, đăng ký phòng ở máy lạnh, hỗ trợ tiện ích đời sống sinh viên.</p>
                <span className="home-service-action">Xem chi tiết <ArrowRight aria-hidden="true" /></span>
              </Link>
            </HomeScrollReveal>
            <HomeScrollReveal delay={180}>
              <button type="button" onClick={() => openRequest('Hỗ trợ học vụ')} className="liquid-glass-card glass-hover home-card home-service-card">
                <span className="home-service-icon"><Headset aria-hidden="true" /></span>
                <span className="home-card-title">Hỗ trợ & Phản ánh</span>
                <span className="home-service-description">Giải đáp khúc mắc học đường, tư vấn học vụ và tiếp nhận ý kiến đóng góp.</span>
                <span className="home-service-action">Gửi phản ánh <ArrowRight aria-hidden="true" /></span>
              </button>
            </HomeScrollReveal>
          </div>
        </section>

      </div>
    </div>
  );
}
