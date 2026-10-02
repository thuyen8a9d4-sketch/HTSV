import type { ScheduleDay, StudentFaq, StudentService, StudySession } from './student-types';

export const requestTypes = [
  'Báo cáo vi phạm nội dung',
  'Yêu cầu gỡ bài viết hoặc bình luận',
  'Hỗ trợ tài khoản & bảo mật',
  'Góp ý xây dựng cộng đồng',
  'Xác thực thông tin sinh viên',
  'Xin giấy xác nhận sinh viên',
  'Hỗ trợ học vụ',
  'Báo hỏng cơ sở vật chất',
  'Báo mất đồ / tìm đồ thất lạc',
  'Đăng ký ở ký túc xá',
  'Khác',
] as const;

export const studentServices: StudentService[] = [
  { id: 'forum', name: 'Diễn đàn Confession', description: 'Tâm sự & chia sẻ ẩn danh', group: 'learning', icon: 'people', tone: 'blue', guidance: 'Không gian mở để sinh viên bày tỏ cảm nghĩ, hỏi bài tập hoặc tâm sự ẩn danh.', path: '/forum', keywords: 'confession bài viết tâm sự bình luận' },
  { id: 'report', name: 'Báo cáo vi phạm', description: 'Giữ môi trường lành mạnh', group: 'affairs', icon: 'shield', tone: 'rose', guidance: 'Gửi báo cáo về bài viết hoặc bình luận có nội dung quấy rối, xúc phạm hoặc tiết lộ thông tin cá nhân.', requestType: 'Báo cáo vi phạm nội dung', keywords: 'báo cáo tố cáo vi phạm spam' },
  { id: 'faq', name: 'Quy chế & Hỏi đáp', description: 'Nội quy và hướng dẫn', group: 'learning', icon: 'bulb', tone: 'green', guidance: 'Tìm hiểu tiêu chuẩn cộng đồng, cách đăng bài và các câu hỏi thường gặp.', path: '/faq', keywords: 'nội quy hướng dẫn faq' },
  { id: 'support', name: 'Hỗ trợ sinh viên', description: 'Giải đáp thắc mắc học đường', group: 'affairs', icon: 'headset', tone: 'blue', guidance: 'Gửi phản ánh hoặc cần trợ giúp về tài khoản và các vấn đề sinh viên.', requestType: 'Hỗ trợ học vụ', keywords: 'hỗ trợ thắc mắc giúp đỡ' },
  { id: 'confirmation', name: 'Giấy tờ sinh viên', description: 'Mẫu xác nhận sinh viên', group: 'affairs', icon: 'file', tone: 'amber', guidance: 'Tạo hồ sơ mẫu về giấy xác nhận sinh viên phục vụ vay vốn, tạm hoãn NVQS hoặc xe buýt.', requestType: 'Xin giấy xác nhận sinh viên', keywords: 'giấy xác nhận vay vốn NVQS' },
  { id: 'feedback', name: 'Góp ý cộng đồng', description: 'Đóng góp ý kiến phát triển', group: 'affairs', icon: 'bulb', tone: 'amber', guidance: 'Chia sẻ đề xuất để HTSV ngày càng hoàn thiện và hữu ích hơn cho sinh viên.', requestType: 'Góp ý xây dựng cộng đồng', keywords: 'góp ý ý kiến' },
  { id: 'conduct-score', name: 'Điểm rèn luyện', description: 'Tự chấm & theo dõi duyệt điểm', group: 'learning', icon: 'award', tone: 'green', guidance: 'Tự đánh giá điểm rèn luyện theo từng tiêu chí và theo dõi tiến độ duyệt qua Ban cán sự, Khoa.', path: '/conduct-score', keywords: 'điểm rèn luyện hạnh kiểm ban cán sự khoa duyệt' },
  { id: 'grade-appeal', name: 'Phúc khảo điểm', description: 'Khiếu nại, xin chấm lại điểm', group: 'learning', icon: 'chart', tone: 'blue', guidance: 'Gửi yêu cầu chấm lại điểm một môn học và theo dõi tiến độ xử lý.', path: '/grade-appeal', keywords: 'phúc khảo chấm lại khiếu nại điểm' },
  { id: 'class-sections', name: 'Lớp học phần của tôi', description: 'Liên hệ GV, nhóm lớp, đánh giá', group: 'learning', icon: 'people', tone: 'blue', guidance: 'Xem liên hệ giảng viên, vào nhóm lớp và đánh giá giảng viên cuối học phần.', path: '/class-sections', keywords: 'lớp học phần liên hệ giảng viên nhóm zalo đánh giá giảng viên' },
  { id: 'transcript', name: 'Bảng điểm', description: 'GPA & tiến độ tốt nghiệp', group: 'learning', icon: 'graduate', tone: 'blue', guidance: 'Xem bảng điểm từng học kỳ, GPA tích lũy và tiến độ hoàn thành chương trình.', path: '/transcript', keywords: 'bảng điểm gpa tín chỉ tiến độ tốt nghiệp' },
  { id: 'tuition', name: 'Học phí & BHYT', description: 'Khoản thu, hạn đóng', group: 'affairs', icon: 'wallet', tone: 'amber', guidance: 'Xem các khoản cần đóng trong học kỳ và cảnh báo khi sắp tới hạn.', path: '/tuition', keywords: 'học phí bảo hiểm y tế hạn đóng' },
  { id: 'scholarship', name: 'Học bổng', description: 'Điều kiện, nộp hồ sơ, theo dõi', group: 'affairs', icon: 'award', tone: 'amber', guidance: 'Kiểm tra điều kiện theo GPA, nộp hồ sơ học bổng và theo dõi kết quả xét duyệt.', path: '/scholarship', keywords: 'học bổng khuyến khích vượt khó tài năng trẻ' },
  { id: 'jobs', name: 'Việc làm & thực tập', description: 'Tìm việc, lưu tin theo ngành', group: 'affairs', icon: 'laptop', tone: 'blue', guidance: 'Tìm việc làm, thực tập theo ngành và kỹ năng, lưu lại tin quan tâm.', path: '/jobs', keywords: 'việc làm thực tập tuyển dụng' },
  { id: 'cv-builder', name: 'Trình tạo hồ sơ xin việc', description: 'Nhiều mẫu, xuất PDF', group: 'affairs', icon: 'edit', tone: 'green', guidance: 'Điền thông tin và xuất CV dưới dạng PDF ngay trên trình duyệt.', path: '/cv-builder', keywords: 'cv hồ sơ xin việc resume' },
  { id: 'career-guidance', name: 'Hướng nghiệp', description: 'Kỹ năng, chứng chỉ, xu hướng', group: 'learning', icon: 'book', tone: 'blue', guidance: 'Đọc bài viết hướng nghiệp theo từng ngành học.', path: '/career-guidance', keywords: 'hướng nghiệp kỹ năng chứng chỉ' },
  { id: 'development-path', name: 'Lộ trình phát triển', description: 'Lộ trình mẫu tham khảo', group: 'learning', icon: 'clipboard', tone: 'green', guidance: 'Tham khảo lộ trình phát triển theo từng năm học hoặc định hướng nghề nghiệp.', path: '/development-path', keywords: 'lộ trình phát triển sinh viên 5 tốt' },
  { id: 'personal-path', name: 'Bản đồ kỹ năng & Lộ trình cá nhân', description: 'Trợ lý AI tính từ điểm của bạn', group: 'learning', icon: 'chart', tone: 'blue', guidance: 'Xem mức độ thành thạo theo nhóm kỹ năng và lộ trình cá nhân dựa trên bảng điểm hiện tại.', path: '/personal-path', keywords: 'bản đồ kỹ năng lộ trình cá nhân trợ lý ai' },
  { id: 'interview-practice', name: 'Luyện phỏng vấn', description: 'Ghi âm trả lời, xem gợi ý', group: 'learning', icon: 'headset', tone: 'rose', guidance: 'Luyện trả lời câu hỏi phỏng vấn, ghi âm lại và xem gợi ý trả lời tốt.', path: '/interview-practice', keywords: 'luyện phỏng vấn ghi âm interview' },
  { id: 'staff-portal', name: 'Cổng giảng viên / cố vấn / phòng ban', description: 'Xem thử 3 vai trò (demo)', group: 'affairs', icon: 'people', tone: 'rose', guidance: 'Xem thử giao diện dành cho giảng viên, cố vấn học tập và phòng ban — chế độ demo, chưa có tài khoản riêng.', path: '/staff/lecturer', keywords: 'cổng giảng viên cố vấn phòng ban demo' },
  { id: 'facility-report', name: 'Báo hỏng cơ sở vật chất', description: 'Báo thiết bị, phòng ốc hư hỏng', group: 'affairs', icon: 'bell', tone: 'rose', guidance: 'Gửi báo cáo khi gặp thiết bị, phòng học hoặc cơ sở vật chất bị hư hỏng.', requestType: 'Báo hỏng cơ sở vật chất', keywords: 'báo hỏng cơ sở vật chất sửa chữa hư hỏng' },
  { id: 'lost-found', name: 'Đồ thất lạc', description: 'Báo mất đồ hoặc tìm đồ giúp', group: 'affairs', icon: 'mail', tone: 'amber', guidance: 'Gửi thông tin đồ bị mất hoặc nhặt được để nhờ hỗ trợ tìm/trả lại.', requestType: 'Báo mất đồ / tìm đồ thất lạc', keywords: 'đồ thất lạc mất đồ tìm đồ' },
  { id: 'campus-map', name: 'Sơ đồ khuôn viên', description: 'Tra cứu tòa nhà, phòng học', group: 'affairs', icon: 'home', tone: 'blue', guidance: 'Tìm tòa nhà, phòng học và các khu chức năng trong khuôn viên trường.', path: '/campus-map', keywords: 'sơ đồ khuôn viên bản đồ tòa nhà phòng học' },
  { id: 'library', name: 'Thư viện', description: 'Mượn, trả sách và tra hạn', group: 'affairs', icon: 'book', tone: 'green', guidance: 'Tìm sách, mượn/trả và theo dõi hạn trả, tiền phạt nếu có.', path: '/library', keywords: 'thư viện mượn sách trả sách' },
];

