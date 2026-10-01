import type { ServiceIcon } from './student-types';

interface StudentNavItem {
  label: string;
  path: string;
  icon: ServiceIcon;
  end: boolean;
  keywords: string;
}

// Shared by desktop, mobile and local navigation search.
export const studentNavigation: StudentNavItem[] = [
  { label: 'Trang chủ', path: '/', icon: 'home', end: true, keywords: 'giới thiệu HTSV' },
  { label: 'Diễn đàn', path: '/forum', icon: 'people', end: false, keywords: 'confession tâm sự bài viết' },
  { label: 'Tiện ích', path: '/services', icon: 'clipboard', end: false, keywords: 'dịch vụ giấy tờ biểu mẫu' },
  { label: 'Đời sống', path: '/dorm', icon: 'home', end: false, keywords: 'ký túc xá KTX chỗ ở câu lạc bộ CLB hoạt động' },
  { label: 'Hỗ trợ', path: '/support', icon: 'headset', end: false, keywords: 'yêu cầu phản ánh báo cáo' },
  { label: 'Hỏi đáp', path: '/faq', icon: 'bulb', end: false, keywords: 'FAQ quy chế nội quy hướng dẫn' },
];

export const studentSearchPages = [
  ...studentNavigation,
  { label: 'Yêu cầu', path: '/requests', icon: 'file' as const, keywords: 'theo dõi hồ sơ tiến độ trạng thái phản ánh' },
];
