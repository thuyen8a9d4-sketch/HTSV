import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

interface Role {
  id: number;
  code: string;
  name: string;
}

interface UserRow {
  id: number;
  username: string;
  email: string;
  fullName: string;
  isActive: boolean;
  userRoles: { role: Role }[];
}

export function UsersPage() {
  const queryClient = useQueryClient();
  const { data: users } = useQuery<UserRow[]>({
    queryKey: ['admin-users'],
    queryFn: async () => (await apiClient.get('/admin/users')).data,
  });
  const { data: roles } = useQuery<Role[]>({
    queryKey: ['admin-roles'],
    queryFn: async () => (await apiClient.get('/admin/roles')).data,
  });

  const updateRoles = useMutation({
    mutationFn: ({ id, roleIds }: { id: number; roleIds: number[] }) =>
      apiClient.put(`/admin/users/${id}`, { roleIds }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const toggleActive = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      apiClient.put(`/admin/users/${id}`, { isActive }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const toggleRole = (user: UserRow, roleId: number) => {
    const current = user.userRoles.map((ur) => ur.role.id);
    const next = current.includes(roleId)
      ? current.filter((id) => id !== roleId)
      : [...current, roleId];
    updateRoles.mutate({ id: user.id, roleIds: next });
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-slate-900">Người dùng</h1>
      <table className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-sm">
        <thead className="bg-slate-100 text-left text-slate-600">
          <tr>
            <th className="p-3">Tên đăng nhập</th>
            <th className="p-3">Họ tên</th>
            <th className="p-3">Email</th>
            <th className="p-3">Vai trò</th>
            <th className="p-3">Kích hoạt</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u.id} className="border-t border-slate-100 align-top">
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.fullName}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                <div className="flex flex-wrap gap-2">
                  {roles?.map((role) => {
                    const checked = u.userRoles.some((ur) => ur.role.id === role.id);
                    return (
                      <label key={role.id} className="flex items-center gap-1 text-xs">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRole(u, role.id)}
                        />
                        {role.code}
                      </label>
                    );
                  })}
                </div>
              </td>
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={u.isActive}
                  onChange={() => toggleActive.mutate({ id: u.id, isActive: !u.isActive })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
