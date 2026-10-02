import { formatRelativeTime } from '../../lib/format-relative-time';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { EmptyState } from '../../components/EmptyState';
import { GlassButton } from '../../components/GlassButton';
import {
  Angry,
  ArrowLeft,
  ChatBubble,
  Check,
  Clock,
  Copy,
  Heart,
  Sad,
  Send,
  Shield,
  Smile,
  Sparkles,
  ThumbsUp,
} from '../../components/Icons';
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
  createdAt?: string;
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
  const [commentAnonymous, setCommentAnonymous] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clipboardError, setClipboardError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const { data: post, isLoading, isError, refetch } = useQuery<PostDetail>({
    queryKey: ['forum-post', id],
    queryFn: async () => (await apiClient.get(`/forum/posts/${id}`)).data,
  });

  const mergeIntoPost = (patch: Partial<PostDetail>) =>
    queryClient.setQueryData<PostDetail>(['forum-post', id], (old) =>
      old ? { ...old, ...patch } : old,
    );

  const react = useMutation({
    mutationFn: (type: string) => apiClient.post(`/forum/posts/${id}/react`, { type }),
    onSuccess: (res) => {
      mergeIntoPost(res.data);
      void queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
    },
  });

  const share = useMutation({
    mutationFn: () => apiClient.post(`/forum/posts/${id}/share`),
    onSuccess: (res) => {
      mergeIntoPost(res.data);
      void queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
    },
  });

  const addComment = useMutation({
    mutationFn: () =>
      apiClient.post(`/forum/posts/${id}/comments`, {
        content: comment,
        isAnonymous: commentAnonymous,
      }),
    onSuccess: () => {
      setComment('');
      void queryClient.invalidateQueries({ queryKey: ['forum-post', id] });
      void queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
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

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <LoadingSkeleton count={2} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <QueryError
          retry={() => {
            void refetch();
          }}
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EmptyState
          title="Không tìm thấy bài viết"
          description="Bài viết này không tồn tại hoặc đã được gỡ xuống bởi tác giả hoặc ban quản trị."
          action={
            <Link to="/forum" className="btn-liquid-glass btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại bảng tin</span>
            </Link>
          }
        />
      </div>
    );
  }

  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      {/* Nút quay lại */}
      <div className="mb-6">
        <Link
          to="/forum"
          className="btn-liquid-glass inline-flex items-center gap-2 rounded-xl text-xs font-semibold text-slate-700 transition-all duration-200 hover:-translate-x-0.5 dark:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4 text-blue-600" />
          <span>Quay lại bảng tin</span>
        </Link>
      </div>

      {/* Thẻ Bài viết Chi tiết (Liquid Glass) */}
      <article className="forum-glass-panel rounded-3xl p-6 sm:p-8">
        {/* Author Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Avatar name={post.authorUser?.fullName} anonymous={post.isAnonymous} />
            <div>
              <h1 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                {post.isAnonymous ? (
                  <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>Sinh viên ẩn danh</span>
                  </span>
                ) : (
                  post.authorUser?.fullName ?? 'Thành viên DNC'
                )}
              </h1>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{formatRelativeTime(post.createdAt ?? new Date().toISOString())}</span>
                </span>
                <span>·</span>
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  {post.isAnonymous ? 'Bảo vệ danh tính' : 'Sinh viên chính thức'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="prose prose-slate max-w-none text-base leading-relaxed whitespace-pre-wrap break-words text-slate-800 dark:text-slate-100">
          {post.content}
        </div>

        {/* Post Stats */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-4 text-xs font-medium text-slate-500 dark:border-white/10 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-rose-500" />
            <strong className="text-slate-700 dark:text-slate-200">{totalReactions}</strong> lượt cảm xúc
          </span>
          <span className="flex items-center gap-1.5">
            <ChatBubble className="h-4 w-4 text-blue-500" />
            <strong className="text-slate-700 dark:text-slate-200">{post.binhLuans.length}</strong> bình luận ·{' '}
            <strong className="text-slate-700 dark:text-slate-200">{post.shareCount}</strong> chia sẻ
          </span>
        </div>
      </article>

      {/* Thanh Reaction & Chia sẻ (Liquid Glass Bar) */}
      <div
        className="forum-glass-panel mt-4 flex flex-wrap items-center gap-2 rounded-2xl p-3"
        role="group"
        aria-label="Cảm xúc và chia sẻ"
      >
        {REACTIONS.map(({ type, label, icon: Icon }) =>
          user ? (
            <button
              key={type}
              type="button"
              onClick={() => react.mutate(type)}
              disabled={react.isPending}
              aria-pressed={post.myReaction === type}
              title={label}
              className={`liquid-pill reaction-pill focus-ring inline-flex items-center gap-1.5 transition-all duration-200 ${
                post.myReaction === type
                  ? 'border-blue-400 bg-blue-50 font-semibold text-blue-700 shadow-sm dark:bg-blue-950/50 dark:text-blue-300'
                  : ''
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{label}</span>
              {(post.reactions[type] ?? 0) > 0 && (
                <span className="ml-1 rounded-full bg-slate-200/70 px-1.5 py-0.2 text-[10px] font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                  {post.reactions[type]}
                </span>
              )}
            </button>
          ) : (
            <span key={type} className="liquid-pill inline-flex items-center gap-1.5">
              <Icon className="h-4 w-4" />
              <span className="sr-only">{label}</span>
              {(post.reactions[type] ?? 0) > 0 && (
                <span className="text-xs">{post.reactions[type]}</span>
              )}
            </span>
          ),
        )}

        {/* Nút chia sẻ / copy link */}
        <GlassButton
          onClick={handleShare}
          loading={share.isPending}
          className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold"
          title="Sao chép liên kết bài viết"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600">Đã chép link!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Chia sẻ</span>
            </>
          )}
        </GlassButton>
      </div>

      {/* Thông báo trạng thái copy link */}
      <div role="status" aria-live="polite" className="mt-2 text-center text-xs font-medium text-blue-600 dark:text-blue-400">
        {copied
          ? '✨ Đã sao chép liên kết bài viết vào bộ nhớ tạm.'
          : clipboardError
          ? 'Không thể sao chép tự động. Bạn có thể sao chép địa chỉ trên thanh trình duyệt.'
          : ''}
      </div>

      {/* Mục Bình luận */}
      <section className="mt-10" aria-labelledby="comments-heading">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="comments-heading" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <ChatBubble className="h-5 w-5 text-blue-600" />
            <span>Bình luận & Thảo luận</span>
            <span className="text-sm font-normal text-slate-500">({post.binhLuans.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Văn minh & Lịch sự</span>
        </div>

        {/* Danh sách bình luận */}
        <div className="space-y-4">
          {post.binhLuans.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-white/70 bg-white/75 p-4.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-800/60"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={c.authorUser?.fullName} anonymous={c.isAnonymous} />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 break-words dark:text-slate-100">
                      {c.isAnonymous ? (
                        <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                          <Shield className="h-3.5 w-3.5 text-blue-500" />
                          <span>Sinh viên ẩn danh</span>
                        </span>
                      ) : (
                        c.authorUser?.fullName ?? 'Thành viên'
                      )}
                    </p>
                    <time dateTime={c.createdAt} className="text-xs text-slate-400">
                      {formatRelativeTime(c.createdAt)}
                    </time>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-slate-700 dark:text-slate-200">
                {c.content}
              </p>
            </div>
          ))}

          {post.binhLuans.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/40 p-8 text-center backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/30">
              <Sparkles className="mx-auto mb-2 h-6 w-6 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Chưa có bình luận nào cho câu chuyện này.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Một lời động viên hay chia sẻ chân thành có thể mang lại ý nghĩa lớn cho bạn ấy.
              </p>
            </div>
          )}
        </div>

        {/* Khung Gửi bình luận */}
        {user ? (
          <form
            className="forum-glass-panel mt-6 rounded-2xl p-4 sm:p-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (comment.trim() && !addComment.isPending) addComment.mutate();
            }}
          >
            <label htmlFor="comment-content" className="field-label text-xs font-bold text-slate-700 uppercase dark:text-slate-300">
              Gửi lời nhắn hoặc chia sẻ của bạn
            </label>
            <textarea
              id="comment-content"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Viết một lời nhắn, góp ý hoặc chia sẻ đồng cảm…"
              rows={3}
              required
              className="form-input mt-2 resize-none rounded-xl bg-white/80 p-3 text-sm placeholder-slate-400 backdrop-blur-sm focus:border-blue-500 focus:bg-white dark:bg-slate-800/80 dark:text-slate-100"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <label
                htmlFor="comment-anonymous"
                className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                <input
                  id="comment-anonymous"
                  type="checkbox"
                  checked={commentAnonymous}
                  onChange={(e) => setCommentAnonymous(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <Shield className="h-3.5 w-3.5 text-blue-500" />
                <span>Bình luận ẩn danh</span>
              </label>

              <GlassButton
                type="submit"
                variant="primary"
                loading={addComment.isPending}
                disabled={!comment.trim()}
                className="inline-flex items-center gap-2 rounded-xl px-5 text-xs font-semibold"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Gửi bình luận</span>
              </GlassButton>
            </div>

            {addComment.isError && (
              <p role="alert" className="mt-3 text-xs font-semibold text-red-600">
                Chưa thể gửi bình luận vào lúc này. Nội dung của bạn vẫn được lưu lại.
              </p>
            )}
          </form>
        ) : (
          <div className="forum-glass-panel mt-6 rounded-2xl p-5 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Bạn cần{' '}
              <Link to="/login" className="font-bold text-blue-600 underline hover:text-blue-700">
                Đăng nhập
              </Link>{' '}
              để tham gia bình luận và tương tác cùng cộng đồng sinh viên.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
