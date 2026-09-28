import type { QuickSuggestion } from './chatbot-types';

export const HTSV_SYSTEM_PROMPT = `Bạn là Trợ lý AI Sinh viên HTSV (tương tự như Google Gemini và ChatGPT) được tích hợp trên Cổng Thông tin & Diễn đàn Sinh viên HTSV.

VAI TRÒ & NĂNG LỰC TOÀN DIỆN:
1. Bạn là một Trí tuệ Nhân tạo thông minh, đa năng:
   - Sẵn sàng giải đáp MỌI câu hỏi từ người dùng: Lập trình (Web, Python, Java, C++, thuật toán, sửa lỗi code,...), Khoa học - Kỹ thuật, Toán học, Ngoại ngữ, Viết luận/Email, Phương pháp học tập đại học và Kiến thức đời sống.
   - TUYỆT ĐỐI KHÔNG TỪ CHỐI câu hỏi với lý do "nằm ngoài phạm vi học vụ hay thủ tục". Hãy luôn hỗ trợ nhiệt tình, giải thích dễ hiểu, logic và đầy đủ.

2. Chuyên gia về Cổng Sinh viên HTSV:
   Khi người dùng hỏi về thủ tục, quy chế trường hoặc diễn đàn HTSV, bạn nắm vững và hướng dẫn chính xác:
   - Diễn đàn Confession: Đăng bài chia sẻ, thảo luận cộng đồng; có tùy chọn ẩn danh (Anonymous) hoặc công khai; tuân thủ quy tắc ứng xử văn minh; tìm kiếm bài theo hashtag/chủ đề.
   - Dịch vụ Một cửa: Hướng dẫn xin cấp Giấy xác nhận sinh viên, bảng điểm chính thức, tạm hoãn nghĩa vụ quân sự, làm đơn hoãn thi hoặc khiếu nại điểm tại mục 'Hỗ trợ & Báo cáo'.
   - Ký túc xá: Điều kiện & quy trình đăng ký phòng online, đối tượng ưu tiên, nộp phí lưu trú, báo hỏng thiết bị phòng.
   - Học phí & Học bổng: Tra cứu công nợ theo tín chỉ, phương thức nộp qua tài khoản ngân hàng hoặc quét QR code, thông tin học bổng khuyến khích học tập.
   - Lịch học & Lịch thi: Xem thời khóa biểu theo tuần/ngày, phòng học, giảng viên trên thanh điều hướng.

PHONG CÁCH TRẢ LỜI:
- Trả lời bằng tiếng Việt tự nhiên, lịch sự, thân thiện và mạch lạc.
- Sử dụng cấu trúc Markdown chuẩn: gạch đầu dòng (* hoặc -), đánh số bước (1, 2, 3), in đậm (**từ khóa**), và khối code (\`\`\`ngôn_ngữ ... \`\`\`) khi viết code mẫu.
- Luôn mang lại giá trị cao nhất cho người học như một người bạn đồng hành AI thông thái.`;

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: 'web-dev-guide',
    label: '💻 Lập trình Web là gì?',
    prompt: 'Lập trình web là gì? Người mới bắt đầu nên học HTML, CSS, JavaScript như thế nào?',
    category: 'academic',
  },
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
];

interface MockRule {
  keywords: string[];
  response: string;
}

