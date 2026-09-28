import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { EmptyState } from '../../components/EmptyState';
import { GlassCard } from '../../components/GlassCard';
import { ArrowRight, ChatBubble, Clock, Heart, Plus, Share, Shield } from '../../components/Icons';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PageHeading } from '../../components/PageHeading';
import { QueryError } from '../../components/QueryError';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

interface Post {
  id: number; content: string; isAnonymous: boolean; createdAt: string;
  authorUser: { fullName: string } | null; category: { name: string } | null;
  shareCount: number; _count: { binhLuans: number; luotThiches: number };
}
export function ForumFeedPage() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, isError, refetch } = useQuery<Post[]>({
    queryKey: ['forum-posts'], queryFn: async () => (await apiClient.get('/forum/posts')).data,
  });
  const createLink = <Link to={user ? '/forum/new' : '/login'} className="btn-liquid-glass btn-primary"><Plus className="h-4 w-4" />{user ? 'Đăng bài' : 'Đăng nhập để chia sẻ'}</Link>;
  return <div>
    <PageHeading eyebrow="Cộng đồng HTSV" title="Một nơi để sẻ chia." description="Câu chuyện của bạn, sự đồng cảm của chúng mình. Kết nối với những người cùng trải nghiệm." action={user ? createLink : undefined} />
    <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
      <section aria-label="Bảng tin diễn đàn" className="min-w-0 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3"><h2 className="flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 rounded-full bg-blue-600" />Bảng tin mới nhất</h2><span className="text-xs text-slate-600">{data ? `${data.length} bài viết` : 'Diễn đàn sinh viên'}</span></div>
        {isLoading && <LoadingSkeleton />}
        {isError && <QueryError retry={() => { void refetch(); }} />}
        {data?.map((post) => <GlassCard key={post.id} hoverEffect padding={false}><Link to={`/forum/${post.id}`} className="focus-ring block rounded-[20px] p-5 sm:p-6" aria-label={`Đọc bài của ${post.isAnonymous ? 'người dùng ẩn danh' : post.authorUser?.fullName ?? 'thành viên'}`}>
          <div className="mb-4 flex items-start gap-3"><Avatar name={post.authorUser?.fullName} anonymous={post.isAnonymous} /><div className="min-w-0 flex-1"><p className="font-semibold break-words">{post.isAnonymous ? 'Ẩn danh' : post.authorUser?.fullName ?? 'Thành viên'}</p><time dateTime={post.createdAt} className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-600"><Clock className="h-3.5 w-3.5" />{new Date(post.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</time></div>{post.category && <span className="liquid-pill max-w-[40%] border-blue-100 bg-blue-50 text-blue-700 break-words">{post.category.name}</span>}</div>
          <p className="line-clamp-4 text-sm leading-relaxed whitespace-pre-wrap break-words text-slate-700">{post.content}</p>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-xs text-slate-600"><span className="liquid-pill"><Heart className="h-4 w-4" />{post._count.luotThiches}<span className="sr-only">lượt cảm xúc</span></span><span className="liquid-pill"><ChatBubble className="h-4 w-4" />{post._count.binhLuans}<span className="sr-only">bình luận</span></span><span className="liquid-pill"><Share className="h-4 w-4" />{post.shareCount}<span className="sr-only">lượt chia sẻ</span></span><span className="ml-auto flex items-center gap-1 font-medium text-blue-700">Đọc tiếp<ArrowRight className="h-4 w-4" /></span></div>
        </Link></GlassCard>)}
        {!isError && data?.length === 0 && <EmptyState title="Câu chuyện đầu tiên đang chờ bạn" description="Chia sẻ một suy nghĩ, một trải nghiệm hay điều bạn muốn nhắn gửi." action={createLink} />}
      </section>
      <aside className="space-y-5 lg:sticky lg:top-28"><GlassCard><span className="avatar mb-4"><Shield /></span><h2 className="text-lg font-semibold">Bạn có thể là chính mình.</h2><p className="mt-3 text-sm text-slate-600">Chọn đăng ẩn danh khi bạn cần một không gian riêng để chia sẻ. Mỗi câu chuyện đều xứng đáng được lắng nghe.</p><div className="mt-5 border-t border-slate-200/70 pt-5">{createLink}</div></GlassCard><div className="px-2"><p className="text-xs font-semibold text-slate-700">Cùng giữ một cộng đồng tử tế</p><p className="mt-2 text-xs leading-relaxed text-slate-600">Tôn trọng khác biệt, bảo vệ thông tin cá nhân và trao đổi bằng sự đồng cảm. Bài đăng được kiểm duyệt trước khi xuất hiện.</p></div></aside>
    </div>
  </div>;
}
