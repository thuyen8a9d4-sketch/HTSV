import { EmptyState } from '../../components/EmptyState';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PageHeading } from '../../components/PageHeading';
import { QueryError } from '../../components/QueryError';
import { TableFrame } from '../../components/TableFrame';
import { StatusBadge } from '../../components/StatusBadge';
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
  const { data: users, isLoading, isError, refetch } = useQuery<UserRow[]>({
    queryKey: ['admin-users'],
    queryFn: async () => (await apiClient.get('/admin/users')).data,
  });
  const { data: roles, isError: rolesError, isLoading: rolesLoading, refetch: refetchRoles } = useQuery<Role[]>({
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
      <PageHeading eyebrow="Quản trị truy cập" title="Người dùng" description="Quản lý trạng thái tài khoản và vai trò của thành viên." />
      {isLoading && <LoadingSkeleton variant="table" />}
      {isError && <QueryError retry={() => { void refetch(); }} />}
      {rolesError && <QueryError retry={() => { void refetchRoles(); }} />}
      {(updateRoles.isError || toggleActive.isError) && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">Chưa thể lưu thay đổi. Vui lòng thử lại.</p>}
      {!isError && users?.length === 0 && <EmptyState title="Chưa có người dùng" description="Các tài khoản đã đăng ký sẽ xuất hiện tại đây." />}
      {users && users.length > 0 && <TableFrame label="Danh sách người dùng">
      <table className="data-table min-w-[760px]">
        <thead >
          <tr>
            <th scope="col" className="p-3">Tên đăng nhập</th>
            <th scope="col" className="p-3">Họ tên</th>
            <th scope="col" className="p-3">Email</th>
            <th scope="col" className="p-3">Vai trò</th>
            <th scope="col" className="p-3">Kích hoạt</th>
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
                      <label key={role.id} htmlFor={`user-${u.id}-role-${role.id}`} className="flex min-h-11 items-center gap-2 rounded-lg bg-slate-50 px-2 text-xs">
                        <input
                          type="checkbox"
                          id={`user-${u.id}-role-${role.id}`}
                          checked={checked}
                          disabled={updateRoles.isPending || rolesLoading}
                          aria-label={`${role.code} cho ${u.fullName}`}
                          onChange={() => toggleRole(u, role.id)}
                        />
                        {role.code}
                      </label>
                    );
                  })}
                </div>
              </td>
              <td className="p-3">
                <label htmlFor={`user-${u.id}-active`} className="flex min-h-11 items-center gap-3">
                <span className="sr-only">Kích hoạt {u.fullName}</span>
                <input
                  type="checkbox"
                  id={`user-${u.id}-active`}
                  aria-label={`Kích hoạt ${u.fullName}`}
                  checked={u.isActive}
                  disabled={toggleActive.isPending}
                  onChange={() => toggleActive.mutate({ id: u.id, isActive: !u.isActive })}
                />
                <StatusBadge status={u.isActive ? 'ACTIVE' : 'INACTIVE'} />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </TableFrame>}
    </div>
  );
}
