export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  tip: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  { id: 'gioi-thieu', category: 'Giới thiệu bản thân', question: 'Bạn hãy giới thiệu đôi nét về bản thân.', tip: 'Nêu ngắn gọn: tên, ngành học, 1 thế mạnh nổi bật và 1 mục tiêu nghề nghiệp ngắn hạn. Tránh kể lể quá dài.' },
  { id: 'diem-manh-yeu', category: 'Giới thiệu bản thân', question: 'Điểm mạnh và điểm yếu lớn nhất của bạn là gì?', tip: 'Chọn điểm yếu có thật nhưng không ảnh hưởng nghiêm trọng tới công việc, kèm cách bạn đang khắc phục.' },
  { id: 'du-an', category: 'Chuyên môn', question: 'Hãy kể về một dự án hoặc bài tập lớn bạn tự hào nhất.', tip: 'Nêu rõ vai trò của bạn, công nghệ/công cụ đã dùng, khó khăn gặp phải và cách giải quyết.' },
  { id: 'xu-ly-loi', category: 'Chuyên môn', question: 'Bạn xử lý thế nào khi gặp lỗi mà chưa biết cách sửa?', tip: 'Nhấn mạnh quy trình: đọc kỹ thông báo lỗi, tra tài liệu, hỏi đồng đội/mentor khi cần — không bỏ cuộc.' },
  { id: 'lam-viec-nhom', category: 'Tình huống', question: 'Kể về một lần bạn bất đồng quan điểm với thành viên trong nhóm và cách bạn giải quyết.', tip: 'Tập trung vào cách lắng nghe, trao đổi để đi đến giải pháp chung, tránh đổ lỗi cho người khác.' },
  { id: 'ap-luc', category: 'Tình huống', question: 'Bạn làm gì khi phải hoàn thành nhiều việc trong thời gian ngắn?', tip: 'Chia sẻ cách bạn sắp xếp thứ tự ưu tiên, kèm một ví dụ cụ thể bạn từng áp dụng.' },
];
