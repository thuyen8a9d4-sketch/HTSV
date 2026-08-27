import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

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
  _count: { luotThiches: number };
}

export function ForumDetailPage() {
  const { id } = useParams();
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const { data: post } = useQuery<PostDetail>({
    queryKey: ['forum-post', id],
    queryFn: async () => (await apiClient.get(`/forum/posts/${id}`)).data,
  });

  const like = useMutation({
    mutationFn: () => apiClient.post(`/forum/posts/${id}/like`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['forum-post', id] }),
  });

  const addComment = useMutation({
    mutationFn: () => apiClient.post(`/forum/posts/${id}/comments`, { content: comment }),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['forum-post', id] });
    },
  });

  if (!post) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 text-xs text-slate-500">
          {post.isAnonymous ? 'Ẩn danh' : post.authorUser?.fullName}
        </div>
        <p className="mb-3 whitespace-pre-wrap text-slate-800">{post.content}</p>
        {user && (
          <button onClick={() => like.mutate()} className="text-sm text-slate-600 hover:underline">
            👍 Thích ({post._count.luotThiches})
          </button>
        )}
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
