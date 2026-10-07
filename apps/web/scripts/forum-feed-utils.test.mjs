import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getForumHashtags, getHotPosts, searchForumPosts } from '../src/features/forum/forum-feed-utils.ts';

const post = (id, changes = {}) => ({
  id, content: 'Một câu chuyện', isAnonymous: false,
  createdAt: new Date(2026, 9, 1, 12).toISOString(),
  authorUser: { fullName: 'Sinh viên DNC' }, category: null, shareCount: 0,
  _count: { luotThiches: 2, binhLuans: 0 }, ...changes,
});

test('Hot excludes previous week, future, invalid dates and low engagement; sorts eligible posts', () => {
  const now = new Date(2026, 9, 3, 12);
  const posts = [
    post(1, { createdAt: new Date(2026, 8, 27, 23, 59).toISOString(), _count: { luotThiches: 100, binhLuans: 10 } }),
    post(2, { createdAt: new Date(2026, 8, 28).toISOString() }),
    post(3, { _count: { luotThiches: 0, binhLuans: 2 } }),
    post(4, { createdAt: new Date(2026, 9, 4).toISOString() }),
    post(5, { createdAt: 'invalid' }),
    post(6, { _count: { luotThiches: 1, binhLuans: 0 } }),
  ];
  assert.deepEqual(getHotPosts(posts, now).map((item) => item.id), [3, 2]);
  assert.equal(posts.length, 6);
});

test('Sunday belongs to the same week; Monday starts a new week', () => {
  const posts = [post(1)];
  assert.equal(getHotPosts(posts, new Date(2026, 9, 4, 23, 59)).length, 1);
  assert.equal(getHotPosts(posts, new Date(2026, 9, 5)).length, 0);
});

test('Search never exposes anonymous author names; content and category still match', () => {
  const posts = [post(1, { isAnonymous: true, authorUser: { fullName: 'Tên riêng tư' }, content: '#KýTúcXá', category: { name: 'Đời sống' } })];
  assert.equal(searchForumPosts(posts, 'Tên riêng tư').length, 0);
  assert.equal(searchForumPosts(posts, ' #kýTúcXá ').length, 1);
  assert.equal(searchForumPosts(posts, 'ĐỜI SỐNG').length, 1);
});

test('Hashtags count posts rather than duplicate occurrences, support Vietnamese and merge case variants', () => {
  const tags = getForumHashtags([post(1, { content: '#KýTúcXá #kýTúcXá #Học_Tập' }), post(2, { content: '#KÝTÚCXÁ' })]);
  assert.deepEqual(tags, [{ tag: '#KýTúcXá', count: 2 }, { tag: '#Học_Tập', count: 1 }]);
  assert.deepEqual(getForumHashtags([]), []);
});
