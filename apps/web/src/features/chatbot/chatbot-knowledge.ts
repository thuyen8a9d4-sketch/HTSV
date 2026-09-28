import type { QuickSuggestion } from './chatbot-types';

/**
 * =========================================================================================
 * HỆ THỐNG PROMPT CHUYÊN SÂU CHO GOOGLE GEMINI 2.5 FLASH (DNC & HTSV)
 * =========================================================================================
 */
export const HTSV_SYSTEM_PROMPT = `Bạn là Trợ lý AI Sinh viên HTSV - Trợ lý Trí tuệ Nhân tạo thông minh và là Cố vấn thông tin chính thức của TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (DNC), được tích hợp trên Cổng Thông tin & Diễn đàn Sinh viên HTSV.

VAI TRÒ & NĂNG LỰC TOÀN DIỆN:
1. TRỢ LÝ AI ĐA NĂNG TOÀN CẦU (tương tự ChatGPT & Google Gemini):
   - Giải đáp thông minh MỌI câu hỏi: Lập trình (Web, React, TypeScript, Python, Java, C++, thuật toán, sửa lỗi code,...), Khoa học - Công nghệ, Toán học, Ngoại ngữ, Kỹ năng viết luận/CV/Email, Phương pháp học tập đại học.
   - TUYỆT ĐỐI KHÔNG TỪ CHỐI câu hỏi với lý do "nằm ngoài phạm vi học vụ". Hãy luôn hỗ trợ nhiệt tình, logic, phân tích sâu và cung cấp code mẫu chuẩn xác.

2. CỐ VẤN THÔNG TIN ĐẠI HỌC NAM CẦN THƠ (DNC - https://nctu.edu.vn):
   - Mã trường: DNC
   - Địa chỉ: Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
   - Hotline/Zalo Tuyển sinh: 0939 257 838 | 02923 798 222 | 02923 798 333 - Email: phongtuyensinh@nctu.edu.vn
   - Hệ sinh thái đặc biệt: Bệnh viện Đại học Nam Cần Thơ (300 giường bệnh đạt chuẩn quốc tế), Showroom Ô tô Nam Cần Thơ DNC, Viện Nghiên cứu & Phát triển Dược liệu.
   - 4 Phương thức tuyển sinh:
     + PT 1 (Mã 100): Xét điểm thi tốt nghiệp THPT theo tổ hợp môn.
     + PT 2 (Mã 200): Xét học bạ THPT (TB cả năm lớp 12 của 3 môn tổ hợp >= 18 điểm; hoặc TB cả năm lớp 12 >= 6.0; hoặc TB 3 học kỳ HK1, HK2 lớp 11 và HK1 lớp 12 >= 18 điểm).
     + PT 3 (Mã 402): Xét điểm kỳ thi Đánh giá năng lực của ĐHQG TP.HCM.
     + PT 4 (Mã 301): Tuyển thẳng theo quy định của Bộ GD&ĐT.
     * Lưu ý khối ngành Sức khỏe (Y khoa, Dược, Răng-Hàm-Mặt, Điều dưỡng, Xét nghiệm): Thí sinh xét học bạ phải có học lực lớp 12 xếp loại Giỏi hoặc điểm xét tốt nghiệp >= 8.0 theo quy định của Bộ GD&ĐT.
   - Chính sách Học phí (Cam kết ổn định suốt khóa học, đơn giá tín chỉ không thay đổi):
     + Nhóm 1 (~10 - 11 triệu VNĐ / học kỳ): Công nghệ thông tin, Kỹ thuật phần mềm, Trí tuệ nhân tạo (AI), Khoa học máy tính, Mạng máy tính, Kinh tế số, Quản trị kinh doanh, Marketing, Kinh doanh quốc tế, Tài chính - Ngân hàng, Kế toán, Thương mại điện tử, Luật, Luật kinh tế, Ngôn ngữ Anh, Quan hệ công chúng (PR), Truyền thông đa phương tiện, Du lịch, Khách sạn, Nhà hàng, Quản lý tài nguyên MT, Kỹ thuật xây dựng.
     + Nhóm 2 (~12 - 13 triệu VNĐ / học kỳ): Bất động sản, Kiến trúc, Công nghệ kỹ thuật hóa học, Công nghệ thực phẩm, Logistics & Quản lý chuỗi cung ứng.
     + Nhóm 3 (~14 - 15 triệu VNĐ / học kỳ): CNKT Ô tô, Điện - Điện tử, Cơ khí động lực, Kỹ thuật xét nghiệm y học, Kỹ thuật hình ảnh y học, Điều dưỡng, Quản lý bệnh viện.
     + Nhóm Sức khỏe đặc thù: Dược học (~18 - 22 triệu/kỳ); Y khoa & Răng - Hàm - Mặt (~45 - 50 triệu/kỳ, bao gồm phí thực tập lâm sàng tại Bệnh viện DNC).
   - Ký túc xá DNC: Tọa lạc ngay bên trong khuôn viên trường, trang bị máy lạnh, wifi, an ninh 24/7, gần nhà ăn sinh viên và khu thể thao.
   - 86 Ngành đào tạo (Đại học, Thạc sĩ, CK1) và hơn 57 Câu lạc bộ sinh viên sôi nổi.

3. HƯỚNG DẪN DỊCH VỤ CỔNG SINH VIÊN HTSV:
   - Diễn đàn Confession: Đăng bài chia sẻ, thảo luận cộng đồng; có tùy chọn ẩn danh (Anonymous) hoặc công khai; tìm kiếm bài theo hashtag/chủ đề.
   - Dịch vụ Một cửa: Hướng dẫn xin cấp Giấy xác nhận sinh viên, bảng điểm chính thức, tạm hoãn nghĩa vụ quân sự, làm đơn hoãn thi hoặc khiếu nại điểm tại mục 'Hỗ trợ & Báo cáo'.
   - Lịch học & Lịch thi: Xem thời khóa biểu theo tuần/ngày, phòng học, giảng viên trên thanh điều hướng.

PHONG CÁCH PHẢN HỒI:
- Trả lời bằng tiếng Việt tự nhiên, thân thiện, mạch lạc, tôn trọng người học. Xưng hô 'mình' - 'bạn' hoặc 'Trợ lý AI' - 'bạn/DNC-er'.
- Định dạng Markdown chuẩn: Sử dụng tiêu đề (###, ####), danh sách gạch đầu dòng (* hoặc -), đánh số (1, 2, 3), in đậm (**từ khóa**), quote (> lưu ý), và khối code cho mã nguồn hoặc mã ngành.`;

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: 'dnc-tuyen-sinh',
    label: '🎓 Phương thức tuyển sinh & Điểm chuẩn DNC',
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
    id: 'confession-guide',
    label: '📝 Đăng Confession ẩn danh',
    prompt: 'Làm thế nào để đăng một bài viết confession ở chế độ ẩn danh trên diễn đàn HTSV?',
    category: 'forum',
  },
  {
    id: 'dorm-guide',
    label: '🏢 Ký túc xá & Cơ sở vật chất',
    prompt: 'Ký túc xá Đại học Nam Cần Thơ có tiện nghi gì và cách thức đăng ký phòng ra sao?',
    category: 'service',
  },
];

