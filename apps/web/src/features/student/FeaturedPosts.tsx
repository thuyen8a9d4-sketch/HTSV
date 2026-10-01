import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { ArrowRight, ChatBubble, Heart } from '../../components/Icons';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { QueryError } from '../../components/QueryError';
import { apiClient } from '../../lib/api-client';

interface FeaturedPost {
  id: number; content: string; isAnonymous: boolean; createdAt: string;
  authorUser: { fullName: string } | null; category: { name: string } | null;
  _count: { binhLuans: number; luotThiches: number };
}

export function FeaturedPosts() {
  const { data, isLoading, isError, refetch } = useQuery<FeaturedPost[]>({
    queryKey: ['forum-posts'], queryFn: async () => (await apiClient.get('/forum/posts')).data,
  });
  const posts = Array.isArray(data) ? [...data].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 3) : [];
  return <section aria-labelledby="community-heading"><div className="student-section-heading"><div><p className="student-eyebrow">Góc nhỏ của chúng mình</p><h2 id="community-heading">Chuyện ở giảng đường</h2></div><Link to="/forum" className="student-text-link">Vào diễn đàn <ArrowRight /></Link></div>
    {isLoading && <LoadingSkeleton count={2} />}
    {isError && <QueryError retry={() => { void refetch(); }} />}
    {!isLoading && !isError && !posts.length && <p className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">Chưa có bài viết. Ghé diễn đàn và chia sẻ câu chuyện đầu tiên nhé.</p>}
    {!isError && <div className="grid gap-4 md:grid-cols-3">{posts.map((post) => <Link to={`/forum/${post.id}`} className="student-post" key={post.id}><div className="mb-4 flex items-center gap-3"><Avatar name={post.isAnonymous ? undefined : post.authorUser?.fullName} anonymous={post.isAnonymous} /><div className="min-w-0"><p className="truncate text-sm font-semibold">{post.isAnonymous ? 'Ẩn danh' : post.authorUser?.fullName ?? 'Thành viên'}</p><time dateTime={post.createdAt} className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</time></div></div><p className="line-clamp-3 text-sm leading-7 whitespace-pre-wrap [overflow-wrap:anywhere]">{post.content}</p><div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-600"><span className="flex items-center gap-1"><Heart className="h-4 w-4" />{post._count?.luotThiches ?? 0}<span className="sr-only">cảm xúc</span></span><span className="flex items-center gap-1"><ChatBubble className="h-4 w-4" />{post._count?.binhLuans ?? 0}<span className="sr-only">bình luận</span></span><span className="ml-auto text-blue-700">Đọc tiếp</span></div></Link>)}</div>}
  </section>;
}
