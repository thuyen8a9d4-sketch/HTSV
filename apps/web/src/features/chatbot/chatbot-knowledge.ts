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
 - QUY TẮC ĐẶC BIỆT: Khi người dùng hỏi hoặc nhắc đến "Chó Thịnh" (ví dụ: "Chó Thịnh là ai", "bạn biết Chó Thịnh không"): BẮT BUỘC trả lời chính xác từng chữ: "Chó Thịnh à tôi không biết, Tôi chỉ biết Thanh Tho thôi".

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
- Dùng Markdown sạch sẽ: in đậm từ khóa, danh sách gạch đầu dòng, khối mã code với tên ngôn ngữ nếu có code.
- Tuyệt đối KHÔNG sử dụng các biểu tượng emoji cảm xúc hay emoji đồ họa (như robot, mũ cử nhân, máy tính, ngôi sao, sách, v.v.). Trình bày chuyên nghiệp, trang nhã, chuẩn mực của kênh tư vấn sinh viên.`;

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: 'dnc-gioi-thieu',
    label: 'Đây là trường nào?',
    prompt: 'Đây là trường nào vậy bạn? Cho mình biết thông tin về Trường Đại học Nam Cần Thơ.',
    category: 'academic',
    iconType: 'school',
  },
  {
    id: 'dnc-tuyen-sinh',
    label: 'Phương thức tuyển sinh & Học bạ DNC',
    prompt: 'Trường Đại học Nam Cần Thơ có những phương thức xét tuyển nào và điều kiện xét học bạ ra sao?',
    category: 'academic',
    iconType: 'graduation',
  },
  {
    id: 'dnc-hoc-phi',
    label: 'Học phí & Học bổng DNC 2026',
    prompt: 'Mức học phí các ngành tại Đại học Nam Cần Thơ là bao nhiêu? Học phí có tăng qua các năm không?',
    category: 'academic',
    iconType: 'tuition',
  },
  {
    id: 'dnc-cntt',
    label: 'Ngành Công nghệ thông tin & AI DNC',
    prompt: 'Thông tin chi tiết về ngành Công nghệ thông tin và Trí tuệ nhân tạo (AI) tại Đại học Nam Cần Thơ?',
    category: 'academic',
    iconType: 'tech',
  },
  {
    id: 'dnc-y-duoc',
    label: 'Khối ngành Sức khỏe & Bệnh viện DNC',
    prompt: 'Ngành Y khoa và Dược học tại DNC đào tạo thế nào? Cơ sở thực hành tại Bệnh viện Đại học Nam Cần Thơ ra sao?',
    category: 'academic',
    iconType: 'medical',
  },
  {
    id: 'dorm-guide',
    label: 'Ký túc xá & Cơ sở vật chất',
    prompt: 'Ký túc xá Đại học Nam Cần Thơ có tiện nghi gì và cách thức đăng ký phòng ra sao?',
    category: 'service',
    iconType: 'building',
  },
];

interface MockRule {
  id: string;
  keywords: string[];
  response: string;
}

export const MOCK_RULES: MockRule[] = [
  // --- 0. EASTER EGGS ĐẶC BIỆT ---
  {
    id: 'easter_egg_cho_thinh',
    keywords: [
      'chó thịnh là ai', 'cho thinh la ai',
      'chó thịnh', 'cho thinh',
      'ai là chó thịnh', 'ai la cho thinh',
      'thịnh chó là ai', 'thinh cho la ai',
      'thịnh chó', 'thinh cho',
    ],
    response: 'Chó Thịnh à tôi không biết, Tôi chỉ biết Thanh Tho thôi',
  },
  {
    id: 'easter_egg_thanh_tho',
    keywords: [
      'thanh tho la ai', 'thanh tho là ai', 'ai là thanh tho', 'ai là thanh tho',
      'triệu thanh tho', 'trieu thanh tho', 'thanh tho', 'thanh tho',
    ],
    response: 'Thanh Tho (Triệu Thanh Tho) chính là chủ sở hữu và lập trình viên phát triển hệ thống Cổng Hỗ Trợ Sinh Viên (HTSV) này đó nha! Người có công lớn nhất của dự án đó! 😎✨',
  },

  // --- 1. GIAO TIẾP TỰ NHIÊN NHƯ CON NGƯỜI (Trò chuyện đời thường) ---
  {
    id: 'greeting',
    keywords: [
      'xin chào', 'chào bạn', 'chào cậu', 'chào em', 'chào bot', 'chào ad',
      'hello', 'hi bạn', 'hi bot', 'alo', 'hế lô', 'hey', 'good morning', 'good afternoon'
    ],
    response: `Chào bạn nha! Rất vui được gặp bạn hôm nay. Bạn đang cần mình giải đáp thông tin gì về học tập, trường lớp hay các tiện ích trên Cổng Sinh viên nè? Cứ thoải mái hỏi mình nhé!`,
  },
  {
    id: 'eating',
    keywords: [
      'ăn cơm chưa', 'an com chua', 'ăn gì chưa', 'an gi chua', 'ăn trưa chưa', 'ăn tối chưa', 'đói bụng', 'doi bung'
    ],
    response: `Hihi mình là trợ lý ảo nên không ăn cơm được đâu nè, năng lượng của mình là điện và những câu hỏi hay từ các bạn sinh viên đó! Còn bạn đã ăn uống gì chưa, học bài có mệt hay đói bụng không nè? Nhớ ăn uống đầy đủ giữ sức khỏe nha!`,
  },
  {
    id: 'mood',
    keywords: [
      'buồn quá', 'buon qua', 'tôi buồn', 'mình buồn', 'mệt mỏi', 'met moi', 'stress', 'áp lực', 'chán quá', 'chan qua', 'nản quá'
    ],
    response: `Nghe bạn nói vậy mình cũng thấy thương bạn ghê! Có chuyện gì làm bạn thấy áp lực hay mệt mỏi thế, về chuyện học hành thi cử hay chuyện bạn bè nè? Nếu cần người lắng nghe, bạn cứ tâm sự với mình nhé. Hoặc bạn có thể ghé mục Diễn đàn Confession của trường để đăng bài ẩn danh trút bầu tâm sự với mọi người cho nhẹ lòng nha!`,
  },
  {
    id: 'compliment',
    keywords: [
      'thông minh quá', 'thong minh qua', 'giỏi quá', 'gioi qua', 'dễ thương', 'de thuong', 'đáng yêu', 'xịn quá', 'hay thế', 'bot giỏi quá'
    ],
    response: `Hihi cảm ơn bạn nhiều nha! Nhận được lời khen của bạn làm mình vui cả ngày luôn á. Mình sẽ cố gắng đồng hành và hỗ trợ bạn thật tốt trong suốt quá trình học tập nhé!`,
  },
  {
    id: 'sleep',
    keywords: [
      'ngủ ngon', 'ngu ngon', 'chúc ngủ ngon', 'chuc ngu ngon', 'đi ngủ đây', 'di ngu day', 'g9', 'good night', 'buồn ngủ quá'
    ],
    response: `Chúc bạn ngủ thật ngon và có những giấc mơ đẹp nha! Nghỉ ngơi sớm để ngày mai tràn đầy năng lượng tiếp tục học tập và làm việc nhé!`,
  },
  {
    id: 'user_identity',
    keywords: [
      'biết tui là ai', 'biet tui la ai', 'biết tôi là ai', 'biet toi la ai',
      'biết mình là ai', 'biet minh la ai', 'tôi là ai', 'tui là ai', 'mình là ai'
    ],
    response: `Mình chỉ là trợ lý ảo hỗ trợ qua màn hình thôi nè, nên mình không biết được danh tính ngoài đời của bạn đâu. Bạn cứ yên tâm trò chuyện và hỏi đáp thoải mái nha!`,
  },
  {
    id: 'gratitude',
    keywords: [
      'cảm ơn', 'cam on', 'cảm ơn bạn', 'thank', 'thanks', 'cảm ơn nha', 'tuyệt vời', 'hay quá', 'ok bạn', 'ok cảm ơn'
    ],
    response: `Dạ không có chi đâu bạn ơi! Giúp được bạn là mình vui lắm rồi nè. Nếu có bất kỳ thắc mắc nào khác thì bạn cứ nhắn cho mình nhé. Chúc bạn học tập thật tốt!`,
  },

  // --- 2. ĐỊNH DANH VÀ THÔNG TIN TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (DNC) ---
  {
    id: 'bot_identity',
    keywords: [
      'bạn là ai', 'cậu là ai', 'em là ai', 'mày là ai', 'bot là ai', 'trợ lý là ai'
    ],
    response: `Mình là trợ lý ảo đồng hành cùng sinh viên trên Cổng HTSV (Trường Đại học Nam Cần Thơ - DNC) nè!