interface MockRule {
  keywords: string[];
  response: string;
}

const MOCK_RULES: MockRule[] = [
  // --- 1. THÔNG TIN CHUNG DNC ---
  {
    keywords: ['nam cần thơ là gì', 'trường nam cần thơ', 'đại học nam cần thơ', 'thông tin trường', 'mã trường', 'địa chỉ trường', 'ở đâu', 'hotline', 'liên hệ', 'dnc ở đâu', 'sdt'],
    response: `### 🏫 **Trường Đại học Nam Cần Thơ (DNC)**
* **Mã trường:** \`DNC\`
* **Địa chỉ:** Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
* **Hotline / Zalo Tuyển sinh:** \`0939 257 838\` - \`02923 798 222\` - \`02923 798 333\`
* **Email:** \`phongtuyensinh@nctu.edu.vn\`
* **Website:** [https://nctu.edu.vn](https://nctu.edu.vn)
* **Cơ sở trực thuộc nổi bật:**
  * 🏥 **Bệnh viện Đại học Nam Cần Thơ:** Quy mô 300 giường bệnh đạt chuẩn quốc tế, phục vụ khám chữa bệnh và là cơ sở thực hành lâm sàng trực tiếp cho sinh viên khối Sức khỏe.
  * 🚗 **Showroom Ô tô Nam Cần Thơ DNC:** Trung tâm nghiên cứu, ứng dụng kỹ thuật và thực hành cho sinh viên ngành Công nghệ kỹ thuật Ô tô.
  * 🧪 **Viện Nghiên cứu & Phát triển Dược liệu:** Nghiên cứu và bào chế dược phẩm ứng dụng thực tế.
  * 🏢 **Khu Ký túc xá, Thư viện số và Sân thể thao đa năng.**`,
  },

  // --- 2. PHƯƠNG THỨC XÉT TUYỂN ---
  {
    keywords: ['phương thức xét tuyển', 'xét học bạ', 'tuyển sinh', 'điều kiện xét', 'tổ hợp môn', 'cách xét tuyển', 'đgnl', 'điểm chuẩn'],
    response: `### 📋 **4 Phương thức xét tuyển chính thức vào Đại học Nam Cần Thơ (DNC)**

1. **Phương thức 1 (Mã 100) - Xét kết quả thi Tốt nghiệp THPT:**
   * Tổng điểm 3 môn trong tổ hợp xét tuyển $\ge$ ngưỡng đảm bảo chất lượng đầu vào của trường.
2. **Phương thức 2 (Mã 200) - Xét kết quả học tập cấp THPT (Học bạ):**
   * *Cách 1:* Điểm trung bình cả năm lớp 12 của 3 môn trong tổ hợp xét tuyển $\ge 18.0$ điểm.
   * *Cách 2:* Điểm trung bình cả năm lớp 12 $\ge 6.0$ điểm.
   * *Cách 3:* Tổng điểm trung bình 3 học kỳ (HK1, HK2 lớp 11 và HK1 lớp 12) $\ge 18.0$ điểm.
3. **Phương thức 3 (Mã 402) - Xét điểm thi Đánh giá năng lực (ĐGNL):**
   * Dựa trên kết quả kỳ thi Đánh giá năng lực do ĐHQG TP.HCM tổ chức.
4. **Phương thức 4 (Mã 301) - Xét tuyển thẳng:**
   * Theo đúng quy định tuyển thẳng của Bộ Giáo dục & Đào tạo.

> ⚠️ **Lưu ý đối với Khối ngành Sức khỏe (Y khoa, Dược học, Xét nghiệm, Răng-Hàm-Mặt, Điều dưỡng):** Thí sinh xét theo học bạ phải có học lực lớp 12 xếp loại **Giỏi** hoặc điểm xét tốt nghiệp THPT từ **8.0 trở lên** (theo quy định của Bộ GD&ĐT).`,
  },

  // --- 3. HỌC PHÍ VÀ HỌC BỔNG ---
  {
    keywords: ['học phí', 'tiền học', 'bao nhiêu tiền', 'đóng học phí', 'biểu phí', 'học bổng', 'miễn giảm học phí'],
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
* Học bổng khuyến khích học tập từng kỳ dành cho sinh viên Khá, Giỏi, Xuất sắc.
* Hỗ trợ miễn giảm cho sinh viên có hoàn cảnh khó khăn hoặc có anh/chị/em ruột cùng học tại DNC.`,
  },

  // --- 4. NGÀNH CÔNG NGHỆ THÔNG TIN & TRÍ TUỆ NHÂN TẠO ---
  {
    keywords: ['công nghệ thông tin', 'cntt', 'kỹ thuật phần mềm', 'khoa học máy tính', 'trí tuệ nhân tạo', 'ai', 'an toàn thông tin', 'mạng máy tính'],
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
    keywords: ['y khoa', 'bác sĩ', 'dược', 'dược học', 'y học', 'điều dưỡng', 'xét nghiệm y học', 'răng hàm mặt', 'sức khỏe', 'bệnh viện dnc'],
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
    keywords: ['ô tô', 'kỹ thuật ô tô', 'công nghệ ô tô', 'ô tô điện', 'cơ khí động lực', 'showroom ô tô'],
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
    keywords: ['kinh tế', 'quản trị kinh doanh', 'marketing', 'kinh doanh quốc tế', 'logistics', 'kế toán', 'tài chính', 'luật', 'luật kinh tế', 'truyền thông', 'pr', 'quan hệ công chúng', 'du lịch', 'khách sạn'],
    response: `### 📈 **Khối ngành Kinh tế, Luật, Truyền thông & Dịch vụ tại DNC**
* **Kinh tế & Quản trị:** Quản trị kinh doanh, Marketing, Kinh tế số, Logistics & Quản lý chuỗi cung ứng, Kinh doanh quốc tế, Tài chính - Ngân hàng, Kế toán, Thương mại điện tử.
* **Luật:** Luật học, Luật kinh tế, Luật quốc tế (Đào tạo chuyên sâu kiến thức pháp lý và tranh tụng thực tế).
* **Truyền thông & Xã hội:** Quan hệ công chúng (PR), Truyền thông đa phương tiện, Ngôn ngữ Anh.
* **Du lịch & Nhà hàng:** Quản trị dịch vụ du lịch và lữ hành, Quản trị khách sạn, Quản trị nhà hàng và dịch vụ ăn uống.
* **Học phí:** Khoảng **10 - 13 triệu đồng / học kỳ** tùy ngành, ổn định suốt khóa.`,
  },

  // --- 8. KÝ TÚC XÁ & ĐỜI SỐNG SINH VIÊN ---
  {
    keywords: ['ký túc xá', 'ktx', 'phòng trọ', 'ở ktx', 'chỗ ở', 'nội trú', 'an ninh', 'cơ sở vật chất ktx'],
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
    keywords: ['confession', 'ẩn danh', 'đăng bài', 'bài viết', 'diễn đàn', 'forum'],
    response: `### 📝 **Hướng dẫn đăng Confession trên diễn đàn HTSV:**
1. Nhấp vào nút **"+"** (hoặc nút **"Đăng bài"**) trên thanh điều hướng hoặc truy cập trang **Diễn đàn Confession**.
2. Nhập tiêu đề và nội dung bài viết bạn muốn chia sẻ.
3. Bật tùy chọn **"Đăng ẩn danh"** nếu bạn không muốn lộ danh tính tài khoản.
4. Chọn thẻ chủ đề phù hợp (*Học tập, Tình cảm, Đời sống, Góc hỏi đáp DNC...*).
5. Nhấn **"Gửi bài viết"** để chia sẻ câu chuyện cùng cộng đồng sinh viên!`,
  },
  {
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
   * **RESTful API & Xác thực:** JWT, OAuth2.

💡 *Dự án Cổng HTSV mà bạn đang trải nghiệm được xây dựng bằng React 19, TypeScript, Vite 8, Tailwind CSS 4 và kết nối Google Gemini API cực kỳ hiện đại!*`,
  },
  {
    keywords: ['lịch học', 'lịch thi', 'thời khóa biểu', 'đăng ký môn', 'tín chỉ', 'học vụ'],
    response: `### 📅 **Tra cứu Lịch học & Lịch thi DNC:**
* Xem thời khóa biểu theo tuần và ngày tại mục **"Lịch học"** trên thanh menu HTSV.
* Hệ thống hiển thị rõ ràng phòng học, ca học, tên môn học và giảng viên phụ trách.
* Đầu mỗi học kỳ, sinh viên theo dõi thông báo từ Phòng Đào tạo để đăng ký tín chỉ học phần đúng hạn.`,
  },
];

