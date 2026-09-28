import { EmptyState } from '../../components/EmptyState';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PageHeading } from '../../components/PageHeading';
import { QueryError } from '../../components/QueryError';
import { TableFrame } from '../../components/TableFrame';
import { FormField } from '../../components/FormField';
import { GlassButton } from '../../components/GlassButton';
import { Plus, Trash } from '../../components/Icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { apiClient } from '../../lib/api-client';

interface Role {
  id: number;
  code: string;
  name: string;
}

export function RolesPage() {
  const queryClient = useQueryClient();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const { data, isLoading, isError, refetch } = useQuery<Role[]>({
    queryKey: ['admin-roles'],
    queryFn: async () => (await apiClient.get('/admin/roles')).data,
  });

  const create = useMutation({
    mutationFn: () => apiClient.post('/admin/roles', { code, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      setCode('');
      setName('');
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/admin/roles/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-roles'] }),
  });

  return (
    <div>
      <PageHeading eyebrow="Quản trị truy cập" title="Vai trò" description="Quản lý các nhóm vai trò trong hệ thống HTSV." />
      <form onSubmit={(e) => { e.preventDefault(); if (code.trim() && name.trim() && !create.isPending) create.mutate(); }} className="mb-6 grid items-start gap-x-4 rounded-2xl border border-slate-200 bg-white/90 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        <FormField label="Mã vai trò" value={code} onChange={(e) => setCode(e.target.value)} placeholder="VD: EDITOR" required />
        <FormField label="Tên vai trò" value={name} onChange={(e) => setName(e.target.value)} required />
        <GlassButton type="submit" variant="primary" className="sm:mt-7" loading={create.isPending} disabled={!code.trim() || !name.trim()}><Plus className="h-4 w-4" />Thêm</GlassButton>
      </form>
      {(create.isError || remove.isError) && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">Chưa thể cập nhật. Vui lòng thử lại.</p>}
      {isLoading && <LoadingSkeleton variant="table" />}
      {isError && <QueryError retry={() => { void refetch(); }} />}
      {!isError && data?.length === 0 && <EmptyState title="Chưa có vai trò" description="Dùng biểu mẫu phía trên để thêm mục đầu tiên." />}
      {data && data.length > 0 && <TableFrame label="Danh sách vai trò">
      <table className="data-table">
        <thead >
          <tr>
            <th scope="col" className="p-3">Mã</th>
            <th scope="col" className="p-3">Tên</th>
            <th scope="col" className="p-3 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((r) => (
            <tr key={r.id} className="border-t border-slate-100">
              <td className="p-3">{r.code}</td>
              <td className="p-3">{r.name}</td>
              <td className="p-3 text-right">
                <GlassButton variant="danger" onClick={() => { if (window.confirm(`Xóa vai trò ${r.name}?`)) remove.mutate(r.id); }} loading={remove.isPending && remove.variables === r.id} disabled={remove.isPending} aria-label={`Xóa vai trò ${r.name}`}><Trash className="h-4 w-4" />Xóa</GlassButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </TableFrame>}
    </div>
  );
}
