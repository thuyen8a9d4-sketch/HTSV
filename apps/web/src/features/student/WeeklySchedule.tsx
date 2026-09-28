import { Link } from 'react-router-dom';
import { ArrowRight, User } from '../../components/Icons';
import { getWeekSchedule } from './student-mock-data';
import { StudentIcon } from './StudentIcon';

export function WeeklySchedule({ detailed = false }: { detailed?: boolean }) {
  const days = getWeekSchedule();
  const dateLabel = (date: Date) => date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  return <section aria-labelledby="schedule-heading">
    <div className="student-section-heading"><div><p className="student-eyebrow">Sắp xếp một tuần thật tốt</p><h2 id="schedule-heading">Lịch tuần này <span className="ml-2 text-sm font-normal tracking-normal text-slate-500">{dateLabel(days[0].date)} – {dateLabel(days[6].date)}</span></h2></div>{!detailed && <Link to="/schedule" className="student-text-link">Chi tiết thời khóa biểu <ArrowRight /></Link>}</div>
    <p className="mb-5 text-xs text-slate-600">Lịch minh họa · Môn học, phòng và giảng viên là dữ liệu mẫu.</p>
    <div className={`schedule-scroll ${detailed ? 'schedule-expanded' : ''}`} role="region" aria-label="Lịch bảy ngày, cuộn ngang để xem thêm" tabIndex={0}>
      <div className="schedule-strip">{days.map((day) => <article key={day.label} className={`schedule-day ${day.isToday ? 'schedule-today' : ''}`} aria-label={`${day.label}, ${dateLabel(day.date)}${day.isToday ? ', hôm nay' : ''}`}>
        <div className="binder-rings" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="schedule-date"><div className="flex flex-wrap items-center justify-between gap-1"><span className="text-xs font-medium">{day.label}</span>{day.isToday && <span className="today-label">Hôm nay</span>}</div><p className="mt-1 text-2xl font-semibold tracking-tight">{dateLabel(day.date)}</p><p className="mt-1 text-[11px] text-slate-600">{day.sessions.length ? `${day.sessions.length} ca học` : 'Ngày tự học'}</p></div>
        <div className="space-y-4 p-3">{day.sessions.length ? day.sessions.map((session) => <div key={session.subject} className="schedule-session"><p className="mb-2 inline-block rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-800">{session.time}</p><h3 className="text-xs leading-relaxed font-semibold">{session.subject}</h3><p className="mt-2 text-[11px] leading-relaxed text-slate-600">{session.room}</p><p className="mt-2 flex items-start gap-1 text-[11px] leading-relaxed text-slate-600"><User className="mt-0.5 h-3 w-3 shrink-0" />{session.lecturer}</p></div>) : <div className="flex min-h-36 flex-col items-center justify-center gap-3 text-center"><StudentIcon name="edit" className="h-8 w-8 text-slate-400" /><p className="text-xs text-slate-500">Không có tiết học</p></div>}</div>
      </article>)}</div>
    </div>
    {detailed && <p className="mt-4 text-sm text-slate-600">Lịch thi chính thức chưa được kết nối. Vui lòng đối chiếu thông báo của Phòng Đào tạo.</p>}
  </section>;
}
