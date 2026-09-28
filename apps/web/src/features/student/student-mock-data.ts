import type { ScheduleDay, StudentFaq, StudentService, StudySession } from './student-types';

export const requestTypes = [
  'Báo cáo vi phạm nội dung',
  'Yêu cầu gỡ bài viết hoặc bình luận',
  'Hỗ trợ tài khoản & bảo mật',
  'Góp ý xây dựng cộng đồng',
  'Xác thực thông tin sinh viên',
  'Xin giấy xác nhận sinh viên',
  'Hỗ trợ học vụ',
  'Khác',
] as const;

export const studentServices: StudentService[] = [
  { id: 'forum', name: 'Diễn đàn Confession', description: 'Tâm sự & chia sẻ ẩn danh', group: 'learning', icon: 'people', tone: 'blue', guidance: 'Không gian mở để sinh viên bày tỏ cảm nghĩ, hỏi bài tập hoặc tâm sự ẩn danh.', path: '/forum', keywords: 'confession bài viết tâm sự bình luận' },
  { id: 'report', name: 'Báo cáo vi phạm', description: 'Giữ môi trường lành mạnh', group: 'affairs', icon: 'shield', tone: 'rose', guidance: 'Gửi báo cáo về bài viết hoặc bình luận có nội dung quấy rối, xúc phạm hoặc tiết lộ thông tin cá nhân.', requestType: 'Báo cáo vi phạm nội dung', keywords: 'báo cáo tố cáo vi phạm spam' },
  { id: 'faq', name: 'Quy chế & Hỏi đáp', description: 'Nội quy và hướng dẫn', group: 'learning', icon: 'bulb', tone: 'green', guidance: 'Tìm hiểu tiêu chuẩn cộng đồng, cách đăng bài và các câu hỏi thường gặp.', path: '/faq', keywords: 'nội quy hướng dẫn faq' },
  { id: 'support', name: 'Hỗ trợ sinh viên', description: 'Giải đáp thắc mắc học đường', group: 'affairs', icon: 'headset', tone: 'blue', guidance: 'Gửi phản ánh hoặc cần trợ giúp về tài khoản và các vấn đề sinh viên.', requestType: 'Hỗ trợ học vụ', keywords: 'hỗ trợ thắc mắc giúp đỡ' },
  { id: 'confirmation', name: 'Giấy tờ sinh viên', description: 'Mẫu xác nhận sinh viên', group: 'affairs', icon: 'file', tone: 'amber', guidance: 'Tạo hồ sơ mẫu về giấy xác nhận sinh viên phục vụ vay vốn, tạm hoãn NVQS hoặc xe buýt.', requestType: 'Xin giấy xác nhận sinh viên', keywords: 'giấy xác nhận vay vốn NVQS' },
  { id: 'feedback', name: 'Góp ý cộng đồng', description: 'Đóng góp ý kiến phát triển', group: 'affairs', icon: 'bulb', tone: 'amber', guidance: 'Chia sẻ đề xuất để HTSV ngày càng hoàn thiện và hữu ích hơn cho sinh viên.', requestType: 'Góp ý xây dựng cộng đồng', keywords: 'góp ý ý kiến' },
];

export const studentFaqs: StudentFaq[] = [
  { id: 'anonymous-safety', question: 'Đăng bài ẩn danh thì người khác có biết danh tính của mình không?', answer: 'Không. Khi bạn bật chế độ “Ẩn danh”, hệ thống sẽ hiển thị bài viết dưới tên “Người dùng ẩn danh” và ẩn hoàn toàn tên, email cũng như avatar của bạn với tất cả thành viên khác.' },
  { id: 'moderation-process', question: 'Bài viết Confession gửi lên mất bao lâu để được phê duyệt?', answer: 'Tất cả bài viết được kiểm duyệt để đảm bảo tuân thủ tiêu chuẩn cộng đồng, không có nội dung xúc phạm, công kích cá nhân hay vi phạm thuần phong mỹ tục. Bài viết thường được duyệt trong vài giờ.' },
  { id: 'report-content', question: 'Làm thế nào để báo cáo bài viết hoặc bình luận vi phạm?', answer: 'Bạn có thể chọn nút “Báo cáo” ngay tại bài viết hoặc vào mục “Hỗ trợ & Báo cáo” để gửi lý do vi phạm. Ban quản trị sẽ nhận thông báo và xử lý kịp thời.' },
  { id: 'account-security', question: 'Quên mật khẩu hoặc không nhận được mã OTP xác thực thì làm sao?', answer: 'Bạn hãy kiểm tra hòm thư rác (Spam) trong email đã đăng ký. Nếu vẫn không nhận được mã, vui lòng sử dụng chức năng gửi lại OTP hoặc gửi yêu cầu hỗ trợ tài khoản.' },
  { id: 'student-verification', question: 'Mã sinh viên, lớp và ngành học được cập nhật như thế nào?', answer: 'Thông tin sinh viên sẽ được đối chiếu và kích hoạt khi bạn hoàn tất xác thực thông tin tại trường hoặc qua hệ thống liên kết tài khoản chính thức.' },
];

const sessionsByDay: StudySession[][] = [
  [{ time: '13:00 – 17:15', subject: 'Thiết kế đồ họa', room: 'I3-03 · Phòng máy 3', lecturer: 'ThS. Nguyễn Việt Nga' }],
  [{ time: '07:00 – 09:30', subject: 'Quản trị mạng máy tính', room: 'I2-01 · Phòng máy 1', lecturer: 'ThS. Trần Minh An' }, { time: '13:00 – 15:30', subject: 'Hệ điều hành', room: 'A4-02', lecturer: 'ThS. Lê Hoàng Nam' }],
  [{ time: '07:00 – 11:15', subject: 'Lập trình thiết bị di động', room: 'I3-02 · Phòng máy 2', lecturer: 'ThS. Nguyễn Thanh Hà' }],
  [],
  [{ time: '13:00 – 16:20', subject: 'Hệ quản trị CSDL', room: 'I2-03 · Phòng máy 3', lecturer: 'ThS. Phạm Minh Khoa' }],
  [], [],
];

export function getWeekSchedule(now = new Date()): ScheduleDay[] {
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() + 6) % 7);
  return sessionsByDay.map((sessions, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return { date, label: index === 6 ? 'Chủ nhật' : `Thứ ${index + 2}`, isToday: date.toDateString() === now.toDateString(), sessions };
  });
}

export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();
}
