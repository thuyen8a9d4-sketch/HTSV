import { Link } from 'react-router-dom';
import {
  Check,
  ExternalLink,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Shield,
} from '../components/Icons';
import { primaryNav } from './portal-nav';

const UNIVERSITY_ADDRESS = 'Số 168, Nguyễn Văn Cừ nối dài, P. An Bình, Q. Ninh Kiều, TP. Cần Thơ';
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(UNIVERSITY_ADDRESS)}&output=embed`;

const contactRows = [
  { icon: MapPin, text: UNIVERSITY_ADDRESS },
  { icon: Phone, text: 'Tổng đài: (0292) 3 798 222 - (0292) 3 798 668' },
  { icon: Phone, text: 'Hotline HTSV: (0292) 3 798 168' },
  { icon: Mail, text: 'Email: dnc@nctu.edu.vn | htsv@nctu.edu.vn' },
];

const ecosystemItems = [
  { label: 'Cổng Đào tạo tín chỉ', href: 'https://qldt.nctu.edu.vn' },
  { label: 'Bệnh viện Đại học Nam Cần Thơ (300 giường)' },
  { label: 'Showroom Ô tô Nam Cần Thơ DNC' },
  { label: 'Viện Nghiên cứu & Phát triển Dược liệu' },
  { label: 'Khu Thể thao Đa năng & Hồ bơi Chuẩn Olympic' },
];

const policyItems = [
  'Chính sách bảo mật danh tính sinh viên',
  'Quy chế duyệt bài & Tiêu chuẩn cộng đồng',
  'An toàn tài khoản & Phòng chống lừa đảo',
  'Quy trình xử lý phản ánh & Báo cáo vi phạm',
];

export function PortalFooter() {
  return (
    <footer className="student-footer">
      <div className="student-footer-grid">
        <div className="student-footer-col">
          <div className="student-footer-brand">
            <img src="/dnc-logo.png" alt="DNC" className="student-footer-logo" width={36} height={27} />
            <div className="min-w-0">
              <p className="student-footer-title">ĐẠI HỌC NAM CẦN THƠ</p>
              <p className="student-footer-subtitle">NAM CAN THO UNIVERSITY · DNC</p>
            </div>
          </div>
          <p className="student-footer-text">
            Cổng Thông tin Hỗ trợ Sinh viên (HTSV) — Nền tảng số kết nối, hỗ trợ học vụ, tiện ích
            đời sống và diễn đàn giao lưu văn minh cho sinh viên DNC.
          </p>
          <p className="student-footer-text">
            <strong>Khẩu hiệu hành động:</strong>
            <br />
            <em>“Trí tuệ – Sáng tạo – Hội nhập – Phát triển”</em>
          </p>
        </div>

        <div className="student-footer-col">
          <h3 className="student-footer-heading">
            <MapPin className="h-4 w-4" /> Trụ sở & Liên hệ
          </h3>
          <ul className="student-footer-list">
            {contactRows.map((row) => (
              <li key={row.text}>
                <row.icon className="h-4 w-4 shrink-0" />
                <span>{row.text}</span>
              </li>
            ))}
            <li>
              <Globe className="h-4 w-4 shrink-0" />
              <span>
                Website:{' '}
                <a href="https://nctu.edu.vn" target="_blank" rel="noreferrer" className="student-footer-link">
                  nctu.edu.vn <ExternalLink className="inline h-3 w-3" />
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div className="student-footer-col">
          <h3 className="student-footer-heading">
            <GraduationCap className="h-4 w-4" /> Hệ sinh thái DNC
          </h3>
          <ul className="student-footer-list student-footer-list-plain">
            {ecosystemItems.map((item) =>
              item.href ? (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="student-footer-link">
                    {item.label} <ExternalLink className="inline h-3 w-3" />
                  </a>
                </li>
              ) : (
                <li key={item.label}>{item.label}</li>
              ),
            )}
          </ul>
        </div>

        <div className="student-footer-col">
          <h3 className="student-footer-heading">
            <Shield className="h-4 w-4" /> Chính sách & Bảo mật
          </h3>
          <ul className="student-footer-list">
            {policyItems.map((item) => (
              <li key={item}>
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="student-footer-col">
          <h3 className="student-footer-heading">
            <MapPin className="h-4 w-4" /> Bản đồ chỉ đường
          </h3>
          <div className="student-footer-map">
            <iframe
              title="Bản đồ Đại học Nam Cần Thơ"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(UNIVERSITY_ADDRESS)}`}
            target="_blank"
            rel="noreferrer"
            className="student-footer-link"
          >
            Mở trong Google Maps <ExternalLink className="inline h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="student-footer-bottom">
        <span>
          © {new Date().getFullYear()} HTSV · Đại học Nam Cần Thơ. Giữ mọi quyền.
        </span>
        <nav className="student-footer-links" aria-label="Liên kết chân trang">
          {primaryNav.map((item) => (
            <Link key={item.path} to={item.path} className="student-footer-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
