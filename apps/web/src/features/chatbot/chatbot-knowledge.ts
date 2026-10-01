import type { QuickSuggestion } from './chatbot-types';
import { searchDncKnowledge } from './dnc-knowledge-base';

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

3. HIỂU BIẾT CHUYÊN SÂU VỀ DỰ ÁN HTSV & TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (DNC - https://nctu.edu.vn):
 Khi người dùng có thắc mắc hoặc nhắc đến trường, học tập, tuyển sinh hoặc hệ thống HTSV, bạn nắm vững và cung cấp thông tin chuẩn xác sau:
 - TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (DNC):
 * Thành lập: 25/01/2013 theo Quyết định số 230/QĐ-TTg của Thủ tướng Chính phủ.
 * Lãnh đạo tiêu biểu: Chủ tịch Hội đồng trường TS.LS. Nguyễn Tiến Dũng; Cố Hiệu trưởng Danh dự GS.TS. Võ Tòng Xuân.
 * Mã trường: DNC - Địa chỉ: Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
 * Hotline Tuyển sinh: 0939 257 838 - 02923 798 222 - 02923 798 333 - Email: phongtuyensinh@nctu.edu.vn
 * Mô hình tiên phong: "Doanh nghiệp trong trường đại học" với hệ sinh thái thực hành quy mô lớn:
   - Bệnh viện Đại học Nam Cần Thơ (300 giường đạt chuẩn quốc tế AACI Hoa Kỳ; Giai đoạn 2: Bệnh viện Quốc tế 1.500 tỷ đồng nâng công suất lên 1.000 giường Trung tâm Y học học thuật).
   - Showroom Ô tô Nam Cần Thơ DNC & xưởng bảo dưỡng, sửa chữa thực tế.
   - Khu thực hành Du lịch Sinh thái – Resort DNC (DNC Resort: diện tích trên 25.000 m² phong cách Châu Âu, bungalow hiện đại, hồ bơi ngoài trời, sân thể thao đa năng tennis/pickleball, phục vụ thực hành ngành Du lịch, Khách sạn và nghỉ dưỡng kết hợp Du lịch sức khỏe).
   - Viện Nghiên cứu & Phát triển Dược liệu.
   - Trung tâm Phát triển Phần mềm & AI DNC.
   - Công ty Du lịch DNC (DNC Travel) phục vụ thực hành cho sinh viên ngành Du lịch, Khách sạn.
   - Ký túc xá máy lạnh 2.000 chỗ, hồ bơi chuẩn quốc gia, sân bóng đá cỏ nhân tạo, thư viện số.
 - PHƯƠNG THỨC XÉT TUYỂN:
 * 1. Điểm thi THPT; 2. Học bạ THPT (3 cách tính điểm linh hoạt); 3. Điểm ĐGNL ĐHQG TP.HCM; 4. Tuyển thẳng.
 * Khối Sức khỏe (Y, Dược, Xét nghiệm, Răng-Hàm-Mặt, Điều dưỡng) yêu cầu học lực lớp 12 loại Giỏi hoặc điểm xét tốt nghiệp >= 8.0.
 - CHÍNH SÁCH HỌC PHÍ (Cam kết ỔN ĐỊNH suốt khóa học):
 * Nhóm 1 (Kinh tế, CNTT, Luật, Ngôn ngữ Anh...): ~10 - 11 triệu/kỳ (3 kỳ/năm).
 * Nhóm 2 (Kiến trúc, Công nghệ thực phẩm, Logistics...): ~12 - 13 triệu/kỳ.
 * Nhóm 3 (Công nghệ Ô tô, Điện-Điện tử, Kỹ thuật xét nghiệm...): ~14 - 15 triệu/kỳ.
 * Dược học: ~18 - 22 triệu/kỳ; Y khoa & Răng-Hàm-Mặt: ~45 - 50 triệu/kỳ.

4. BỘ QUY CHẾ & HỎI ĐÁP CỘNG ĐỒNG (FAQ CỔNG HTSV):
 - Đăng bài ẩn danh: Tuyệt đối không bị lộ danh tính. Hệ thống ẩn hoàn toàn họ tên, email, avatar, hiển thị dưới tên "Người dùng ẩn danh".
 - Thời gian duyệt bài Confession: Bài viết được kiểm duyệt văn minh và thường được duyệt trong vòng vài giờ làm việc.
 - Báo cáo vi phạm: Vào mục "Hỗ trợ" -> "Tạo báo cáo mẫu" (Báo cáo vi phạm nội dung) để báo cáo bài viết/bình luận có nội dung xấu, quấy rối, xúc phạm.
 - Quên mật khẩu / OTP xác thực: Kiểm tra hòm thư rác (Spam/Junk), bấm gửi lại mã OTP, hoặc vào mục "Hỗ trợ" gửi yêu cầu Hỗ trợ tài khoản & bảo mật.
 - Cập nhật MSSV, lớp, ngành học: Thông tin được đối chiếu và kích hoạt tự động khi hoàn tất xác thực thông tin tại trường hoặc qua hệ thống đào tạo chính thức. Có thể yêu cầu chỉnh sửa qua Dịch vụ Một cửa.

NGUYÊN TẮC CỐT LÕI (HỎI GÌ TRẢ LỜI CÁI ĐÓ - KHÔNG BIẾT THÌ NÓI KHÔNG BIẾT):
1. HỎI ĐÚNG CHỦ ĐỀ NÀO THÌ TRẢ LỜI ĐÚNG CHỦ ĐỀ ĐÓ (STRICT FOCUS):
   - ĐỊA CHỈ / Ở ĐÂU / VỊ TRÍ: Trả lời chính xác địa chỉ và vị trí cụ thể của nơi được hỏi:
     * Khu thực hành Du lịch Sinh thái – Resort DNC (DNC Resort): Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ (tọa lạc ngay trong khuôn viên Trường Đại học Nam Cần Thơ, diện tích hơn 25.000 m²).
     * Showroom Ô tô Nam Cần Thơ DNC: Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ (nằm ngay trong khuôn viên Trường Đại học Nam Cần Thơ, gồm khu trưng bày xe hiện đại và xưởng bảo dưỡng quy mô lớn).
     * Bệnh viện Đại học Nam Cần Thơ: Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ (trong khuôn viên trường, quy mô 300 giường quốc tế AACI Hoa Kỳ, hotline 02923 686 868).
     * Trường Đại học Nam Cần Thơ: Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
     * Khu phức hợp Ký túc xá DNC: Trong khuôn viên trường (168 Nguyễn Văn Cừ nối dài, hơn 2.000 chỗ, phòng quạt và máy lạnh).
     * Viện Dược liệu / Trung tâm phần mềm / Khu thể thao: Trong khuôn viên trường.
          * TUYỆT ĐỐI KHÔNG lan man giới thiệu chương trình đào tạo hay học phí khi người dùng chỉ hỏi địa chỉ.
   - HỌC PHÍ / BAO NHIÊU TIỀN: Chỉ trả lời số tiền học phí cụ thể của ngành hoặc dịch vụ đó, cam kết ổn định toàn khóa.
   - THỜI GIAN ĐÀO TẠO / MẤY NĂM: Chỉ trả lời số năm học và loại văn bằng (Y khoa 6 năm, Dược 5 năm, Kỹ sư 4 - 4.5 năm, Cử nhân 3.5 - 4 năm).
   - MÃ NGÀNH: Chỉ trả lời mã ngành chính xác.
   - TỔ HỢP XÉT TUYỂN: Chỉ trả lời danh sách tổ hợp môn.
   - SỐ ĐIỆN THOẠI / HOTLINE / LIÊN HỆ: Trả lời đúng số điện thoại, email, website.

2. NẾU KHÔNG BIẾT RÕ HOẶC KHÔNG CÓ THÔNG TIN (ĐẶC BIỆT BẮT BUỘC):
   - Khi người dùng hỏi bất kỳ câu hỏi nào mà bạn không biết hoặc không có dữ liệu chắc chắn: BẮT BUỘC phải nói thẳng thắn: "Dạ cái này mình không biết nha bạn!" hoặc "Dạ thông tin này mình không biết nha bạn!".
   - Tuyệt đối KHÔNG giả vờ biết, KHÔNG vòng vo, KHÔNG tự bịa đặt hay trả lời lan man sang chủ đề khác.
   - Nếu câu hỏi liên quan đến trường nhưng chưa rõ chi tiết, có thể kèm lời hướng dẫn ngắn: "Bạn có thể liên hệ Hotline DNC: 0939 257 838 hoặc gửi mục Hỗ trợ để thầy cô giải đáp nhé!".

PHONG CÁCH TRÌNH BÀY & NÓI CHUYỆN:
- Nói chuyện tự nhiên, ấm áp, thông minh và thấu hiểu y như một con người thực thụ (xưng "mình" - "bạn").
- Hỏi đúng chủ đề gì thì trả lời thẳng vào chủ đề đó, không lan man, không chèn tiêu đề cứng nhắc.
- Tuyệt đối KHÔNG sử dụng các biểu tượng emoji cảm xúc hay emoji đồ họa (như robot, mũ cử nhân, máy tính, ngôi sao, v.v.). Trình bày bằng văn bản Markdown trang nhã, dễ đọc.`;

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: 'dnc-gioi-thieu',
    label: 'Đây là trường nào?',
    prompt: 'Đây là trường nào? Giới thiệu ngắn về Trường Đại học Nam Cần Thơ.',
    category: 'academic',
    iconType: 'school',
  },
  {
    id: 'dnc-tuyen-sinh',
    label: 'Phương thức tuyển sinh & Học bạ DNC',
    prompt: 'Trường Đại học Nam Cần Thơ có những phương thức xét tuyển nào năm 2026?',
    category: 'academic',
    iconType: 'graduation',
  },
  {
    id: 'dnc-hoc-phi',
    label: 'Học phí & Học bổng DNC 2026',
    prompt: 'Mức học phí các ngành tại Đại học Nam Cần Thơ năm 2026 là bao nhiêu?',
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

  // --- 4. HỌC PHÍ ---
  {
    id: 'tuition',
    keywords: [
      'học phí', 'hoc phi', 'tiền học', 'biểu phí', 'miễn giảm học phí', 'học phí bao nhiêu', 'tiền học một kỳ', 'học phí một năm', 'mức học phí'
    ],
    response: `Chào bạn nha! Về học phí tại Đại học Nam Cần Thơ (DNC) thì trường có một điểm cộng rất lớn là **học phí cam kết giữ ổn định suốt toàn khóa**, không tăng bất ngờ qua các năm học đâu bạn nhé.

Mỗi năm học gồm 3 học kỳ, mức học phí trung bình từng nhóm ngành như sau:
* **Nhóm 1 (Khoảng 10 - 11 triệu đồng / học kỳ):** Kinh tế, Quản trị kinh doanh, Marketing, Luật, Ngôn ngữ Anh, **Công nghệ thông tin, Kỹ thuật phần mềm, Trí tuệ nhân tạo (AI)**...
* **Nhóm 2 (Khoảng 12 - 13 triệu đồng / học kỳ):** Kiến trúc, Bất động sản, Công nghệ thực phẩm, Logistics và Quản lý chuỗi cung ứng...
* **Nhóm 3 (Khoảng 14 - 15 triệu đồng / học kỳ):** **Công nghệ kỹ thuật Ô tô**, Điện - Điện tử, Kỹ thuật xét nghiệm y học, Điều dưỡng...
* **Khối Sức khỏe đặc thù:** Dược học khoảng **18 - 22 triệu / kỳ**; Y khoa (Bác sĩ Đa khoa) & Răng - Hàm - Mặt khoảng **45 - 50 triệu / kỳ** (mức này đã bao gồm toàn bộ chi phí thực hành lâm sàng tại Bệnh viện DNC rồi nha).

Bạn đang quan tâm đến học phí của ngành nào cụ thể để mình cung cấp con số chi tiết hơn nè?`,
  },

  // --- 4.1. CHÍNH SÁCH HỌC BỔNG ---
  {
    id: 'scholarship',
    keywords: [
      'học bổng', 'hoc bong', 'điều kiện nhận học bổng', 'xin học bổng', 'học bổng dnc',
      'học bổng khuyến khích', 'chính sách học bổng', 'tiêu chuẩn học bổng', 'học bổng tân sinh viên', 'học bổng vượt khó'
    ],
    response: `Chào bạn nha! Về chính sách học bổng tại Đại học Nam Cần Thơ (DNC), trường có nhiều chương trình học bổng rất hấp dẫn để tiếp sức và khen thưởng sinh viên nè:

1. **Học bổng Khuyến khích học tập (Xét theo từng học kỳ):**
   * **Loại Xuất sắc:** Điểm trung bình học kỳ (GPA) từ **3.6 / 4.0** trở lên và Điểm rèn luyện từ **90 điểm** trở lên.
   * **Loại Giỏi:** GPA từ **3.2 / 4.0** trở lên và Điểm rèn luyện từ **80 điểm** trở lên.
   * **Loại Khá:** GPA từ **2.5 / 4.0** trở lên và Điểm rèn luyện từ **65 điểm** trở lên.
   *(Lưu ý: Không có môn nào bị điểm F trong học kỳ xét học bổng).*

2. **Học bổng Thủ khoa & Tân sinh viên xuất sắc:**
   * Dành cho các bạn thí sinh đạt điểm cao trong kỳ thi tốt nghiệp THPT hoặc có thành tích học sinh giỏi cấp tỉnh/quốc gia khi nộp hồ sơ nhập học vào DNC.

3. **Học bổng Hỗ trợ sinh viên vượt khó:**
   * Dành cho sinh viên có hoàn cảnh khó khăn, gia đình chính sách nhưng có tinh thần hiếu học, vươn lên trong học tập.

4. **Học bổng Doanh nghiệp & Bệnh viện DNC:**
   * Các đối tác liên kết của trường trao tặng cho sinh viên các khối ngành Sức khỏe, CNTT, Ô tô, Du lịch có thành tích xuất sắc.

Bạn đang muốn tìm hiểu về điều kiện của loại học bổng nào trong các loại trên để mình hướng dẫn chi tiết hồ sơ nộp nha?`,
  },

  // --- 4.2. CHI PHÍ PHÒNG KÝ TÚC XÁ ---
  {
    id: 'dorm_price',
    keywords: [
      'giá phòng ktx', 'gia phong ktx', 'chi phí ktx', 'chi phi ktx', 'ktx bao nhiêu tiền',
      'tiền phòng ktx', 'giá ký túc xá', 'chi phí ký túc xá', 'giá phòng ký túc xá', 'tiền ở ktx'
    ],
    response: `Dạ về chi phí phòng ở tại Ký túc xá Đại học Nam Cần Thơ (DNC) thì cực kỳ hợp lý và tiết kiệm cho sinh viên luôn nha bạn:

* **Mức phí phòng:** Dao động từ khoảng **450.000đ - 1.200.000đ / sinh viên / tháng** (phòng quạt tiêu chuẩn khoảng **450.000đ - 600.000đ/tháng**, phòng máy lạnh khoảng **800.000đ - 1.200.000đ/tháng**).
* **Tiện nghi trong phòng:** Trang bị sẵn giường tầng, nệm, bàn học cá nhân, tủ đồ có khóa, quạt, máy lạnh, bình nước nóng lạnh và hệ thống wifi phủ sóng toàn khu.
* **Chi phí điện, nước:** Tính theo chỉ số đồng hồ riêng của từng phòng theo đúng biểu giá nhà nước dành cho sinh viên.
* **An ninh & Tiện ích:** Bảo vệ trực 24/7, thẻ từ ra vào, có căng-tin nhà ăn sinh viên, siêu thị mini, sân bóng đá, hồ bơi và phòng gym ngay dưới chân tòa nhà.

Bạn có thể nộp đơn đăng ký phòng trực tuyến ngay trên mục **Hỗ trợ** hoặc **Đời sống sinh viên** của Cổng HTSV này đó nha! Bạn đang muốn tìm phòng mấy người nè?`,
  },

  // --- 4.3. THỦ TỤC XIN GIẤY XÁC NHẬN SINH VIÊN ---
  {
    id: 'giay_xac_nhan_sv',
    keywords: [
      'xin giấy xác nhận sinh viên', 'giấy xác nhận sinh viên', 'giay xac nhan sinh vien',
      'giấy hoãn nghĩa vụ quân sự', 'hoãn nghĩa vụ quân sự', 'hoan nghia vu', 'vay vốn ngân hàng',
      'làm vé xe buýt', 'giấy giới thiệu thực tập'
    ],
    response: `Để xin **Giấy xác nhận sinh viên** (để tạm hoãn nghĩa vụ quân sự, làm hồ sơ vay vốn ngân hàng chính sách, làm vé xe buýt hay xin thực tập), bạn thực hiện cực kỳ nhanh trên Cổng HTSV như sau nha:

1. Trên thanh menu, bạn vào mục **"Hỗ trợ"** (hoặc **"Dịch vụ Một cửa"**).
2. Bấm vào nút **"Gửi yêu cầu hỗ trợ mới"** → chọn loại thủ tục **"Xin giấy xác nhận sinh viên"**.
3. Chọn mục đích sử dụng cụ thể (Vay vốn / Tạm hoãn NVQS / Vé xe buýt / Thực tập doanh nghiệp).
4. Điền lý do và số lượng bản cần cấp rồi nhấn **"Gửi yêu cầu"**.
5. Bạn có thể theo dõi tiến độ hồ sơ tại mục **"Theo dõi yêu cầu"**. Thông thường sau 1 - 2 ngày làm việc là hồ sơ được duyệt và bạn đến nhận tại Bộ phận Một cửa - Tòa nhà Hiệu bộ DNC nha!`,
  },

  // --- 4.4. XIN BẢNG ĐIỂM ---
  {
    id: 'xin_bang_diem',
    keywords: [
      'xin bảng điểm', 'xin bang diem', 'cấp bảng điểm', 'bảng điểm học tập', 'in bảng điểm'
    ],
    response: `Dạ để xin cấp Bảng điểm học tập tại trường DNC, bạn làm theo các bước này nhé:

1. Bạn truy cập vào mục **"Hỗ trợ"** → chọn **"Tạo yêu cầu mới"**.
2. Chọn loại thủ tục: **"Cấp bảng điểm học tập"** (bản tiếng Việt hoặc bản song ngữ Việt - Anh tùy nhu cầu của bạn).
3. Nhập số bản cần in và mục đích (xin học bổng, nộp hồ sơ xin việc, hồ sơ du học...).
4. Sau khi gửi, bạn theo dõi mã hồ sơ tại mục **"Theo dõi yêu cầu"**. Phòng Quản lý Đào tạo sẽ xử lý và thông báo thời gian nhận bảng điểm có đóng dấu mộc đỏ cho bạn nha!`,
  },

  // --- 4.5. PHÚC KHẢO ĐIỂM THI ---
  {
    id: 'phuc_khao',
    keywords: [
      'phúc khảo', 'phuc khao', 'phúc khảo điểm', 'chấm lại bài thi', 'khiếu nại điểm', 'chấm lại bài'
    ],
    response: `Nếu bạn cảm thấy điểm thi kết thúc học phần chưa phản ánh đúng bài làm của mình, bạn hoàn toàn có quyền làm đơn phúc khảo bài thi nha:

* **Thời hạn nộp đơn:** Trong vòng **15 ngày** kể từ ngày Phòng Quản lý Đào tạo công bố điểm học phần trên hệ thống.
* **Cách thực hiện:** Bạn vào mục **"Hỗ trợ"** trên Cổng HTSV, chọn thủ tục **"Đơn xin phúc khảo điểm thi"**, điền tên môn học, mã lớp học phần, ngày thi, điểm đã công bố và lý do đề nghị chấm lại.
* **Quy trình xử lý:** Hội đồng chấm thi sẽ rút bài thi và tổ chức chấm phúc khảo độc lập. Kết quả điểm sau phúc khảo sẽ được cập nhật chính thức trên hệ thống cho bạn nhé!`,
  },

  // --- 4.6. HOÃN THI HỌC KỲ ---
  {
    id: 'hoan_thi',
    keywords: [
      'hoãn thi', 'hoan thi', 'xin hoãn thi', 'nghỉ thi', 'đơn xin hoãn thi'
    ],
    response: `Về việc xin hoãn thi kết thúc học phần tại DNC, bạn lưu ý các quy định sau nha:

1. **Điều kiện được xét hoãn thi:** Sinh viên bị ốm đau, tai nạn đột xuất (có giấy xác nhận của cơ sở y tế từ cấp huyện/bệnh viện trở lên), hoặc có lý do gia đình đặc biệt chính đáng.
2. **Thời gian nộp đơn:** Bạn phải nộp đơn trước giờ thi hoặc muộn nhất trong vòng **03 ngày làm việc** kể từ ngày diễn ra ca thi đó.
3. **Cách nộp đơn:** Bạn vào mục **"Hỗ trợ"** trên Cổng HTSV, chọn thủ tục **"Đơn xin hoãn thi"**, đính kèm ảnh chụp giấy xác nhận y tế / minh chứng hợp lệ.
4. Khi được chấp thuận, bạn sẽ được bố trí thi bù vào đợt thi gần nhất của trường mà không bị tính là thi lại hay bị điểm F nha!`,
  },

  // --- 4.7. HỌC LẠI VÀ HỌC CẢI THIỆN ---
  {
    id: 'hoc_lai_cai_thien',
    keywords: [
      'học lại khác học cải thiện', 'phân biệt học lại và học cải thiện', 'bị điểm f', 'điểm d có phải học lại không',
      'học cải thiện là gì', 'học lại là gì'
    ],
    response: `Dạ mình giải thích rõ sự khác nhau giữa **Học lại** và **Học cải thiện** theo quy chế tín chỉ DNC để bạn nắm rõ nha:

* **Học lại (Bắt buộc):**
  * Áp dụng khi bạn bị **điểm F** (tổng kết môn dưới 4.0 trên thang 10, tương đương 0.0 trên thang 4).
  * Bạn bắt buộc phải đăng ký học lại học phần đó ở các kỳ tiếp theo để tích lũy đủ tín chỉ tốt nghiệp.

* **Học cải thiện (Tự nguyện):**
  * Áp dụng khi bạn đã qua môn nhưng đạt **điểm D hoặc D+** (tổng kết từ 4.0 đến 5.4).
  * Mục đích là để nâng điểm trung bình tích lũy (GPA) cao hơn.
  * *Lưu ý quan trọng:* Điểm thi của lần học cải thiện sẽ thay thế điểm cũ để tính vào GPA chung, vì vậy bạn nhớ ôn tập kỹ để đạt kết quả tốt hơn nhé!`,
  },

  // --- 4.8. CẤP LẠI THẺ SINH VIÊN ---
  {
    id: 'cap_lai_the_sv',
    keywords: [
      'mất thẻ sinh viên', 'mat the sinh vien', 'cấp lại thẻ sinh viên', 'cap lai the',
      'làm lại thẻ sinh viên', 'thẻ sinh viên bị mất', 'làm mất thẻ'
    ],
    response: `Nếu bạn không may bị mất hoặc làm hỏng thẻ sinh viên, bạn có thể xin cấp lại rất dễ dàng:

1. Vào mục **"Hỗ trợ"** trên Cổng HTSV → chọn **"Cấp lại thẻ sinh viên"**.
2. Điền thông tin MSSV, họ tên, lớp và lý do làm mất/hỏng.
3. Sau khi gửi yêu cầu, bạn đến Phòng Công tác Sinh viên (Tòa nhà Hiệu bộ) để xác nhận và nhận lịch hẹn lấy thẻ mới.
4. Trong thời gian chờ in phôi thẻ mới, bạn có thể xin một **Giấy chứng nhận sinh viên tạm thời** tại mục Một cửa để sử dụng khi đi thi hoặc vào cổng trường nha!`,
  },

  // --- 4.9. TỔNG HỢP CÁC NGÀNH ĐÀO TẠO ---
  {
    id: 'danh_sach_nganh',
    keywords: [
      'các ngành đào tạo', 'cac nganh dao tao', 'trường có những ngành nào', 'truong co nhung nganh nao',
      'danh sách ngành học', 'dnc có những ngành nào', 'các ngành học của dnc', 'tổng hợp ngành'
    ],
    response: `Trường Đại học Nam Cần Thơ (DNC) đào tạo đa ngành với hơn 49 ngành ở bậc Đại học, phân thành các khối ngành trọng điểm sau nha bạn:

1. **Khối ngành Sức khỏe (Thực hành trực tiếp tại Bệnh viện DNC):**
   * Y khoa (Bác sĩ Đa khoa), Răng - Hàm - Mặt, Dược học, Kỹ thuật xét nghiệm y học, Kỹ thuật hình ảnh y học, Điều dưỡng, Quản lý bệnh viện.
2. **Khối ngành Công nghệ & Kỹ thuật:**
   * Công nghệ thông tin, Kỹ thuật phần mềm, Trí tuệ nhân tạo (AI), Khoa học máy tính, Công nghệ kỹ thuật Ô tô, Kỹ thuật điện - điện tử, Kiến trúc, Kỹ thuật xây dựng.
3. **Khối ngành Kinh tế - Quản trị - Luật:**
   * Quản trị kinh doanh, Marketing, Kinh doanh quốc tế, Logistics & Quản lý chuỗi cung ứng, Tài chính - Ngân hàng, Kế toán, Luật học, Luật kinh tế.
4. **Khối ngành Xã hội - Nhân văn & Du lịch:**
   * Ngôn ngữ Anh, Truyền thông đa phương tiện, Quan hệ công chúng (PR), Quản trị du lịch & lữ hành, Quản trị khách sạn.

Bạn đang có nguyện vọng đăng ký hoặc muốn tìm hiểu chuyên sâu về khối ngành nào nè?`,
  },

  // --- 4.10. LẬP TRÌNH PYTHON ---
  {
    id: 'programming_python',
    keywords: [
      'python là gì', 'học python', 'code python', 'ngôn ngữ python', 'ví dụ python', 'lập trình python'
    ],
    response: `Python là một trong những ngôn ngữ lập trình phổ biến và mạnh mẽ nhất thế giới hiện nay, đặc biệt trong lĩnh vực **Trí tuệ nhân tạo (AI), Khoa học dữ liệu và Tự động hóa** đó bạn!

### Ưu điểm vượt trội của Python:
* **Cú pháp trong sáng, gần với tiếng Anh tự nhiên:** Rất dễ học cho người mới bắt đầu.
* **Hệ sinh thái thư viện khổng lồ:**
  * AI & Machine Learning: \`TensorFlow\`, \`PyTorch\`, \`Scikit-learn\`.
  * Xử lý dữ liệu: \`Pandas\`, \`NumPy\`, \`Matplotlib\`.
  * Web backend: \`FastAPI\`, \`Django\`, \`Flask\`.

### Ví dụ code Python cơ bản (Hàm tính tổng và kiểm tra số nguyên tố):
\`\`\`python
def is_prime(n: int) -> bool:
    """Kiểm tra một số có phải số nguyên tố hay không"""
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# Kiểm tra thử
numbers = [2, 3, 4, 7, 10, 13]
primes = [x for x in numbers if is_prime(x)]
print(f"Các số nguyên tố tìm được: {primes}")
\`\`\`

Bạn đang muốn dùng Python để làm web, phân tích dữ liệu hay phát triển mô hình AI nè?`,
  },

  // --- 4.11. LẬP TRÌNH JAVASCRIPT & TYPESCRIPT ---
  {
    id: 'programming_js_ts',
    keywords: [
      'javascript là gì', 'typescript là gì', 'react là gì', 'học javascript', 'học typescript', 'học react',
      'phân biệt let const var', 'react hook'
    ],
    response: `Trong phát triển ứng dụng Web hiện đại (như chính dự án Cổng HTSV này đang dùng **React 19 + TypeScript + Tailwind CSS**), JavaScript và TypeScript là cặp đôi chủ chốt:

1. **JavaScript (JS):** Ngôn ngữ linh hồn của trang web, cho phép xử lý mọi tương tác động trên trình duyệt và cả backend với Node.js.
2. **TypeScript (TS):** Là phiên bản nâng cấp của JavaScript bổ sung **Hệ thống kiểu tĩnh (Static Typing)**. Nhờ đó trình duyệt báo lỗi ngay khi bạn gõ code, giúp dự án lớn vận hành cực kỳ ổn định.

### Phân biệt nhanh \`const\`, \`let\`, \`var\`:
* \`const\`: Khai báo hằng số không thể gán lại giá trị.
* \`let\`: Khai báo biến có thể thay đổi giá trị, phạm vi trong block \`{}\`.
* \`var\`: Kiểu cũ, phạm vi function-scope, dễ gây lỗi hoisting → **Khuyên dùng**: Luôn ưu tiên \`const\`, khi cần thay đổi thì dùng \`let\`, tránh dùng \`var\`.

### Ví dụ React Hook đơn giản:
\`\`\`typescript
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState<number>(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Đã bấm: {count} lần
    </button>
  );
}
\`\`\`

Bạn cần mình giải thích thêm về hook nào trong React hay cú pháp nào của TypeScript không?`,
  },

  // --- 4.12. KỸ NĂNG SOẠN THẢO EMAIL ---
  {
    id: 'writing_email',
    keywords: [
      'viết email', 'soạn email', 'email xin nghỉ học', 'mẫu email', 'gửi email cho giảng viên', 'viết thư xin phép'
    ],
    response: `Dạ mình gửi bạn mẫu email chuẩn chỉnh, trang trọng để gửi thầy cô xin phép nghỉ học nhé:

\`\`\`text
Tiêu đề: [HỌC PHẦN] - ĐƠN XIN PHÉP NGHỈ HỌC - [HỌ TÊN] - [MSSV]

Kính gửi: Thầy/Cô [Họ và tên giảng viên], Giảng viên phụ trách học phần [Tên môn học] (Mã lớp: [Mã lớp học phần]),

Em tên là: [Họ và tên của bạn]
Mã số sinh viên: [Mã số sinh viên]
Hiện đang là sinh viên lớp: [Tên lớp chuyên ngành]

Em viết email này kính xin phép Thầy/Cô cho em được nghỉ buổi học vào ngày [Ngày/Tháng/Năm] (Ca học: [Ca mấy, từ mấy giờ đến mấy giờ]).

Lý do: [Trình bày ngắn gọn, ví dụ: Em bị ốm sốt / gia đình có việc đột xuất / đi khám bệnh có giấy hẹn y tế đính kèm].

Trong thời gian nghỉ học, em cam kết sẽ:
1. Nhờ bạn cùng lớp ghi chép bài đầy đủ và tự nghiên cứu giáo trình.
2. Hoàn thành toàn bộ bài tập và bài nộp theo đúng thời hạn của Thầy/Cô.

Em xin chân thành cảm ơn Thầy/Cô và kính chúc Thầy/Cô nhiều sức khỏe và công tác tốt!

Trân trọng,
[Họ và tên của bạn]
Số điện thoại: [Số điện thoại]
\`\`\`

Bạn chỉ cần thay các phần trong ngoặc vuông \`[...]\` là có thể gửi ngay được rồi nha!`,
  },

  // --- 4.13. KỸ NĂNG VIẾT CV CHO SINH VIÊN ---
  {
    id: 'writing_cv',
    keywords: [
      'viết cv', 'cách viết cv', 'tạo cv', 'cv xin việc', 'cv sinh viên', 'hồ sơ xin việc', 'mẫu cv'
    ],
    response: `Để có một bản **CV xin việc hoặc xin thực tập** ấn tượng dành cho sinh viên, bạn chỉ cần nắm vững cấu trúc 5 phần vàng này nha:

1. **Thông tin cá nhân (Header):**
   * Họ tên đầy đủ, vị trí ứng tuyển (ví dụ: *Thực tập sinh Lập trình Web* hoặc *Thực tập sinh Marketing*).
   * Email chuyên nghiệp (dạng \`ten.ho@gmail.com\`), số điện thoại, link LinkedIn hoặc GitHub (nếu làm IT).
2. **Mục tiêu nghề nghiệp (Career Objective):**
   * Viết ngắn gọn 2 - 3 câu nêu rõ bạn muốn học hỏi điều gì và đóng góp giá trị gì cho công ty.
3. **Học vấn (Education):**
   * Trường Đại học Nam Cần Thơ (DNC) - Ngành học.
   * Điểm trung bình tích lũy (GPA) nếu đạt từ Khá trở lên (từ 2.8+ trở lên nên đưa vào).
4. **Dự án thực tế & Kinh nghiệm (Projects & Experience):**
   * Kể tên các đồ án môn học, dự án nhóm (như dự án Cổng HTSV này) hoặc hoạt động làm thêm.
   * Nêu rõ: *Vai trò của bạn → Công nghệ / Kỹ năng sử dụng → Kết quả đạt được*.
5. **Kỹ năng & Hoạt động Đoàn - Hội:**
   * Kỹ năng chuyên môn (hard skills) và Kỹ năng mềm (giao tiếp, làm việc nhóm, quản lý thời gian).
   * Các chứng chỉ (Tin học, Tiếng Anh VSTEP / TOEIC) và hoạt động tình nguyện.

*Mẹo hay:* Trình bày gọn gàng trong **đúng 1 trang A4**, xuất file PDF để không bị lỗi font nha bạn!`,
  },

  // --- 4.14. PHƯƠNG PHÁP HỌC TẬP HIỆU QUẢ ---
  {
    id: 'study_methods',
    keywords: [
      'phương pháp học', 'cách học giỏi', 'học hiệu quả', 'pomodoro', 'cách ôn thi', 'mẹo học bài', 'nhớ lâu'
    ],
    response: `Dạ đây là 3 phương pháp học tập khoa học hàng đầu được các thủ khoa đại học áp dụng mà mình gợi ý cho bạn nè:

1. **Kỹ thuật Pomodoro (Tập trung cao độ):**
   * Học tập trung 100% trong **25 phút** (tắt thông báo điện thoại, không lướt mạng xã hội).
   * Nghỉ giải lao ngắn **5 phút** (uống nước, vươn vai).
   * Sau 4 chu kỳ như vậy thì nghỉ dài **15 - 30 phút**. Cách này giúp não bộ không bao giờ bị quá tải hay kiệt sức!

2. **Kỹ thuật Feynman (Học bằng cách giải thích lại):**
   * Đọc và nắm một khái niệm khó, sau đó tự đóng vai người thầy và giải thích lại khái niệm đó bằng ngôn từ đơn giản nhất cho một người chưa biết gì. Chỗ nào bạn bị ngập ngừng chính là lỗ hổng kiến thức bạn cần đọc lại!

3. **Chủ động hồi tưởng & Lặp lại ngắt quãng (Active Recall & Spaced Repetition):**
   * Thay vì chỉ đọc thụ động, hãy gấp sách lại và tự viết ra giấy những gì mình vừa nhớ.
   * Ôn lại kiến thức sau: 1 ngày → 3 ngày → 7 ngày → 30 ngày. Kiến thức sẽ được khắc sâu vĩnh viễn vào trí nhớ dài hạn!

Bạn đang chuẩn bị ôn thi môn học nào, mình có thể chia sẻ thêm tài liệu cho bạn nha?`,
  },

  // --- 4.15. KỂ CHUYỆN CƯỜI SINH VIÊN ---
  {
    id: 'joke',
    keywords: [
      'kể chuyện cười', 'ke chuyen cuoi', 'nói chuyện vui', 'chuyện hài', 'kể chuyện vui', 'chuyện cười sinh viên'
    ],
    response: `Hihi mình kể cho bạn nghe một câu chuyện cười vui của sinh viên nè:

Trong giờ thi môn Lập trình, giám thị thấy một bạn sinh viên ngồi chắp tay lẩm bẩm cầu nguyện:
- Giám thị: *"Em đang cầu xin Phật độ để làm bài được điểm cao à?"*
- Sinh viên: *"Dạ không ạ... Em đang cầu xin cho máy chủ của trường bị sập mạng để cả lớp được thi lại buổi khác ạ!"* 

Mong là câu chuyện nhỏ này giúp bạn xua tan căng thẳng sau những giờ học bài nha! Cười lên cho ngày mới tràn đầy năng lượng nè!`,
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
    keywords: ['ngành ô tô', 'kỹ thuật ô tô', 'công nghệ ô tô', 'ô tô điện', 'cơ khí động lực', 'học ô tô', 'ngành công nghệ ô tô'],
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

  // --- 12. HỎI ĐÁP & QUY CHẾ CỘNG ĐỒNG (FAQ HTSV) ---
  {
    id: 'faq_anonymous_safety',
    keywords: [
      'đăng bài ẩn danh thì người khác có biết danh tính của mình không',
      'đăng bài ẩn danh',
      'bài ẩn danh',
      'ẩn danh có bị lộ không',
      'người khác có biết danh tính',
      'lộ danh tính',
      'ẩn danh có an toàn không',
      'đăng giấu tên',
      'người dùng ẩn danh',
      'ẩn danh có ai biết'
    ],
    response: `Hoàn toàn không bạn nha! Khi bạn bật chế độ "Ẩn danh", hệ thống sẽ hiển thị bài viết dưới tên "Người dùng ẩn danh" và ẩn hoàn toàn 100% họ tên, email cũng như ảnh đại diện của bạn với tất cả thành viên khác trên diễn đàn. Bạn có thể an tâm chia sẻ tâm sự mà không sợ bị lộ danh tính nhé!`,
  },
  {
    id: 'faq_moderation_time',
    keywords: [
      'bài viết confession gửi lên mất bao lâu để được phê duyệt',
      'bài viết confession gửi lên mất bao lâu',
      'confession duyệt mất bao lâu',
      'bao lâu được phê duyệt',
      'bao lâu được duyệt',
      'phê duyệt confession',
      'duyệt bài confession',
      'thời gian duyệt bài',
      'khi nào bài được duyệt',
      'duyệt bài mất bao lâu',
      'chờ duyệt bài'
    ],
    response: `Dạ bài viết Confession sau khi gửi lên thường được phê duyệt trong vòng vài giờ làm việc nha bạn!

Tất cả bài viết đều được đội ngũ kiểm duyệt xem xét cẩn thận để đảm bảo đúng tiêu chuẩn cộng đồng: văn minh, tôn trọng, không có nội dung xúc phạm, công kích cá nhân hay vi phạm thuần phong mỹ tục. Sau khi duyệt xong, bài viết sẽ lập tức xuất hiện trên diễn đàn cho mọi người cùng đọc nè!`,
  },
  {
    id: 'faq_report_content',
    keywords: [
      'làm thế nào để báo cáo bài viết hoặc bình luận vi phạm',
      'báo cáo bài viết hoặc bình luận vi phạm',
      'báo cáo bài viết',
      'báo cáo bình luận',
      'báo cáo vi phạm',
      'tố cáo bài viết',
      'tố cáo bình luận',
      'report bài viết',
      'thấy bài viết xấu',
      'báo cáo vi phạm ở đâu',
      'cách report vi phạm'
    ],
    response: `Nếu bạn thấy có bài viết hoặc bình luận vi phạm tiêu chuẩn cộng đồng (quấy rối, xúc phạm hay phát tán thông tin sai lệch), bạn có thể báo cáo rất dễ dàng nha:

1. Bạn truy cập vào mục **"Hỗ trợ"** trên thanh menu.
2. Chọn **"Tạo báo cáo mẫu"** (với loại yêu cầu: *Báo cáo vi phạm nội dung*).
3. Dán đường link bài viết hoặc bình luận đó và ghi rõ lý do vi phạm.
4. Sau đó bạn có thể theo dõi tiến độ xử lý của ban quản trị tại mục **"Theo dõi yêu cầu"** trên hệ thống nè!`,
  },
  {
    id: 'faq_account_security',
    keywords: [
      'quên mật khẩu hoặc không nhận được mã otp xác thực thì làm sao',
      'không nhận được mã otp xác thực',
      'không nhận được mã otp',
      'không nhận được otp',
      'mã otp xác thực',
      'lỗi mã otp',
      'quên mật khẩu không có otp',
      'otp không gửi về',
      'mã xác thực không về',
      'quên mật khẩu',
      'lấy lại mật khẩu'
    ],
    response: `Nếu bạn lỡ quên mật khẩu hoặc chờ mãi không thấy mã OTP xác thực gửi về, bạn thử các bước này xem sao nha:

1. **Kiểm tra hòm thư rác (Spam / Junk):** Rất nhiều trường hợp email chứa mã OTP bị chuyển nhầm vào mục Spam của Gmail hoặc Outlook.
2. **Bấm gửi lại OTP:** Sau khoảng 60 giây, bạn có thể bấm nút yêu cầu gửi lại mã một lần nữa.
3. **Gửi yêu cầu hỗ trợ tài khoản:** Nếu vẫn chưa nhận được, bạn hãy vào mục **"Hỗ trợ"** trên HTSV và chọn loại yêu cầu *Hỗ trợ tài khoản & bảo mật*, ban quản trị sẽ kiểm tra trực tiếp và hỗ trợ cấp lại cho bạn nhé!`,
  },
  {
    id: 'faq_student_verification',
    keywords: [
      'mã sinh viên, lớp và ngành học được cập nhật như thế nào',
      'cập nhật mã sinh viên',
      'mã sinh viên lớp và ngành học',
      'cập nhật lớp và ngành học',
      'đổi mã sinh viên',
      'đổi lớp',
      'đổi ngành học',
      'xác thực mã sinh viên',
      'sai thông tin sinh viên',
      'thông tin sinh viên cập nhật như thế nào',
      'sai mã sinh viên'
    ],
    response: `Về thông tin cá nhân như Mã sinh viên (MSSV), Lớp và Ngành học thì bạn lưu ý nhé:

* Các thông tin này sẽ được đối chiếu và kích hoạt tự động khi bạn hoàn tất xác thực thông tin sinh viên tại trường DNC hoặc qua hệ thống liên kết tài khoản đào tạo chính thức của nhà trường.
* Nếu bạn phát hiện thông tin hiển thị bị sai lệch (ví dụ bạn chuyển lớp, đổi ngành học hay sai số MSSV), bạn chỉ cần vào mục **"Hỗ trợ & Báo cáo"** (Dịch vụ Một cửa) và gửi yêu cầu điều chỉnh thông tin sinh viên để thầy cô cập nhật lại cho bạn nha!`,
  },

  // --- 13. DỮ LIỆU CHUYÊN SÂU TỪ WEBSITE TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (NCTU.EDU.VN) ---
  {
    id: 'dnc_ecosystem',
    keywords: [
      'hệ sinh thái dnc',
      'mô hình doanh nghiệp trong trường',
      'doanh nghiệp trong trường đại học',
      'bệnh viện quốc tế đại học nam cần thơ',
      'giai đoạn 2 bệnh viện dnc',
      'cơ sở vật chất dnc có gì',
      'trường dnc có gì nổi bật',
            'dnc travel',
      'hồ bơi dnc',
      'viện dược liệu dnc'
    ],
    response: `Đại học Nam Cần Thơ (DNC) tự hào là một trong những trường đại học tiên phong tại ĐBSCL áp dụng mô hình đào tạo **"Doanh nghiệp trong trường đại học"** với hệ sinh thái thực hành cực kỳ quy mô nha bạn:

* **Bệnh viện Đại học Nam Cần Thơ:** Đạt chứng nhận quốc tế AACI Hoa Kỳ, quy mô Giai đoạn 1 là 300 giường bệnh đa khoa. Đặc biệt trường đã khởi công Giai đoạn 2 (Bệnh viện Quốc tế 1.500 tỷ đồng) nâng công suất lên 1.000 giường theo mô hình Trung tâm Y học học thuật (Academic Medical Center).
* **Showroom Ô tô Nam Cần Thơ DNC:** Xưởng bảo dưỡng, sửa chữa và kinh doanh xe hiện đại phục vụ thực hành cho sinh viên ngành Ô tô.
* **Viện Nghiên cứu & Phát triển Dược liệu:** Nghiên cứu và ứng dụng các sản phẩm dược liệu, đông trùng hạ thảo, thực phẩm bảo vệ sức khỏe.
* **Trung tâm Phát triển Phần mềm & AI DNC:** Nơi sinh viên CNTT thực chiến các dự án phần mềm thực tế.
* **Hệ sinh thái Du lịch:** Công ty Du lịch DNC Travel phục vụ đào tạo ngành Du lịch, Khách sạn, Nhà hàng.
* **Thể thao & Đời sống:** Hồ bơi đạt chuẩn quốc gia, sân bóng đá cỏ nhân tạo, nhà thi đấu đa năng và khu Ký túc xá máy lạnh 2.000 chỗ.

Bạn thấy cơ sở vật chất ở DNC xịn sò không nè!`,
  },
  {
    id: 'dnc_history_leadership',
    keywords: [
      'lịch sử hình thành dnc',
      'dnc thành lập năm nào',
      'chủ tịch trường dnc',
      'hiệu trưởng dnc',
      'hiệu trưởng',
      'hieu truong',
      'thầy hiệu trưởng',
      'hiệu trưởng là ai',
      'chủ tịch trường',
      'chu tich truong',
      'võ tòng xuân',
      'nguyễn tiến dũng',
      'nguyễn văn quang',
      'thành lập trường dnc'
    ],
    response: `Dạ về lịch sử và ban lãnh đạo của Trường Đại học Nam Cần Thơ (DNC) thì rất đáng tự hào nè:

* **Thành lập:** Trường được thành lập theo Quyết định số 230/QĐ-TTg ngày 25/01/2013 của Thủ tướng Chính phủ.
* **Lãnh đạo sáng lập & điều hành:**
  * **Chủ tịch Hội đồng trường:** Tiến sĩ, Luật sư Nguyễn Tiến Dũng.
  * **Cố Hiệu trưởng Danh dự:** Giáo sư, Tiến sĩ, Nhà giáo Nhân dân Võ Tòng Xuân - nhà khoa học nông nghiệp hàng đầu Việt Nam và thế giới, người đã dành trọn tâm huyết cho sự phát triển của DNC.
* **Quy mô hiện tại:** Trường đào tạo khoảng 49 ngành ở các bậc Đại học, Thạc sĩ và Tiến sĩ, với quy mô hơn 20.000 học viên, sinh viên đang theo học.

Bạn muốn tìm hiểu thêm về ngành học nào của trường nè?`,
  },
  {
    id: 'dnc_graduation_standards',
    keywords: [
      'chuẩn đầu ra dnc',
      'điều kiện tốt nghiệp dnc',
      'chuẩn ngoại ngữ dnc',
      'chuẩn tin học dnc',
      'toeic dnc',
      'vstep dnc',
      'làm sao để tốt nghiệp dnc'
    ],
    response: `Về điều kiện tốt nghiệp và chuẩn đầu ra tại DNC thì bạn cần hoàn thành những yêu cầu chính này nha:

1. **Tích lũy đủ số tín chỉ** theo đúng khung chương trình đào tạo của ngành/khóa học (trung bình 120 - 150 tín chỉ tùy bằng Cử nhân hay Kỹ sư).
2. **Điểm trung bình tích lũy (GPA):** Đạt từ 2.0/4.0 trở lên (không có môn nào bị điểm F chưa học lại).
3. **Chuẩn đầu ra Ngoại ngữ:** Đạt chứng chỉ tiếng Anh theo quy định của trường (như VSTEP B1/B2 hoặc TOEIC quốc tế tương đương tùy ngành).
4. **Chuẩn đầu ra Tin học:** Đạt chuẩn Ứng dụng CNTT cơ bản hoặc nâng cao.
5. **Chứng chỉ Giáo dục Quốc phòng - An ninh & Giáo dục Thể chất.**
6. **Điểm rèn luyện toàn khóa:** Đạt từ loại Trung bình trở lên và không trong thời gian bị kỷ luật.

Bạn đang học năm mấy rồi nè, chuẩn bị chuẩn đầu ra đến đâu rồi?`,
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

function tryEvaluateMath(text: string): string | null {
  const clean = text.trim().toLowerCase();
  // Support: "1 + 1", "5 * 10", "100 / 4", "2^3", "tính 25 * 4", "5 + 5 bằng mấy", "1+1=?", "10 - 4"
  const mathPattern = /^(?:tính\s+|kết quả\s+|giải\s+)?([0-9.,]+)\s*([+\-*/^xX×÷])\s*([0-9.,]+)(?:\s*(?:bằng|=|\?)\s*(?:mấy|bao nhiêu|\?)?)?$/i;
  const match = clean.match(mathPattern);
  if (match) {
    const num1 = parseFloat(match[1].replace(',', '.'));
    const op = match[2];
    const num2 = parseFloat(match[3].replace(',', '.'));
    if (!isNaN(num1) && !isNaN(num2)) {
      let res: number;
      let opSymbol = op;
      if (op === '+') { res = num1 + num2; opSymbol = '+'; }
      else if (op === '-') { res = num1 - num2; opSymbol = '-'; }
      else if (op === '*' || op.toLowerCase() === 'x' || op === '×') { res = num1 * num2; opSymbol = '×'; }
      else if (op === '/' || op === '÷') {
        if (num2 === 0) return 'Dạ trong toán học, phép chia cho số 0 là không xác định bạn nha!';
        res = num1 / num2;
        opSymbol = '÷';
      } else if (op === '^') {
        res = Math.pow(num1, num2);
        opSymbol = '^';
      } else {
        return null;
      }
      const formattedRes = Number.isInteger(res) ? res.toString() : res.toFixed(4).replace(/\.?0+$/, '');
      return `Kết quả phép tính của bạn là:\n\n$$\\mathbf{${num1} \\ ${opSymbol} \\ ${num2} = ${formattedRes}}$$\n\n* **Giải thích:** Phép tính giữa ${num1} và ${num2} cho ra kết quả chính xác là **${formattedRes}** nha! Bạn có câu hỏi hay bài toán nào cần mình hỗ trợ nữa không nè?`;
    }
  }
  return null;
}

/**
 * Hàm tìm kiếm phản hồi ngoại tuyến thông minh (Smart Offline Engine)
 * Luôn trả lời đúng trọng tâm và tự nhiên theo câu hỏi của người dùng.
 */
export function getMockResponse(question: string): string {
  const raw = question.trim();
  const normalized = raw.toLowerCase();
  const noTone = removeVietnameseTones(normalized);

  // 0. Phép tính toán học trực tiếp
  const mathAnswer = tryEvaluateMath(raw);
  if (mathAnswer) return mathAnswer;

  // 1. Easter eggs đặc biệt
  if (noTone.includes('cho thinh') || noTone.includes('thinh cho')) {
    return 'Chó Thịnh à tôi không biết, Tôi chỉ biết Thanh Tho thôi';
  }
  if (noTone.includes('thanh tho')) {
    const rule = MOCK_RULES.find((r) => r.id === 'easter_egg_thanh_tho');
    if (rule) return rule.response;
  }

  // 2. Ý định Học bổng (Phải ưu tiên TRƯỚC học phí để tránh nhầm lẫn)
  if (noTone.includes('hoc bong') || noTone.includes('xin hoc bong') || noTone.includes('xet hoc bong') || noTone.includes('tieu chuan hoc bong')) {
    const rule = MOCK_RULES.find((r) => r.id === 'scholarship');
    if (rule) return rule.response;
  }

  // 3. Ý định Giá phòng / Chi phí Ký túc xá (Ưu tiên TRƯỚC giới thiệu chung KTX)
  if (
    (noTone.includes('ktx') || noTone.includes('ky tuc xa')) &&
    (noTone.includes('gia') || noTone.includes('chi phi') || noTone.includes('bao nhieu tien') || noTone.includes('tien phong') || noTone.includes('dong tien') || noTone.includes('phi'))
  ) {
    const rule = MOCK_RULES.find((r) => r.id === 'dorm_price');
    if (rule) return rule.response;
  }

  // 4. Ý định Giấy xác nhận sinh viên / Hoãn NVQS / Vay vốn
  if (
    noTone.includes('giay xac nhan') ||
    noTone.includes('xac nhan sinh vien') ||
    noTone.includes('hoan nghia vu') ||
    noTone.includes('nvqs') ||
    (noTone.includes('vay von') && noTone.includes('ngan hang')) ||
    noTone.includes('ve xe buyt')
  ) {
    const rule = MOCK_RULES.find((r) => r.id === 'giay_xac_nhan_sv');
    if (rule) return rule.response;
  }

  // 5. Ý định Bảng điểm
  if (noTone.includes('bang diem') && (noTone.includes('xin') || noTone.includes('cap') || noTone.includes('in') || noTone.includes('lay'))) {
    const rule = MOCK_RULES.find((r) => r.id === 'xin_bang_diem');
    if (rule) return rule.response;
  }

  // 6. Ý định Phúc khảo điểm thi
  if (noTone.includes('phuc khao') || noTone.includes('cham lai bai') || noTone.includes('khieu nai diem')) {
    const rule = MOCK_RULES.find((r) => r.id === 'phuc_khao');
    if (rule) return rule.response;
  }

  // 7. Ý định Hoãn thi
  if (noTone.includes('hoan thi') || noTone.includes('xin hoan thi') || noTone.includes('nghi thi')) {
    const rule = MOCK_RULES.find((r) => r.id === 'hoan_thi');
    if (rule) return rule.response;
  }

  // 8. Ý định Học lại vs Học cải thiện
  if (noTone.includes('hoc lai') || noTone.includes('hoc cai thien') || noTone.includes('diem f') || noTone.includes('diem d')) {
    const rule = MOCK_RULES.find((r) => r.id === 'hoc_lai_cai_thien');
    if (rule) return rule.response;
  }

  // 9. Ý định Mất thẻ / Cấp lại thẻ SV
  if (noTone.includes('the sinh vien') && (noTone.includes('mat') || noTone.includes('cap lai') || noTone.includes('lam lai') || noTone.includes('hong'))) {
    const rule = MOCK_RULES.find((r) => r.id === 'cap_lai_the_sv');
    if (rule) return rule.response;
  }

  // 10. Ý định Danh sách tổng hợp các ngành đào tạo
  if (
    (noTone.includes('nganh dao tao') || noTone.includes('cac nganh') || noTone.includes('nhung nganh nao') || noTone.includes('danh sach nganh')) &&
    !noTone.includes('cntt') && !noTone.includes('y khoa') && !noTone.includes('o to') && !noTone.includes('kinh te') && !noTone.includes('luat')
  ) {
    const rule = MOCK_RULES.find((r) => r.id === 'danh_sach_nganh');
    if (rule) return rule.response;
  }

  // 11. Viết email
  if (noTone.includes('viet email') || noTone.includes('soan email') || noTone.includes('email xin nghi') || noTone.includes('mau email') || noTone.includes('gui giang vien')) {
    const rule = MOCK_RULES.find((r) => r.id === 'writing_email');
    if (rule) return rule.response;
  }

  // 12. Viết CV
  if (noTone.includes('viet cv') || noTone.includes('tao cv') || noTone.includes('cv xin viec') || noTone.includes('mau cv')) {
    const rule = MOCK_RULES.find((r) => r.id === 'writing_cv');
    if (rule) return rule.response;
  }

  // 13. Phương pháp học tập
  if (noTone.includes('pomodoro') || noTone.includes('phuong phap hoc') || noTone.includes('cach hoc gioi') || noTone.includes('cach on thi') || noTone.includes('nho lau')) {
    const rule = MOCK_RULES.find((r) => r.id === 'study_methods');
    if (rule) return rule.response;
  }

  // 14. Kể chuyện cười
  if (noTone.includes('ke chuyen cuoi') || noTone.includes('chuyen cuoi') || noTone.includes('chuyen hai') || noTone.includes('vui vui')) {
    const rule = MOCK_RULES.find((r) => r.id === 'joke');
    if (rule) return rule.response;
  }

  // 15. Lập trình Python
  if (noTone.includes('python') && (noTone.includes('code') || noTone.includes('la gi') || noTone.includes('hoc') || noTone.includes('vi du') || noTone.includes('ham'))) {
    const rule = MOCK_RULES.find((r) => r.id === 'programming_python');
    if (rule) return rule.response;
  }

  // 16. Lập trình JavaScript / TypeScript / React
  if (
    noTone.includes('javascript') ||
    noTone.includes('typescript') ||
    noTone.includes('react') ||
    noTone.includes('let const var') ||
    noTone.includes('hook')
  ) {
    const rule = MOCK_RULES.find((r) => r.id === 'programming_js_ts');
    if (rule) return rule.response;
  }

  // 17. Ý định: Báo cáo bài viết hoặc bình luận vi phạm trên Diễn đàn / Confession
  if (
    noTone.includes('bao cao') ||
    noTone.includes('to cao') ||
    noTone.includes('report') ||
    (noTone.includes('vi pham') && (noTone.includes('bai') || noTone.includes('binh luan') || noTone.includes('noi dung')))
  ) {
    const faq3Rule = MOCK_RULES.find((r) => r.id === 'faq_report_content');
    if (faq3Rule) return faq3Rule.response;
  }

  // 18. Ý định: Thời gian duyệt bài Confession
  if (
    (noTone.includes('confession') || noTone.includes('bai viet') || noTone.includes('bai dang') || noTone.includes('dang bai')) &&
    (noTone.includes('bao lau') || noTone.includes('duyet') || noTone.includes('phe duyet') || noTone.includes('kiem duyet') || noTone.includes('khi nao') || noTone.includes('cho'))
  ) {
    const faq2Rule = MOCK_RULES.find((r) => r.id === 'faq_moderation_time');
    if (faq2Rule) return faq2Rule.response;
  }

  // 19. Ý định: Đăng bài ẩn danh có an toàn / lộ danh tính không
  if (
    (noTone.includes('an danh') || noTone.includes('giau ten') || noTone.includes('dau ten')) &&
    (noTone.includes('danh tinh') || noTone.includes('biet') || noTone.includes('lo') || noTone.includes('ai') || noTone.includes('an toan') || noTone.includes('so'))
  ) {
    const faq1Rule = MOCK_RULES.find((r) => r.id === 'faq_anonymous_safety');
    if (faq1Rule) return faq1Rule.response;
  }

  // 20. Ý định: Quên mật khẩu hoặc không nhận được OTP
  if (
    (noTone.includes('mat khau') || noTone.includes('otp') || noTone.includes('xac thuc') || noTone.includes('tai khoan')) &&
    (noTone.includes('quen') || noTone.includes('khong nhan') || noTone.includes('khong ve') || noTone.includes('lay lai') || noTone.includes('loi'))
  ) {
    const faq4Rule = MOCK_RULES.find((r) => r.id === 'faq_account_security');
    if (faq4Rule) return faq4Rule.response;
  }

  // 21. Ý định: Cập nhật Mã sinh viên (MSSV), lớp và ngành học
  if (
    (noTone.includes('ma sinh vien') || noTone.includes('mssv') || noTone.includes('lop') || noTone.includes('nganh hoc')) &&
    (noTone.includes('cap nhat') || noTone.includes('doi') || noTone.includes('sai') || noTone.includes('xac thuc') || noTone.includes('chinh sua'))
  ) {
    const faq5Rule = MOCK_RULES.find((r) => r.id === 'faq_student_verification');
    if (faq5Rule) return faq5Rule.response;
  }

  // 22. Ý định: Đăng ký môn học / tín chỉ / học phần / rút môn
  if (
    noTone.includes('dang ky mon') ||
    noTone.includes('dang ky hoc phan') ||
    noTone.includes('dang ky tin chi') ||
    noTone.includes('tin chi') ||
    noTone.includes('rut hoc phan') ||
    noTone.includes('huy mon') ||
    (noTone.includes('mon hoc') && noTone.includes('dang ky'))
  ) {
    const dkRule = MOCK_RULES.find((r) => r.id === 'dang_ky_mon');
    if (dkRule) return dkRule.response;
  }

  // 23. Ý định: Điểm rèn luyện
  if (noTone.includes('ren luyen') || noTone.includes('drl')) {
    const drlRule = MOCK_RULES.find((r) => r.id === 'diem_ren_luyen');
    if (drlRule) return drlRule.response;
  }

  // 24. Ý định: Bảo hiểm y tế (BHYT)
  if (noTone.includes('bhyt') || noTone.includes('bao hiem y te') || (noTone.includes('bao hiem') && (noTone.includes('kham') || noTone.includes('benh vien') || noTone.includes('sinh vien')))) {
    const bhytRule = MOCK_RULES.find((r) => r.id === 'bhyt');
    if (bhytRule) return bhytRule.response;
  }

  // 25. Ý định: Lịch học / Thời khóa biểu / Lịch thi
  if (noTone.includes('lich hoc') || noTone.includes('lich thi') || noTone.includes('thoi khoa bieu')) {
    const lhRule = MOCK_RULES.find((r) => r.id === 'lich_hoc');
    if (lhRule) return lhRule.response;
  }

  // 26. Ý định: Tính năng cổng HTSV / Web
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

  // 27. Ý định: Diễn đàn Confession / Tâm sự
  if (noTone.includes('confession') || (noTone.includes('tam su') && noTone.includes('dien dan')) || (noTone.includes('dang bai') && noTone.includes('dien dan'))) {
    const cfsRule = MOCK_RULES.find((r) => r.id === 'confession');
    if (cfsRule) return cfsRule.response;
  }

  // 28. Ý định: Dịch vụ Một cửa / Xin giấy tờ
  if (noTone.includes('mot cua') || noTone.includes('giay xac nhan') || noTone.includes('bang diem') || noTone.includes('hoan thi')) {
    const mcRule = MOCK_RULES.find((r) => r.id === 'mot_cua');
    if (mcRule) return mcRule.response;
  }

  // 29. Ý định: Hệ sinh thái doanh nghiệp trong trường DNC
  if (
    noTone.includes('he sinh thai') ||
    noTone.includes('doanh nghiep trong truong') ||
    noTone.includes('dnc travel') ||
    noTone.includes('ho boi') ||
    noTone.includes('vien duoc lieu') ||
    (noTone.includes('co so vat chat') && noTone.includes('dnc'))
  ) {
    const ecoRule = MOCK_RULES.find((r) => r.id === 'dnc_ecosystem');
    if (ecoRule) return ecoRule.response;
  }

  // 30. Ý định: Lịch sử thành lập & Lãnh đạo DNC
  if (
    noTone.includes('thanh lap') ||
    noTone.includes('lich su') ||
    noTone.includes('vo tong xuan') ||
    noTone.includes('nguyen tien dung') ||
    noTone.includes('chu tich hoi dong')
  ) {
    const histRule = MOCK_RULES.find((r) => r.id === 'dnc_history_leadership');
    if (histRule) return histRule.response;
  }

  // 31. Ý định: Chuẩn đầu ra & Điều kiện tốt nghiệp DNC
  if (
    noTone.includes('tot nghiep') ||
    noTone.includes('chuan dau ra') ||
    noTone.includes('toeic') ||
    noTone.includes('vstep') ||
    noTone.includes('dieu kien tot nghiep')
  ) {
    const gradRule = MOCK_RULES.find((r) => r.id === 'dnc_graduation_standards');
    if (gradRule) return gradRule.response;
  }

  // 32. Ý định: Liên hệ / Hotline DNC
  if (noTone.includes('lien he') || noTone.includes('hotline') || noTone.includes('so dien thoai') || noTone.includes('sdt')) {
    const lhRule = MOCK_RULES.find((r) => r.id === 'lien_he_dnc');
    if (lhRule) return lhRule.response;
  }

  // 33. Tra cứu dữ liệu chuyên sâu từ website Đại học Nam Cần Thơ (nctu.edu.vn)
  // Bao gồm tất cả các ngành đào tạo, mã ngành, khối xét tuyển, thời gian đào tạo, câu lạc bộ, bệnh viện, resort, showroom, KTX...
  const dncDeepData = searchDncKnowledge(raw);
  if (dncDeepData) {
    return dncDeepData;
  }

  // 34. Ý định: Chào hỏi (chỉ khi thuần túy là lời chào ngắn gọn)
  if (
    noTone === 'hi' ||
    noTone === 'hello' ||
    noTone === 'chao' ||
    noTone === 'chao ban' ||
    noTone === 'xin chao' ||
    noTone === 'alo' ||
    noTone === 'hey' ||
    ((noTone.startsWith('chao ban') || noTone.startsWith('xin chao')) && noTone.length < 20)
  ) {
    return MOCK_RULES.find((r) => r.id === 'greeting')?.response || MOCK_RULES[2].response;
  }

  // 35. Ý định: Hỏi danh tính người dùng ("bạn biết tui là ai", "tôi là ai")
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

  // 36. Ý định: Hỏi về trường / địa chỉ tổng quan
  if (
    (noTone.includes('truong nao') ||
      noTone.includes('truong gi') ||
      noTone.includes('gioi thieu truong') ||
      noTone.includes('thong tin truong') ||
      noTone === 'dnc' ||
      noTone === 'dai hoc nam can tho' ||
      noTone === 'dh nam can tho') &&
    !noTone.includes('ktx') &&
    !noTone.includes('ky tuc xa') &&
    !noTone.includes('hoc phi') &&
    !noTone.includes('nganh') &&
    !noTone.includes('benh vien') &&
    !noTone.includes('resort') &&
    !noTone.includes('showroom') &&
    !noTone.includes('tien nghi') &&
    !noTone.includes('dang ky')
  ) {
    const schoolRule = MOCK_RULES.find((r) => r.id === 'school_info');
    if (schoolRule) return schoolRule.response;
  }

  // 37. Ý định: Hỏi về học phí / tiền bạc chung
  if (noTone.includes('hoc phi') || noTone.includes('tien hoc') || noTone.includes('bao nhieu tien')) {
    const tuitionRule = MOCK_RULES.find((r) => r.id === 'tuition');
    if (tuitionRule) return tuitionRule.response;
  }

  // 38. Ý định: Hỏi về tuyển sinh / xét tuyển / học bạ chung
  if (noTone.includes('xet tuyen') || noTone.includes('tuyen sinh') || noTone.includes('xet hoc ba')) {
    const admRule = MOCK_RULES.find((r) => r.id === 'admissions');
    if (admRule) return admRule.response;
  }

  // 39. Ý định: Ăn cơm / Đói bụng
  if (noTone.includes('an com') || noTone.includes('an gi') || noTone.includes('doi bung')) {
    const eatRule = MOCK_RULES.find((r) => r.id === 'eating');
    if (eatRule) return eatRule.response;
  }

  // 40. Ý định: Tâm trạng buồn / Stress / Áp lực
  if (noTone.includes('buon') || noTone.includes('met moi') || noTone.includes('stress') || noTone.includes('ap luc') || noTone.includes('chan qua') || noTone.includes('nan qua')) {
    const moodRule = MOCK_RULES.find((r) => r.id === 'mood');
    if (moodRule) return moodRule.response;
  }

  // 41. Ý định: Khen ngợi bot
  if (noTone.includes('thong minh') || noTone.includes('gioi qua') || noTone.includes('de thuong') || noTone.includes('dang yeu') || noTone.includes('xin qua') || noTone.includes('hay qua')) {
    const compRule = MOCK_RULES.find((r) => r.id === 'compliment');
    if (compRule) return compRule.response;
  }

  // 42. Ý định: Chúc ngủ ngon
  if (noTone.includes('ngu ngon') || noTone.includes('di ngu') || noTone.includes('buon ngu')) {
    const sleepRule = MOCK_RULES.find((r) => r.id === 'sleep');
    if (sleepRule) return sleepRule.response;
  }

  // 43. Ý định: Cảm ơn
  if (noTone.includes('cam on') || noTone.includes('thank')) {
    const gratRule = MOCK_RULES.find((r) => r.id === 'gratitude');
    if (gratRule) return gratRule.response;
  }

  // 44. Ý định: Bot là ai
  if (noTone.includes('ban la ai') || noTone.includes('tro ly la ai') || noTone.includes('bot la ai') || noTone.includes('cau la ai')) {
    const botRule = MOCK_RULES.find((r) => r.id === 'bot_identity');
    if (botRule) return botRule.response;
  }

  // 45. Quét qua từ khóa chính xác của MOCK_RULES
  for (const rule of MOCK_RULES) {
    if (rule.keywords.some((k) => containsKeyword(normalized, noTone, k))) {
      return rule.response;
    }
  }

  // 19. Khi không có thông tin chắc chắn -> Nói thẳng thắn không biết:
  return `Dạ cái này mình không biết nha bạn!

Vì mình là trợ lý ảo hỗ trợ thông tin **Trường Đại học Nam Cần Thơ (DNC)** và hệ thống Cổng HTSV, nên câu này mình chưa có thông tin rõ để giải đáp cho bạn.

Nếu bạn cần hỗ trợ các vấn đề về trường hoặc thủ tục học vụ, bạn vui lòng liên hệ:
* **Hotline Tuyển sinh & Tư vấn DNC:** \`0939 257 838\` - \`02923 798 222\`
* **Cổng HTSV:** Bạn có thể vào mục **"Hỗ trợ"** trên menu để gửi yêu cầu một cửa đến thầy cô nhé!`;
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
      'Đăng bài ẩn danh thì người khác có biết danh tính không?',
      'Bài viết Confession gửi lên mất bao lâu để được phê duyệt?',
      'Làm thế nào để báo cáo bài viết hoặc bình luận vi phạm?',
    ];
  }

  // 7.1. Nhóm Hỏi đáp Quy chế FAQ
  if (
    noTone.includes('an danh') ||
    noTone.includes('phe duyet') ||
    noTone.includes('bao cao') ||
    noTone.includes('otp') ||
    noTone.includes('ma sinh vien')
  ) {
    return [
      'Quên mật khẩu hoặc không nhận được mã OTP thì làm sao?',
      'Mã sinh viên, lớp và ngành học được cập nhật như thế nào?',
      'Đăng bài ẩn danh thì người khác có biết danh tính của mình không?',
    ];
  }

  // 7.2. Nhóm Hệ sinh thái & Chuẩn đầu ra DNC
  if (
    noTone.includes('he sinh thai') ||
    noTone.includes('doanh nghiep') ||
    noTone.includes('chuan dau ra') ||
    noTone.includes('tot nghiep')
  ) {
    return [
      'Hệ sinh thái doanh nghiệp trong trường DNC có gì nổi bật?',
      'Điều kiện tốt nghiệp và chuẩn đầu ra tại DNC ra sao?',
      'Mức học phí các ngành tại DNC năm 2026?',
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