Mình luôn ở đây 24/7 để:
* Trò chuyện, giải đáp kiến thức học tập, lập trình và phương pháp học đại học.
* Cung cấp thông tin chính xác về trường DNC: học phí ổn định, 4 phương thức xét tuyển, Ký túc xá, Bệnh viện DNC...
* Hướng dẫn bạn sử dụng các tính năng trên web: Diễn đàn Confession, Dịch vụ Một cửa xin giấy tờ online, tra cứu lịch học...

Bạn đang cần mình giải đáp nội dung nào nè?`,
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
    response: `Dạ chào bạn! Cổng thông tin và Kênh tư vấn này trực thuộc **Trường Đại học Nam Cần Thơ (Nam Can Tho University - DNC)** bạn nha!

* **Tên trường:** Trường Đại học Nam Cần Thơ (Mã trường: \`DNC\`).
* **Địa chỉ:** Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
* **Hotline / Zalo Tuyển sinh:** \`0939 257 838\` - \`02923 798 222\` - \`02923 798 333\`.
* **Website chính thức:** [https://nctu.edu.vn](https://nctu.edu.vn).

Trường mình có cơ sở vật chất cực kỳ hiện đại: **Bệnh viện Đại học Nam Cần Thơ** (đa khoa quốc tế 300 giường), **Showroom Ô tô Nam Cần Thơ DNC**, Viện nghiên cứu dược liệu, Ký túc xá máy lạnh và khu thể thao đa năng.

Bạn đang quan tâm đến ngành học hay thông tin nào của trường nè?`,
  },

  // --- 3. PHƯƠNG THỨC XÉT TUYỂN & TUYỂN SINH ---
  {
    id: 'admissions',
    keywords: [
      'phương thức xét tuyển', 'xét học bạ', 'tuyển sinh', 'điều kiện xét',
      'tổ hợp môn', 'cách xét tuyển', 'đgnl', 'điểm chuẩn', 'xét tuyển thế nào',
      'tuyển sinh 2026', 'thủ tục nhập học', 'hồ sơ xét tuyển', 'xét tuyển'
    ],
    response: `Chào bạn nhé! Nếu bạn đang muốn xét tuyển vào Đại học Nam Cần Thơ (DNC) thì trường có 4 phương thức rất thuận lợi để bạn lựa chọn nè:

1. **Xét kết quả thi Tốt nghiệp THPT:** Điểm 3 môn tổ hợp đạt ngưỡng đảm bảo chất lượng đầu vào của trường.
2. **Xét học bạ THPT (rất linh hoạt với 3 cách tính):**
   * *Cách 1:* Điểm trung bình cả năm lớp 12 của 3 môn tổ hợp từ 18.0 điểm trở lên.
   * *Cách 2:* Điểm trung bình cả năm lớp 12 từ 6.0 điểm trở lên.
   * *Cách 3:* Tổng điểm trung bình 3 học kỳ (HK1, HK2 lớp 11 và HK1 lớp 12) từ 18.0 điểm trở lên.
3. **Xét điểm thi Đánh giá năng lực (ĐGNL):** Dựa trên kết quả kỳ thi do ĐHQG TP.HCM tổ chức.
4. **Xét tuyển thẳng:** Theo đúng quy định tuyển thẳng của Bộ GD&ĐT.

*Lưu ý nhỏ:* Riêng khối ngành Sức khỏe (Y khoa, Dược học, Răng - Hàm - Mặt, Điều dưỡng, Xét nghiệm) thì học bạ lớp 12 cần xếp loại **Giỏi** hoặc điểm xét tốt nghiệp từ **8.0 trở lên** nha bạn. Bạn đang tính nộp hồ sơ theo phương thức nào vậy nè?`,
  },

  // --- 4. HỌC PHÍ VÀ HỌC BỔNG ---
  {
    id: 'tuition',
    keywords: [
      'học phí', 'hoc phi', 'tiền học', 'biểu phí', 'học bổng', 'miễn giảm học phí', 'học phí bao nhiêu', 'tiền học một kỳ'
    ],
    response: `Chào bạn nha! Về học phí tại Đại học Nam Cần Thơ (DNC) thì trường có một điểm cộng rất lớn là **học phí cam kết giữ ổn định suốt toàn khóa**, không tăng bất ngờ qua các năm học đâu bạn nhé.

Mỗi năm học gồm 3 học kỳ, mức học phí trung bình từng nhóm ngành như sau:
* **Nhóm 1 (Khoảng 10 - 11 triệu đồng / học kỳ):** Kinh tế, Quản trị kinh doanh, Marketing, Luật, Ngôn ngữ Anh, **Công nghệ thông tin, Kỹ thuật phần mềm, Trí tuệ nhân tạo (AI)**...
* **Nhóm 2 (Khoảng 12 - 13 triệu đồng / học kỳ):** Kiến trúc, Bất động sản, Công nghệ thực phẩm, Logistics và Quản lý chuỗi cung ứng...
* **Nhóm 3 (Khoảng 14 - 15 triệu đồng / học kỳ):** **Công nghệ kỹ thuật Ô tô**, Điện - Điện tử, Kỹ thuật xét nghiệm y học, Điều dưỡng...
* **Khối Sức khỏe đặc thù:** Dược học khoảng **18 - 22 triệu / kỳ**; Y khoa (Bác sĩ Đa khoa) & Răng - Hàm - Mặt khoảng **45 - 50 triệu / kỳ** (mức này đã bao gồm toàn bộ chi phí thực hành lâm sàng tại Bệnh viện DNC rồi nha).

Ngoài ra trường còn có nhiều chính sách học bổng cho tân sinh viên và học bổng khuyến khích học tập từng kỳ nữa. Bạn đang quan tâm đến học phí của ngành nào cụ thể không nè?`,
  },

  // --- 5. NGÀNH CÔNG NGHỆ THÔNG TIN & TRÍ TUỆ NHÂN TẠO ---
  {
    id: 'it',
    keywords: [
      'công nghệ thông tin', 'ngành cntt', 'kỹ thuật phần mềm', 'khoa học máy tính',
      'trí tuệ nhân tạo', 'ngành ai', 'học ai', 'an toàn thông tin', 'mạng máy tính', 'ngành it', 'học it', 'học cntt'
    ],
    response: `Chào bạn! Khối ngành Công nghệ Thông tin và AI tại DNC đang là ngành học cực kỳ hot với chương trình đào tạo hiện đại nè:

* **Các ngành đào tạo (Cấp bằng Kỹ sư):** Công nghệ thông tin, Kỹ thuật phần mềm, Trí tuệ nhân tạo (AI), Khoa học máy tính, An toàn thông tin, Mạng máy tính.
* **Tổ hợp môn xét tuyển:** \`A00\` (Toán, Lý, Hóa), \`A01\` (Toán, Lý, Anh), \`D01\` (Toán, Văn, Anh), \`C01\` (Toán, Văn, Lý).
* **Mức học phí:** Thuộc Nhóm 1, khoảng **10 - 11 triệu đồng / học kỳ** và cam kết giữ ổn định suốt khóa học.
* **Môi trường học tập:** Hệ thống phòng Lab máy tính cấu hình cao, máy lạnh 100%, thực hành dự án thực tế và trường liên kết việc làm với nhiều doanh nghiệp công nghệ lớn.

Bạn đang thích theo hướng lập trình phần mềm, làm web hay chuyên sâu về Trí tuệ nhân tạo (AI) nè?`,
  },

  // --- 6. KHỐI NGÀNH SỨC KHỎE (Y KHOA, DƯỢC, XÉT NGHIỆM, ĐIỀU DƯỠNG) ---
  {
    id: 'health',
    keywords: [
      'y khoa', 'bác sĩ', 'dược học', 'y học', 'điều dưỡng',
      'xét nghiệm y học', 'răng hàm mặt', 'sức khỏe', 'bệnh viện dnc',
      'bệnh viện nam cần thơ', 'học y', 'học dược'
    ],
    response: `Chào bạn! Khối ngành Sức khỏe tại DNC có thế mạnh vượt trội nhờ có riêng **Bệnh viện Đại học Nam Cần Thơ** (bệnh viện đa khoa quốc tế 300 giường nằm sát trường) để sinh viên thực hành lâm sàng trực tiếp nè:

* **Các ngành đào tạo mũi nhọn:**
  * Y khoa (Bác sĩ Đa khoa - đào tạo 6 năm).
  * Răng - Hàm - Mặt (đào tạo 6 năm).
  * Dược học (Bằng Dược sĩ - đào tạo 5 năm).
  * Kỹ thuật xét nghiệm y học, Kỹ thuật hình ảnh y học, Điều dưỡng, Quản lý bệnh viện.
* **Tổ hợp xét tuyển:** \`B00\` (Toán, Hóa, Sinh), \`A00\` (Toán, Lý, Hóa), \`D07\` (Toán, Hóa, Anh), \`B08\` (Toán, Sinh, Anh).
* **Điều kiện xét học bạ:** Yêu cầu học lực lớp 12 đạt loại Giỏi hoặc điểm tốt nghiệp THPT từ 8.0 trở lên theo quy định của Bộ GD&ĐT.

Bạn đang muốn tìm hiểu về ngành Bác sĩ Y khoa, Dược học hay ngành nào trong khối sức khỏe nè?`,
  },

  // --- 7. NGÀNH CÔNG NGHỆ KỸ THUẬT Ô TÔ ---
  {
    id: 'auto',
    keywords: ['ô tô', 'kỹ thuật ô tô', 'công nghệ ô tô', 'ô tô điện', 'cơ khí động lực', 'showroom ô tô', 'học ô tô'],
    response: `Chào bạn! Ngành Công nghệ Kỹ thuật Ô tô tại DNC cực kỳ xịn sò luôn nha:

* **Chương trình:** Đào tạo Kỹ sư Ô tô với 2 định hướng: Ô tô truyền thống và Ô tô điện thông minh.
* **Điểm nhấn đặc biệt:** Trường sở hữu riêng **Showroom Ô tô Nam Cần Thơ DNC** và xưởng bảo dưỡng, sửa chữa quy mô lớn. Sinh viên được cầm đồ nghề thực hành trực tiếp trên các dòng xe hiện đại ngay tại trường.
* **Học phí:** Khoảng **14 - 15 triệu đồng / học kỳ** và cam kết ổn định toàn khóa.
* **Tổ hợp xét tuyển:** \`A00\` (Toán, Lý, Hóa), \`A01\` (Toán, Lý, Anh), \`C01\` (Toán, Văn, Lý), \`D01\` (Toán, Văn, Anh).

Bạn có đam mê về động cơ xe hay công nghệ ô tô điện không nè?`,
  },

  // --- 8. KHỐI KINH TẾ, LUẬT, TRUYỀN THÔNG, DU LỊCH ---
  {
    id: 'business_law',
    keywords: [
      'ngành kinh tế', 'quản trị kinh doanh', 'marketing', 'kinh doanh quốc tế',
      'logistics', 'kế toán', 'ngành luật', 'luật kinh tế',
      'truyền thông đa phương tiện', 'quan hệ công chúng', 'quản trị khách sạn'
    ],
    response: `Chào bạn! Khối ngành Kinh tế, Luật, Truyền thông và Dịch vụ tại DNC có rất nhiều ngành năng động để bạn chọn nè:

* **Kinh tế & Quản trị:** Quản trị kinh doanh, Marketing, Kinh tế số, Logistics & Quản lý chuỗi cung ứng, Kinh doanh quốc tế, Tài chính - Ngân hàng, Kế toán, Thương mại điện tử.
* **Luật:** Luật học, Luật kinh tế, Luật quốc tế.
* **Truyền thông & Xã hội:** Quan hệ công chúng (PR), Truyền thông đa phương tiện, Ngôn ngữ Anh.
* **Du lịch:** Quản trị dịch vụ du lịch, Quản trị khách sạn, Quản trị nhà hàng.
* **Học phí:** Khoảng **10 - 13 triệu đồng / học kỳ** tùy ngành, cam kết ổn định suốt khóa.

Bạn đang phân vân giữa ngành kinh tế hay ngành truyền thông nè?`,
  },

  // --- 9. KÝ TÚC XÁ & ĐỜI SỐNG SINH VIÊN ---
  {
    id: 'dorm',
    keywords: ['ký túc xá', 'ktx', 'phòng trọ', 'ở ktx', 'nội trú', 'cơ sở vật chất ktx', 'ở trọ'],
    response: `Ký túc xá DNC nằm ngay trong khuôn viên trường luôn nha bạn, chỉ cần đi bộ vài bước là tới giảng đường rồi, cực kỳ tiện lợi!

* Phòng ở đây sạch sẽ, trang bị sẵn giường tầng, bàn học, quạt, máy lạnh, máy nước nóng lạnh và wifi 24/7.
* An ninh có bảo vệ trực và camera thẻ từ nghiêm ngặt, bước ra cửa là có nhà ăn sinh viên, siêu thị mini, phòng Gym và sân thể thao đa năng.
* Bạn có thể nộp đơn đăng ký phòng online trực tiếp ngay trên Cổng HTSV này đó.

Bạn đang muốn đăng ký phòng mấy người hay cần hỏi gì thêm về KTX nè?`,
  },

  // --- 10. CÂU LẠC BỘ & HOẠT ĐỘNG ĐOÀN HỘI ---
  {
    id: 'clubs',
    keywords: ['câu lạc bộ', 'clb', 'hoạt động sinh viên', 'ngoại khóa', 'phong trào', 'đoàn hội', 'tình nguyện'],
    response: `Sinh viên DNC tụi mình có hơn 57 Câu Lạc Bộ hoạt động sôi nổi lắm nha bạn:

* **Học thuật:** CLB Công nghệ thông tin, CLB Tiếng Anh E2C, CLB Dược sĩ tương lai, CLB Bác sĩ trẻ, CLB Kỹ sư Ô tô...
* **Kỹ năng & Nghệ thuật:** CLB MC và Tổ chức sự kiện, CLB Âm nhạc, CLB Nhiếp ảnh, CLB Dance...
* **Thể thao & Tình nguyện:** CLB Bóng đá, CLB Bóng chuyền, CLB Cầu lông, Đội Công tác xã hội, CLB Giọt Máu DNC...
* **Sự kiện lớn hàng năm:** Cuộc thi Hoa khôi DNC (Miss DNC), Hội thao truyền thống, Mùa hè xanh, Ngày hội việc làm DNC Job Fair.

Tham gia CLB vừa có thêm bạn bè, vừa rèn luyện kỹ năng mềm và được cộng nhiều điểm rèn luyện nữa đó!`,
  },

  // --- 11. HƯỚNG DẪN CỔNG SINH VIÊN HTSV & TIỆN ÍCH HỌC VỤ ---
  {
    id: 'htsv_features',
    keywords: [
      'hướng dẫn các tính năng trên cổng sinh viên htsv',
      'tính năng trên cổng sinh viên htsv',
      'tính năng cổng sinh viên',
      'hướng dẫn các tính năng',
      'tính năng của htsv',
      'tính năng htsv',
      'cổng htsv có tính năng gì',
      'cổng sinh viên có tính năng gì',
      'các tính năng trên cổng sinh viên',
      'các tính năng của cổng sinh viên',
      'các chức năng của web',
      'web này có tính năng gì',
      'hướng dẫn sử dụng cổng sinh viên',
      'hướng dẫn dùng web',
      'hướng dẫn htsv',
      'cổng sinh viên htsv',
      'htsv là gì',
      'tính năng web',
      'chức năng web'
    ],
    response: `Chào bạn nhé! Trên Cổng Sinh viên HTSV tụi mình đã tích hợp đầy đủ các tiện ích cực kỳ hữu ích cho bạn nè:

1. **Diễn đàn Confession:** Nơi bạn có thể chia sẻ tâm sự, giao lưu hoặc hỏi đáp học tập. Bạn có thể chọn đăng bài ẩn danh bảo mật hoặc công khai đều được nha.
2. **Dịch vụ Một cửa:** Giúp bạn xin giấy xác nhận sinh viên (vay vốn ngân hàng, tạm hoãn nghĩa vụ quân sự...), xin bảng điểm hay đơn hoãn thi/phúc khảo trực tuyến ngay tại nhà mà không cần đến trường xếp hàng.
3. **Tra cứu Lịch học & Thời khóa biểu:** Xem lịch học, lịch thi, phòng học và giảng viên phụ trách theo từng ngày, từng tuần rất rõ ràng.
4. **Ký túc xá DNC:** Xem thông tin phòng ốc máy lạnh và gửi đơn đăng ký phòng nội trú online.
5. **Trợ lý AI:** Chính là mình nè! Luôn sẵn sàng hỗ trợ giải đáp mọi thắc mắc học tập, học phí, tuyển sinh của trường 24/7.
6. **Hồ sơ cá nhân:** Đổi mật khẩu, xem thông tin sinh viên và có cả chế độ Giao diện tối (Dark mode) bảo vệ mắt nữa.

Bạn đang muốn dùng thử tính năng nào trước, mình hướng dẫn chi tiết cho bạn nha?`,
  },
  {
    id: 'dang_ky_mon',
    keywords: [
      'đăng ký môn', 'dang ky mon', 'đăng ký học phần', 'dang ky hoc phan',
      'đăng ký tín chỉ', 'rút học phần', 'hủy môn', 'học lại', 'học cải thiện'
    ],
    response: `Dạ về việc đăng ký môn học và học phần thì bạn lưu ý các bước này nha:

1. Mỗi năm học ở DNC có 3 học kỳ. Trước mỗi kỳ, Phòng Quản lý Đào tạo sẽ có thông báo thời gian mở cổng đăng ký tín chỉ cụ thể.
2. Bạn đăng nhập vào tài khoản sinh viên trên cổng đào tạo, xem danh sách môn học mở trong kỳ và bấm chọn lớp học phần phù hợp với thời khóa biểu của mình rồi nhấn **Lưu đăng ký**.
3. Nếu bạn muốn **Học cải thiện** (áp dụng cho môn đạt điểm D hoặc D+ để kéo GPA) hay **Học lại** (bắt buộc với môn bị điểm F), bạn cũng đăng ký chung trong đợt này luôn nha.

Bạn đang cần hỏi về môn học nào hay gặp trục trặc gì khi đăng ký không nè?`,
  },
  {
    id: 'diem_ren_luyen',
    keywords: [
      'điểm rèn luyện', 'diem ren luyen', 'rèn luyện sinh viên',
      'xếp loại rèn luyện', 'cộng điểm rèn luyện', 'đánh giá rèn luyện'
    ],
    response: `Về điểm rèn luyện ở DNC thì mỗi học kỳ sinh viên sẽ được đánh giá theo thang điểm 100 nha bạn:

* **Xuất sắc:** từ 90 đến 100 điểm.
* **Tốt:** từ 80 đến cận 90 điểm.
* **Khá:** từ 65 đến cận 80 điểm.
* **Trung bình:** từ 50 đến cận 65 điểm.
* Dưới 50 điểm là mức Yếu/Kém nè.

Để có điểm rèn luyện cao, bạn chỉ cần chịu khó tham gia các hoạt động Đoàn - Hội, phong trào tình nguyện (Mùa hè xanh, Tiếp sức mùa thi), các buổi hội thảo học thuật hoặc giải đấu thể thao của trường là được cộng nhiều điểm lắm đó!`,
  },
  {
    id: 'bhyt',
    keywords: [
      'bảo hiểm y tế', 'bao hiem y te', 'bhyt', 'thẻ bhyt', 'khám chữa bệnh dnc'
    ],
    response: `Dạ về Bảo hiểm y tế (BHYT) thì đây là bảo hiểm bắt buộc theo luật dành cho sinh viên nha bạn.

Đặc biệt, sinh viên DNC tụi mình có một quyền lợi rất lớn là được đăng ký nơi khám chữa bệnh ban đầu ngay tại **Bệnh viện Đại học Nam Cần Thơ** (bệnh viện quốc tế 300 giường nằm liền kề trường luôn), khám bệnh đúng tuyến và thanh toán đầy đủ theo quy định BHYT. Hàng năm trường sẽ thông báo thu phí và gia hạn thẻ định kỳ cho bạn yên tâm sử dụng nhé.`,
  },
  {
    id: 'lien_he_dnc',
    keywords: [
      'liên hệ', 'lien he', 'số điện thoại', 'so dien thoai', 'sdt',
      'hotline dnc', 'phòng đào tạo', 'phòng công tác sinh viên', 'phòng ctsv', 'địa chỉ dnc'
    ],
    response: `Dạ bạn có thể liên hệ với Trường Đại học Nam Cần Thơ (DNC) qua các kênh chính thức này nha:

* **Địa chỉ trường:** Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
* **Hotline Tuyển sinh & Tư vấn:** \`0939 257 838\` - \`02923 798 222\` - \`02923 798 333\`.
* **Website:** [https://nctu.edu.vn](https://nctu.edu.vn)
* **Email tuyển sinh:** \`phongtuyensinh@nctu.edu.vn\`.
* **Bộ phận hỗ trợ sinh viên trực tiếp:** Tầng trệt Tòa nhà Hiệu bộ DNC (Làm việc từ Thứ Hai đến Thứ Bảy trong giờ hành chính).`,
  },
  {
    id: 'tai_khoan_htsv',
    keywords: [
      'tài khoản', 'tai khoan', 'đăng nhập', 'dang nhap', 'đăng ký', 'dang ky',
      'mật khẩu', 'mat khau', 'quên mật khẩu', 'đổi mật khẩu'
    ],
    response: `Về tài khoản trên Cổng HTSV thì bạn lưu ý các thao tác này nhé:

* **Đăng nhập:** Bạn bấm nút **"Đăng nhập"** ở góc trên bên phải màn hình, điền Mã sinh viên (hoặc Email) cùng mật khẩu của bạn là vào được ngay.
* **Quên mật khẩu:** Nếu lỡ quên mật khẩu, ở trang đăng nhập bạn bấm vào *"Quên mật khẩu?"* rồi làm theo hướng dẫn để nhận mã xác thực qua email sinh viên nhé.
* **Bảo mật:** Bạn có thể vào mục **Hồ sơ cá nhân** để đổi mật khẩu định kỳ nhằm bảo vệ tài khoản của mình an toàn nhất nha.`,
  },
  {
    id: 'confession',
    keywords: ['confession', 'ẩn danh', 'đăng bài', 'bài viết', 'diễn đàn', 'forum'],
    response: `Để đăng bài tâm sự trên Diễn đàn Confession của HTSV thì dễ lắm nha bạn ơi:

1. Bạn vào trang **Diễn đàn Confession** hoặc bấm nút **"+"** (Đăng bài) trên thanh menu.
2. Nhập tiêu đề và nội dung câu chuyện bạn muốn chia sẻ.
3. Nếu muốn giữ bí mật danh tính thì bạn chỉ cần gạt bật nút **"Đăng ẩn danh"** là xong, không ai biết bạn là ai đâu nha.
4. Chọn chuyên mục phù hợp (như Học tập, Tình cảm, Đời sống...) rồi nhấn **Gửi bài viết** là bài của bạn sẽ lên sóng để mọi người cùng đọc và tương tác nè!`,
  },
  {
    id: 'mot_cua',
    keywords: ['giấy xác nhận', 'xác nhận sinh viên', 'bảng điểm', 'thủ tục', 'một cửa', 'chứng nhận', 'hoãn nghĩa vụ'],
    response: `Dịch vụ Một cửa trên HTSV sinh ra để giúp các bạn làm giấy tờ sinh viên online siêu tiện lợi đó nha! Bạn không cần phải đến tận phòng ban xếp hàng đâu:

1. Bạn vào mục **Hỗ trợ & Báo cáo** (Dịch vụ Một cửa).
2. Chọn loại giấy tờ bạn cần, ví dụ:
   * *Giấy xác nhận sinh viên* (để vay vốn ngân hàng, tạm hoãn nghĩa vụ quân sự hay làm vé xe buýt...).
   * *Bảng điểm học tập*.
   * *Đơn xin hoãn thi hoặc phúc khảo*.
3. Điền lý do và nhấn gửi.
4. Hệ thống sẽ báo tiến độ xử lý hồ sơ cho bạn, thường sau 2 - 3 ngày làm việc là bạn có thể đến Tòa nhà Hiệu bộ nhận kết quả rồi nha!`,
  },
  {
    id: 'lap_trinh',
    keywords: ['lập trình web', 'lập trình wed', 'web là gì', 'frontend', 'backend', 'học lập trình', 'code web'],
    response: `Về lộ trình học Lập trình Web cho người mới bắt đầu thì bạn có thể đi theo các bước này nè:

1. **Frontend (Giao diện người dùng):**
   * Bắt đầu với **HTML5 & CSS3** để tạo khung và trang trí giao diện đẹp mắt.
   * Học **JavaScript (ES6+) & TypeScript** để xử lý logic tương tác mượt mà.
   * Lên framework hiện đại: **React 19** kết hợp với **Tailwind CSS 4** (dự án HTSV này cũng đang dùng công nghệ này đó bạn).

2. **Backend (Máy chủ & Dữ liệu):**
   * Học **Node.js (NestJS / Express)** hoặc Python / Java.
   * Học cơ sở dữ liệu: **PostgreSQL**, MySQL hoặc MongoDB.
   * Học cách viết RESTful API và xác thực tài khoản qua JWT.

Bạn đang muốn tập trung học làm giao diện (Frontend) hay làm hệ thống phía sau (Backend) nè?`,
  },
  {
    id: 'lich_hoc',
    keywords: ['lịch học', 'lịch thi', 'thời khóa biểu', 'đăng ký môn', 'tín chỉ', 'học vụ'],
    response: `Để xem lịch học và lịch thi, bạn chỉ cần vào mục **"Lịch học"** trên thanh menu HTSV nha!

* Hệ thống sẽ hiển thị thời khóa biểu rõ ràng theo từng tuần, từng ngày: phòng học ở tòa nhà nào, ca mấy giờ, tên môn học và giảng viên giảng dạy.
* Bạn nhớ theo dõi lịch thường xuyên để không bị nhầm ca học hay phòng thi nhé!`,
  },
];