export const studentFaqs: StudentFaq[] = [
  { id: 'anonymous-safety', question: 'Đăng bài ẩn danh thì người khác có biết danh tính của mình không?', answer: 'Không. Khi bạn bật chế độ “Ẩn danh”, hệ thống sẽ hiển thị bài viết dưới tên “Người dùng ẩn danh” và ẩn hoàn toàn tên, email cũng như avatar của bạn với tất cả thành viên khác.' },
  { id: 'moderation-process', question: 'Bài viết Confession gửi lên mất bao lâu để được phê duyệt?', answer: 'Tất cả bài viết được kiểm duyệt để đảm bảo tuân thủ tiêu chuẩn cộng đồng, không có nội dung xúc phạm, công kích cá nhân hay vi phạm thuần phong mỹ tục. Bài viết thường được duyệt trong vài giờ.' },
  { id: 'report-content', question: 'Làm thế nào để báo cáo bài viết hoặc bình luận vi phạm?', answer: 'Vào mục “Hỗ trợ”, chọn “Tạo báo cáo mẫu” và ghi rõ đường dẫn cùng lý do vi phạm. Hiện báo cáo chỉ lưu trên trình duyệt, chưa được gửi đến ban quản trị. Bạn có thể xem lại tại “Theo dõi yêu cầu”.' },
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
