import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

export function ForumCreatePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const create = useMutation({
    mutationFn: () => apiClient.post('/forum/posts', { content, isAnonymous }),
    onSuccess: () => navigate('/forum'),
  });

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-xl font-bold text-slate-900">Đăng bài mới</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        placeholder="Nội dung..."
        className="w-full rounded-lg border border-slate-300 p-3 text-sm"
      />
      <label className="mt-2 flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
        Đăng ẩn danh
      </label>
      <p className="mt-2 text-xs text-slate-500">Bài đăng sẽ chờ admin duyệt trước khi hiển thị.</p>
      <button
        onClick={() => create.mutate()}
        disabled={!content.trim() || create.isPending}
        className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        Đăng bài
      </button>
    </div>
  );
}
