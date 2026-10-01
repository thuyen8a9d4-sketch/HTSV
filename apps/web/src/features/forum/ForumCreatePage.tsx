import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { GlassCard } from '../../components/GlassCard';
import { ArrowLeft, FileText, Shield } from '../../components/Icons';
import { PageHeading } from '../../components/PageHeading';
import { apiClient } from '../../lib/api-client';

export function ForumCreatePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState('');
  const isAnonymous = searchParams.get('anonymous') === 'true';
  const setIsAnonymous = (value: boolean) => {
    setSearchParams((current) => { current.set('anonymous', String(value)); return current; }, { replace: true });
  };
  const create = useMutation({
    mutationFn: () => apiClient.post('/forum/posts', { content, isAnonymous }),
    onSuccess: () => navigate('/forum'),
  });
  return <div className="mx-auto max-w-2xl">
    <Link to="/forum" className="mb-5 inline-flex min-h-11 items-center gap-2 text-sm text-slate-600"><ArrowLeft className="h-4 w-4" />Về bảng tin</Link>
    <PageHeading eyebrow="Góc sẻ chia" title="Câu chuyện của bạn" description="Một suy nghĩ nhỏ cũng có thể chạm đến ai đó." />
    <GlassCard solid><form onSubmit={(e) => { e.preventDefault(); if (content.trim() && !create.isPending) create.mutate(); }}>
      <label htmlFor="post-content" className="field-label">Bạn muốn chia sẻ điều gì?</label>
      <textarea id="post-content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} placeholder="Viết câu chuyện, điều bạn đang nghĩ hoặc lời nhắn gửi…" className="form-input leading-relaxed" required aria-describedby="post-count moderation-note" />
      <p id="post-count" className="mt-2 text-right text-xs text-slate-600">{content.length.toLocaleString('vi-VN')} ký tự</p>
      <div className="my-5 rounded-xl border border-slate-200 bg-slate-50 p-4"><label htmlFor="anonymous-post" className="flex min-h-11 items-center gap-3 font-medium"><input id="anonymous-post" type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />Đăng ẩn danh</label><p className="ml-8 text-xs text-slate-600">Tên của bạn sẽ không hiển thị trên bài viết khi chọn mục này.</p></div>
      <p id="moderation-note" className="mb-5 flex items-start gap-2 text-xs text-slate-600"><Shield className="h-4 w-4 shrink-0" />Bài đăng sẽ chờ quản trị viên duyệt trước khi hiển thị trên bảng tin.</p>
      {create.isError && <p role="alert" className="mb-4 text-sm text-red-700">Chưa thể đăng bài. Vui lòng thử lại.</p>}
      <GlassButton type="submit" variant="primary" loading={create.isPending} disabled={!content.trim()} className="w-full sm:w-auto"><FileText className="h-4 w-4" />Gửi bài để duyệt</GlassButton>
    </form></GlassCard>
  </div>;
}
