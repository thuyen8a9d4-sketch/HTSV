import { Link } from 'react-router-dom';
import { GlassCard } from '../../components/GlassCard';
import { StudentIcon } from './StudentIcon';

export function StudentLifePanel() {
  return <section aria-label="Ký túc xá và hoạt động sinh viên" className="space-y-5">
    <p className="max-w-2xl text-sm leading-relaxed text-slate-600">Tìm thông tin về chỗ ở và hoạt động tại DNC. Các liên kết dưới đây dẫn đến website nhà trường; HTSV chưa tiếp nhận đăng ký ký túc xá trực tuyến.</p>
    <div className="grid gap-5 md:grid-cols-2">
      <GlassCard>
        <StudentIcon name="home" className="h-7 w-7 text-blue-700" />
        <h2 className="mt-4 text-lg font-semibold">Ký túc xá</h2>
        <p className="mt-2 text-sm text-slate-600">Xem thông tin và hướng dẫn liên hệ ban quản lý trên trang ký túc xá của trường.</p>
        <h3 className="mt-5 text-sm font-semibold">Những điều nên hỏi trước khi đăng ký</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Loại phòng và tình trạng phòng còn trống.</li>
          <li>Chi phí, khoản đặt cọc và thời hạn thanh toán.</li>
          <li>Giấy tờ cần chuẩn bị, thời gian nhận phòng và nội quy.</li>
        </ul>
        <a href="https://nctu.edu.vn/ky-tuc-xa" target="_blank" rel="noopener noreferrer" className="btn-liquid-glass btn-primary mt-6">Xem ký túc xá DNC<span className="sr-only"> (mở tab mới)</span></a>
      </GlassCard>
      <GlassCard>
        <StudentIcon name="people" className="h-7 w-7 text-blue-700" />
        <h2 className="mt-4 text-lg font-semibold">Hoạt động sinh viên</h2>
        <p className="mt-2 text-sm text-slate-600">Tìm hướng dẫn dành cho sinh viên, thông tin hoạt động và câu lạc bộ từ nhà trường. Trao đổi trải nghiệm và tìm bạn đồng hành trên diễn đàn HTSV.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://nctu.edu.vn/trang-sinh-vien/tan-sinh-vien" target="_blank" rel="noopener noreferrer" className="btn-liquid-glass">Trang sinh viên DNC<span className="sr-only"> (mở tab mới)</span></a>
          <Link to="/forum" className="btn-liquid-glass">Vào diễn đàn</Link>
        </div>
      </GlassCard>
    </div>
  </section>;
}
