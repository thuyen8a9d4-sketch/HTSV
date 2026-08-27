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

  const { data } = useQuery<Permission[]>({
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
      <h1 className="mb-4 text-xl font-bold text-slate-900">Quyền</h1>
      <div className="mb-4 flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Mã (VD: MANAGE_USERS)"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên quyền"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          onClick={() => create.mutate()}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
        >
          Thêm
        </button>
      </div>
      <table className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-sm">
        <thead className="bg-slate-100 text-left text-slate-600">
          <tr>
            <th className="p-3">Mã</th>
            <th className="p-3">Tên</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p) => (
            <tr key={p.id} className="border-t border-slate-100">
              <td className="p-3">{p.code}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3 text-right">
                <button onClick={() => remove.mutate(p.id)} className="text-xs text-red-600">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
