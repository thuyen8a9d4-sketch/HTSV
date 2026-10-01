import type { QuickSuggestion } from './chatbot-types';

/**
 * =========================================================================================
 * HỆ THỐNG PROMPT CHUYÊN SÂU CHO GOOGLE GEMINI (DNC & HTSV)
 * =========================================================================================
 */
export const HTSV_SYSTEM_PROMPT = `Bạn là Trợ lý AI thông minh toàn năng (được xây dựng với trải nghiệm tự nhiên, sắc sảo và thân thiện tương tự như ChatGPT, Gemini, Claude), tích hợp trên Cổng Thông tin & Diễn đàn Sinh viên HTSV.

NGUYÊN TẮC GIAO TIẾP VÀ TRẢ LỜI (BẮT BUỘC):
1. TRẢ LỜI TỰ NHIÊN, LINH HOẠT VÀ ĐÚNG TRỌNG TÂM:
   - Hãy trả lời tự nhiên, thông minh, lịch thiệp và gần gũi như những mô hình AI tiên tiến nhất hiện nay (ChatGPT, Claude, Gemini).
   - Người dùng hỏi gì thì trả lời chính xác, trực tiếp vào câu hỏi đó. Tuyệt đối KHÔNG trả lời lạc đề, KHÔNG tự động chèn thông tin quảng bá trường hay thông tin không được hỏi.
   - Khi người dùng trò chuyện thường ngày, hỏi thăm, chào hỏi ("chào bạn", "bạn biết tôi là ai không", "hôm nay thế nào", v.v.): Hãy đối đáp tự nhiên, hóm hỉnh và đúng mực như một người bạn đồng hành ảo. (Ví dụ: nếu người dùng hỏi "b biết tui là ai k", hãy trả lời tự nhiên rằng bạn là AI nên không thể biết danh tính cá nhân ngoài đời thực của người dùng, và sẵn sàng trò chuyện hoặc giúp đỡ).

2. HIỂU BIẾT TOÀN DIỆN VỀ MỌI LĨNH VỰC TRÊN THẾ GIỚI:
   - Bạn có kiến thức sâu rộng về mọi môn học và lĩnh vực:
     * Lập trình & Công nghệ: Thuật toán, viết code, sửa lỗi (bug), giải thích code (React, TypeScript, Node.js, Python, Java, C++, Golang, SQL, Docker, Linux, AI/ML...).
     * Khoa học tự nhiên & Kỹ thuật: Toán học, Vật lý, Hóa học, Sinh học, Cơ khí, Điện tử...
     * Khoa học xã hội & Ngôn ngữ: Văn học, Ngoại ngữ (tiếng Anh, tiếng Nhật, tiếng Trung...), Lịch sử, Địa lý, Triết học...
     * Kỹ năng sống & Học tập: Soạn thảo văn bản, viết email, viết CV, viết luận, phương pháp học tập hiệu quả, tư vấn giải quyết vấn đề...
   - Trả lời chi tiết, logic, có ví dụ minh họa và định dạng Markdown chuẩn đẹp.

3. HIỂU BIẾT CHUYÊN SÂU VỀ DỰ ÁN HTSV & TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (DNC):
   Khi người dùng có thắc mắc hoặc nhắc đến trường, học tập, tuyển sinh hoặc hệ thống HTSV, bạn nắm vững và cung cấp thông tin chuẩn xác sau:
   - TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (DNC):
     * Mã trường: DNC
     * Địa chỉ: Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
     * Hotline Tuyển sinh: 0939 257 838 - 02923 798 222 - 02923 798 333
     * Website: https://nctu.edu.vn - Email: phongtuyensinh@nctu.edu.vn
     * Tiện ích: Bệnh viện Đại học Nam Cần Thơ (đa khoa quốc tế 300 giường), Showroom Ô tô Nam Cần Thơ DNC, Viện Nghiên cứu & Phát triển Dược liệu, Ký túc xá máy lạnh an ninh 24/7.
   - PHƯƠNG THỨC XÉT TUYỂN:
     * 1. Điểm thi THPT; 2. Học bạ THPT (3 cách tính điểm); 3. Điểm ĐGNL ĐHQG TP.HCM; 4. Tuyển thẳng.
     * Khối Sức khỏe (Y, Dược, Xét nghiệm, Răng-Hàm-Mặt, Điều dưỡng) yêu cầu học lực lớp 12 loại Giỏi hoặc điểm xét tốt nghiệp >= 8.0.
   - CHÍNH SÁCH HỌC PHÍ (Ổn định suốt khóa học):
     * Nhóm 1 (Kinh tế, CNTT, Luật, Ngôn ngữ Anh...): ~10 - 11 triệu/kỳ.
     * Nhóm 2 (Kiến trúc, Công nghệ thực phẩm, Logistics...): ~12 - 13 triệu/kỳ.
     * Nhóm 3 (Công nghệ Ô tô, Điện-Điện tử, Kỹ thuật xét nghiệm...): ~14 - 15 triệu/kỳ.
     * Dược học: ~18 - 22 triệu/kỳ; Y khoa & Răng-Hàm-Mặt: ~45 - 50 triệu/kỳ.
   - HỆ THỐNG HTSV (CỔNG SINH VIÊN):
     * Diễn đàn Confession: Chia sẻ tâm sự ẩn danh hoặc công khai, bình luận, tương tác.
     * Dịch vụ Một cửa: Đăng ký xin giấy xác nhận sinh viên, bảng điểm, đơn hoãn NVQS, hoãn thi.
     * Lịch học & Lịch thi: Tra cứu thời khóa biểu phòng học theo tuần và ngày.

PHONG CÁCH TRÌNH BÀY:
- Tiếng Việt tự nhiên, lịch sự, thân thiện (xưng "mình" - "bạn").
- Dùng Markdown sạch sẽ: in đậm từ khóa, danh sách gạch đầu dòng, khối mã code với tên ngôn ngữ nếu có code.`;

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: 'dnc-gioi-thieu',
    label: '🏫 Đây là trường nào?',
    prompt: 'Đây là trường nào vậy bạn? Cho mình biết thông tin về Trường Đại học Nam Cần Thơ.',
    category: 'academic',
  },
  {
    id: 'dnc-tuyen-sinh',
    label: '🎓 Phương thức tuyển sinh & Học bạ DNC',
    prompt: 'Trường Đại học Nam Cần Thơ có những phương thức xét tuyển nào và điều kiện xét học bạ ra sao?',
    category: 'academic',
  },
  {
    id: 'dnc-hoc-phi',
    label: '💰 Học phí & Học bổng DNC 2026',
    prompt: 'Mức học phí các ngành tại Đại học Nam Cần Thơ là bao nhiêu? Học phí có tăng qua các năm không?',
    category: 'academic',
  },
  {
    id: 'dnc-cntt',
    label: '💻 Ngành Công nghệ thông tin & AI DNC',
    prompt: 'Thông tin chi tiết về ngành Công nghệ thông tin và Trí tuệ nhân tạo (AI) tại Đại học Nam Cần Thơ?',
    category: 'academic',
  },
  {
    id: 'dnc-y-duoc',
    label: '🏥 Khối ngành Sức khỏe & Bệnh viện DNC',
    prompt: 'Ngành Y khoa và Dược học tại DNC đào tạo thế nào? Cơ sở thực hành tại Bệnh viện Đại học Nam Cần Thơ ra sao?',
    category: 'academic',
  },
  {
    id: 'dorm-guide',
    label: '🏢 Ký túc xá & Cơ sở vật chất',
    prompt: 'Ký túc xá Đại học Nam Cần Thơ có tiện nghi gì và cách thức đăng ký phòng ra sao?',
    category: 'service',
  },
];

