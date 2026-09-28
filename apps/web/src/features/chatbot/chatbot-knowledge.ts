import type { QuickSuggestion } from './chatbot-types';

export const HTSV_SYSTEM_PROMPT = `Bạn là Trợ lý Ảo Sinh viên HTSV (Cổng Hỗ trợ & Diễn đàn Sinh viên).
Nhiệm vụ của bạn là giải đáp thắc mắc, hướng dẫn thủ tục học vụ, quy chế ký túc xá, nộp học phí, quy định diễn đàn confession và các dịch vụ hỗ trợ sinh viên.

Quy tắc ứng xử:
1. Luôn trả lời bằng tiếng Việt lịch sự, thân thiện, súc tích và dễ hiểu.
2. Xưng hô: "Em" hoặc "HTSV Bot" và gọi người dùng là "Bạn" hoặc "Sinh viên".
3. Trả lời có cấu trúc rõ ràng (sử dụng gạch đầu dòng, đánh số bước nếu là hướng dẫn quy trình).
4. Các thông tin chính của cổng HTSV:
   - Diễn đàn Confession: Cho phép sinh viên đăng tâm sự/thảo luận có thể chọn chế độ ẩn danh (Anonymous) hoặc công khai. Mọi bài viết phải tuân thủ chuẩn mực cộng đồng, không xúc phạm danh dự người khác hay phát tán thông tin sai lệch.
   - Dịch vụ Một cửa: Hỗ trợ xin giấy xác nhận sinh viên, bảng điểm, giải quyết chế độ chính sách, hoãn thi, khiếu nại điểm số tại mục 'Hỗ trợ & Báo cáo'.
   - Lịch học & Lịch thi: Sinh viên có thể tra cứu lịch cá nhân trong mục 'Lịch học' trên thanh điều hướng.
   - Học phí & Học bổng: Tra cứu công nợ, hướng dẫn đóng qua ngân hàng/cổng thanh toán điện tử tại mục 'Học phí'.
   - Ký túc xá: Đăng ký phòng trực tuyến đầu năm học, xin gia hạn, báo cáo hư hỏng cơ sở vật chất tại mục 'Ký túc xá'.
5. Nếu câu hỏi vượt quá phạm vi dữ liệu học vụ, hãy hướng dẫn sinh viên gửi yêu cầu trực tiếp qua mục 'Hỗ trợ & Báo cáo' hoặc liên hệ Phòng Công tác Sinh viên.`;

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: 'confession-guide',
    label: '📝 Đăng Confession ẩn danh',
    prompt: 'Làm thế nào để đăng một bài viết confession ở chế độ ẩn danh trên diễn đàn?',
    category: 'forum',
  },
  {
    id: 'dorm-guide',
    label: '🏫 Đăng ký ký túc xá',
    prompt: 'Quy trình và điều kiện đăng ký ở ký túc xá như thế nào?',
    category: 'service',
  },
  {
    id: 'tuition-guide',
    label: '💰 Thời hạn & nộp học phí',
    prompt: 'Xem học phí ở đâu và có những hình thức nộp học phí nào?',
    category: 'academic',
  },
  {
    id: 'certificate-guide',
    label: '📋 Xin giấy xác nhận sinh viên',
    prompt: 'Tôi muốn xin giấy xác nhận sinh viên để vay vốn ngân hàng thì làm ở đâu?',
    category: 'service',
  },
];

interface MockRule {
  keywords: string[];
  response: string;
}

