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

interface Permission {
  id: number;
  code: string;
  name: string;
  description: string | null;
}

export function PermissionsPage() {
  const queryClient = useQueryClient();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const { data, isLoading, isError, refetch } = useQuery<Permission[]>({
    queryKey: ['admin-permissions'],
    queryFn: async () => (await apiClient.get('/admin/permissions')).data,
  });

  const create = useMutation({
    mutationFn: () => apiClient.post('/admin/permissions', { code, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-permissions'] });
      setCode('');
      setName('');
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/admin/permissions/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-permissions'] }),
  });

  return (
    <div>
      <PageHeading eyebrow="Quản trị truy cập" title="Quyền" description="Quản lý danh sách quyền sử dụng trong hệ thống HTSV." />
      <form onSubmit={(e) => { e.preventDefault(); if (code.trim() && name.trim() && !create.isPending) create.mutate(); }} className="mb-6 grid items-start gap-x-4 rounded-2xl border border-slate-200 bg-white/90 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        <FormField label="Mã quyền" value={code} onChange={(e) => setCode(e.target.value)} placeholder="VD: MANAGE_USERS" required />
        <FormField label="Tên quyền" value={name} onChange={(e) => setName(e.target.value)} required />
        <GlassButton type="submit" variant="primary" className="sm:mt-7" loading={create.isPending} disabled={!code.trim() || !name.trim()}><Plus className="h-4 w-4" />Thêm</GlassButton>
      </form>
      {(create.isError || remove.isError) && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">Chưa thể cập nhật. Vui lòng thử lại.</p>}
      {isLoading && <LoadingSkeleton variant="table" />}
      {isError && <QueryError retry={() => { void refetch(); }} />}
      {!isError && data?.length === 0 && <EmptyState title="Chưa có quyền" description="Dùng biểu mẫu phía trên để thêm mục đầu tiên." />}
      {data && data.length > 0 && <TableFrame label="Danh sách quyền">
      <table className="data-table">
        <thead >
          <tr>
            <th scope="col" className="p-3">Mã</th>
            <th scope="col" className="p-3">Tên</th>
            <th scope="col" className="p-3 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p) => (
            <tr key={p.id} className="border-t border-slate-100">
              <td className="p-3">{p.code}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3 text-right">
                <GlassButton variant="danger" onClick={() => { if (window.confirm(`Xóa quyền ${p.name}?`)) remove.mutate(p.id); }} loading={remove.isPending && remove.variables === p.id} disabled={remove.isPending} aria-label={`Xóa quyền ${p.name}`}><Trash className="h-4 w-4" />Xóa</GlassButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </TableFrame>}
    </div>
  );
}
