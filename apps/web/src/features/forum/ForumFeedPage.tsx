import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

interface Post {
  id: number;
  content: string;
  isAnonymous: boolean;
  createdAt: string;
  authorUser: { fullName: string } | null;
  category: { name: string } | null;
  shareCount: number;
  _count: { binhLuans: number; luotThiches: number };
}

export function ForumFeedPage() {
  const user = useAuthStore((s) => s.user);
  const { data } = useQuery<Post[]>({
    queryKey: ['forum-posts'],
    queryFn: async () => (await apiClient.get('/forum/posts')).data,
  });

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Diễn đàn</h1>
        {user && (
          <Link to="/forum/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
            + Đăng bài
          </Link>
        )}
      </div>
      <div className="space-y-3">
        {data?.map((post) => (
          <Link
            key={post.id}
            to={`/forum/${post.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-400"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
              <span>{post.isAnonymous ? 'Ẩn danh' : post.authorUser?.fullName}</span>
              {post.category && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{post.category.name}</span>
              )}
              <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <p className="line-clamp-3 text-slate-800">{post.content}</p>
            <div className="mt-2 text-xs text-slate-500">
              👍 {post._count.luotThiches} · 💬 {post._count.binhLuans} · 🔗 {post.shareCount}
            </div>
          </Link>
        ))}
        {data?.length === 0 && <p className="text-slate-500">Chưa có bài đăng nào.</p>}
      </div>
    </div>
  );
}
