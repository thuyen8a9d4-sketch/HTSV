import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

interface Post {
  id: number;
  content: string;
  status: string;
  isAnonymous: boolean;
  authorUser: { username: string; fullName: string };
  createdAt: string;
}

export function ForumAdminPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery<Post[]>({
    queryKey: ['admin-forum-posts'],
    queryFn: async () => (await apiClient.get('/admin/forum/posts')).data,
  });

  const approve = useMutation({
    mutationFn: (id: number) => apiClient.put(`/admin/forum/posts/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-forum-posts'] }),
  });
  const reject = useMutation({
    mutationFn: (id: number) => apiClient.put(`/admin/forum/posts/${id}/reject`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-forum-posts'] }),
  });

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-slate-900">Kiểm duyệt bài đăng</h1>
      <div className="space-y-3">
        {data?.map((post) => (
          <div key={post.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
              <span>{post.isAnonymous ? 'Ẩn danh' : post.authorUser?.fullName}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{post.status}</span>
            </div>
            <p className="mb-3 text-slate-800">{post.content}</p>
            {post.status !== 'APPROVED' && (
              <div className="flex gap-2">
                <button
                  onClick={() => approve.mutate(post.id)}
                  className="rounded-lg bg-green-600 px-3 py-1 text-xs text-white"
                >
                  Duyệt
                </button>
                <button
                  onClick={() => reject.mutate(post.id)}
                  className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white"
                >
                  Từ chối
                </button>
              </div>
            )}
          </div>
        ))}
        {data?.length === 0 && <p className="text-slate-500">Chưa có bài đăng nào.</p>}
      </div>
    </div>
  );
}
