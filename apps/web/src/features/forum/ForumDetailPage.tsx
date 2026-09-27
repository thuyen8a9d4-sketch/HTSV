import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

const REACTIONS = [
  { type: 'LIKE', emoji: '👍', label: 'Thích' },
  { type: 'LOVE', emoji: '❤️', label: 'Yêu thích' },
  { type: 'HAHA', emoji: '😆', label: 'Haha' },
  { type: 'SAD', emoji: '😢', label: 'Buồn' },
  { type: 'ANGRY', emoji: '😡', label: 'Phẫn nộ' },
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

  const { data: post } = useQuery<PostDetail>({
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
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, still record the share
    }
    share.mutate();
  };

  if (!post) return null;

  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 text-xs text-slate-500">
          {post.isAnonymous ? 'Ẩn danh' : post.authorUser?.fullName}
        </div>
        <p className="mb-3 whitespace-pre-wrap text-slate-800">{post.content}</p>

        {totalReactions > 0 && (
          <div className="mb-2 text-xs text-slate-500">
            {REACTIONS.filter((r) => post.reactions[r.type]).map(
              (r) => `${r.emoji} ${post.reactions[r.type]}`,
            ).join('  ')}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-1 border-t border-slate-100 pt-3">
          {user &&
            REACTIONS.map((r) => (
              <button
                key={r.type}
                onClick={() => react.mutate(r.type)}
                title={r.label}
                className={`rounded-lg px-2 py-1 text-sm hover:bg-slate-100 ${
                  post.myReaction === r.type ? 'bg-slate-200' : ''
                }`}
              >
                {r.emoji} {r.label}
              </button>
            ))}
          <button
            onClick={handleShare}
            className="ml-auto rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
          >
            🔗 {copied ? 'Đã copy link!' : 'Chia sẻ'} ({post.shareCount})
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="mb-2 font-semibold text-slate-900">Bình luận</h2>
        <div className="space-y-2">
          {post.binhLuans.map((c) => (
            <div key={c.id} className="rounded-lg bg-white p-3 text-sm">
              <div className="mb-1 text-xs text-slate-500">
                {c.isAnonymous ? 'Ẩn danh' : c.authorUser?.fullName}
              </div>
              {c.content}
            </div>
          ))}
        </div>
        {user && (
          <div className="mt-3 flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Viết bình luận..."
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              onClick={() => addComment.mutate()}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
            >
              Gửi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
