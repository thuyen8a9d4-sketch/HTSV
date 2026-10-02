import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { ArrowRight, ChatBubble, Heart } from '../../components/Icons';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { QueryError } from '../../components/QueryError';
import { forumPostsQuery } from '../forum/forum-queries';
import { HomeScrollReveal } from './HomeScrollReveal';


export function FeaturedPosts() {
  const { data, isLoading, isError, refetch } = useQuery(forumPostsQuery);
  const posts = useMemo(() => data ? [...data].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 3) : [], [data]);
  return (
    <section aria-labelledby="community-heading" className="home-section">
      <HomeScrollReveal>
        <div className="home-section-heading">
          <div>
            <h2 id="community-heading" className="home-section-title">Diễn đàn sinh viên</h2>
            <p className="home-section-description">Chia sẻ, hỏi đáp và kết nối với cộng đồng DNC.</p>
          </div>
          <Link to="/forum" className="home-section-link">Vào diễn đàn <ArrowRight aria-hidden="true" /></Link>
        </div>
      </HomeScrollReveal>
      {isLoading && <LoadingSkeleton count={2} />}
      {isError && <QueryError retry={() => { void refetch(); }} />}
      {!isLoading && !isError && !posts.length && (
        <HomeScrollReveal>
          <div className="home-empty">
            <p className="home-empty-title">Chưa có bài viết.</p>
            <p>Ghé diễn đàn và chia sẻ câu chuyện đầu tiên nhé.</p>
          </div>
        </HomeScrollReveal>
      )}
      {!isError && posts.length > 0 && (
        <div className="home-post-grid">
          {posts.map((post, index) => (
            <HomeScrollReveal key={post.id} delay={index * 60}>
              <Link to={`/forum/${post.id}`} className="student-post glass-hover home-card home-post-card">
                <div className="home-post-author">
                  <Avatar name={post.isAnonymous ? undefined : post.authorUser?.fullName} anonymous={post.isAnonymous} />
                  <div className="home-post-author-copy">
                    <p className="home-post-name">{post.isAnonymous ? 'Ẩn danh' : post.authorUser?.fullName ?? 'Thành viên'}</p>
                    <time dateTime={post.createdAt} className="home-post-date">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</time>
                  </div>
                </div>
                <p className="home-post-text">{post.content}</p>
                <div className="home-post-bottom">
                  <span className="home-post-stat"><Heart aria-hidden="true" />{post._count?.luotThiches ?? 0}<span className="sr-only">cảm xúc</span></span>
                  <span className="home-post-stat"><ChatBubble aria-hidden="true" />{post._count?.binhLuans ?? 0}<span className="sr-only">bình luận</span></span>
                  <span className="home-post-read">Đọc tiếp</span>
                </div>
              </Link>
            </HomeScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
