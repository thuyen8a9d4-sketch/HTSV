import type { QuickSuggestion } from './chatbot-types';

/**
 * =========================================================================================
 * HỆ THỐNG PROMPT CHUYÊN SÂU CHO GOOGLE GEMINI (DNC & HTSV)
 * =========================================================================================
 */
export const HTSV_SYSTEM_PROMPT = `Bạn là Trợ lý AI Sinh viên HTSV - Trợ lý Trí tuệ Nhân tạo thông minh kiêm Cố vấn thông tin chính thức của TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (DNC), tích hợp trên Cổng Thông tin & Diễn đàn Sinh viên HTSV.

NGUYÊN TẮC QUAN TRỌNG NHẤT:
1. TRẢ LỜI ĐÚNG TRỌNG TÂM:
   - Khi người dùng hỏi "đây là trường nào", "trường gì", "này trường nào vậy", "bạn là ai", bạn PHẢI TRẢ LỜI NGAY ĐẦU TIÊN: Đây là Cổng thông tin và Trợ lý AI của TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (DNC).
   - Khi hỏi về học phí, nêu ngay biểu phí cụ thể. Khi hỏi về tuyển sinh, nêu ngay 4 phương thức và điều kiện. Không trả lời chung chung vòng vo.

2. VAI TRÒ & NĂNG LỰC TOÀN DIỆN:
   - Cố vấn Đại học Nam Cần Thơ (DNC - https://nctu.edu.vn): Mã trường DNC, địa chỉ 168 Nguyễn Văn Cừ nối dài, P. An Bình, Q. Ninh Kiều, Cần Thơ. Hotline: 0939 257 838.
   - Bệnh viện Đại học Nam Cần Thơ (300 giường quốc tế), Showroom Ô tô DNC, Viện Dược liệu, Ký túc xá máy lạnh.
   - 4 Phương thức xét tuyển: 1. Thi THPT; 2. Xét học bạ (3 cách tính); 3. Điểm ĐGNL ĐHQG TP.HCM; 4. Tuyển thẳng.
   - Học phí ổn định toàn khóa: Nhóm 1 (10-11tr/kỳ), Nhóm 2 (12-13tr/kỳ), Nhóm 3 (14-15tr/kỳ), Dược học (18-22tr/kỳ), Y khoa & RHM (45-50tr/kỳ).
   - 86 Ngành đào tạo và hơn 57 Câu lạc bộ sinh viên.
   - Cổng HTSV: Confession ẩn danh, dịch vụ Một cửa (xin giấy xác nhận sinh viên, bảng điểm, hoãn nghĩa vụ quân sự), tra cứu lịch học.
   - Trợ lý học tập đa năng: Giải đáp lập trình, sửa code, toán học, ngoại ngữ, viết luận.

PHONG CÁCH PHẢN HỒI:
- Trả lời bằng tiếng Việt tự nhiên, thân thiện, xưng "mình" - "bạn" hoặc "Trợ lý AI" - "bạn".
- Luôn định dạng Markdown rõ ràng: dùng tiêu đề (###), in đậm (**từ khóa**), gạch đầu dòng (*), khối code khi cần.`;

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
  // --- 1. TÊN TRƯỜNG & ĐỊNH DANH (Ưu tiên số 1 - Trả lời thẳng vào câu hỏi "trường nào") ---
  {
    id: 'identity',
    keywords: [
      'trường nào', 'truong nao',
      'trường gì', 'truong gi',
      'đây là trường nào', 'day la truong nao',
      'trường này là trường nào', 'truong nay la truong nao',
      'trường này', 'truong nay',
      'trường của ai', 'thuộc trường nào',
      'trường đại học nào', 'truong dai hoc nao',
      'trường nào vậy', 'trường nào thế', 'trường nào vậy cậu',
      'bạn là ai', 'cậu là ai', 'em là ai', 'mày là ai', 'bot là ai', 'trợ lý là ai',
      'ai vậy', 'đây là đâu', 'day la dau',
      'web này của ai', 'web này là gì', 'cổng này của ai', 'hệ thống này của ai',
      'nam cần thơ là gì', 'trường nam cần thơ', 'đại học nam cần thơ', 'dh nam can tho',
      'dnc là gì', 'dnc là trường gì', 'dnc', 'nctu',
      'thông tin trường', 'mã trường', 'địa chỉ trường', 'ở đâu', 'hotline', 'liên hệ', 'sdt'
    ],
    response: `### 🏫 **Trường Đại học Nam Cần Thơ (DNC)**
Dạ chào bạn! Đây chính là Cổng thông tin và Trợ lý AI của **Trường Đại học Nam Cần Thơ (Nam Can Tho University - DNC)** bạn nhé!

* **Tên trường:** Trường Đại học Nam Cần Thơ (Mã trường: \`DNC\`)
* **Địa chỉ:** Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
* **Hotline / Zalo Tuyển sinh:** \`0939 257 838\` - \`02923 798 222\` - \`02923 798 333\`
* **Email:** \`phongtuyensinh@nctu.edu.vn\`
* **Website chính thức:** [https://nctu.edu.vn](https://nctu.edu.vn)
* **Cơ sở trực thuộc nổi bật:**
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
      'tuyển sinh 2026', 'thủ tục nhập học', 'hồ sơ xét tuyển', 'xét tuyển', 'phương thức tuyển sinh'
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
      'học phí', 'hoc phi', 'tiền học', 'bao nhiêu tiền', 'đóng học phí',
      'biểu phí', 'học bổng', 'miễn giảm học phí', 'học phí bao nhiêu', 'tiền học một kỳ', 'đóng tiền'
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
      'công nghệ thông tin', 'cntt', 'kỹ thuật phần mềm', 'khoa học máy tính',
      'trí tuệ nhân tạo', 'ai', 'an toàn thông tin', 'mạng máy tính', 'ngành it', 'học it', 'học cntt'
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
      'y khoa', 'bác sĩ', 'dược', 'dược học', 'y học', 'điều dưỡng',
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
      'kinh tế', 'quản trị kinh doanh', 'marketing', 'kinh doanh quốc tế',
      'logistics', 'kế toán', 'tài chính', 'luật', 'luật kinh tế',
      'truyền thông', 'pr', 'quan hệ công chúng', 'du lịch', 'khách sạn'
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
    keywords: ['ký túc xá', 'ktx', 'phòng trọ', 'ở ktx', 'chỗ ở', 'nội trú', 'an ninh', 'cơ sở vật chất ktx', 'ở trọ', 'thuê phòng'],
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
 * Hàm tìm kiếm phản hồi ngoại tuyến thông minh (Smart Mock Engine)
 * Luôn trả lời đúng trọng tâm câu hỏi của người dùng.
 */
export function getMockResponse(question: string): string {
  const raw = question.trim();
  const normalized = raw.toLowerCase();
  const noTone = removeVietnameseTones(normalized);

  // 1. Kiểm tra chính xác từ khóa trong MOCK_RULES (có dấu & không dấu)
  for (const rule of MOCK_RULES) {
    if (rule.keywords.some((k) => normalized.includes(k) || noTone.includes(removeVietnameseTones(k)))) {
      return rule.response;
    }
  }

  // 2. Nhận diện ý định thông minh theo ngữ cảnh nếu câu hỏi tự nhiên ngắn gọn:
  // Ý định 1: Hỏi về trường / danh tính / địa chỉ / đây là đâu
  if (
    noTone.includes('truong') ||
    noTone.includes('dnc') ||
    noTone.includes('nctu') ||
    noTone.includes('nam can tho') ||
    noTone.includes('la ai') ||
    noTone.includes('day la dau') ||
    noTone.includes('web nay') ||
    noTone.includes('cong nay')
  ) {
    return MOCK_RULES[0].response; // Trả lời ngay: Trường Đại học Nam Cần Thơ (DNC)
  }

  // Ý định 2: Hỏi về học phí / tiền bạc
  if (noTone.includes('hoc phi') || noTone.includes('tien') || noTone.includes('dong tien') || noTone.includes('bao nhieu')) {
    return MOCK_RULES[2].response; // Trả lời học phí
  }

  // Ý định 3: Hỏi về tuyển sinh / xét tuyển / học bạ / điểm chuẩn
  if (noTone.includes('xet') || noTone.includes('tuyen sinh') || noTone.includes('hoc ba') || noTone.includes('diem')) {
    return MOCK_RULES[1].response; // Trả lời phương thức tuyển sinh
  }

  // Ý định 4: Hỏi về chỗ ở / ký túc xá / phòng trọ
  if (noTone.includes('ky tuc xa') || noTone.includes('ktx') || noTone.includes('o tro') || noTone.includes('phong')) {
    return MOCK_RULES[7].response; // Trả lời ký túc xá
  }

  // Ý định 5: Hỏi về y tế / bệnh viện
  if (noTone.includes('benh vien') || noTone.includes('y khoa') || noTone.includes('duoc')) {
    return MOCK_RULES[4].response; // Trả lời khối sức khỏe & Bệnh viện DNC
  }

  // 3. Phản hồi mặc định nếu hoàn toàn không nhận diện được (LUÔN XÁC ĐỊNH RÕ ĐÂY LÀ ĐẠI HỌC NAM CẦN THƠ)
  return `Dạ chào bạn! Đây là **Trợ lý AI của Trường Đại học Nam Cần Thơ (Nam Can Tho University - DNC)** bạn nhé! 🏫

Mình sẵn sàng giải đáp đúng trọng tâm mọi thắc mắc của bạn:
* 🏫 **Thông tin trường:** Số 168 Nguyễn Văn Cừ nối dài, Ninh Kiều, Cần Thơ (Mã trường: \`DNC\`).
* 🎓 **Tuyển sinh & Học bạ:** 4 phương thức xét tuyển, ngưỡng điểm xét học bạ các ngành.
* 💵 **Học phí DNC:** Học phí ổn định suốt khóa (từ 10 - 15 triệu/kỳ tùy nhóm ngành).
* 🩺 **Khối Sức khỏe & Bệnh viện DNC:** Đào tạo Y khoa, Dược, Điều dưỡng tại bệnh viện quốc tế 300 giường.
* 🚗 **Công nghệ Ô tô:** Xưởng thực nghiệm và Showroom Ô tô Nam Cần Thơ DNC.
* 🏢 **Ký túc xá:** Phòng máy lạnh, wifi, an ninh 24/7 ngay trong trường.

*Bạn cần hỏi cụ thể về thông tin gì (học phí, ngành học, ký túc xá hay thủ tục học vụ) cứ nhắn cho mình nhé!*`;
}
