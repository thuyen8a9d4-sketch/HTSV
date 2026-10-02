import { Link } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { GlassCard } from '../../components/GlassCard';
import { dormRoomTypes } from './dorm-data';
import { StudentIcon } from './StudentIcon';

export function StudentLifePanel({ openRequest }: { openRequest: (type?: string) => void }) {
  return <section aria-label="Ký túc xá và hoạt động sinh viên" className="space-y-5">
    <p className="max-w-2xl text-sm leading-relaxed text-slate-600">Thông tin phòng ở dưới đây là dữ liệu mẫu — hệ thống chưa nối cơ sở dữ liệu ký túc xá thật của trường.</p>
    <GlassCard>
      <StudentIcon name="home" className="h-7 w-7 text-blue-700" />
      <h2 className="mt-4 text-lg font-semibold">Ký túc xá</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {dormRoomTypes.map((room) => (
          <div key={room.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <h3 className="text-sm font-semibold">{room.name}</h3>
            <p className="mt-1 text-sm font-bold tabular-nums text-blue-700 dark:text-blue-400">{room.pricePerMonth.toLocaleString('vi-VN')} đ<span className="text-xs font-normal text-slate-500">/tháng</span></p>
            <p className="mt-1 text-xs text-slate-500">{room.availableRooms > 0 ? `Còn ${room.availableRooms} phòng trống` : 'Đã hết phòng trống'}</p>
            <ul className="mt-2 space-y-0.5 text-xs text-slate-600">{room.amenities.map((item) => <li key={item}>· {item}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <GlassButton variant="primary" onClick={() => openRequest('Đăng ký ở ký túc xá')}>Gửi yêu cầu đăng ký ở KTX</GlassButton>
        <a href="https://nctu.edu.vn/ky-tuc-xa" target="_blank" rel="noopener noreferrer" className="btn-liquid-glass">Xem trang ký túc xá DNC<span className="sr-only"> (mở tab mới)</span></a>
      </div>
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
  </section>;
}
