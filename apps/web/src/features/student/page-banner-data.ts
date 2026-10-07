import type { StudentView } from './StudentHomePage';

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/page-banners/${name}.webp`;
const image = (name: string, width = 1920) => ({
  image: asset(name),
  imageSrcSet: `${asset(`${name}-768`)} 768w, ${asset(name)} ${width}w`,
});
const banners = {
  academic: { ...image('academic', 1038), imageAlt: 'Sinh viên DNC học tập tại giảng đường', category: 'Học vụ', imagePosition: 'center 65%' },
  services: { ...image('campus'), imageAlt: 'Cổng Trường Đại học Nam Cần Thơ giữa khuôn viên xanh', category: 'Tiện ích sinh viên', imagePosition: 'center 50%' },
  support: { ...image('support'), imageAlt: 'Khu hành chính Trường Đại học Nam Cần Thơ', category: 'Hỗ trợ sinh viên', imagePosition: 'center 65%' },
  career: { ...image('career', 1800), imageAlt: 'Ngày hội việc làm DNC Job Fair 2025', category: 'Hướng nghiệp', imagePosition: 'center 40%' },
  life: { ...image('student-life'), imageAlt: 'Hoạt động chào đón sinh viên DNC', category: 'Đời sống sinh viên', imagePosition: 'center 55%' },
  campus: { ...image('campus'), imageAlt: 'Cổng Trường Đại học Nam Cần Thơ', category: 'Khám phá DNC', imagePosition: 'center' },
  library: { ...image('library'), imageAlt: 'Sinh viên tham gia hướng dẫn sử dụng thư viện DNC', category: 'Học liệu', imagePosition: 'center 45%' },
};

const bannerGroups = {
  schedule: 'academic', services: 'services', requests: 'support', faq: 'support', support: 'support',
  tuition: 'support', announcements: 'life', 'conduct-score': 'life', 'grade-appeal': 'academic',
  'class-sections': 'academic', transcript: 'academic', scholarship: 'academic', jobs: 'career',
  'cv-builder': 'career', 'career-guidance': 'career', 'development-path': 'career', 'personal-path': 'career',
  'interview-practice': 'career', 'staff-lecturer': 'academic', 'staff-advisor': 'support', 'staff-office': 'support',
  'campus-map': 'campus', library: 'library',
} satisfies Record<Exclude<StudentView, 'home' | 'dorm'>, keyof typeof banners>;

export function getPageBanner(view: Exclude<StudentView, 'home' | 'dorm'>) {
  return banners[bannerGroups[view]];
}
