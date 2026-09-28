import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../../components/FormField';
import { GlassButton } from '../../components/GlassButton';
import { GlassModal } from '../../components/GlassModal';
import { Check } from '../../components/Icons';
import { useAuthStore } from '../../lib/auth-store';
import { requestTypes } from './student-mock-data';
import { requestOwner, useStudentStore } from './student-store';

const schema = z.object({
  type: z.enum(requestTypes),
  fullName: z.string().trim().min(2, 'Nhập họ tên từ 2 ký tự.').max(100, 'Họ tên tối đa 100 ký tự.'),
  studentId: z.string().trim().min(3, 'Nhập mã sinh viên từ 3 ký tự.').max(30, 'Mã sinh viên tối đa 30 ký tự.').regex(/^[a-zA-Z0-9_-]+$/, 'Mã sinh viên chỉ gồm chữ, số, gạch ngang hoặc gạch dưới.'),
  reason: z.string().trim().min(10, 'Mô tả lý do ít nhất 10 ký tự.').max(2000, 'Lý do tối đa 2.000 ký tự.'),
  notes: z.string().trim().max(1000, 'Ghi chú tối đa 1.000 ký tự.'),
});
type Values = z.infer<typeof schema>;

// Mounted anew for each request so defaults do not leak between services or accounts.
export function SubmitRequestModal({ initialType, onClose, onTrack }: { initialType: string; onClose: () => void; onTrack: () => void }) {
  const user = useAuthStore((s) => s.user);
  const addRequest = useStudentStore((s) => s.addRequest);
  const [createdId, setCreatedId] = useState('');
  const [saveError, setSaveError] = useState('');
  const type = requestTypes.find((item) => item === initialType) ?? requestTypes[0];
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { type, fullName: user?.fullName ?? '', studentId: '', reason: '', notes: '' },
  });
  return <GlassModal open onClose={onClose} title={createdId ? 'Đã lưu yêu cầu mẫu' : 'Gửi yêu cầu hỗ trợ'}>
    {createdId ? <div className="space-y-5">
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-900"><Check className="mb-3 h-8 w-8" /><p className="font-semibold">Đã lưu thành công trên trình duyệt!</p><p className="mt-2 break-all font-mono text-base">{createdId}</p><p className="mt-2 text-sm">Hồ sơ chưa được gửi đến nhà trường. Bạn có thể theo dõi và thử các bước xử lý trong bản mô phỏng.</p></div>
      <GlassButton autoFocus variant="primary" className="w-full" onClick={onTrack}>Theo dõi yêu cầu của tôi</GlassButton>
    </div> : <form noValidate onSubmit={handleSubmit((values) => {
      if (createdId) return;
      setSaveError('');
      try {
        const request = addRequest(requestOwner(user?.id), values);
        setCreatedId(request.id);
      } catch (error) { setSaveError(error instanceof Error ? error.message : 'Không thể lưu. Vui lòng thử lại.'); }
    })}>
      <p className="mb-5 rounded-xl bg-blue-50 p-3 text-sm text-blue-900">Bản thử nghiệm: hồ sơ chỉ lưu trên trình duyệt này, chưa gửi đến nhà trường. Hãy dùng thông tin mẫu.</p>
      <label htmlFor="request-type" className="field-label">Loại thủ tục</label>
      <select id="request-type" {...register('type')} className="form-input mb-5" aria-invalid={!!errors.type} aria-describedby={errors.type ? 'request-type-error' : undefined}>{requestTypes.map((item) => <option key={item}>{item}</option>)}</select>
      {errors.type && <p id="request-type-error" role="alert" className="mb-3 text-sm text-red-700">Chọn một loại thủ tục trong danh sách.</p>}
      <FormField label="Họ và tên" autoComplete="name" maxLength={100} required {...register('fullName')} error={errors.fullName?.message} />
      <FormField label="Mã sinh viên" autoComplete="off" placeholder="VD: 243880" maxLength={30} required {...register('studentId')} error={errors.studentId?.message} />
      <label htmlFor="request-reason" className="field-label">Lý do yêu cầu</label>
      <textarea id="request-reason" {...register('reason')} rows={3} maxLength={2000} required className="form-input" placeholder="Mô tả việc bạn cần hỗ trợ…" aria-invalid={!!errors.reason} aria-describedby={errors.reason ? 'reason-error' : undefined} />
      {errors.reason && <p id="reason-error" role="alert" className="mt-1 text-xs text-red-700">{errors.reason.message}</p>}
      <label htmlFor="request-notes" className="field-label mt-4">Ghi chú <span className="font-normal text-slate-500">(không bắt buộc)</span></label>
      <textarea id="request-notes" {...register('notes')} rows={2} maxLength={1000} className="form-input" aria-invalid={!!errors.notes} aria-describedby={errors.notes ? 'notes-error' : undefined} />
      {errors.notes && <p id="notes-error" role="alert" className="text-xs text-red-700">{errors.notes.message}</p>}
      {saveError && <p role="alert" className="mt-4 text-sm text-red-700">{saveError}</p>}
      <div className="mt-6 flex flex-wrap justify-end gap-3"><GlassButton onClick={onClose}>Để sau</GlassButton><GlassButton type="submit" variant="primary" loading={isSubmitting}>Lưu yêu cầu mẫu</GlassButton></div>
    </form>}
  </GlassModal>;
}
