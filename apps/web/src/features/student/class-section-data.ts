import type { ClassSection } from './student-types';

// Dữ liệu mẫu theo đúng môn/giảng viên trong thời khóa biểu hiện có (student-mock-data.ts).
// Liên hệ giảng viên và link nhóm là dữ liệu giả — sẽ thay bằng dữ liệu thật khi lớp học phần (P3) có API.
export const classSections: ClassSection[] = [
  { id: 'thiet-ke-do-hoa', subject: 'Thiết kế đồ họa', lecturer: 'ThS. Nguyễn Việt Nga', lecturerPhone: '0909 123 456', lecturerEmail: 'nvnga@nctu.edu.vn', groupLink: 'https://zalo.me/g/demo-thietkedohoa', schedule: 'Thứ 2 · 13:00 – 17:15', room: 'I3-03 · Phòng máy 3' },
  { id: 'quan-tri-mang', subject: 'Quản trị mạng máy tính', lecturer: 'ThS. Trần Minh An', lecturerPhone: '0909 234 567', lecturerEmail: 'tman@nctu.edu.vn', groupLink: 'https://zalo.me/g/demo-quantrimang', schedule: 'Thứ 3 · 07:00 – 09:30', room: 'I2-01 · Phòng máy 1' },
  { id: 'he-dieu-hanh', subject: 'Hệ điều hành', lecturer: 'ThS. Lê Hoàng Nam', lecturerPhone: '0909 345 678', lecturerEmail: 'lhnam@nctu.edu.vn', groupLink: 'https://zalo.me/g/demo-hedieuhanh', schedule: 'Thứ 3 · 13:00 – 15:30', room: 'A4-02' },
  { id: 'lt-thiet-bi-di-dong', subject: 'Lập trình thiết bị di động', lecturer: 'ThS. Nguyễn Thanh Hà', lecturerPhone: '0909 456 789', lecturerEmail: 'ntha@nctu.edu.vn', groupLink: 'https://zalo.me/g/demo-ltdidong', schedule: 'Thứ 4 · 07:00 – 11:15', room: 'I3-02 · Phòng máy 2' },
  { id: 'he-qt-csdl', subject: 'Hệ quản trị CSDL', lecturer: 'ThS. Phạm Minh Khoa', lecturerPhone: '0909 567 890', lecturerEmail: 'pmkhoa@nctu.edu.vn', groupLink: 'https://zalo.me/g/demo-csdl', schedule: 'Thứ 6 · 13:00 – 16:20', room: 'I2-03 · Phòng máy 3' },
];

export const evaluationCriteria = [
  { id: 'clarity', label: 'Giảng dạy dễ hiểu, có phương pháp' },
  { id: 'support', label: 'Nhiệt tình, hỗ trợ sinh viên khi cần' },
  { id: 'punctual', label: 'Đúng giờ, đúng lịch, đúng đề cương' },
  { id: 'fair', label: 'Công bằng trong kiểm tra, đánh giá' },
] as const;