const MOCK_RULES: MockRule[] = [
  {
    keywords: ['confession', 'ẩn danh', 'đăng bài', 'bài viết', 'diễn đàn', 'forum'],
    response: `**Hướng dẫn đăng Confession trên diễn đàn HTSV:**

1. Nhấp vào nút **"+"** (hoặc nút **"Đăng bài"**) trên thanh điều hướng hoặc truy cập trang **Diễn đàn Confession**.
2. Nhập tiêu đề và nội dung bài viết.
3. Bật tùy chọn **"Đăng ẩn danh"** nếu bạn không muốn lộ danh tính sinh viên.
4. Chọn thẻ chủ đề phù hợp (Học tập, Tình cảm, Đời sống, Góc hỏi đáp,...).
5. Nhấn **"Gửi bài viết"**. Bài viết sẽ được duyệt hoặc hiển thị ngay theo quy chế diễn đàn!`,
  },
  {
    keywords: ['ký túc xá', 'ktx', 'phòng', 'nội trú', 'ở ktx'],
    response: `**Thông tin Đăng ký & Lưu trú Ký túc xá:**

- **Đối tượng ưu tiên:** Sinh viên năm nhất, sinh viên diện chính sách, hộ nghèo hoặc ở xa.
- **Cách thức đăng ký:** Truy cập mục **Ký túc xá** trên cổng sinh viên HTSV để xem danh sách phòng trống và nộp đơn trực tuyến.
- **Hồ sơ cần chuẩn bị:** Căn cước công dân, thẻ sinh viên (hoặc giấy báo trúng tuyển) và giấy tờ ưu tiên (nếu có).
- **Hỗ trợ cơ sở vật chất:** Nếu phòng có thiết bị hỏng (điện, nước), bạn có thể gửi phản ánh qua mục *Hỗ trợ & Báo cáo*.`,
  },
  {
    keywords: ['học phí', 'tiền học', 'nộp tiền', 'chuyển khoản', 'học bổng'],
    response: `**Tra cứu & Thanh toán Học phí:**

- Bạn có thể vào mục **"Học phí"** trên cổng sinh viên để kiểm tra chi tiết công nợ học kỳ hiện tại và lịch sử thanh toán.
- **Phương thức thanh toán:**
  1. Chuyển khoản ngân hàng theo mã số sinh viên được cấp.
  2. Quẹt mã QR qua cổng VNPAY / Momo / Viettel Money liên kết trên hệ thống.
- **Lưu ý:** Hãy thanh toán đúng hạn quy định của Nhà trường để tránh bị hủy lịch học hoặc hạn chế đăng ký tín chỉ học kỳ tiếp theo.`,
  },
  {
    keywords: ['giấy xác nhận', 'xác nhận sinh viên', 'bảng điểm', 'thủ tục', 'một cửa', 'chứng nhận'],
    response: `**Xin cấp Giấy xác nhận sinh viên / Bảng điểm:**

1. Đăng nhập vào tài khoản HTSV của bạn.
2. Truy cập mục **"Hỗ trợ & Báo cáo"** (hoặc Dịch vụ sinh viên).
3. Chọn loại yêu cầu: **"Xin cấp giấy xác nhận sinh viên"** hoặc **"Xin cấp bảng điểm"**.
4. Chọn mục đích (Vay vốn ngân hàng, tạm hoãn nghĩa vụ quân sự, xin việc làm thêm,...).
5. Sau khi gửi, bạn có thể theo dõi tiến độ xử lý tại trang **"Yêu cầu & Phản ánh"** và nhận bản giấy tại Phòng Công tác Sinh viên sau 2 - 3 ngày làm việc.`,
  },
  {
    keywords: ['lịch học', 'lịch thi', 'thời khóa biểu', 'đăng ký môn', 'tín chỉ'],
    response: `**Tra cứu Lịch học & Lịch thi:**

- Xem lịch chi tiết tại mục **"Lịch học"** trên thanh menu HTSV.
- Hệ thống hỗ trợ hiển thị lịch theo tuần, theo ngày và thông báo phòng học cụ thể.
- Nếu có trùng lịch thi hoặc cần hoãn thi do lý do sức khỏe, vui lòng tạo đơn hỗ trợ trong vòng 48 giờ kể từ khi có thông báo.`,
  },
];

export function getMockResponse(question: string): string {
  const normalized = question.toLowerCase();
  for (const rule of MOCK_RULES) {
    if (rule.keywords.some((k) => normalized.includes(k))) {
      return rule.response;
    }
  }

  return `Chào bạn! Tôi là **Trợ lý Ảo Sinh viên HTSV**.

Tôi có thể hỗ trợ bạn tìm kiếm thông tin về:
- 📝 Hướng dẫn đăng bài & duyệt bài trên **Diễn đàn Confession**.
- 🏫 Thủ tục đăng ký & quy định **Ký túc xá**.
- 💰 Tra cứu công nợ & thời hạn nộp **Học phí**.
- 📋 Hướng dẫn xin **Giấy xác nhận sinh viên** và bảng điểm.
- 📅 Tra cứu **Lịch học / Lịch thi**.

*Mẹo: Bạn có thể nhập API Key (Google Gemini hoặc OpenAI-compatible) tại biểu tượng cài đặt ⚙️ ở góc trên để kích hoạt AI xử lý thông minh và sâu hơn!*`;
}
