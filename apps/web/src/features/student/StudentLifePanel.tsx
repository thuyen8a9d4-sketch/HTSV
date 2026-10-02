import { Link } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { GlassCard } from '../../components/GlassCard';
import { dormRoomTypes } from './dorm-data';
import { StudentIcon } from './StudentIcon';
import { DormitoryHero } from './DormitoryHero';

export function StudentLifePanel({ openRequest }: { openRequest: (type?: string) => void }) {
  return (
    <div className="w-full">
      {/* Full-bleed hero banner & breadcrumbs */}
      <DormitoryHero />

      {/* Main content container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <section aria-label="Ký túc xá và hoạt động sinh viên" className="space-y-6">
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-gray-300">
            Thông tin phòng ở dưới đây là dữ liệu mẫu — hệ thống chưa nối cơ sở dữ liệu ký túc xá thật của trường.
          </p>

          <GlassCard>
            <StudentIcon name="home" className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Ký túc xá</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {dormRoomTypes.map((room) => (
                <div
                  key={room.id}
                  className="rounded-xl border border-slate-200/80 bg-white/60 p-4 transition-all hover:border-blue-400 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{room.name}</h3>
                    {room.availableRooms > 0 ? (
                      <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                        Còn {room.availableRooms} phòng
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-700 dark:text-rose-400">
                        Hết phòng
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm font-bold tabular-nums text-blue-600 dark:text-blue-400">
                    {room.pricePerMonth.toLocaleString('vi-VN')} đ
                    <span className="text-xs font-normal text-slate-500 dark:text-gray-400">/tháng</span>
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-gray-300">
                    {room.amenities.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                        <span className="text-slate-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <GlassButton variant="primary" onClick={() => openRequest('Đăng ký ở ký túc xá')}>
                Gửi yêu cầu đăng ký ở KTX
              </GlassButton>
              <a
                href="https://nctu.edu.vn/ky-tuc-xa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-glass"
              >
                Xem trang ký túc xá DNC<span className="sr-only"> (mở tab mới)</span>
              </a>
            </div>
          </GlassCard>

          <GlassCard>
            <StudentIcon name="people" className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Hoạt động sinh viên</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-gray-300">
              Tìm hướng dẫn dành cho sinh viên, thông tin hoạt động và câu lạc bộ từ nhà trường. Trao đổi trải nghiệm và tìm bạn đồng hành trên diễn đàn HTSV.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://nctu.edu.vn/trang-sinh-vien/tan-sinh-vien"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-glass"
              >
                Trang sinh viên DNC<span className="sr-only"> (mở tab mới)</span>
              </a>
              <Link to="/forum" className="btn-liquid-glass">
                Vào diễn đàn
              </Link>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
