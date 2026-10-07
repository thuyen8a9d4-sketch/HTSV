import type { ForumPost } from './forum-queries';

export function searchForumPosts(posts: ForumPost[], search: string) {
  const query = search.trim().toLocaleLowerCase('vi');
  return posts.filter((post) => !query || [post.content, post.category?.name,
    !post.isAnonymous ? post.authorUser?.fullName : undefined,
  ].some((value) => value?.toLocaleLowerCase('vi').includes(query)));
}

// Tuần hiện tại bắt đầu vào thứ Hai, theo giờ địa phương của người đọc.
export function getHotPosts(posts: ForumPost[], now = new Date()) {
  const weekStart = new Date(now);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 6) % 7);
  const score = (post: ForumPost) => (post._count?.luotThiches ?? 0) * 2 + (post._count?.binhLuans ?? 0) * 3;
  return posts.filter((post) => {
    const created = new Date(post.createdAt).getTime();
    const reactions = (post._count?.luotThiches ?? 0) + (post._count?.binhLuans ?? 0);
    return created >= weekStart.getTime() && created <= now.getTime() && reactions >= 2;
  }).sort((a, b) => score(b) - score(a) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getForumHashtags(posts: ForumPost[]) {
  const tags = new Map<string, { tag: string; count: number }>();
  for (const post of posts) {
    const seen = new Set<string>();
    for (const tag of post.content.match(/#[\p{L}\p{N}_]+/gu) ?? []) {
      const key = tag.toLocaleLowerCase('vi');
      if (seen.has(key)) continue;
      seen.add(key);
      const current = tags.get(key);
      tags.set(key, { tag: current?.tag ?? tag, count: (current?.count ?? 0) + 1 });
    }
  }
  return [...tags.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'vi')).slice(0, 5);
}
