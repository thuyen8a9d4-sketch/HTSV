import { formatRelativeTime } from '../../lib/format-relative-time';
import { useQuery } from '@tanstack/react-query';
import { lazy, Suspense, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { EmptyState } from '../../components/EmptyState';
import {
  ArrowRight,
  BookOpen,
  ChatBubble,
  Check,
  Clock,
  Copy,
  FileText,
  Flame,
  Heart,
  Home,
  Plus,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  XMark,
} from '../../components/Icons';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { NavbarActionMenu } from '../../components/NavbarActionMenu';
import { QueryError } from '../../components/QueryError';
import { forumPostsQuery } from './forum-queries';
import { useAuthStore } from '../../lib/auth-store';
const XylophoneCanvas = lazy(() => import('./xylophone').then((m) => ({ default: m.XylophoneCanvas })));


const TRENDING_TAGS = [
  { tag: '#ThiHocKy2026', count: '142 bài' },
  { tag: '#KTXNamCanTho', count: '98 bài' },
  { tag: '#CLBSinhVien', count: '76 bài' },
  { tag: '#TimDoThatLac', count: '54 bài' },
  { tag: '#GocHocTapIT', count: '38 bài' },
];


function getCategoryMeta(categoryName?: string | null, content = '') {
  const lowerName = (categoryName ?? '').toLowerCase();
  const lowerContent = content.toLowerCase();

  if (
    lowerName.includes('học') ||
    lowerName.includes('study') ||
    lowerContent.includes('đồ án') ||
    lowerContent.includes('môn học') ||
    lowerContent.includes('thi cử') ||
    lowerContent.includes('giảng viên') ||
    lowerContent.includes('tín chỉ')
  ) {
    return {
      label: categoryName ?? 'Góc học tập',
      icon: BookOpen,
      badgeClass:
        'bg-blue-50 text-blue-700 border-blue-200/90 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
    };
  }

  if (
    lowerName.includes('ktx') ||
    lowerName.includes('ký túc') ||
    lowerContent.includes('phòng ktx') ||
    lowerContent.includes('bạn cùng phòng') ||
    lowerContent.includes('nấu ăn')
  ) {
    return {
      label: categoryName ?? 'Tâm sự KTX',
      icon: Home,
      badgeClass:
        'bg-amber-50 text-amber-700 border-amber-200/90 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
    };
  }

  if (
    lowerName.includes('tìm') ||
    lowerName.includes('lạc') ||
    lowerName.includes('lost') ||
    lowerContent.includes('thất lạc') ||
    lowerContent.includes('nhặt được') ||
    lowerContent.includes('rơi ví') ||
    lowerContent.includes('thẻ sinh viên')
  ) {
    return {
      label: categoryName ?? 'Tìm đồ thất lạc',
      icon: Search,
      badgeClass:
        'bg-purple-50 text-purple-700 border-purple-200/90 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
    };
  }

  return {
    label: categoryName ?? 'Góc sẻ chia',
    icon: Sparkles,
    badgeClass:
      'bg-cyan-50 text-cyan-700 border-cyan-200/90 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/60',
  };
}

export function ForumFeedPage() {
  const [postMenuOpen, setPostMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const deferredSearch = useDeferredValue(searchQuery);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  const user = useAuthStore((s) => s.user);

  const { data, isLoading, isError, refetch } = useQuery(forumPostsQuery);

  const filterOptions = [
    { key: 'all', label: 'Tất cả' },
    { key: 'hot', label: 'Hot trong tuần', icon: Flame },
    { key: 'study', label: 'Góc học tập', icon: BookOpen },
    { key: 'ktx', label: 'Tâm sự KTX', icon: Home },
    { key: 'lost', label: 'Tìm đồ thất lạc', icon: Search },
  ];

  // Tính số lượng bài viết cho từng bộ lọc
  const filterCounts = useMemo(() => {
    if (!data) return {};
    const counts: Record<string, number> = {
      all: data.length,
      hot: 0,
      study: 0,
      ktx: 0,
      lost: 0,
    };

    data.forEach((post) => {
      const reactions = (post._count?.luotThiches ?? 0) + (post._count?.binhLuans ?? 0);
      if (reactions >= 2) counts.hot = (counts.hot ?? 0) + 1;

      const meta = getCategoryMeta(post.category?.name, post.content);
      if (meta.icon === BookOpen) counts.study = (counts.study ?? 0) + 1;
      if (meta.icon === Home) counts.ktx = (counts.ktx ?? 0) + 1;
      if (meta.icon === Search) counts.lost = (counts.lost ?? 0) + 1;
    });

    return counts;
  }, [data]);

  // Lọc và tìm kiếm danh sách bài viết
  const filteredPosts = useMemo(() => {
    if (!data) return [];

    let result = [...data];

    // Lọc theo Search Query
    const query = deferredSearch.trim().toLowerCase();
    if (query) {
      result = result.filter((post) => {
        const matchContent = post.content.toLowerCase().includes(query);
        const matchAuthor = !post.isAnonymous && post.authorUser?.fullName?.toLowerCase().includes(query);
        const matchCategory = post.category?.name?.toLowerCase().includes(query);
        return matchContent || matchAuthor || matchCategory;
      });
    }

    // Lọc theo Category / Hot
    if (activeFilter === 'hot') {
      result.sort((a, b) => {
        const totalA = (a._count?.luotThiches ?? 0) * 2 + (a._count?.binhLuans ?? 0) * 3;
        const totalB = (b._count?.luotThiches ?? 0) * 2 + (b._count?.binhLuans ?? 0) * 3;
        return totalB - totalA;
      });
    } else if (activeFilter === 'study') {
      result = result.filter((p) => getCategoryMeta(p.category?.name, p.content).icon === BookOpen);
    } else if (activeFilter === 'ktx') {
      result = result.filter((p) => getCategoryMeta(p.category?.name, p.content).icon === Home);
    } else if (activeFilter === 'lost') {
      result = result.filter((p) => getCategoryMeta(p.category?.name, p.content).icon === Search);
    }

    return result;
  }, [data, activeFilter, deferredSearch]);

  const handleCopyLink = async (e: React.MouseEvent, postId: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const url = `${window.location.origin}/forum/${postId}`;
      await navigator.clipboard.writeText(url);
      setCopiedId(postId);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedId(null), 2200);
    } catch {
      // Fallback
    }
  };

  const handleHashtagClick = (tag: string) => {
    setSearchQuery(tag);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const createPostAction = (
    <NavbarActionMenu
      label="Đăng bài mới"
      open={postMenuOpen}
      onOpenChange={setPostMenuOpen}
      items={[
        { label: 'Đăng bài công khai', to: '/forum/new?anonymous=false', icon: <FileText className="h-5 w-5" /> },
        { label: 'Đăng bài ẩn danh', to: '/forum/new?anonymous=true', icon: <Shield className="h-5 w-5" /> },
      ]}
      className="btn-nav-action-icon inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 focus-ring active:scale-95"
    >
      <Plus className="h-6 w-6 stroke-[2.2]" />
    </NavbarActionMenu>
  );

  return (
    <div className="forum-page relative min-h-screen">
      {/* 3D Glass Xylophone Interactive Background (Giữ nguyên 100%) */}
      <Suspense fallback={null}><XylophoneCanvas /></Suspense>

      {/* Main Foreground Content */}
      <div className="forum-glass-surface relative z-10 mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* ── Hero Banner ── */}
        <section className="forum-glass-panel relative z-20 mb-8 rounded-3xl p-6 sm:p-8">
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur-md dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
                <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Cộng đồng Sinh viên DNC · Nơi sẻ chia & gắn kết</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
                Một góc nhỏ để sẻ chia,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  lắng nghe và đồng cảm.
                </span>
              </h1>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Từ chuyện giảng đường, đồ án, ký túc xá đến những tâm sự chưa từng ngỏ lời. Bạn luôn tìm thấy sự ấm áp và tôn trọng tại diễn đàn HTSV.
              </p>
            </div>

            <div className="forum-post-actions relative flex flex-wrap items-center gap-3">
              <Link
                to="/forum/new?anonymous=false"
                className="btn-nav-action inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-md shadow-blue-500/20"
              >
                <Plus className="h-4 w-4" />
                <span>Chia sẻ câu chuyện</span>
              </Link>
              {createPostAction}
            </div>
          </div>
        </section>

        {/* ── Grid Bố cục 2 Cột ── */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Cột trái: Tìm kiếm, Bộ lọc & Danh sách bài viết */}
          <section aria-label="Bảng tin diễn đàn" className="min-w-0 space-y-6">
            {/* Thanh Tìm kiếm & Điều khiển Kính */}
            <div className="forum-glass-panel rounded-2xl p-4 sm:p-5">
              {/* Ô tìm kiếm nhanh */}
              <div className="relative mb-4">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  aria-label="Tìm kiếm bài viết"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm câu chuyện, chủ đề, tên sinh viên hoặc #hashtag..."
                  className="w-full rounded-xl border border-slate-200/80 bg-white/80 py-2.5 pr-10 pl-10 text-sm text-slate-800 placeholder-slate-400 backdrop-blur-md transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
                    title="Xóa tìm kiếm"
                  >
                    <XMark className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Thanh Filter Pills cuộn ngang */}
              <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
                <div className="flex shrink-0 items-center gap-2" role="group" aria-label="Lọc bài viết">
                  {filterOptions.map((filter) => {
                    const Icon = filter.icon;
                    const isActive = activeFilter === filter.key;
                    const count = filterCounts[filter.key] ?? 0;

                    return (
                      <button
                        key={filter.key}
                        type="button"
                        onClick={() => setActiveFilter(filter.key)}
                        className={`forum-filter-pill inline-flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 ${
                          isActive ? 'active' : ''
                        }`}
                        aria-pressed={isActive}
                      >
                        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                        <span>{filter.label}</span>
                        {count > 0 && (
                          <span
                            className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                    }}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Đặt lại</span>
                  </button>
                )}
              </div>
            </div>

            {/* Thông tin số lượng bài viết */}
            <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">
                {searchQuery ? (
                  <>
                    Kết quả tìm kiếm cho <strong className="text-slate-800 dark:text-slate-200">"{searchQuery}"</strong>: {filteredPosts.length} bài
                  </>
                ) : (
                  <>Đang hiển thị {filteredPosts.length} bài viết trên diễn đàn</>
                )}
              </span>
              <span className="text-[11px] text-slate-400">Tự động cập nhật</span>
            </div>

            {/* Loading & Error States */}
            {isLoading && (
              <div className="space-y-4">
                <LoadingSkeleton count={3} />
              </div>
            )}

            {isError && (
              <QueryError
                retry={() => {
                  void refetch();
                }}
              />
            )}

            {/* Feed Danh sách Bài viết */}
            {!isLoading && !isError && (
              <div className="space-y-5">
                {filteredPosts.map((post) => {
                  const meta = getCategoryMeta(post.category?.name, post.content);
                  const CategoryIcon = meta.icon;
                  const isCopied = copiedId === post.id;

                  return (
                    <article
                      key={post.id}
                      className="forum-post-card group"
                    >
                      <Link
                        to={`/forum/${post.id}`}
                        className="focus-ring block p-5 sm:p-6"
                      >
                        {/* Header bài viết */}
                        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row">
                          <div className="flex min-w-0 items-start gap-3">
                            <Avatar
                              name={post.authorUser?.fullName}
                              anonymous={post.isAnonymous}
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 break-words dark:text-white">
                                {post.isAnonymous ? (
                                  <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                                    <Shield className="h-4 w-4 shrink-0 text-blue-500" />
                                    <span>Sinh viên ẩn danh</span>
                                  </span>
                                ) : (
                                  post.authorUser?.fullName ?? 'Thành viên DNC'
                                )}
                              </p>
                              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <time
                                  dateTime={post.createdAt}
                                  className="flex items-center gap-1"
                                >
                                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                                  <span>{formatRelativeTime(post.createdAt)}</span>
                                </time>
                                <span>·</span>
                                <span className="text-[11px] text-slate-400">
                                  {post.isAnonymous ? 'Bảo vệ danh tính' : 'Sinh viên DNC'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Category Badge */}
                          <div className="shrink-0">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md transition-colors ${meta.badgeClass}`}
                            >
                              <CategoryIcon className="h-3.5 w-3.5 shrink-0" />
                              <span>{meta.label}</span>
                            </span>
                          </div>
                        </div>

                        {/* Nội dung bài viết */}
                        <p className="line-clamp-4 text-[14.5px] leading-relaxed whitespace-pre-wrap break-words text-slate-700 dark:text-slate-200">
                          {post.content}
                        </p>

                        {/* Footer tương tác của Card */}
                        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/60 pt-4 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300">
                          {/* Lượt thích */}
                          <span
                            className="liquid-pill group-hover:border-rose-200/80 group-hover:bg-rose-50/50 dark:group-hover:bg-rose-950/20"
                            title="Lượt cảm xúc"
                          >
                            <Heart className="h-4 w-4 text-rose-500" />
                            <span className="font-semibold">{post._count?.luotThiches ?? 0}</span>
                            <span className="sr-only">lượt cảm xúc</span>
                          </span>

                          {/* Lượt bình luận */}
                          <span
                            className="liquid-pill group-hover:border-blue-200/80 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-950/20"
                            title="Lượt bình luận"
                          >
                            <ChatBubble className="h-4 w-4 text-blue-500" />
                            <span className="font-semibold">{post._count?.binhLuans ?? 0}</span>
                            <span className="sr-only">bình luận</span>
                          </span>

                          {/* Nút Sao chép liên kết nhanh */}
                          <button
                            type="button"
                            onClick={(e) => handleCopyLink(e, post.id)}
                            className="liquid-pill transition-all duration-200 hover:scale-105 active:scale-95"
                            title="Sao chép liên kết bài viết"
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="font-semibold text-emerald-600">Đã chép link!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5 text-slate-500" />
                                <span>Chia sẻ</span>
                              </>
                            )}
                          </button>

                          {/* CTA Đọc tiếp */}
                          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400">
                            <span>Thảo luận</span>
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </Link>
                    </article>
                  );
                })}

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                  <EmptyState
                    title={searchQuery ? 'Không tìm thấy bài viết phù hợp' : 'Chưa có câu chuyện nào'}
                    description={
                      searchQuery
                        ? `Không có bài viết nào khớp với từ khóa "${searchQuery}". Hãy thử tìm kiếm với cụm từ khác hoặc chọn danh mục khác.`
                        : 'Hãy là người đầu tiên mở đầu câu chuyện trên diễn đàn HTSV.'
                    }
                    action={
                      searchQuery ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setActiveFilter('all');
                          }}
                          className="btn-liquid-glass btn-primary inline-flex items-center gap-2"
                        >
                          <RotateCcw className="h-4 w-4" />
                          <span>Xem tất cả bài viết</span>
                        </button>
                      ) : (
                        <Link
                          to="/forum/new?anonymous=false"
                          className="btn-liquid-glass btn-primary inline-flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Chia sẻ ngay</span>
                        </Link>
                      )
                    }
                  />
                )}
              </div>
            )}
          </section>

          {/* Cột phải: Sidebar Thông tin & Tiện ích sinh viên */}
          <aside className="min-w-0 space-y-6 lg:sticky lg:top-24">
            {/* Widget 1: Hộp tạo bài nhanh */}
            <div className="forum-glass-panel rounded-3xl p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <Avatar name={user?.fullName} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                    {user ? user.fullName : 'Bạn đang nghĩ gì?'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user ? 'Cùng chia sẻ với bạn bè' : 'Đăng nhập để kết nối'}
                  </p>
                </div>
              </div>

              <Link
                to="/forum/new?anonymous=false"
                className="block w-full rounded-xl border border-slate-200/90 bg-white/70 p-3 text-xs text-slate-500 shadow-inner transition-colors hover:border-blue-400 hover:bg-white dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-400"
              >
                Nhắn gửi tâm sự, hỏi bài tập hoặc chia sẻ tin tức...
              </Link>

              <div className="mt-4 flex gap-2">
                <Link
                  to="/forum/new?anonymous=false"
                  className="btn-liquid-glass flex-1 justify-center text-xs"
                >
                  <FileText className="h-3.5 w-3.5 text-blue-600" />
                  <span>Đăng bài</span>
                </Link>
                <Link
                  to="/forum/new?anonymous=true"
                  className="btn-liquid-glass flex-1 justify-center text-xs"
                >
                  <Shield className="h-3.5 w-3.5 text-cyan-600" />
                  <span>Ẩn danh</span>
                </Link>
              </div>
            </div>

            {/* Widget 2: Chủ đề thịnh hành (#Trending) */}
            <div className="forum-glass-panel rounded-3xl p-5 sm:p-6">
              <div className="mb-3.5 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                  <Flame className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Chủ đề thịnh hành DNC
                </h3>
              </div>

              <div className="space-y-2.5">
                {TRENDING_TAGS.map((item) => (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => handleHashtagClick(item.tag)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-blue-50/80 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                  >
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 3: Nhịp sống cộng đồng (Community Pulse) */}
            <div className="forum-glass-panel rounded-3xl p-5 sm:p-6">
              <h3 className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase">
                Nhịp sống sinh viên
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-2xl border border-white/60 bg-white/50 p-3 backdrop-blur-sm dark:border-white/5 dark:bg-slate-800/40">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {data ? data.length : '120+'}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">Câu chuyện</p>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/50 p-3 backdrop-blur-sm dark:border-white/5 dark:bg-slate-800/40">
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">98%</p>
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">Đồng cảm</p>
                </div>
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                Nơi bạn luôn có những người bạn đồng hành lắng nghe mọi trải nghiệm đại học.
              </p>
            </div>

            {/* Widget 4: Quy tắc văn minh & Cam kết bảo mật */}
            <div className="rounded-3xl border border-slate-200/70 bg-white/50 p-5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/40">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Không gian an toàn & Tử tế</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                Tôn trọng sự khác biệt, bảo vệ danh tính tuyệt đối và trao gửi sự động viên. Mọi câu chuyện đều được kiểm duyệt vì một cộng đồng văn minh.
              </p>
            </div>
          </aside>
        </div>

        {/* ── Dải chuyển tiếp mềm mại kết nối với Footer mới ── */}
        <div
          className="pointer-events-none mt-12 h-16 w-full bg-gradient-to-b from-transparent to-slate-100/50 dark:to-slate-900/50"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
