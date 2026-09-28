import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { EmptyState } from '../../components/EmptyState';
import { GlassButton } from '../../components/GlassButton';
import { GlassCard } from '../../components/GlassCard';
import { Angry, ArrowLeft, ChatBubble, Check, Heart, Sad, Share, Smile, ThumbsUp } from '../../components/Icons';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { QueryError } from '../../components/QueryError';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

const REACTIONS = [
  { type: 'LIKE', icon: ThumbsUp, label: 'Thích' },
  { type: 'LOVE', icon: Heart, label: 'Yêu thích' },
  { type: 'HAHA', icon: Smile, label: 'Haha' },
  { type: 'SAD', icon: Sad, label: 'Buồn' },
  { type: 'ANGRY', icon: Angry, label: 'Phẫn nộ' },
] as const;

interface Comment {
  id: number;
  content: string;
  isAnonymous: boolean;
  authorUser: { fullName: string } | null;
  createdAt: string;
}

interface PostDetail {
  id: number;
  content: string;
  isAnonymous: boolean;
  authorUser: { fullName: string } | null;
  binhLuans: Comment[];
  reactions: Record<string, number>;
  myReaction: string | null;
  shareCount: number;
}

export function ForumDetailPage() {
  const { id } = useParams();
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const [copied, setCopied] = useState(false);
  const [clipboardError, setClipboardError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  const { data: post, isLoading, isError, refetch } = useQuery<PostDetail>({
    queryKey: ['forum-post', id],
    queryFn: async () => (await apiClient.get(`/forum/posts/${id}`)).data,
  });

  // react/share responses already carry the exact fields that changed, so
  // merge them into the cached post directly instead of re-fetching the
  // whole post (and its comment list) over the network.
  const mergeIntoPost = (patch: Partial<PostDetail>) =>
    queryClient.setQueryData<PostDetail>(['forum-post', id], (old) =>
      old ? { ...old, ...patch } : old,
    );

  const react = useMutation({
    mutationFn: (type: string) => apiClient.post(`/forum/posts/${id}/react`, { type }),
    onSuccess: (res) => mergeIntoPost(res.data),
  });

  const share = useMutation({
    mutationFn: () => apiClient.post(`/forum/posts/${id}/share`),
    onSuccess: (res) => mergeIntoPost(res.data),
  });

  const addComment = useMutation({
    mutationFn: () => apiClient.post(`/forum/posts/${id}/comments`, { content: comment }),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['forum-post', id] });
    },
  });

  const handleShare = async () => {
    setClipboardError(false);
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setClipboardError(true);
    }
    share.mutate();
  };

  if (isLoading) return <div className="mx-auto max-w-2xl"><LoadingSkeleton count={1} /></div>;
  if (isError) return <div className="mx-auto max-w-2xl"><QueryError retry={() => { void refetch(); }} /></div>;
  if (!post) return <EmptyState title="Không tìm thấy bài viết" action={<Link to="/forum" className="btn-liquid-glass">Về bảng tin</Link>} />;
  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);
  return <div className="mx-auto max-w-2xl">
    <Link to="/forum" className="mb-5 inline-flex min-h-11 items-center gap-2 text-slate-600"><ArrowLeft className="h-4 w-4" />Về bảng tin</Link>
    <GlassCard solid>
      <div className="mb-5 flex items-center gap-3"><Avatar name={post.authorUser?.fullName} anonymous={post.isAnonymous} /><div><h1 className="text-base font-semibold">{post.isAnonymous ? 'Ẩn danh' : post.authorUser?.fullName ?? 'Thành viên'}</h1><p className="text-xs text-slate-600">Chia sẻ cùng cộng đồng HTSV</p></div></div>
      <p className="text-base leading-relaxed whitespace-pre-wrap break-words text-slate-700">{post.content}</p>
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-600"><span>{totalReactions} lượt cảm xúc</span><span>{post.binhLuans.length} bình luận · {post.shareCount} chia sẻ</span></div>
    </GlassCard>
    <div className="liquid-glass-card mt-3 flex flex-wrap items-center gap-2 p-3" role="group" aria-label="Cảm xúc và chia sẻ">
      {REACTIONS.map(({ type, label, icon: Icon }) => user ? <button key={type} onClick={() => react.mutate(type)} disabled={react.isPending} aria-pressed={post.myReaction === type} title={label} className="liquid-pill reaction-pill focus-ring"><Icon className="h-4 w-4" />{label}<span className="text-xs">{post.reactions[type] ?? 0}</span></button> : <span key={type} className="liquid-pill"><Icon className="h-4 w-4" /><span className="sr-only">{label}</span>{post.reactions[type] ?? 0}</span>)}
      <GlassButton onClick={handleShare} loading={share.isPending} className="ml-auto" title="Sao chép liên kết bài viết">{copied ? <Check className="h-4 w-4" /> : <Share className="h-4 w-4" />}{copied ? 'Đã sao chép link!' : 'Chia sẻ'}</GlassButton>
    </div>
    <div role="status" aria-live="polite" className="mt-2 text-xs text-blue-700">{copied ? 'Đã sao chép link!' : clipboardError ? 'Không thể sao chép tự động. Bạn có thể sao chép địa chỉ trên trình duyệt.' : ''}</div>
    {(react.isError || share.isError) && <p role="alert" className="mt-3 text-sm text-red-700">Chưa thể cập nhật tương tác. Vui lòng thử lại.</p>}
    <section className="mt-8" aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="mb-5 flex items-center gap-2 text-lg font-semibold"><ChatBubble className="h-5 w-5 text-blue-600" />Bình luận <span className="text-sm font-normal text-slate-600">({post.binhLuans.length})</span></h2>
      <div className="space-y-3">{post.binhLuans.map((c) => <div key={c.id} className="rounded-2xl border border-slate-200/60 bg-white/90 p-4"><div className="mb-3 flex items-center gap-3"><Avatar name={c.authorUser?.fullName} anonymous={c.isAnonymous} /><div className="min-w-0"><p className="font-semibold break-words">{c.isAnonymous ? 'Ẩn danh' : c.authorUser?.fullName ?? 'Thành viên'}</p><time dateTime={c.createdAt} className="text-xs text-slate-600">{new Date(c.createdAt).toLocaleDateString('vi-VN')}</time></div></div><p className="leading-relaxed whitespace-pre-wrap break-words text-slate-700">{c.content}</p></div>)}</div>
      {post.binhLuans.length === 0 && <p className="mb-5 text-sm text-slate-600">Chưa có bình luận. Một lời động viên có thể tạo nên khác biệt.</p>}
      {user ? <form className="mt-5 rounded-2xl border border-slate-200 bg-white/90 p-4" onSubmit={(e) => { e.preventDefault(); if (comment.trim() && !addComment.isPending) addComment.mutate(); }}><label htmlFor="comment-content" className="field-label">Bình luận của bạn</label><textarea id="comment-content" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Viết một lời nhắn…" rows={3} required className="form-input" /><div className="mt-3 flex justify-end"><GlassButton type="submit" variant="primary" loading={addComment.isPending} disabled={!comment.trim()}>Gửi bình luận</GlassButton></div>{addComment.isError && <p role="alert" className="mt-3 text-sm text-red-700">Chưa thể gửi bình luận. Nội dung của bạn vẫn được giữ lại.</p>}</form> : <p className="mt-5 text-sm text-slate-600"><Link to="/login" className="font-semibold text-blue-700 underline">Đăng nhập</Link> để bình luận và thả cảm xúc.</p>}
    </section>
  </div>;
}