interface MockRule {
  id: string;
  keywords: string[];
  response: string;
}

export const MOCK_RULES: MockRule[] = [
  // --- 0. GIAO TIẾP TỰ NHIÊN (Trò chuyện thông thường) ---
  {
    id: 'greeting',
    keywords: [
      'xin chào', 'chào bạn', 'chào cậu', 'chào em', 'chào bot', 'chào ad',
      'hello', 'hi bạn', 'hi bot', 'alo', 'hế lô', 'hey', 'good morning', 'good afternoon'
    ],
    response: `Dạ chào bạn! Rất vui được gặp bạn 😊. Mình là Trợ lý AI, luôn sẵn sàng giải đáp và đồng hành cùng bạn trong mọi vấn đề: từ học tập, lập trình, kiến thức đời sống đến thông tin Trường Đại học Nam Cần Thơ (DNC) và Cổng HTSV. Bạn cần mình giúp gì hôm nay nè?`,
  },
  {
    id: 'user_identity',
    keywords: [
      'biết tui là ai', 'biet tui la ai', 'biết tôi là ai', 'biet toi la ai',
      'biết mình là ai', 'biet minh la ai', 'tôi là ai', 'tui là ai', 'mình là ai'
    ],
    response: `Chào bạn! Là một trợ lý AI, mình không có khả năng nhận diện hay biết thông tin cá nhân ngoài đời của bạn đâu nè 😊. Mình chỉ tương tác và hỗ trợ bạn trực tiếp qua từng tin nhắn thôi. Hôm nay bạn có điều gì cần mình hỗ trợ hay trò chuyện không nào?`,
  },
  {
    id: 'gratitude',
    keywords: [
      'cảm ơn', 'cam on', 'cảm ơn bạn', 'thank', 'thanks', 'cảm ơn nha', 'tuyệt vời', 'hay quá', 'ok bạn', 'ok cảm ơn'
    ],
    response: `Dạ không có chi nè! Rất vui vì đã hỗ trợ được cho bạn. Bạn có thắc mắc nào khác thì cứ nhắn cho mình bất cứ lúc nào nhé! Chúc bạn một ngày thật nhiều niềm vui và học tập hiệu quả! ✨`,
  },

  // --- 1. ĐỊNH DANH BOT VÀ THÔNG TIN TRƯỜNG DNC ---
  {
    id: 'bot_identity',
    keywords: [
      'bạn là ai', 'cậu là ai', 'em là ai', 'mày là ai', 'bot là ai', 'trợ lý là ai'
    ],
    response: `Chào bạn! Mình là Trợ lý AI của Cổng Thông tin & Diễn đàn Sinh viên HTSV (Trường Đại học Nam Cần Thơ - DNC) 🤖.

Mình có thể hỗ trợ bạn:
* 💡 **Trò chuyện & Kiến thức đa năng:** Giải đáp lập trình, sửa bug, giải bài tập, ngoại ngữ, khoa học, kỹ năng mềm...
* 🏫 **Thông tin Trường Đại học Nam Cần Thơ (DNC):** Biểu học phí ổn định suốt khóa, 4 phương thức xét tuyển, Ký túc xá, Bệnh viện DNC...
* 📝 **Tiện ích Cổng HTSV:** Diễn đàn Confession ẩn danh, dịch vụ Một cửa (xin giấy xác nhận sinh viên, bảng điểm, hoãn NVQS), tra cứu lịch học...

Bạn cần mình giúp điều gì cứ nhắn cho mình nhé!`,
  },
  {
    id: 'school_info',
    keywords: [
      'trường nào', 'truong nao',
      'trường gì', 'truong gi',
      'đây là trường nào', 'day la truong nao',
      'trường này là trường nào', 'truong nay la truong nao',
      'trường của ai', 'thuộc trường nào',
      'trường đại học nào', 'truong dai hoc nao',
      'đại học nam cần thơ', 'dh nam can tho',
      'dnc là gì', 'dnc là trường gì',
      'mã trường', 'địa chỉ trường'
    ],
    response: `### 🏫 **Trường Đại học Nam Cần Thơ (DNC)**
Dạ chào bạn! Cổng thông tin và Trợ lý AI này trực thuộc **Trường Đại học Nam Cần Thơ (Nam Can Tho University - DNC)** bạn nhé!

* **Tên trường:** Trường Đại học Nam Cần Thơ (Mã trường: \`DNC\`)
* **Địa chỉ:** Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
* **Hotline / Zalo Tuyển sinh:** \`0939 257 838\` - \`02923 798 222\` - \`02923 798 333\`
* **Email:** \`phongtuyensinh@nctu.edu.vn\`
* **Website chính thức:** [https://nctu.edu.vn](https://nctu.edu.vn)
* **Cơ sở vật chất nổi bật:**
  * 🏥 **Bệnh viện Đại học Nam Cần Thơ:** Quy mô 300 giường bệnh quốc tế, phục vụ khám chữa bệnh và thực hành lâm sàng cho sinh viên Y Dược.
  * 🚗 **Showroom Ô tô Nam Cần Thơ DNC:** Xưởng thực hành và nghiên cứu ô tô hiện đại.
  * 🧪 **Viện Nghiên cứu & Phát triển Dược liệu:** Bào chế và ứng dụng dược phẩm.
  * 🏢 **Khu Ký túc xá máy lạnh, Thư viện số và Khu thể thao đa năng.**`,
  },

  // --- 2. PHƯƠNG THỨC XÉT TUYỂN & TUYỂN SINH ---
  {
    id: 'admissions',
    keywords: [
      'phương thức xét tuyển', 'xét học bạ', 'tuyển sinh', 'điều kiện xét',
      'tổ hợp môn', 'cách xét tuyển', 'đgnl', 'điểm chuẩn', 'xét tuyển thế nào',
      'tuyển sinh 2026', 'thủ tục nhập học', 'hồ sơ xét tuyển', 'xét tuyển'
    ],
    response: `### 📋 **4 Phương thức xét tuyển chính thức vào Đại học Nam Cần Thơ (DNC)**

1. **Phương thức 1 (Mã 100) - Xét kết quả thi Tốt nghiệp THPT:**
   * Tổng điểm 3 môn trong tổ hợp xét tuyển đạt ngưỡng đảm bảo chất lượng đầu vào của trường.
2. **Phương thức 2 (Mã 200) - Xét kết quả học tập cấp THPT (Học bạ):**
   * *Cách 1:* Điểm trung bình cả năm lớp 12 của 3 môn trong tổ hợp xét tuyển $\\ge 18.0$ điểm.
   * *Cách 2:* Điểm trung bình cả năm lớp 12 $\\ge 6.0$ điểm.
   * *Cách 3:* Tổng điểm trung bình 3 học kỳ (HK1, HK2 lớp 11 và HK1 lớp 12) $\\ge 18.0$ điểm.
3. **Phương thức 3 (Mã 402) - Xét điểm thi Đánh giá năng lực (ĐGNL):**
   * Dựa trên kết quả kỳ thi Đánh giá năng lực do ĐHQG TP.HCM tổ chức.
4. **Phương thức 4 (Mã 301) - Xét tuyển thẳng:**
   * Theo đúng quy định tuyển thẳng của Bộ Giáo dục & Đào tạo.

> ⚠️ **Lưu ý đối với Khối ngành Sức khỏe (Y khoa, Dược học, Xét nghiệm, Răng-Hàm-Mặt, Điều dưỡng):** Thí sinh xét theo học bạ phải có học lực lớp 12 xếp loại **Giỏi** hoặc điểm xét tốt nghiệp THPT từ **8.0 trở lên** (theo quy định của Bộ GD&ĐT).`,
  },

  // --- 3. HỌC PHÍ VÀ HỌC BỔNG ---
  {
    id: 'tuition',
    keywords: [
      'học phí', 'hoc phi', 'tiền học', 'biểu phí', 'học bổng', 'miễn giảm học phí', 'học phí bao nhiêu', 'tiền học một kỳ'
    ],
    response: `### 💵 **Chính sách Học phí DNC (Cam kết ỔN ĐỊNH suốt khóa học)**
DNC áp dụng chính sách **học phí ổn định toàn khóa** (đơn giá tín chỉ không thay đổi trong suốt quá trình theo học). Mỗi năm học gồm 3 học kỳ, trung bình 10 - 12 tín chỉ / học kỳ.

* **Nhóm ngành 1 (Từ 10 - 11 triệu đồng / học kỳ):**
  * Kinh tế số, Kế toán, Tài chính - Ngân hàng, TMĐT, Quản trị kinh doanh, Marketing, Kinh doanh quốc tế, Truyền thông đa phương tiện, Quan hệ công chúng (PR).
  * Luật, Luật kinh tế, Ngôn ngữ Anh.
  * Quản trị dịch vụ du lịch, Quản trị khách sạn, Quản trị nhà hàng.
  * **Công nghệ thông tin, Khoa học máy tính, Kỹ thuật phần mềm, Trí tuệ nhân tạo (AI), Mạng máy tính.**
* **Nhóm ngành 2 (Từ 12 - 13 triệu đồng / học kỳ):**
  * Kiến trúc, Bất động sản, Công nghệ kỹ thuật hóa học, Công nghệ thực phẩm, Logistics và Quản lý chuỗi cung ứng.
* **Nhóm ngành 3 (Từ 14 - 15 triệu đồng / học kỳ):**
  * **Công nghệ kỹ thuật Ô tô**, Điện - Điện tử, Kỹ thuật cơ khí động lực, Kỹ thuật xét nghiệm y học, Kỹ thuật hình ảnh y học, Điều dưỡng, Quản lý bệnh viện.
* **Khối Sức khỏe đặc thù:**
  * Dược học: khoảng **18 - 22 triệu đồng / học kỳ**.
  * Y khoa (Bác sĩ Đa khoa) & Răng - Hàm - Mặt: khoảng **45 - 50 triệu đồng / học kỳ** (đã bao gồm chi phí đào tạo thực hành lâm sàng tại Bệnh viện Đại học Nam Cần Thơ).

🎁 **Chính sách Học bổng & Ưu đãi:**
* Học bổng tuyển sinh đầu vào dành cho thủ khoa, á khoa và thí sinh có điểm xét tuyển cao.
* Học bổng khuyến khích học tập từng kỳ dành cho sinh viên Khá, Giỏi, Xuất sắc.`,
  },

  // --- 4. NGÀNH CÔNG NGHỆ THÔNG TIN & TRÍ TUỆ NHÂN TẠO ---
  {
    id: 'it',
    keywords: [
      'công nghệ thông tin', 'ngành cntt', 'kỹ thuật phần mềm', 'khoa học máy tính',
      'trí tuệ nhân tạo', 'ngành ai', 'học ai', 'an toàn thông tin', 'mạng máy tính', 'ngành it', 'học it', 'học cntt'
    ],
    response: `### 💻 **Khối ngành Công nghệ Thông tin & AI tại DNC**
* **Các ngành đào tạo:**
  * 🖥️ **Công nghệ thông tin** (Mã ngành: \`7480201\`) - Bằng Kỹ sư (150 tín chỉ)
  * ⚙️ **Kỹ thuật phần mềm** (Mã ngành: \`7480103\`) - Bằng Kỹ sư
  * 🤖 **Trí tuệ nhân tạo (AI)** (Mã ngành: \`7480107\`) - Bằng Kỹ sư
  * 📊 **Khoa học máy tính** (Mã ngành: \`7480101\`)
  * 🌐 **Mạng máy tính & Truyền thông dữ liệu** (Mã ngành: \`7480102\`)
  * 🛡️ **An toàn thông tin** (Mã ngành: \`7480202\`)
  * 🔌 **Công nghệ kỹ thuật Bán dẫn** (Mã ngành: \`7480101.\`)
* **Tổ hợp môn xét tuyển:** \`A00\` (Toán, Lý, Hóa), \`A01\` (Toán, Lý, Anh), \`D01\` (Toán, Văn, Anh), \`C01\` (Toán, Văn, Lý).
* **Mức học phí:** Nhóm 1 (khoảng **10 - 11 triệu đồng / học kỳ**, ổn định suốt khóa).
* **Cơ sở thực hành:** Phòng Lab máy tính cấu hình cao, máy lạnh 100%, hệ sinh thái phần mềm thực tế và kết nối việc làm với các doanh nghiệp công nghệ lớn.`,
  },

  // --- 5. KHỐI NGÀNH SỨC KHỎE (Y KHOA, DƯỢC, XÉT NGHIỆM, ĐIỀU DƯỠNG) ---
  {
    id: 'health',
    keywords: [
      'y khoa', 'bác sĩ', 'dược học', 'y học', 'điều dưỡng',
      'xét nghiệm y học', 'răng hàm mặt', 'sức khỏe', 'bệnh viện dnc',
      'bệnh viện nam cần thơ', 'học y', 'học dược'
    ],
    response: `### 🏥 **Khối ngành Sức khỏe tại Đại học Nam Cần Thơ**
* **Các ngành đào tạo mũi nhọn:**
  * 🩺 **Y khoa (Bác sĩ Đa khoa):** Mã ngành \`7720101\` (Đào tạo 6 năm).
  * 🦷 **Răng - Hàm - Mặt:** Mã ngành \`7720501\` (Đào tạo 6 năm).
  * 💊 **Dược học:** Mã ngành \`7720201\` (Bằng Dược sĩ, đào tạo 5 năm).
  * 🔬 **Kỹ thuật xét nghiệm y học:** Mã ngành \`7720601\` (Đào tạo 4 năm).
  * 📷 **Kỹ thuật hình ảnh y học:** Mã ngành \`7720602\`.
  * 🩹 **Điều dưỡng** (Đa khoa, Gây mê hồi sức, Thẩm mỹ, Hộ sinh, Nha khoa): Mã ngành \`7720301\`.
  * 🏥 **Quản lý bệnh viện:** Mã ngành \`7720802\`.
* **Tổ hợp môn xét tuyển:** \`B00\` (Toán, Hóa, Sinh), \`A00\` (Toán, Lý, Hóa), \`D07\` (Toán, Hóa, Anh), \`B08\` (Toán, Sinh, Anh).
* **Lợi thế vượt trội:**
  * Thực hành lâm sàng ngay tại **Bệnh viện Đại học Nam Cần Thơ** (bệnh viện đa khoa quốc tế 300 giường nằm liền kề trường).
  * Trung tâm mô phỏng tiền lâm sàng hiện đại và Viện Nghiên cứu Phát triển Dược liệu.`,
  },

  // --- 6. NGÀNH CÔNG NGHỆ KỸ THUẬT Ô TÔ ---
  {
    id: 'auto',
    keywords: ['ô tô', 'kỹ thuật ô tô', 'công nghệ ô tô', 'ô tô điện', 'cơ khí động lực', 'showroom ô tô', 'học ô tô'],
    response: `### 🚗 **Ngành Công nghệ Kỹ thuật Ô tô tại DNC**
* **Mã ngành:** \`7510205\` (Chương trình Ô tô truyền thống & Ô tô điện).
* **Văn bằng:** Kỹ sư Công nghệ kỹ thuật Ô tô.
* **Tổ hợp xét tuyển:** \`A00\` (Toán, Lý, Hóa), \`A01\` (Toán, Lý, Anh), \`C01\` (Toán, Văn, Lý), \`D01\` (Toán, Văn, Anh).
* **Điểm nhấn đặc biệt:**
  * Trường có riêng **Showroom Ô tô Nam Cần Thơ DNC** và xưởng bảo dưỡng, sửa chữa thực nghiệm quy mô lớn.
  * Sinh viên được thực hành trực tiếp trên các dòng xe hiện đại, động cơ đốt trong và công nghệ ô tô điện thông minh.
* **Mức học phí:** Nhóm 3 (khoảng **14 - 15 triệu đồng / học kỳ**, cam kết ổn định toàn khóa).`,
  },

  // --- 7. KHỐI KINH TẾ, LUẬT, TRUYỀN THÔNG, DU LỊCH ---
  {
    id: 'business_law',
    keywords: [
      'ngành kinh tế', 'quản trị kinh doanh', 'marketing', 'kinh doanh quốc tế',
      'logistics', 'kế toán', 'ngành luật', 'luật kinh tế',
      'truyền thông đa phương tiện', 'quan hệ công chúng', 'quản trị khách sạn'
    ],
    response: `### 📈 **Khối ngành Kinh tế, Luật, Truyền thông & Dịch vụ tại DNC**
* **Kinh tế & Quản trị:** Quản trị kinh doanh, Marketing, Kinh tế số, Logistics & Quản lý chuỗi cung ứng, Kinh doanh quốc tế, Tài chính - Ngân hàng, Kế toán, Thương mại điện tử.
* **Luật:** Luật học, Luật kinh tế, Luật quốc tế (Đào tạo chuyên sâu kiến thức pháp lý và tranh tụng thực tế).
* **Truyền thông & Xã hội:** Quan hệ công chúng (PR), Truyền thông đa phương tiện, Ngôn ngữ Anh.
* **Du lịch & Nhà hàng:** Quản trị dịch vụ du lịch và lữ hành, Quản trị khách sạn, Quản trị nhà hàng và dịch vụ ăn uống.
* **Học phí:** Khoảng **10 - 13 triệu đồng / học kỳ** tùy ngành, ổn định suốt khóa.`,
  },

  // --- 8. KÝ TÚC XÁ & ĐỜI SỐNG SINH VIÊN ---
  {
    id: 'dorm',
    keywords: ['ký túc xá', 'ktx', 'phòng trọ', 'ở ktx', 'nội trú', 'cơ sở vật chất ktx', 'ở trọ'],
    response: `### 🏢 **Ký túc xá Trường Đại học Nam Cần Thơ (DNC)**
* **Vị trí:** Nằm ngay bên trong khuôn viên trường (168 Nguyễn Văn Cừ nối dài, P. An Bình, Q. Ninh Kiều, TP. Cần Thơ), đi bộ vài bước đến giảng đường.
* **Tiện nghi hiện đại:**
  * Phòng ở sạch đẹp, thoáng mát, trang bị giường tầng, bàn học, quạt, máy lạnh, máy nước nóng lạnh.
  * Hệ thống Wifi phủ sóng toàn khu ký túc xá.
  * Camera an ninh, đội bảo vệ kiểm soát thẻ từ ra vào 24/7.
  * Sát cạnh nhà ăn sinh viên, siêu thị mini, phòng Gym và sân bóng đá, bóng rổ, cầu lông.
* **Cách thức đăng ký:** Sinh viên đăng ký online qua mục **Ký túc xá** trên Cổng HTSV hoặc làm thủ tục trực tiếp tại Ban Quản lý Ký túc xá DNC trong đợt nhập học.`,
  },

  // --- 9. CÂU LẠC BỘ & HOẠT ĐỘNG ĐOÀN HỘI ---
  {
    id: 'clubs',
    keywords: ['câu lạc bộ', 'clb', 'hoạt động sinh viên', 'ngoại khóa', 'phong trào', 'đoàn hội', 'tình nguyện'],
    response: `### 🎯 **Hơn 57 Câu Lạc Bộ Sinh Viên tại DNC**
Sinh viên DNC được thỏa sức phát triển đam mê và kỹ năng mềm với đa dạng CLB:
* **Học thuật:** CLB Công nghệ thông tin, CLB Tiếng Anh E2C, CLB Tiếng Anh DNC, CLB Dược sĩ tương lai, CLB Bác sĩ trẻ, CLB Luật gia tương lai, CLB Kỹ sư Ô tô...
* **Kỹ năng & Nghệ thuật:** CLB MC và Tổ chức sự kiện, CLB Âm nhạc, CLB Nhiếp ảnh, CLB Dance, CLB Bạn đọc...
* **Thể thao & Tình nguyện:** CLB Bóng đá, CLB Bóng chuyền, CLB Cầu lông, Đội Công tác xã hội, CLB Giọt Máu DNC...
* **Sự kiện nổi bật:** Cuộc thi Hoa khôi DNC (Miss DNC), Hội thao truyền thống, Mùa hè xanh, Ngày hội việc làm DNC Job Fair.`,
  },

  // --- 10. HƯỚNG DẪN CỔNG SINH VIÊN HTSV ---
  {
    id: 'confession',
    keywords: ['confession', 'ẩn danh', 'đăng bài', 'bài viết', 'diễn đàn', 'forum'],
    response: `### 📝 **Hướng dẫn đăng Confession trên diễn đàn HTSV:**
1. Nhấp vào nút **"+"** (hoặc nút **"Đăng bài"**) trên thanh điều hướng hoặc truy cập trang **Diễn đàn Confession**.
2. Nhập tiêu đề và nội dung bài viết bạn muốn chia sẻ.
3. Bật tùy chọn **"Đăng ẩn danh"** nếu bạn không muốn lộ danh tính tài khoản.
4. Chọn thẻ chủ đề phù hợp (*Học tập, Tình cảm, Đời sống, Góc hỏi đáp DNC...*).
5. Nhấn **"Gửi bài viết"** để chia sẻ câu chuyện cùng cộng đồng sinh viên!`,
  },
  {
    id: 'mot_cua',
    keywords: ['giấy xác nhận', 'xác nhận sinh viên', 'bảng điểm', 'thủ tục', 'một cửa', 'chứng nhận', 'hoãn nghĩa vụ'],
    response: `### 📋 **Thủ tục Dịch vụ Một cửa - Xin giấy tờ sinh viên:**
1. Đăng nhập vào tài khoản Cổng HTSV của bạn.
2. Truy cập mục **"Hỗ trợ & Báo cáo"** (Dịch vụ Một cửa sinh viên).
3. Chọn loại yêu cầu:
   * **Xin cấp Giấy xác nhận sinh viên** (Vay vốn ngân hàng chính sách, tạm hoãn nghĩa vụ quân sự, làm vé xe buýt...).
   * **Xin cấp Bảng điểm học tập chính thức**.
   * **Đơn xin hoãn thi / phúc khảo bài thi**.
4. Điền lý do và gửi yêu cầu.
5. Tiến độ sẽ được cập nhật trực tuyến và bạn nhận kết quả tại Phòng Công tác Sinh viên (Tòa nhà Hiệu bộ DNC) sau 2 - 3 ngày làm việc.`,
  },
  {
    id: 'lap_trinh',
    keywords: ['lập trình web', 'lập trình wed', 'web là gì', 'frontend', 'backend', 'học lập trình', 'code web'],
    response: `### 🌐 **Lộ trình học Lập trình Web cho sinh viên:**
Lập trình web gồm 2 phần chính:

1. **Frontend (Giao diện người dùng):**
   * **HTML5 & CSS3:** Xây dựng khung giao diện và định dạng giao diện đẹp mắt.
   * **JavaScript (ES6+) & TypeScript:** Xử lý logic và tăng tính tương tác, chặt chẽ về dữ liệu.
   * **Framework hiện đại:** **React 19**, Next.js hoặc Vue.js.
   * **Styling:** Tailwind CSS 4.

2. **Backend (Xử lý máy chủ & Cơ sở dữ liệu):**
   * **Ngôn ngữ:** Node.js (Express/NestJS), Python (FastAPI/Django), Java (Spring Boot) hoặc C# (.NET).
   * **Cơ sở dữ liệu:** PostgreSQL, MySQL, MongoDB.
   * **RESTful API & Xác thực:** JWT, OAuth2.`,
  },
  {
    id: 'lich_hoc',
    keywords: ['lịch học', 'lịch thi', 'thời khóa biểu', 'đăng ký môn', 'tín chỉ', 'học vụ'],
    response: `### 📅 **Tra cứu Lịch học & Lịch thi DNC:**
* Xem thời khóa biểu theo tuần và ngày tại mục **"Lịch học"** trên thanh menu HTSV.
* Hệ thống hiển thị rõ ràng phòng học, ca học, tên môn học và giảng viên phụ trách.
* Đầu mỗi học kỳ, sinh viên theo dõi thông báo từ Phòng Đào tạo để đăng ký tín chỉ học phần đúng hạn.`,
  },
];

