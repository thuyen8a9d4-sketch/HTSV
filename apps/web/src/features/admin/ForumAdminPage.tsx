import { Avatar } from '../../components/Avatar';
import { EmptyState } from '../../components/EmptyState';
import { GlassButton } from '../../components/GlassButton';
import { GlassCard } from '../../components/GlassCard';
import { Check, Close } from '../../components/Icons';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PageHeading } from '../../components/PageHeading';
import { QueryError } from '../../components/QueryError';
import { StatusBadge } from '../../components/StatusBadge';
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
  const { data, isLoading, isError, refetch } = useQuery<Post[]>({
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
      <PageHeading eyebrow="Quản trị nội dung" title="Kiểm duyệt bài đăng" description="Đọc, đánh giá và duyệt nội dung trước khi xuất hiện trên bảng tin." />
      {isLoading && <LoadingSkeleton />}
      {isError && <QueryError retry={() => { void refetch(); }} />}
      {(approve.isError || reject.isError) && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">Chưa thể cập nhật. Vui lòng thử lại.</p>}
      <div className="space-y-3">
        {data?.map((post) => (
          <GlassCard key={post.id} solid>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
              <span className="flex min-w-0 items-center gap-3"><Avatar name={post.authorUser?.fullName} anonymous={post.isAnonymous} /><span className="min-w-0 break-words font-medium text-slate-800">{post.isAnonymous ? 'Ẩn danh' : post.authorUser?.fullName}</span></span>
              <StatusBadge status={post.status} />
            </div>
            <p className="mb-5 leading-relaxed whitespace-pre-wrap break-words text-slate-700">{post.content}</p>
            {post.status !== 'APPROVED' && (
              <div className="flex gap-2">
                <GlassButton
                  onClick={() => approve.mutate(post.id)}
                  variant="success" disabled={approve.isPending || reject.isPending} loading={approve.isPending && approve.variables === post.id}
                >
                  <Check className="h-4 w-4" />Duyệt
                </GlassButton>
                <GlassButton
                  onClick={() => reject.mutate(post.id)}
                  variant="danger" disabled={approve.isPending || reject.isPending} loading={reject.isPending && reject.variables === post.id}
                >
                  <Close className="h-4 w-4" />Từ chối
                </GlassButton>
              </div>
            )}
          </GlassCard>
        ))}
        {!isError && data?.length === 0 && <EmptyState title="Chưa có bài đăng" description="Các bài đăng của thành viên sẽ xuất hiện tại đây để kiểm duyệt." />}
      </div>
    </div>
  );
}
