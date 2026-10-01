import { Link } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { GlassCard } from '../../components/GlassCard';
import { StudentIcon } from './StudentIcon';
import type { StudentPortalContext } from './student-types';

export function StudentSupportPanel({ openRequest }: Pick<StudentPortalContext, 'openRequest'>) {
  return <section aria-label="Gửi và theo dõi hỗ trợ" className="space-y-5">
    <p className="max-w-2xl text-sm leading-relaxed text-slate-600">Chọn nội dung bạn cần trợ giúp. Các yêu cầu hiện là hồ sơ mẫu, chỉ lưu trên trình duyệt này và chưa gửi đến nhà trường hoặc ban quản trị.</p>
    <div className="grid gap-5 md:grid-cols-3">
      <GlassCard className="flex flex-col items-start">
        <StudentIcon name="headset" className="h-7 w-7 text-blue-700" />
        <h2 className="mt-4 text-lg font-semibold">Gửi yêu cầu</h2>
        <p className="mt-2 mb-5 text-sm text-slate-600">Cần trợ giúp về học vụ, tài khoản hoặc giấy tờ sinh viên? Chọn loại yêu cầu trong biểu mẫu.</p>
        <GlassButton variant="primary" className="mt-auto" onClick={() => openRequest('Hỗ trợ học vụ')}>Tạo yêu cầu mẫu</GlassButton>
      </GlassCard>
      <GlassCard className="flex flex-col items-start">
        <StudentIcon name="shield" className="h-7 w-7 text-blue-700" />
        <h2 className="mt-4 text-lg font-semibold">Báo cáo vi phạm</h2>
        <p className="mt-2 mb-5 text-sm text-slate-600">Ghi rõ đường dẫn bài viết hoặc bình luận, nội dung vi phạm và lý do phản ánh.</p>
        <GlassButton className="mt-auto" onClick={() => openRequest('Báo cáo vi phạm nội dung')}>Tạo báo cáo mẫu</GlassButton>
      </GlassCard>
      <GlassCard className="flex flex-col items-start">
        <StudentIcon name="clipboard" className="h-7 w-7 text-blue-700" />
        <h2 className="mt-4 text-lg font-semibold">Theo dõi yêu cầu</h2>
        <p className="mt-2 mb-5 text-sm text-slate-600">Xem lại hồ sơ mẫu đã tạo và trạng thái minh họa của từng yêu cầu.</p>
        <Link to="/requests" className="btn-liquid-glass mt-auto">Xem yêu cầu</Link>
      </GlassCard>
    </div>
    <p className="text-sm text-slate-600">Cần hướng dẫn nhanh? <Link to="/faq" className="focus-ring rounded text-blue-700 underline underline-offset-4">Xem Hỏi đáp</Link></p>
  </section>;
}