/**
 * Hàm chuẩn hóa văn bản bỏ dấu tiếng Việt để tìm kiếm không dấu
 */
function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/**
 * Kiểm tra xem từ khóa có xuất hiện chính xác trong chuỗi không
 * Nếu từ khóa ngắn (<= 4 ký tự), yêu cầu khớp cả từ để tránh nhầm lẫn
 */
function containsKeyword(normalizedText: string, noToneText: string, keyword: string): boolean {
  const normKw = keyword.toLowerCase();
  const noToneKw = removeVietnameseTones(normKw);

  if (normKw.length <= 4) {
    const escaped = normKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[\\s.,!?_()/-])${escaped}(?:$|[\\s.,!?_()/-])`, 'i');
    const escapedNoTone = noToneKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexNoTone = new RegExp(`(?:^|[\\s.,!?_()/-])${escapedNoTone}(?:$|[\\s.,!?_()/-])`, 'i');
    return regex.test(normalizedText) || regexNoTone.test(noToneText);
  }

  return normalizedText.includes(normKw) || noToneText.includes(noToneKw);
}

/**
 * Hàm tìm kiếm phản hồi ngoại tuyến thông minh (Smart Offline Engine)
 * Luôn trả lời đúng trọng tâm và tự nhiên theo câu hỏi của người dùng.
 */
export function getMockResponse(question: string): string {
  const raw = question.trim();
  const normalized = raw.toLowerCase();
  const noTone = removeVietnameseTones(normalized);

  // 1. Kiểm tra chính xác từ khóa trong MOCK_RULES
  for (const rule of MOCK_RULES) {
    if (rule.keywords.some((k) => containsKeyword(normalized, noTone, k))) {
      return rule.response;
    }
  }

  // 2. Nhận diện ý định theo ngữ cảnh nếu câu hỏi ngắn gọn:
  // Ý định 1: Chào hỏi
  if (noTone === 'hi' || noTone === 'hello' || noTone === 'chao' || noTone.startsWith('chao ban')) {
    return MOCK_RULES[0].response;
  }

  // Ý định 2: Hỏi danh tính người dùng ("bạn biết tui là ai", "tôi là ai")
  if (
    noTone.includes('biet tui la ai') ||
    noTone.includes('biet toi la ai') ||
    noTone.includes('biet minh la ai') ||
    noTone === 'toi la ai' ||
    noTone === 'tui la ai'
  ) {
    return MOCK_RULES[1].response;
  }

  // Ý định 3: Hỏi về trường / địa chỉ
  if (
    noTone.includes('truong nao') ||
    noTone.includes('truong gi') ||
    noTone.includes('dai hoc nam can tho') ||
    noTone.includes('dh nam can tho')
  ) {
    const schoolRule = MOCK_RULES.find((r) => r.id === 'school_info');
    if (schoolRule) return schoolRule.response;
  }

  // Ý định 4: Hỏi về học phí / tiền bạc
  if (noTone.includes('hoc phi') || noTone.includes('tien hoc') || noTone.includes('bao nhieu tien')) {
    const tuitionRule = MOCK_RULES.find((r) => r.id === 'tuition');
    if (tuitionRule) return tuitionRule.response;
  }

  // Ý định 5: Hỏi về tuyển sinh / xét tuyển / học bạ
  if (noTone.includes('xet tuyen') || noTone.includes('tuyen sinh') || noTone.includes('xet hoc ba')) {
    const admRule = MOCK_RULES.find((r) => r.id === 'admissions');
    if (admRule) return admRule.response;
  }

  // 3. Phản hồi tự nhiên thân thiện khi không khớp từ khóa cục bộ
  return `Chào bạn! Cảm ơn bạn đã đặt câu hỏi 😊.

Hiện tại mình đang ở chế độ phản hồi nhanh. Mình có thể hỗ trợ bạn mọi thông tin:
* 💡 **Giải đáp học tập, lập trình & kiến thức tổng quát**
* 🏫 **Thông tin Trường Đại học Nam Cần Thơ (DNC):** Ngành học, học phí ổn định, 4 phương thức tuyển sinh, Ký túc xá, Bệnh viện DNC...
* 📝 **Tiện ích Cổng HTSV:** Confession, Dịch vụ Một cửa, lịch học, lịch thi...

Bạn có thể mô tả cụ thể hơn câu hỏi để mình hỗ trợ bạn chính xác nhất nhé!`;
}

/**
 * Tự động tạo danh sách 2-3 gợi ý câu hỏi tiếp theo (Follow-up chips)
 * thông minh dựa trên nội dung hội thoại
 */
export function generateFollowUpSuggestions(userPrompt: string, botResponse: string): string[] {
  const combined = (userPrompt + ' ' + botResponse).toLowerCase();
  const noTone = removeVietnameseTones(combined);

  // 1. Nhóm Học phí & Học bổng
  if (
    noTone.includes('hoc phi') ||
    noTone.includes('dong tien') ||
    noTone.includes('hoc bong') ||
    noTone.includes('mieu phi') ||
    noTone.includes('tien hoc')
  ) {
    return [
      'Chính sách học bổng dành cho tân sinh viên ra sao?',
      'Học phí có tăng theo từng năm không?',
      'Quy định về thời hạn và các đợt đóng học phí?',
    ];
  }

  // 2. Nhóm Tuyển sinh & Xét học bạ
  if (
    noTone.includes('xet tuyen') ||
    noTone.includes('hoc ba') ||
    noTone.includes('tuyen sinh') ||
    noTone.includes('diem chuan') ||
    noTone.includes('to hop')
  ) {
    return [
      'Hồ sơ xét tuyển học bạ cần chuẩn bị những gì?',
      'Khối ngành Sức khỏe cần điều kiện học bạ gì?',
      'Thời gian nhận hồ sơ xét tuyển năm 2026 khi nào?',
    ];
  }

  // 3. Nhóm CNTT / AI / Lập trình Web
  if (
    noTone.includes('cong nghe thong tin') ||
    noTone.includes('cntt') ||
    noTone.includes('tri tue nhan tao') ||
    noTone.includes('nganh ai') ||
    noTone.includes('lap trinh') ||
    noTone.includes('phan mem')
  ) {
    return [
      'Lộ trình học Lập trình Web cho sinh viên từ đầu',
      'Cơ hội việc làm ngành CNTT & AI tại DNC thế nào?',
      'Các phòng Lab thực hành máy tính có gì đặc biệt?',
    ];
  }

  // 4. Nhóm Khối Sức khỏe (Y khoa, Dược, Bệnh viện)
  if (
    noTone.includes('y khoa') ||
    noTone.includes('duoc') ||
    noTone.includes('bac si') ||
    noTone.includes('dieu duong') ||
    noTone.includes('benh vien')
  ) {
    return [
      'Cơ sở thực hành tại Bệnh viện Đại học Nam Cần Thơ?',
      'Thời gian đào tạo ngành Bác sĩ Y khoa và Dược học?',
      'Ngưỡng điểm xét tuyển học bạ ngành Y Dược?',
    ];
  }

  // 5. Nhóm Công nghệ Ô tô
  if (noTone.includes('o to') || noTone.includes('dong luc') || noTone.includes('showroom')) {
    return [
      'Showroom Ô tô Nam Cần Thơ DNC có gì đặc biệt?',
      'Mức học phí ngành Công nghệ Ô tô là bao nhiêu?',
      'Cơ hội việc làm ngành Ô tô sau khi tốt nghiệp?',
    ];
  }

  // 6. Nhóm Ký túc xá & Đời sống
  if (
    noTone.includes('ky tuc xa') ||
    noTone.includes('ktx') ||
    noTone.includes('phong tro') ||
    noTone.includes('cau lac bo') ||
    noTone.includes('clb')
  ) {
    return [
      'Chi phí phòng Ký túc xá DNC là bao nhiêu?',
      'Cách thức đăng ký phòng KTX trực tuyến?',
      'Có các câu lạc bộ sinh viên nào nổi bật tại trường?',
    ];
  }

  // 7. Nhóm Tiện ích Cổng HTSV (Confession, Một cửa, Lịch học)
  if (
    noTone.includes('confession') ||
    noTone.includes('giay xac nhan') ||
    noTone.includes('mot cua') ||
    noTone.includes('lich hoc') ||
    noTone.includes('bang diem')
  ) {
    return [
      'Làm thế nào để đăng Confession ẩn danh an toàn?',
      'Xin cấp Giấy xác nhận sinh viên mất bao lâu?',
      'Cách xem thời khóa biểu và phòng học trên HTSV',
    ];
  }

  // 8. Nếu là code / kỹ thuật lập trình
  if (
    combined.includes('```') ||
    noTone.includes('function') ||
    noTone.includes('code') ||
    noTone.includes('javascript') ||
    noTone.includes('typescript') ||
    noTone.includes('python')
  ) {
    return [
      'Có cách nào tối ưu hoặc ngắn gọn hơn không?',
      'Cho mình ví dụ ứng dụng thực tế trong dự án',
      'Giải thích chi tiết các tham số và dòng code trên',
    ];
  }

  // 9. Mặc định cho câu hỏi chung / trò chuyện
  return [
    'Trường Đại học Nam Cần Thơ có các ngành nào nổi bật?',
    'Mức học phí các ngành tại DNC năm 2026?',
    'Hướng dẫn các tính năng trên Cổng Sinh viên HTSV',
  ];
}