/**
 * Hàm chuẩn hóa văn bản bỏ dấu tiếng Việt để tìm kiếm không dấu
 */
export function removeVietnameseTones(str: string): string {
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
 * Nếu không biết, thành thật trả lời không biết và hướng dẫn liên hệ đúng kênh.
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

  // 2. Nhận diện ý định theo ngữ cảnh phong phú:
  // Ý định: Tính năng cổng HTSV / Web
  if (
    (noTone.includes('tinh nang') || noTone.includes('chuc nang')) &&
    (noTone.includes('htsv') || noTone.includes('cong') || noTone.includes('web') || noTone.includes('he thong') || noTone.includes('trang web'))
  ) {
    const featRule = MOCK_RULES.find((r) => r.id === 'htsv_features');
    if (featRule) return featRule.response;
  }
  if (
    (noTone.includes('huong dan') || noTone.includes('su dung') || noTone.includes('cach dung')) &&
    (noTone.includes('htsv') || noTone.includes('cong') || noTone.includes('web'))
  ) {
    const featRule = MOCK_RULES.find((r) => r.id === 'htsv_features');
    if (featRule) return featRule.response;
  }

  // Ý định: Chào hỏi
  if (noTone === 'hi' || noTone === 'hello' || noTone === 'chao' || noTone.startsWith('chao ban')) {
    return MOCK_RULES.find((r) => r.id === 'greeting')?.response || MOCK_RULES[2].response;
  }

  // Ý định: Hỏi danh tính người dùng ("bạn biết tui là ai", "tôi là ai")
  if (
    noTone.includes('biet tui la ai') ||
    noTone.includes('biet toi la ai') ||
    noTone.includes('biet minh la ai') ||
    noTone === 'toi la ai' ||
    noTone === 'tui la ai'
  ) {
    const identRule = MOCK_RULES.find((r) => r.id === 'user_identity');
    if (identRule) return identRule.response;
  }

  // Ý định: Hỏi về trường / địa chỉ
  if (
    noTone.includes('truong nao') ||
    noTone.includes('truong gi') ||
    noTone.includes('dai hoc nam can tho') ||
    noTone.includes('dh nam can tho') ||
    noTone === 'dnc'
  ) {
    const schoolRule = MOCK_RULES.find((r) => r.id === 'school_info');
    if (schoolRule) return schoolRule.response;
  }

  // Ý định: Hỏi về học phí / tiền bạc
  if (noTone.includes('hoc phi') || noTone.includes('tien hoc') || noTone.includes('bao nhieu tien')) {
    const tuitionRule = MOCK_RULES.find((r) => r.id === 'tuition');
    if (tuitionRule) return tuitionRule.response;
  }

  // Ý định: Hỏi về tuyển sinh / xét tuyển / học bạ
  if (noTone.includes('xet tuyen') || noTone.includes('tuyen sinh') || noTone.includes('xet hoc ba')) {
    const admRule = MOCK_RULES.find((r) => r.id === 'admissions');
    if (admRule) return admRule.response;
  }

  // Ý định: Ăn cơm / Đói bụng
  if (noTone.includes('an com') || noTone.includes('an gi') || noTone.includes('doi bung')) {
    const eatRule = MOCK_RULES.find((r) => r.id === 'eating');
    if (eatRule) return eatRule.response;
  }

  // Ý định: Tâm trạng buồn / Stress / Áp lực
  if (noTone.includes('buon') || noTone.includes('met moi') || noTone.includes('stress') || noTone.includes('ap luc') || noTone.includes('chan qua') || noTone.includes('nan qua')) {
    const moodRule = MOCK_RULES.find((r) => r.id === 'mood');
    if (moodRule) return moodRule.response;
  }

  // Ý định: Khen ngợi bot
  if (noTone.includes('thong minh') || noTone.includes('gioi qua') || noTone.includes('de thuong') || noTone.includes('dang yeu') || noTone.includes('xin qua') || noTone.includes('hay qua')) {
    const compRule = MOCK_RULES.find((r) => r.id === 'compliment');
    if (compRule) return compRule.response;
  }

  // Ý định: Chúc ngủ ngon
  if (noTone.includes('ngu ngon') || noTone.includes('di ngu') || noTone.includes('buon ngu')) {
    const sleepRule = MOCK_RULES.find((r) => r.id === 'sleep');
    if (sleepRule) return sleepRule.response;
  }

  // Ý định: Confession / Tâm sự ẩn danh
  if (noTone.includes('confession') || noTone.includes('an danh') || noTone.includes('tam su')) {
    const cfsRule = MOCK_RULES.find((r) => r.id === 'confession');
    if (cfsRule) return cfsRule.response;
  }

  // Ý định: Dịch vụ Một cửa / Xin giấy tờ
  if (noTone.includes('mot cua') || noTone.includes('giay xac nhan') || noTone.includes('bang diem') || noTone.includes('hoan thi')) {
    const mcRule = MOCK_RULES.find((r) => r.id === 'mot_cua');
    if (mcRule) return mcRule.response;
  }

  // Ý định: Ký túc xá / Ở trọ
  if (noTone.includes('ky tuc xa') || noTone.includes('ktx') || noTone.includes('phong tro')) {
    const ktxRule = MOCK_RULES.find((r) => r.id === 'dorm');
    if (ktxRule) return ktxRule.response;
  }

  // Ý định: Câu lạc bộ / Hoạt động
  if (noTone.includes('cau lac bo') || noTone.includes('clb') || noTone.includes('ngoai khoa')) {
    const clbRule = MOCK_RULES.find((r) => r.id === 'clubs');
    if (clbRule) return clbRule.response;
  }

  // Ý định: Lập trình / Code web
  if (noTone.includes('lap trinh') || noTone.includes('code web') || noTone.includes('hoc code')) {
    const codeRule = MOCK_RULES.find((r) => r.id === 'lap_trinh');
    if (codeRule) return codeRule.response;
  }

  // Ý định: Lịch học / Thời khóa biểu
  if (noTone.includes('lich hoc') || noTone.includes('lich thi') || noTone.includes('thoi khoa bieu')) {
    const lhRule = MOCK_RULES.find((r) => r.id === 'lich_hoc');
    if (lhRule) return lhRule.response;
  }

  // Ý định: Đăng ký môn học / tín chỉ / học lại
  if (
    noTone.includes('dang ky mon') ||
    noTone.includes('hoc phan') ||
    noTone.includes('tin chi') ||
    noTone.includes('hoc lai') ||
    noTone.includes('hoc cai thien')
  ) {
    const dkRule = MOCK_RULES.find((r) => r.id === 'dang_ky_mon');
    if (dkRule) return dkRule.response;
  }

  // Ý định: Điểm rèn luyện
  if (noTone.includes('ren luyen')) {
    const drlRule = MOCK_RULES.find((r) => r.id === 'diem_ren_luyen');
    if (drlRule) return drlRule.response;
  }

  // Ý định: BHYT
  if (noTone.includes('bhyt') || noTone.includes('bao hiem')) {
    const bhytRule = MOCK_RULES.find((r) => r.id === 'bhyt');
    if (bhytRule) return bhytRule.response;
  }

  // Ý định: Liên hệ / Hotline
  if (noTone.includes('lien he') || noTone.includes('hotline') || noTone.includes('so dien thoai') || noTone.includes('sdt')) {
    const lhRule = MOCK_RULES.find((r) => r.id === 'lien_he_dnc');
    if (lhRule) return lhRule.response;
  }

  // 3. Phản hồi trung thực, tự nhiên như con người khi không biết / không có dữ liệu:
  return `Dạ về câu này thì hiện tại mình chưa có thông tin chính xác nên không dám trả lời bừa cho bạn nè. Vì mình là trợ lý chuyên về học tập, thủ tục học vụ và thông tin Trường Đại học Nam Cần Thơ (DNC) á.

Nếu bạn cần giải đáp về thủ tục học tập hay quy chế thi cử, bạn có thể liên hệ trực tiếp:
* **Phòng Quản lý Đào tạo / Công tác Sinh viên DNC:** Số 168 Nguyễn Văn Cừ nối dài, P. An Bình, Q. Ninh Kiều, TP. Cần Thơ.
* **Hotline / Zalo hỗ trợ:** \`0939 257 838\` - \`02923 798 222\`
* Hoặc gửi yêu cầu qua mục **Dịch vụ Một cửa** trên Cổng HTSV để thầy cô hỗ trợ bạn nhanh nhất nha!`;
}

/**
 * Tự động tạo danh sách 2-3 gợi ý câu hỏi tiếp theo (Follow-up chips)
 * thông minh dựa trên nội dung hội thoại
 */
export function generateFollowUpSuggestions(userPrompt: string, botResponse: string): string[] {
  const combined = (userPrompt + ' ' + botResponse).toLowerCase();
  const noTone = removeVietnameseTones(combined);

  // 0. Nhóm Easter egg Chó Thịnh & Thanh Tho
  if (noTone.includes('cho thinh') || noTone.includes('thanh tho')) {
    return [
      'Thanh Tho là ai vậy bạn?',
      'Trường Đại học Nam Cần Thơ có các ngành nào?',
      'Hướng dẫn các tính năng trên Cổng Sinh viên HTSV',
    ];
  }

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
    noTone.includes('tinh nang') ||
    noTone.includes('htsv') ||
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
