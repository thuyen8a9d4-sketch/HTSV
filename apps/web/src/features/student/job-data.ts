function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export type JobType = 'Thực tập' | 'Toàn thời gian' | 'Bán thời gian';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  type: JobType;
  field: string;
  location: string;
  skills: string[];
  salary?: string;
  deadline: string;
  description: string;
}

// Tin tuyển dụng/thực tập mẫu — hệ thống chưa nối nguồn tin thật từ doanh nghiệp (P7 trong backlog).
export const jobPostings: JobPosting[] = [
  { id: 'intern-fe', title: 'Thực tập sinh Frontend Developer', company: 'Công ty TNHH Công nghệ ABC', type: 'Thực tập', field: 'Công nghệ thông tin', location: 'Cần Thơ', skills: ['HTML/CSS', 'JavaScript', 'React'], salary: 'Hỗ trợ 2-3 triệu/tháng', deadline: daysFromNow(30), description: 'Tham gia phát triển giao diện web cùng đội kỹ thuật, được mentor hướng dẫn 1-1 và xét nhận chính thức sau khi tốt nghiệp.' },
  { id: 'intern-design', title: 'Thực tập sinh Thiết kế đồ họa', company: 'Agency Sáng Tạo XYZ', type: 'Thực tập', field: 'Thiết kế đồ họa', location: 'Cần Thơ', skills: ['Photoshop', 'Illustrator', 'Figma'], deadline: daysFromNow(20), description: 'Thiết kế ấn phẩm truyền thông, hỗ trợ dự án thực tế cho khách hàng của agency.' },
  { id: 'fulltime-network', title: 'Kỹ thuật viên Quản trị mạng', company: 'Trung tâm Dữ liệu DEF', type: 'Toàn thời gian', field: 'Quản trị mạng máy tính', location: 'Cần Thơ', skills: ['Quản trị hệ thống', 'Linux', 'Bảo mật mạng'], salary: '8-12 triệu/tháng', deadline: daysFromNow(45), description: 'Vận hành, giám sát hệ thống mạng nội bộ và trung tâm dữ liệu, trực ca theo lịch phân công.' },
  { id: 'parttime-data-entry', title: 'Nhân viên nhập liệu bán thời gian', company: 'Công ty Giải pháp GHI', type: 'Bán thời gian', field: 'Hệ quản trị CSDL', location: 'Làm từ xa', skills: ['Excel', 'Cẩn thận, tỉ mỉ'], salary: '25.000 đ/giờ', deadline: daysFromNow(15), description: 'Nhập và kiểm tra dữ liệu theo yêu cầu, làm việc linh hoạt theo ca, phù hợp sinh viên năm cuối.' },
  { id: 'intern-mobile', title: 'Thực tập sinh lập trình di động', company: 'Startup JKL', type: 'Thực tập', field: 'Lập trình thiết bị di động', location: 'Cần Thơ', skills: ['Flutter', 'Android', 'Git'], deadline: daysFromNow(25), description: 'Tham gia phát triển ứng dụng di động cho sản phẩm thực tế của startup, môi trường trẻ, năng động.' },
];
