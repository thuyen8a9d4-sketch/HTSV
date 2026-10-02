import { queryOptions } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface ForumPost {
  id: number;
  content: string;
  isAnonymous: boolean;
  createdAt: string;
  authorUser: { fullName: string } | null;
  category: { name: string } | null;
  shareCount: number;
  _count?: { binhLuans: number; luotThiches: number };
}

// Home and forum share the same cache and cancellation behavior.
export const forumPostsQuery = queryOptions({
  queryKey: ['forum-posts'],
  queryFn: async ({ signal }): Promise<ForumPost[]> => {
    const { data } = await apiClient.get<ForumPost[]>('/forum/posts', { signal });
    if (!Array.isArray(data)) throw new Error('Danh sách bài viết không hợp lệ.');
    return data;
  },
  staleTime: 30_000,
});
