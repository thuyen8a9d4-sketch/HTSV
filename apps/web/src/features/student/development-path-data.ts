export interface PathMilestone {
  stage: string;
  title: string;
  description: string;
}

export interface DevelopmentPath {
  id: string;
  name: string;
  summary: string;
  milestones: PathMilestone[];
}

// Lộ trình mẫu để sinh viên tham khảo — không phải lộ trình cá nhân hóa bằng AI (xem thêm ở Trợ lý AI).
export const developmentPaths: DevelopmentPath[] = [
  {
    id: 'sinh-vien-5-tot',
    name: 'Lộ trình Sinh viên 5 tốt',
    summary: 'Khung tham khảo theo 5 tiêu chí: đạo đức tốt, học tập tốt, thể lực tốt, tình nguyện tốt, hội nhập tốt.',
    milestones: [
      { stage: 'Năm 1', title: 'Làm quen môi trường', description: 'Tham gia sinh hoạt công dân đầu khóa, ổn định học tập, tham gia ít nhất 1 CLB/Đoàn-Hội.' },
      { stage: 'Năm 2', title: 'Rèn luyện & tích lũy', description: 'Giữ GPA ổn định, tham gia hoạt động tình nguyện, rèn luyện thể chất thường xuyên.' },
      { stage: 'Năm 3', title: 'Phát huy vai trò', description: 'Đảm nhận vai trò trong lớp/Đoàn-Hội, tham gia nghiên cứu khoa học hoặc cuộc thi học thuật.' },
      { stage: 'Năm cuối', title: 'Hoàn thiện hồ sơ', description: 'Tổng hợp minh chứng thành tích, hoàn thiện hồ sơ xét danh hiệu Sinh viên 5 tốt trước khi tốt nghiệp.' },
    ],
  },
  {
    id: 'lap-trinh-vien-moi-ra-truong',
    name: 'Lộ trình trở thành lập trình viên mới ra trường',
    summary: 'Gợi ý mốc kỹ năng theo từng năm để sẵn sàng ứng tuyển vị trí lập trình viên (fresher).',
    milestones: [
      { stage: 'Năm 1', title: 'Nền tảng lập trình', description: 'Vững cú pháp một ngôn ngữ, hiểu cấu trúc dữ liệu & giải thuật cơ bản, làm quen Git.' },
      { stage: 'Năm 2', title: 'Dự án nhỏ', description: 'Tự làm 1-2 dự án cá nhân (web/app đơn giản), học thêm framework phổ biến theo hướng đi (web/mobile).' },
      { stage: 'Năm 3', title: 'Thực tập & làm nhóm', description: 'Ứng tuyển thực tập, luyện làm việc nhóm qua đồ án môn học, xây GitHub cá nhân.' },
      { stage: 'Năm cuối', title: 'Săn việc fresher', description: 'Hoàn thiện CV, luyện phỏng vấn kỹ thuật, ứng tuyển vị trí fresher/junior trước khi tốt nghiệp.' },
    ],
  },
  {
    id: 'chuan-bi-ho-so-xin-viec',
    name: 'Lộ trình chuẩn bị hồ sơ xin việc trước khi ra trường',
    summary: 'Mốc thời gian 3 học kỳ cuối để chuẩn bị đầy đủ hồ sơ và kỹ năng xin việc.',
    milestones: [
      { stage: 'Học kỳ -3', title: 'Khảo sát định hướng', description: 'Xác định ngành/vị trí muốn ứng tuyển, liệt kê kỹ năng còn thiếu cần bổ sung.' },
      { stage: 'Học kỳ -2', title: 'Xây dựng hồ sơ', description: 'Soạn CV, portfolio/GitHub, xin thực tập để có kinh nghiệm thực tế đưa vào hồ sơ.' },
      { stage: 'Học kỳ -1', title: 'Luyện phỏng vấn', description: 'Luyện trả lời phỏng vấn, tham gia ngày hội việc làm của trường, nộp hồ sơ ứng tuyển sớm.' },
      { stage: 'Trước tốt nghiệp', title: 'Hoàn tất thủ tục', description: 'Hoàn thành chương trình học, xin xác nhận/bảng điểm tạm thời để nộp kèm hồ sơ xin việc chính thức.' },
    ],
  },
];
