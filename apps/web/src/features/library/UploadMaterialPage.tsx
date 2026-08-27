import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

interface Subject {
  id: number;
  name: string;
}

export function UploadMaterialPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('OTHER');
  const [subjectId, setSubjectId] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: subjects } = useQuery<Subject[]>({
    queryKey: ['subjects'],
    queryFn: async () => (await apiClient.get('/library/subjects')).data,
  });

  const upload = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', type);
      if (subjectId) formData.append('subjectId', subjectId);
      formData.append('isFree', String(isFree));
      formData.append('isSellable', String(!isFree));
      if (!isFree && price) formData.append('price', price);
      if (file) formData.append('file', file);
      return apiClient.post('/library/materials', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => navigate('/library/my-uploads'),
    onError: (err: any) => setError(err.response?.data?.message ?? 'Đăng tài liệu thất bại'),
  });

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-4 text-xl font-bold text-slate-900">Đăng giáo trình</h1>
      <div className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả"
          className="w-full rounded-lg border border-slate-300 p-2 text-sm"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="SLIDE">Slide</option>
          <option value="LESSON_PLAN">Giáo án</option>
          <option value="TEXTBOOK">Giáo trình</option>
          <option value="OTHER">Khác</option>
        </select>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Không thuộc môn học nào</option>
          {subjects?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} />
          Miễn phí
        </label>
        {!isFree && (
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Giá (VNĐ)"
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        )}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        <p className="text-xs text-slate-500">
          Chỉ chấp nhận .pdf .doc .docx .ppt .pptx .xls .xlsx .zip .rar, tối đa 20MB
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={() => upload.mutate()}
          disabled={!title.trim() || !file || upload.isPending}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Đăng
        </button>
      </div>
    </div>
  );
}