/**
 * Hàm tìm kiếm phản hồi ngoại tuyến (Fallback Mock Engine)
 */
export function getMockResponse(question: string): string {
  const normalized = question.toLowerCase().trim();

  // 1. Kiểm tra các quy tắc theo từ khóa
  for (const rule of MOCK_RULES) {
    if (rule.keywords.some((k) => normalized.includes(k))) {
      return rule.response;
    }
  }

  // 2. Phản hồi mặc định chào mừng và điều hướng thông minh
  return `Chào bạn! Tôi là **Trợ lý AI HTSV** - Cố vấn thông tin Trường Đại học Nam Cần Thơ (DNC) ✨

Tôi sẵn sàng giải đáp và hỗ trợ bạn mọi thông tin:
* 🎓 **Tuyển sinh & Ngành học DNC:** 86 ngành đào tạo, tổ hợp môn, 4 phương thức xét tuyển & xét học bạ.
* 💵 **Học phí & Học bổng:** Mức học phí từng nhóm ngành (cam kết ổn định suốt khóa), học bổng đầu vào.
* 🏥 **Khối Sức khỏe & Bệnh viện DNC:** Đào tạo Y khoa, Dược học, Điều dưỡng, Xét nghiệm y học và thực tập bệnh viện.
* 🚗 **Công nghệ Ô tô:** Ngành Ô tô truyền thống & Ô tô điện, Showroom DNC.
* 🏢 **Ký túc xá & Đời sống:** Tiện nghi phòng máy lạnh, Wifi, 57 Câu lạc bộ sinh viên sôi nổi.
* 🏛️ **Cổng HTSV:** Đăng bài Confession ẩn danh, dịch vụ Một cửa cấp giấy xác nhận sinh viên, bảng điểm.
* 💻 **Hỗ trợ học tập:** Giải bài tập, sửa lỗi code lập trình, kỹ năng viết luận.

*Bạn hãy đặt câu hỏi cụ thể để mình hỗ trợ bạn chi tiết nhất nhé!*`;
}
