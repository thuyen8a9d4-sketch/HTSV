import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { ArrowLeft, FileText, Shield, Sparkles } from '../../components/Icons';
import { apiClient } from '../../lib/api-client';

export function ForumCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState('');
  const isAnonymous = searchParams.get('anonymous') === 'true';

  const setIsAnonymous = (value: boolean) => {
    setSearchParams(
      (current) => {
        current.set('anonymous', String(value));
        return current;
      },
      { replace: true },
    );
  };

  const create = useMutation({
    mutationFn: () => apiClient.post('/forum/posts', { content, isAnonymous }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
      navigate('/forum');
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      {/* Nút quay lại */}
      <div className="mb-6">
        <Link
          to="/forum"
          className="btn-liquid-glass inline-flex items-center gap-2 rounded-xl text-xs font-semibold text-slate-700 transition-all duration-200 hover:-translate-x-0.5 dark:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4 text-blue-600" />
          <span>Quay lại bảng tin</span>
        </Link>
      </div>

      {/* Header trang */}
      <div className="mb-6">
        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur-md dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>Góc sẻ chia & Lắng nghe</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          Câu chuyện của bạn
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
          Một chia sẻ chân thành, một câu hỏi học tập hay một suy nghĩ nhỏ cũng có thể chạm đến và kết nối cùng ai đó.
        </p>
      </div>

      {/* Form tạo bài viết (Liquid Glass) */}
      <div className="forum-glass-panel rounded-3xl p-6 sm:p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (content.trim() && !create.isPending) create.mutate();
          }}
        >
          <label
            htmlFor="post-content"
            className="field-label text-xs font-bold tracking-wide text-slate-700 uppercase dark:text-slate-300"
          >
            Bạn muốn chia sẻ điều gì cùng cộng đồng?
          </label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Hãy viết câu chuyện, trải nghiệm giảng đường, thắc mắc học tập, câu chuyện ký túc xá hoặc điều bạn đang ấp ủ…"
            className="form-input mt-2.5 resize-y rounded-2xl bg-white/85 p-4 text-sm leading-relaxed placeholder-slate-400 backdrop-blur-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-800/85 dark:text-slate-100"
            required
            aria-describedby="post-count moderation-note"
          />

          {/* Bộ đếm ký tự */}
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Khuyến khích chia sẻ văn minh, không công kích cá nhân</span>
            <span id="post-count" className="font-medium">
              {content.length.toLocaleString('vi-VN')} ký tự
            </span>
          </div>

          {/* Tùy chọn Ẩn danh */}
          <div className="my-6 rounded-2xl border border-slate-200/80 bg-white/60 p-4 backdrop-blur-sm transition-colors hover:border-blue-200 dark:border-white/10 dark:bg-slate-800/60">
            <label
              htmlFor="anonymous-post"
              className="flex cursor-pointer items-center gap-3 font-semibold text-slate-800 dark:text-slate-200"
            >
              <input
                id="anonymous-post"
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Đăng bài ẩn danh</span>
              </div>
            </label>
            <p className="mt-1.5 ml-7.5 text-xs text-slate-500 dark:text-slate-400">
              Khi bật tính năng này, tên và thông tin tài khoản của bạn sẽ hoàn toàn được ẩn đi trên bảng tin và bài viết.
            </p>
          </div>

          {/* Ghi chú kiểm duyệt */}
          <div
            id="moderation-note"
            className="mb-6 flex items-start gap-2.5 rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300"
          >
            <Shield className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
            <span>
              Bài đăng sẽ được hệ thống kiểm duyệt tự động và quản trị viên xem xét trước khi hiển thị công khai trên bảng tin cộng đồng.
            </span>
          </div>

          {create.isError && (
            <p role="alert" className="mb-4 text-xs font-semibold text-red-600">
              Chưa thể gửi bài viết. Vui lòng kiểm tra lại kết nối mạng và thử lại.
            </p>
          )}

          {/* Nút gửi */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Link
              to="/forum"
              className="btn-liquid-glass justify-center rounded-xl text-xs font-semibold"
            >
              Hủy bỏ
            </Link>
            <GlassButton
              type="submit"
              variant="primary"
              loading={create.isPending}
              disabled={!content.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-semibold"
            >
              <FileText className="h-4 w-4" />
              <span>Gửi bài chia sẻ</span>
            </GlassButton>
          </div>
        </form>
      </div>
    </div>
  );
}