const MOCK_RULES: MockRule[] = [
  {
    keywords: ['lập trình web', 'lập trình wed', 'web là gì', 'wed là gì', 'web dev', 'frontend', 'backend'],
    response: `### 🌐 Lập trình Web là gì?

**Lập trình web (Web Development)** là quá trình tạo ra, xây dựng và duy trì các trang web hoặc ứng dụng web hoạt động trên trình duyệt Internet.

Lập trình web thường chia thành 3 mảng chính:

1. **Frontend (Giao diện người dùng):**
   - Những gì người dùng nhìn thấy và tương tác trực tiếp.
   - Công nghệ cốt lõi: **HTML** (khung sườn), **CSS** (giao diện, màu sắc) và **JavaScript** (tính năng tương tác).
   - Framework hiện đại phổ biến: *React, Vue, Next.js*.

2. **Backend (Xử lý phía máy chủ & dữ liệu):**
   - Xử lý logic nghiệp vụ, bảo mật, xác thực tài khoản và lưu trữ cơ sở dữ liệu.
   - Ngôn ngữ phổ biến: *Node.js, Python, Java, Go, PHP*.
   - Cơ sở dữ liệu: *PostgreSQL, MySQL, MongoDB*.

3. **Fullstack:**
   - Người có khả năng làm việc trên cả Frontend và Backend.

💡 **Lộ trình cho người mới bắt đầu:**
\`\`\`text
Bước 1: Nắm vững HTML5 & CSS3 căn bản
Bước 2: Học JavaScript (ES6+) & DOM manipulation
Bước 3: Học Git & GitHub để quản lý mã nguồn
Bước 4: Chọn một Framework (ví dụ: React) và xây dựng dự án thực tế
\`\`\``,
  },
  {
    keywords: ['confession', 'ẩn danh', 'đăng bài', 'bài viết', 'diễn đàn', 'forum'],
    response: `### 📝 Hướng dẫn đăng Confession trên diễn đàn HTSV:

1. Nhấp vào nút **"+"** (hoặc nút **"Đăng bài"**) trên thanh điều hướng hoặc truy cập trang **Diễn đàn Confession**.
2. Nhập tiêu đề và nội dung bài viết bạn muốn chia sẻ.
3. Bật tùy chọn **"Đăng ẩn danh"** nếu bạn không muốn lộ danh tính tài khoản.
4. Chọn thẻ chủ đề phù hợp (*Học tập, Tình cảm, Đời sống, Góc hỏi đáp...*).
5. Nhấn **"Gửi bài viết"** để chia sẻ câu chuyện cùng cộng đồng sinh viên!`,
  },
  {
    keywords: ['ký túc xá', 'ktx', 'phòng', 'nội trú', 'ở ktx'],
    response: `### 🏫 Thông tin Đăng ký & Lưu trú Ký túc xá:

* **Đối tượng ưu tiên:** Sinh viên năm nhất, sinh viên diện chính sách, hộ nghèo hoặc ở xa.
* **Cách thức đăng ký:** Truy cập mục **Ký túc xá** trên cổng sinh viên HTSV để xem danh sách phòng trống và nộp đơn trực tuyến.
* **Hồ sơ cần chuẩn bị:** Căn cước công dân, thẻ sinh viên (hoặc giấy báo trúng tuyển) và giấy tờ ưu tiên (nếu có).
* **Báo hỏng cơ sở vật chất:** Nếu phòng có sự cố điện nước, bạn có thể gửi phản ánh nhanh qua mục *Hỗ trợ & Báo cáo*.`,
  },
  {
    keywords: ['học phí', 'tiền học', 'nộp tiền', 'chuyển khoản', 'học bổng'],
    response: `### 💰 Tra cứu & Thanh toán Học phí:

* **Tra cứu:** Vào mục **"Học phí"** trên cổng sinh viên để kiểm tra chi tiết công nợ tín chỉ học kỳ hiện tại.
* **Phương thức thanh toán:**
  1. Chuyển khoản ngân hàng theo mã số sinh viên được cấp.
  2. Quét mã QR qua cổng VNPAY / Momo / Viettel Money liên kết trên hệ thống.
* **Lưu ý:** Hãy hoàn tất học phí đúng hạn quy định để tránh bị ảnh hưởng đến việc đăng ký môn học và xét học bổng.`,
  },
  {
    keywords: ['giấy xác nhận', 'xác nhận sinh viên', 'bảng điểm', 'thủ tục', 'một cửa', 'chứng nhận'],
    response: `### 📋 Xin cấp Giấy xác nhận sinh viên / Bảng điểm:

1. Đăng nhập vào tài khoản HTSV của bạn.
2. Truy cập mục **"Hỗ trợ & Báo cáo"** (Dịch vụ sinh viên Một cửa).
3. Chọn loại yêu cầu: **"Xin cấp giấy xác nhận sinh viên"** hoặc **"Xin cấp bảng điểm"**.
4. Chọn mục đích (Vay vốn ngân hàng, tạm hoãn nghĩa vụ quân sự, xin việc làm thêm...).
5. Sau khi gửi, bạn theo dõi tiến độ xử lý và nhận văn bản tại Phòng Công tác Sinh viên sau 2 - 3 ngày làm việc.`,
  },
  {
    keywords: ['lịch học', 'lịch thi', 'thời khóa biểu', 'đăng ký môn', 'tín chỉ'],
    response: `### 📅 Tra cứu Lịch học & Lịch thi:

* Xem lịch chi tiết theo tuần và ngày tại mục **"Lịch học"** trên thanh menu HTSV.
* Hệ thống hiển thị rõ ràng phòng học, ca học và giảng viên phụ trách.
* Nếu có trùng lịch thi hoặc cần hoãn thi vì lý do bất khả kháng, hãy gửi đơn hỗ trợ tại cổng trong vòng 48 giờ.`,
  },
];

export function getMockResponse(question: string): string {
  const normalized = question.toLowerCase();
  for (const rule of MOCK_RULES) {
    if (rule.keywords.some((k) => normalized.includes(k))) {
      return rule.response;
    }
  }

  return `Chào bạn! Tôi là **Trợ lý AI HTSV** ✨

Tôi có thể hỗ trợ bạn mọi vấn đề học tập và đời sống sinh viên, chẳng hạn như:
* 💻 Giải đáp kiến thức lập trình, bài tập, công nghệ & khoa học.
* 📝 Hướng dẫn đăng bài trên **Diễn đàn Confession**.
* 🏫 Quy định đăng ký phòng **Ký túc xá**.
* 💰 Hướng dẫn nộp **Học phí** và tra cứu công nợ.
* 📋 Thủ tục xin **Giấy xác nhận sinh viên**, bảng điểm một cửa.

*Gợi ý: Cổng đã tích hợp AI Google Gemini thông minh. Bạn có thể hỏi bất kỳ chủ đề học thuật hoặc công nghệ nào!*`;
}
