/* eslint-disable */
// ===========================================================================
// DỮ LIỆU TRI THỨC TOÀN DIỆN TRƯỜNG ĐẠI HỌC NAM CẦN THƠ (DNC)
// Trích xuất tự động & đồng bộ từ hệ thống DNC (nctu.edu.vn)
// ===========================================================================

export interface KnowledgeItem {
  id: string;
  category: 'tuyen_sinh' | 'hoc_phi' | 'hoc_vu' | 'ky_tuc_xa' | 'gioi_thieu' | 'nganh_hoc' | 'cau_lac_bo' | 'doi_song';
  keywords: string[];
  question: string;
  answer: string;
}

export const DNC_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'dnc-tong-quan',
    category: 'gioi_thieu',
    keywords: ['giới thiệu', 'thông tin trường', 'địa chỉ', 'ở đâu', 'mã trường', 'hotline', 'liên hệ', 'dnc là gì'],
    question: 'Thông tin tổng quan, mã trường và liên hệ Trường Đại học Nam Cần Thơ?',
    answer: `### 🏫 **Trường Đại học Nam Cần Thơ (DNC)**
* **Mã trường:** \`DNC\`
* **Địa chỉ:** Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ.
* **Hotline / Zalo Tuyển sinh:** \`0939 257 838\` - \`02923 798 222\` - \`02923 798 333\`
* **Email:** \`phongtuyensinh@nctu.edu.vn\`
* **Website:** [https://nctu.edu.vn](https://nctu.edu.vn)
* **Cơ sở trực thuộc nổi bật:** 
  * 🏥 **Bệnh viện Đại học Nam Cần Thơ** (quy mô 300 giường bệnh đạt chuẩn quốc tế)
  * 🚗 **Showroom Ô tô Nam Cần Thơ DNC**
  * 🌴 **Khu thực hành Du lịch Sinh thái – Resort DNC** (diện tích >25.000 m² chuẩn Châu Âu)
  * 🧪 **Viện Nghiên cứu và Phát triển Dược liệu**
  * 🏢 **Khu phức hợp Ký túc xá, Thư viện điện tử, Sân vận động đa năng**`
  },
  {
    id: 'dnc-resort',
    category: 'gioi_thieu',
    keywords: ['resort', 'dnc resort', 'khu sinh thai', 'du lich sinh thai', 'bungalow', 'khu resort', 'nghi duong', 'khach san resort'],
    question: 'Thông tin về Khu thực hành Du lịch Sinh thái – Resort DNC (DNC Resort)?',
    answer: `### 🌴 **Khu thực hành Du lịch Sinh thái – Resort DNC (DNC Resort)**

Khu thực hành Du lịch Sinh thái – Resort DNC là công trình tiêu biểu theo mô hình *"Doanh nghiệp trong Trường Đại học"* của Trường Đại học Nam Cần Thơ, được khánh thành vào ngày **25/01/2024**:

* **Vị trí:** Tọa lạc ngay **bên trong khuôn viên Trường Đại học Nam Cần Thơ** (Số 168, Đường Nguyễn Văn Cừ nối dài, P. An Bình, Q. Ninh Kiều, TP. Cần Thơ).
* **Quy mô & Thiết kế:** 
  * Diện tích trên **25.000 m² (hơn 2,5 ha)** mang phong cách kiến trúc Châu Âu sang trọng, hòa hợp với thiên nhiên sinh thái ven sông.
  * Hệ thống các căn bungalow tiện nghi cao cấp (hiện có 10 căn giai đoạn 1 và đang mở rộng lên 20 căn) phục vụ nhu cầu lưu trú, nghỉ dưỡng.
* **Tiện ích tích hợp:**
  * Hồ bơi ngoài trời hiện đại.
  * Cụm sân thể thao đa năng chuẩn thi đấu: Tennis, Pickleball, bóng chuyền, bóng rổ.
  * Cửa hàng tiện lợi, quầy giải khát và dịch vụ ẩm thực.
* **Mục đích hoạt động:**
  * **Cơ sở thực hành cho sinh viên:** Nơi rèn luyện kỹ năng nghề nghiệp thực tế, trải nghiệm quy trình vận hành khách sạn - resort chuyên nghiệp cho sinh viên ngành Quản trị Dịch vụ Du lịch & Lữ hành, Quản trị Khách sạn, Quản trị Nhà hàng & Dịch vụ ăn uống.
  * **Phục vụ lưu trú & Du lịch:** Nơi đón tiếp, lưu trú cho chuyên gia, giảng viên trong & ngoài nước, khách mời và du khách đến tham quan, công tác.
  * **Du lịch sức khỏe (Medical Tourism):** Kết hợp chặt chẽ giữa Resort DNC, **Bệnh viện Đại học Nam Cần Thơ** và **DNC Travel** nhằm cung cấp dịch vụ nghỉ dưỡng kết hợp thăm khám sức khỏe toàn diện.`
  },
  {
    id: 'dnc-phuong-thuc-xet-tuyen',
    category: 'tuyen_sinh',
    keywords: ['phương thức xét tuyển', 'xét học bạ', 'điều kiện xét', 'tổ hợp môn', 'điểm xét tuyển', 'cách xét tuyển', 'thi thpt', 'đgnl'],
    question: 'Các phương thức xét tuyển chính thức vào Trường Đại học Nam Cần Thơ?',
    answer: `### 📋 **Các phương thức xét tuyển Đại học Nam Cần Thơ (DNC)**
\n* **Phương thức 100: Xét kết quả thi tốt nghiệp THPT**\n  ĐXT: Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm ưu tiên. (Tổ hợp xét tuyển công bố tại website của trường)\n* **Phương thức 200: Xét kết quả học tập cấp THPT (học bạ)**\n  ĐXT: Điểm Môn 1 + Điểm Môn 2 + Điểm 3 + Điểm ưu tiên. (Tổ hợp xét tuyển sử dụng điểm trung bình chung kết quả học tập cả năm các lớp 10, 11, 12)\n* **Phương thức 402: Sử dụng kết quả thi đánh giá năng lực do đơn vị khác tổ chức**\n  Sử dụng kết quả thi đánh giá năng lực do đơn vị khác tổ chức để xét tuyển\n* **Phương thức 407: Kết hợp kết quả kỳ thi tốt nghiệp THPT với kết quả học tập cấp THPT**\n  Kết hợp kết quả kỳ thi tốt nghiệp THPT với kết quả học tập cấp THPT để xét tuyển\n* **Phương thức 411: Xét tuyển thí sinh tốt nghiệp THPT nước ngoài**\n  Xét tuyển thí sinh tốt nghiệp THPT nước ngoài\n\n> **Lưu ý đối với Khối ngành Sức khỏe (Y khoa, Dược, Xét nghiệm, Răng-Hàm-Mặt):** Áp dụng theo ngưỡng đảm bảo chất lượng đầu vào của Bộ Giáo dục & Đào tạo (Học sinh lớp 12 xếp loại học lực Giỏi hoặc điểm xét tốt nghiệp THPT từ 8.0 trở lên khi xét học bạ).`
  },
  {
    id: 'dnc-hoc-phi-chi-tiet',
    category: 'hoc_phi',
    keywords: ['học phí', 'tiền học', 'bao nhiêu tiền', 'đóng học phí', 'biểu phí', 'học bổng', 'miễn giảm'],
    question: 'Bảng học phí và chính sách học bổng tại Đại học Nam Cần Thơ?',
    answer: `### 💵 **Chính sách Học phí DNC (Cam kết ổn định suốt khóa học)**
DNC áp dụng chính sách **học phí ổn định toàn khóa** (đơn giá tín chỉ không đổi suốt thời gian học tập). Mỗi năm học gồm 3 học kỳ, trung bình 10 - 12 tín chỉ/học kỳ.

* **Nhóm ngành 1 (Từ 10 - 11 triệu đồng / học kỳ):**
  * Kinh tế số, Kế toán, Tài chính - Ngân hàng, TMĐT, Quản trị kinh doanh, Marketing, Kinh doanh quốc tế, Truyền thông đa phương tiện, PR.
  * Luật, Luật kinh tế, Ngôn ngữ Anh.
  * Du lịch, Khách sạn, Nhà hàng.
  * Công nghệ thông tin, Khoa học máy tính, Kỹ thuật phần mềm, Trí tuệ nhân tạo (AI), Mạng máy tính.
* **Nhóm ngành 2 (Từ 12 - 13 triệu đồng / học kỳ):**
  * Kiến trúc, Bất động sản, CNKT Hóa học, Công nghệ thực phẩm, Logistics & Quản lý chuỗi cung ứng.
* **Nhóm ngành 3 (Từ 14 - 15 triệu đồng / học kỳ):**
  * CNKT Ô tô, CNKT Điện - Điện tử, Kỹ thuật cơ khí động lực, Kỹ thuật xét nghiệm y học, Kỹ thuật hình ảnh y học, Điều dưỡng, Quản lý bệnh viện.
* **Nhóm ngành Sức khỏe đặc thù:**
  * Dược học: khoảng 18 - 22 triệu đồng / học kỳ.
  * Y khoa & Răng - Hàm - Mặt: khoảng 45 - 50 triệu đồng / học kỳ (đã bao gồm phí thực tập lâm sàng tại Bệnh viện DNC).

🎁 **Học bổng:**
* Tặng học bổng tuyển sinh đầu vào cho thí sinh điểm cao.
* Học bổng khuyến khích học tập theo từng học kỳ cho sinh viên Giỏi/Xuất sắc.`
  },
  {
    id: 'dnc-ky-tuc-xa-co-so',
    category: 'ky_tuc_xa',
    keywords: ['ký túc xá', 'ktx', 'phòng trọ', 'ở đâu', 'chỗ ở', 'nội trú', 'an ninh', 'cơ sở vật chất'],
    question: 'Ký túc xá và cơ sở vật chất Đại học Nam Cần Thơ thế nào?',
    answer: `### 🏢 **Ký túc xá và Cơ sở vật chất DNC**
* **Vị trí:** Tọa lạc ngay bên trong khuôn viên trường (168 Nguyễn Văn Cừ nối dài, P. An Bình, Q. Ninh Kiều, TP. Cần Thơ).
* **Tiện nghi Ký túc xá:**
  * Phòng trang bị quạt, máy lạnh, máy nước nóng lạnh, giường tầng hiện đại.
  * Hệ thống Wifi tốc độ cao bao phủ toàn khu.
  * Camera an ninh, đội ngũ bảo vệ trực 24/7 kiểm soát thẻ từ ra vào.
  * Sát cạnh nhà ăn sinh viên, siêu thị mini, phòng gym và sân thể thao.
* **Cơ sở vật chất giảng dạy:** Hệ thống giảng đường 100% trang bị máy lạnh, máy chiếu; trung tâm mô phỏng Y Dược hiện đại; xưởng thực hành ô tô; thư viện số hiện đại.`
  },
  {
    id: 'dnc-major-y_khoa',
    category: 'nganh_hoc',
    keywords: ["y khoa - bác sĩ đa khoa", "ngành y khoa - bác sĩ đa khoa", "học y khoa - bác sĩ đa khoa", "7720101"],
    question: 'Thông tin chi tiết ngành Y khoa - Bác sĩ Đa khoa (Mã ngành 7720101) tại DNC?',
    answer: `### 🎓 **Ngành Y khoa - Bác sĩ Đa khoa - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720101\`
* **Văn bằng tốt nghiệp:** Bác sĩ Đa khoa
* **Thời gian đào tạo:** 6 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}]

**Mô tả ngành:**
NgànhY Khoathuộc Khoa Y, Trường Đại học Nam Cần   Thơ được xây dựng trên triết lý kết hợp hài hòa giữa tri thức khoa học hiện   đại, kỹ năng lâm sàng chuyên sâu và y đức nghề nghiệp. Chương trình đào tạo   ngành Y khoa của Trường Đại học Nam Cần Thơ cam kết cung cấp nguồn nhân lực y   tế chất lư...

**Cơ hội nghề nghiệp:**
Tốt nghiệp với bằngBác sĩ Đa khoatại Trường Đại học Nam Cần Thơ (DNC), sinh viên được trang bị nền tảng kiến thức chuyên sâu và kỹ năng thực hành vững chắc trong lĩnh vực khám chữa bệnh, chăm sóc sức khỏe và y tế hiện đại, mở ra nhiều cơ hội nghề nghiệp hấp dẫn trong hệ thống y tế Việt Nam và quốc t...`
  },
  {
    id: 'dnc-major-y_hoc_du_phong',
    category: 'nganh_hoc',
    keywords: ["y học dự phòng", "ngành y học dự phòng", "học y học dự phòng", "7720110"],
    question: 'Thông tin chi tiết ngành Y học dự phòng (Mã ngành 7720110) tại DNC?',
    answer: `### 🎓 **Ngành Y học dự phòng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720110\`
* **Văn bằng tốt nghiệp:** Bác sĩ Y học dự phòng
* **Thời gian đào tạo:** 6 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}]

**Mô tả ngành:**
NgànhY học Dự phònglà một trong những lĩnh vực quan trọng của hệ thống y tế công cộng, tập trung vào công tác phòng bệnh, bảo vệ và nâng cao sức khỏe cộng đồng. Đây là ngành đào tạo Bác sĩ Y học Dự phòng có khả năng tham gia vào các hoạt động giám sát dịch tễ, kiểm soát dịch bệnh, quản lý chương trì...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp, sinh viên ngànhY học Dự phòngtại Trường Đại học Nam Cần Thơ (DNC) có thể đảm nhiệm nhiều vị trí việc làm trong lĩnh vực y tế công cộng và y học dự phòng, bao gồm:  * Bác sĩ Y học Dự phòng tham gia tư vấn sức khỏe, khám chữa bệnh ban đầu và phòng chống dịch bệnh  * Cán bộ giảng dạ...`
  },
  {
    id: 'dnc-major-quan_ly_benh_vien',
    category: 'nganh_hoc',
    keywords: ["quản lý bệnh viện", "ngành quản lý bệnh viện", "học quản lý bệnh viện", "7720802"],
    question: 'Thông tin chi tiết ngành Quản lý bệnh viện (Mã ngành 7720802) tại DNC?',
    answer: `### 🎓 **Ngành Quản lý bệnh viện - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720802\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 12, 'code': 'C02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Hóa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 34, 'code': 'X09', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'GDKTPL'}, {'id': 35, 'code': 'X10', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhQuản lý Bệnh viện (Hospital Management)là một trong những ngành học thuộc lĩnh vực quản lý y tế và chăm sóc sức khỏe, kết hợp giữa khoa học quản trị hiện đại và hệ thống y tế. Ngành đào tạo nguồn nhân lực chất lượng cao có khả năng quản trị bệnh viện, điều hành cơ sở y tế, quản lý dịch vụ khám ...

**Cơ hội nghề nghiệp:**
Trong bối cảnh ngành y tế Việt Nam đang đẩy mạnh tự chủ bệnh viện, chuyển đổi số y tế và hội nhập quốc tế, nhu cầu tuyển dụng nhân lựcngành Quản lý Bệnh việnchuyên nghiệp ngày càng tăng cao. Sau khi tốt nghiệp tại DNC, cử nhânQuản lý Bệnh việncó thể đảm nhận nhiều vị trí như:  * Quản trị bệnh viện /...`
  },
  {
    id: 'dnc-major-ths_duoc_ly_va_duoc_lam_sang',
    category: 'nganh_hoc',
    keywords: ["dược lý & dược lâm sàng", "ngành dược lý & dược lâm sàng", "học dược lý & dược lâm sàng", "8720205"],
    question: 'Thông tin chi tiết ngành Dược lý & dược lâm sàng (Mã ngành 8720205) tại DNC?',
    answer: `### 🎓 **Ngành Dược lý & dược lâm sàng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8720205\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** <ul>
	<li>Dược lý</li>
	<li>Dược lâm sàng</li>
	<li>Điểm trung bình tích luỹ <br class="d-none d-lg-block"/>ở bậc đại học</li>
</ul>

**Mô tả ngành:**
Trường Đại học Nam Cần Thơ đào tạo Thạc sĩ Dược lý và Dược lâm sàng, giúp bồi   dưỡng nâng cao kiến thức trong lĩnh vực Y Dược, về sự tác động giữa thuốc với   cơ thể và nghiên cứu các cơ chế khi thuốc vào trong cơ thể như hấp thu, phân   bố, chuyển hóa, thải trừ theo các cơ chế khác nhau để cho ...

**Cơ hội nghề nghiệp:**
Học viên sau khi tốt nghiệp thạc sĩ ngành Dược lý và Dược lâm sàng có thể đảm nhiệm các công việc của một thạc sĩ ở các lĩnh vực khác nhau như sau:  * Tại các bệnh viện, trung tâm y tế: Có nhiệm vụ đảm bảo chất lượng và hướng dẫn sử dụng thuốc. Đồng thời, các Dược sĩ sẽ tham vấn với bác sĩ trong việ...`
  },
  {
    id: 'dnc-major-ck1_noi_khoa',
    category: 'nganh_hoc',
    keywords: ["nội khoa", "ngành nội khoa", "học nội khoa", "CK607220"],
    question: 'Thông tin chi tiết ngành Nội khoa (Mã ngành CK607220) tại DNC?',
    answer: `### 🎓 **Ngành Nội khoa - Đại học Nam Cần Thơ**
* **Mã ngành:** \`CK607220\`
* **Văn bằng tốt nghiệp:** Chuyên khoa cấp I
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chuyên khoa cấp I – ngành Nội khoalà chương trình sau đại học đào tạo bác sĩ chuyên sâu trong chẩn đoán, điều trị và phòng ngừa các bệnh lý nội khoa thường gặp. Chương trình cung cấp kiến thức về các hệ cơ quan chính như tim mạch, hô hấp, tiêu hóa, nội tiết, thần kinh, cơ xương khớp; kết hợp lý thuy...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp Chuyên khoa I – ngành Nội khoa tại Trường Đại học Nam Cần Thơ, học viên có thể đảm nhiệm nhiều vị trí quan trọng:  * Tại bệnh viện và cơ sở y tế: Là bác sĩ Nội khoa, chẩn đoán – điều trị bệnh lý phức tạp, tham gia hội chẩn và phối hợp đa chuyên khoa.  * Tại cơ sở giáo dục, bệnh vi...`
  },
  {
    id: 'dnc-major-ths_noi_khoa',
    category: 'nganh_hoc',
    keywords: ["nội khoa", "ngành nội khoa", "học nội khoa", "8720104"],
    question: 'Thông tin chi tiết ngành Nội khoa (Mã ngành 8720104) tại DNC?',
    answer: `### 🎓 **Ngành Nội khoa - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8720104\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình Thạc sĩ Nội khoatại Trường Đại học Nam Cần Thơ được xây dựng dựa trên nhu cầu cấp thiết về nguồn nhân lực chất lượng cao trong lĩnh vực Y khoa, đặc biệt là chuyên ngành Nội. Chương trình hướng tới việc đào tạo đội ngũ bác sĩ có chuyên môn sâu, có khả năng cập nhật tiến bộ y học hiện đại...

**Cơ hội nghề nghiệp:**
Sau khi hoàn thành chương trình đào tạo Thạc sĩ Nội khoa tại Trường Đại học   Nam Cần Thơ, người học có thể đảm nhiệm nhiều vị trí quan trọng trong hệ thống   y tế, từ thực hành lâm sàng, nghiên cứu, giảng dạy đến quản lý chuyên môn. Với   kiến thức chuyên sâu và kỹ năng thực hành vững vàng, học ...`
  },
  {
    id: 'dnc-major-ck1_ngoai_khoa',
    category: 'nganh_hoc',
    keywords: ["ngoại khoa", "ngành ngoại khoa", "học ngoại khoa", "CK607207"],
    question: 'Thông tin chi tiết ngành Ngoại khoa (Mã ngành CK607207) tại DNC?',
    answer: `### 🎓 **Ngành Ngoại khoa - Đại học Nam Cần Thơ**
* **Mã ngành:** \`CK607207\`
* **Văn bằng tốt nghiệp:** Chuyên khoa cấp I
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chuyên khoa I – ngành Ngoại khoalà chương trình đào tạo sau đại học nhằm phát triển đội ngũ bác sĩ có chuyên môn cao trong lĩnh vực phẫu thuật và can thiệp ngoại khoa. Chương trình tập trung vào việc trang bị kiến thức sâu rộng về các chuyên ngành ngoại khoa chính bao gồm ngoại tổng quát, ngoại tiêu...

**Cơ hội nghề nghiệp:**
Bác sĩ tốt nghiệp Chuyên khoa I - ngành Ngoại khoa tại Trường Đại học Nam Cần   Thơ có thể phát triển sự nghiệp trong nhiều môi trường khác nhau. Tại các bệnh   viện công lập và tư nhân, học viên có thể đảm nhận vai trò bác sĩ phẫu thuật   chính hoặc phụ, tham gia các ca mổ phức tạp, quản lý khoa...`
  },
  {
    id: 'dnc-major-ths_ngoai_khoa',
    category: 'nganh_hoc',
    keywords: ["ngoại khoa", "ngành ngoại khoa", "học ngoại khoa", "8720107"],
    question: 'Thông tin chi tiết ngành Ngoại khoa (Mã ngành 8720107) tại DNC?',
    answer: `### 🎓 **Ngành Ngoại khoa - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8720107\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình Thạc sĩ Ngoại khoatại Trường Đại học Nam Cần Thơ được xây dựng nhằm đáp ứng nhu cầu cấp thiết về đào tạo đội ngũ bác sĩ ngoại khoa trình độ cao, có khả năng thực hiện chẩn đoán – điều trị – phẫu thuật hiệu quả và cập nhật các tiến bộ y học. Chương trình nhấn mạnh sự kết hợp giữa kiến th...

**Cơ hội nghề nghiệp:**
Sau khi hoàn thành chương trình, học viên có thể đảm nhận nhiều vị trí quan trọng trong hệ thống y tế, đặc biệt trong lĩnh vực phẫu thuật và điều trị ngoại khoa, bao gồm  * Trưởng/phó khoa Ngoại đảm nhận vai trò quản lý chuyên môn tại các đơn vị ngoại khoa.  * Chuyên gia phẫu thuật chuyên sâu trong ...`
  },
  {
    id: 'dnc-major-ck1_duoc_ly_va_duoc_lam_sang',
    category: 'nganh_hoc',
    keywords: ["dược lý & dược lâm sàng", "ngành dược lý & dược lâm sàng", "học dược lý & dược lâm sàng", "CK607305"],
    question: 'Thông tin chi tiết ngành Dược lý & Dược lâm sàng (Mã ngành CK607305) tại DNC?',
    answer: `### 🎓 **Ngành Dược lý & Dược lâm sàng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`CK607305\`
* **Văn bằng tốt nghiệp:** Chuyên khoa cấp I
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình Chuyên khoa cấp I ngành Dược lý và Dược lâm sàngtại Trường Đại học Nam Cần Thơ được xây dựng nhằm đáp ứng nhu cầu nâng cao năng lực chuyên môn cho dược sĩ trong môi trường điều trị hiện đại. Chương trình cung cấp kiến thức chuyên sâu về dược lý, dược lâm sàng, nghiên cứu sử dụng thuốc v...

**Cơ hội nghề nghiệp:**
* Sau khi tốt nghiệp, học viên có thể đảm nhiệm vai trò Dược sĩ lâm sàng tại bệnh viện, trung tâm y tế hoặc cơ sở khám chữa bệnh, trực tiếp phối hợp với bác sĩ trong kê đơn và theo dõi hiệu quả điều trị.  * Ngoài ra, học viên có thể tham gia giảng dạy tại các trường đại học, nghiên cứu chuyên sâu về...`
  },
  {
    id: 'dnc-major-cong_nghe_ky_thuat_o_to',
    category: 'nganh_hoc',
    keywords: ["công nghệ kỹ thuật ô tô", "ngành công nghệ kỹ thuật ô tô", "học công nghệ kỹ thuật ô tô", "7510205"],
    question: 'Thông tin chi tiết ngành Công nghệ kỹ thuật ô tô (Mã ngành 7510205) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ kỹ thuật ô tô - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7510205\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Công nghệ Kỹ thuật Ô tôlà lĩnh vực đào tạo tích hợp kiến thức liên ngành từ cơ khí, tự động hóa, điện – điện tử đến công nghệ chế tạo máy, nhằm phát triển nguồn nhân lực kỹ sư đáp ứng nhu cầu của ngành công nghiệp ô tô hiện đại.  Sinh viên theo học ngành này tại Trường Đại học Nam Cần Thơ sẽ đ...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Công nghệ Kỹ thuật Ô tôtại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm trong bối cảnh ngành công nghiệp ô tô và cơ khí động lực đang phát triển mạnh mẽ.  ## 1. Làm việc tại doanh nghiệp và nhà máy sản xuất  Kỹ sư ngành Công nghệ Kỹ thuật Ô tô có thể đảm nhận: ...`
  },
  {
    id: 'dnc-major-cong_nghe_ky_thuat_o_to_dien',
    category: 'nganh_hoc',
    keywords: ["công nghệ kỹ thuật ô tô điện", "ngành công nghệ kỹ thuật ô tô điện", "học công nghệ kỹ thuật ô tô điện", "7510205."],
    question: 'Thông tin chi tiết ngành Công nghệ kỹ thuật ô tô điện (Mã ngành 7510205.) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ kỹ thuật ô tô điện - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7510205.\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Công nghệ Ô tô điệnlà lĩnh vực đào tạo kỹ sư có kiến thức và kỹ năng về thiết kế, vận hành, bảo trì và phát triển các hệ thống ô tô sử dụng năng lượng điện, thay thế dần cho các phương tiện sử dụng nhiên liệu truyền thống.  Đây là ngành học thuộc nhóm kỹ thuật – công nghệ cao, đóng vai trò qua...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Công nghệ Kỹ thuật Ô tô điệntại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm trong bối cảnh ngành ô tô điện và công nghiệp cơ khí – tự động hóa đang phát triển mạnh mẽ.  ## 1. Làm việc tại doanh nghiệp và nhà máy sản xuất  Kỹ sư ngành Công nghệ Kỹ thuật Ô tô đi...`
  },
  {
    id: 'dnc-major-ky_thuat_co_khi_dong_luc',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật cơ khí động lực", "ngành kỹ thuật cơ khí động lực", "học kỹ thuật cơ khí động lực", "7520116"],
    question: 'Thông tin chi tiết ngành Kỹ thuật cơ khí động lực (Mã ngành 7520116) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật cơ khí động lực - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7520116\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Kỹ thuật Cơ khí Động lựclà lĩnh vực đào tạo kỹ sư chuyên về thiết kế, vận hành, bảo trì và cải tiến các hệ thống máy móc, thiết bị sử dụng năng lượng và động lực, như: động cơ đốt trong, hệ thống truyền động, máy công nghiệp, ô tô và các thiết bị cơ giới.  Đây là ngành học giữ vai trò quan trọ...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Kỹ thuật Cơ khí Động lựctại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm trong bối cảnh ngành công nghiệp cơ khí, ô tô và tự động hóa đang phát triển mạnh mẽ trong và ngoài nước.  ## 1. Làm việc tại doanh nghiệp sản xuất và kỹ thuật  Kỹ sư ngành Cơ khí Động lực...`
  },
  {
    id: 'dnc-major-qt_cong_nghe_ky_thuat_o_to',
    category: 'nganh_hoc',
    keywords: ["công nghệ kỹ thuật ô tô", "ngành công nghệ kỹ thuật ô tô", "học công nghệ kỹ thuật ô tô", "7510205"],
    question: 'Thông tin chi tiết ngành Công nghệ kỹ thuật ô tô (Mã ngành 7510205) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ kỹ thuật ô tô - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7510205\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Ngành Công nghệ kỹ thuật Ô tô chương trình quốc tế tại Đại học Nam Cần Thơ được xây dựng nhằm đáp ứng nhu cầu nguồn nhân lực chất lượng cao cho lĩnh vực cơ khí ô tô – một ngành công nghiệp then chốt đang phát triển mạnh mẽ tại Việt Nam và trên thế giới.  Sinh viên sẽ được đào tạo toàn diện về kiến t...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp, sinh viên có thể làm việc tại các doanh nghiệp sản xuất và lắp ráp ô tô, trung tâm bảo trì/sửa chữa, công ty công nghệ kỹ thuật ô tô, hoặc tham gia vào các dự án phát triển xe thông minh, xe điện và công nghệ xanh. Ngoài ra, sinh viên có thể học tiếp bậc cao học trong và ngoài nư...`
  },
  {
    id: 'dnc-major-ths_ky_thuat_co_khi_dong_luc',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật cơ khí động lực", "ngành kỹ thuật cơ khí động lực", "học kỹ thuật cơ khí động lực", "8520116"],
    question: 'Thông tin chi tiết ngành Kỹ thuật cơ khí động lực (Mã ngành 8520116) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật cơ khí động lực - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8520116\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** Đang cập nhập

**Mô tả ngành:**
Chương trình đào tạoThạc sĩ ngành Kỹ thuật cơ khí động lựcđịnh hướng ứng dụng giúp học viên có chuyên môn sâu, tư duy khoa học, khả năng phân tích và giải quyết vấn đề, vận dụng kiến thức liên ngành để xử lý các bài toán kỹ thuật trong lĩnh vực động lực và công nghiệp ô tô. Chương trình Thạc sĩ ngàn...

**Cơ hội nghề nghiệp:**
* Nghiên cứu viên và giảng viên về lĩnh vực cơ khí động lực (động cơ, ô tô, máy bay, tàu thủy…) tại các viện nghiên cứu, các trường đại học;  * Chuyên gia hoạch định, phân tích và tư vấn chính sách về các hoạt động liên quan tới lĩnh vực cơ khí động lực; làm việc tại các tập đoàn, tổng công ty, công...`
  },
  {
    id: 'dnc-major-cong_nghe_ky_thuat_co_dien_tu',
    category: 'nganh_hoc',
    keywords: ["công nghệ kỹ thuật cơ điện tử", "ngành công nghệ kỹ thuật cơ điện tử", "học công nghệ kỹ thuật cơ điện tử", "7510203"],
    question: 'Thông tin chi tiết ngành Công nghệ kỹ thuật cơ điện tử (Mã ngành 7510203) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ kỹ thuật cơ điện tử - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7510203\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}]

**Mô tả ngành:**
Công nghệ kỹ thuật Cơ điện tử (Mechatronics Engineering) là ngành học liên ngành kết hợp giữa cơ khí, điện – điện tử, công nghệ thông tin và điều khiển tự động, nhằm thiết kế, chế tạo và vận hành các hệ thống máy móc, thiết bị và dây chuyền sản xuất thông minh.  Ngành Cơ điện tử tập trung vào việc ứ...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp Kỹ sư Công nghệ kỹ thuật Cơ điện tử tại Trường Đại học Nam Cần Thơ (DNC), sinh viên có thể đảm nhận nhiều vị trí quan trọng trong lĩnh vực kỹ thuật, tự động hóa và công nghệ cao.  Kỹ sư Cơ điện tử là chuyên gia liên ngành, có khả năng:  * Thiết kế, phát triển và tích hợp hệ thống ...`
  },
  {
    id: 'dnc-major-cong_nghe_ky_thuat_co_khi',
    category: 'nganh_hoc',
    keywords: ["công nghệ kỹ thuật cơ khí", "ngành công nghệ kỹ thuật cơ khí", "học công nghệ kỹ thuật cơ khí", "7510201"],
    question: 'Thông tin chi tiết ngành Công nghệ kỹ thuật cơ khí (Mã ngành 7510201) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ kỹ thuật cơ khí - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7510201\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Công nghệ Kỹ thuật Cơ khílà lĩnh vực khoa học kỹ thuật quan trọng, chuyên ứng dụng các nguyên lý vật lý, cơ học và khoa học vật liệu để thiết kế, gia công, chế tạo, vận hành và bảo trì máy móc, thiết bị cơ khí trong sản xuất và đời sống. Đây là ngành học nền tảng, đóng vai trò cốt lõi trong qu...

**Cơ hội nghề nghiệp:**
Tốt nghiệp ngànhCông nghệ Kỹ thuật Cơ khítại Trường Đại học Nam Cần Thơ (DNC), sinh viên có thể đảm nhận nhiều vị trí công việc trong lĩnh vực cơ khí, chế tạo, sản xuất, vận hành máy móc và bảo trì thiết bị tại các doanh nghiệp, nhà máy, khu công nghiệp.  Sau khi hoàn thành chương trình đào tạo ngàn...`
  },
  {
    id: 'dnc-major-cong_nghe_thuc_pham',
    category: 'nganh_hoc',
    keywords: ["công nghệ thực phẩm", "ngành công nghệ thực phẩm", "học công nghệ thực phẩm", "7540101"],
    question: 'Thông tin chi tiết ngành Công nghệ thực phẩm (Mã ngành 7540101) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ thực phẩm - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7540101\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}, {'id': 28, 'code': 'X01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}]

**Mô tả ngành:**
Công nghệ Thực phẩmlà ngành học kết hợp giữa khoa học – kỹ thuật – công nghệ nhằm tạo ra các sản phẩm an toàn, chất lượng và giàu dinh dưỡng phục vụ đời sống con người.  Trong bối cảnh người tiêu dùng ngày càng quan tâm đến thực phẩm sạch, an toàn và tốt cho sức khỏe, ngành học này đóng vai trò quan...

**Cơ hội nghề nghiệp:**
Ngành Công nghệ Thực phẩmtại Trường Đại học Nam Cần Thơ mang đến nhiều cơ hội việc làm hấp dẫn trong bối cảnh nhu cầu về thực phẩm sạch – an toàn – chất lượng cao ngày càng gia tăng.  Sau khi tốt nghiệp, sinh viên có thể làm việc trong nhiều lĩnh vực khác nhau của nền công nghiệp hiện đại, từ sản xu...`
  },
  {
    id: 'dnc-major-cong_nghe_ky_thuat_hoa_hoc',
    category: 'nganh_hoc',
    keywords: ["công nghệ kỹ thuật hóa học", "ngành công nghệ kỹ thuật hóa học", "học công nghệ kỹ thuật hóa học", "7510401"],
    question: 'Thông tin chi tiết ngành Công nghệ kỹ thuật hóa học (Mã ngành 7510401) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ kỹ thuật hóa học - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7510401\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}, {'id': 28, 'code': 'X01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}]

**Mô tả ngành:**
Công nghệ Kỹ thuật Hóa họclà ngành học đóng vai trò cầu nối giữa khoa học cơ bản và ứng dụng thực tiễn, tập trung nghiên cứu và vận dụng các nguyên lý hóa học, vật lý và sinh học để thiết kế, vận hành và tối ưu các quy trình sản xuất trong công nghiệp.  Đây là ngành học quan trọng trong bối cảnh phá...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệpngành Công nghệ Kỹ thuật Hóa học, sinh viên có nhiều cơ hội việc làm hấp dẫn trong các lĩnh vực công nghiệp, nghiên cứu và môi trường. Đây là ngành có nhu cầu nhân lực cao, đặc biệt trong bối cảnh phát triển công nghệ xanh và sản xuất bền vững.  * Kỹ sư thiết kế, vận hành và quản l...`
  },
  {
    id: 'dnc-major-logistics_va_quan_ly_chuoi_cung_ung',
    category: 'nganh_hoc',
    keywords: ["logistics và quản lý chuỗi cung ứng", "ngành logistics và quản lý chuỗi cung ứng", "học logistics và quản lý chuỗi cung ứng", "7510605"],
    question: 'Thông tin chi tiết ngành Logistics và quản lý chuỗi cung ứng (Mã ngành 7510605) tại DNC?',
    answer: `### 🎓 **Ngành Logistics và quản lý chuỗi cung ứng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7510605\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}, {'id': 40, 'code': 'X56', 'subject1': 'Toán', 'subject2': 'Tin', 'subject3': 'CN'}]

**Mô tả ngành:**
Logistics và Quản lý Chuỗi Cung ứnglà ngành học nghiên cứu cách tổ chức, quản lý và tối ưu hóa quá trình lưu chuyển hàng hóa, vật tư và dịch vụ từ nơi sản xuất đến tay người tiêu dùng một cách hiệu quả, tiết kiệm chi phí.  Trong bối cảnh hội nhập và thương mại điện tử phát triển mạnh, đây là ngành đ...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Logistics và Quản lý Chuỗi Cung ứngtại Trường Đại học Nam Cần Thơ có cơ hội làm việc trong nhiều lĩnh vực khác nhau của doanh nghiệp, từ vận hành – quản lý – phân tích đến chiến lược.  Đây là ngành có nhu cầu nhân lực cao, đặc biệt trong bối cảnh toàn cầu hóa và thương mại ...`
  },
  {
    id: 'dnc-major-quan_ly_cong_nghiep',
    category: 'nganh_hoc',
    keywords: ["quản lý công nghiệp", "ngành quản lý công nghiệp", "học quản lý công nghiệp", "7510601"],
    question: 'Thông tin chi tiết ngành Quản lý công nghiệp (Mã ngành 7510601) tại DNC?',
    answer: `### 🎓 **Ngành Quản lý công nghiệp - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7510601\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}, {'id': 40, 'code': 'X56', 'subject1': 'Toán', 'subject2': 'Tin', 'subject3': 'CN'}]

**Mô tả ngành:**
Quản lý Công nghiệplà ngành học tập trung nghiên cứu cách tối ưu hóa hoạt động của doanh nghiệp, nhà máy và hệ thống sản xuất, thông qua việc kết hợp giữa quản trị, kinh tế và công nghệ hiện đại.  Đây là ngành học phù hợp với những bạn yêu thích quản lý, phân tích và cải tiến hệ thống vận hành, đặc ...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệpngành Quản lý Công nghiệptại Trường Đại học Nam Cần Thơ, sinh viên có thể làm việc trong nhiều lĩnh vực khác nhau như sản xuất, thương mại và dịch vụ, với quy mô đa dạng từ doanh nghiệp nhỏ đến tập đoàn lớn, cả trong nước và quốc tế.  Đây là ngành học có tính ứng dụng cao, phù hợp ...`
  },
  {
    id: 'dnc-major-cong_nghe_sinh_hoc',
    category: 'nganh_hoc',
    keywords: ["công nghệ sinh học", "ngành công nghệ sinh học", "học công nghệ sinh học", "7420201"],
    question: 'Thông tin chi tiết ngành Công nghệ sinh học (Mã ngành 7420201) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ sinh học - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7420201\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}, {'id': 28, 'code': 'X01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Công nghệ sinh học (Biotechnology)là lĩnh vực ứng dụng các hệ thống sống, vi sinh vật và công nghệ hiện đại để tạo ra sản phẩm phục vụ đời sống. Tại DNC, ngành công nghệ sinh học được đào tạo theo định hướng thực tiễn, ứng dụng mạnh trong các lĩnh vực như y dược, nông nghiệp công nghệ cao, thự...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệp ngànhCông nghệ sinh học tại Trường Đại học Nam Cần Thơcó nhiều cơ hội việc làm trong các lĩnh vực y dược, thực phẩm, nông nghiệp và môi trường.  Sau khi tốt nghiệp, sinh viên có thể đảm nhận các vị trí như giảng viên, nghiên cứu viên tại trường đại học, viện nghiên cứu; chuyên v...`
  },
  {
    id: 'dnc-major-tai_chinh_ngan_hang',
    category: 'nganh_hoc',
    keywords: ["tài chính - ngân hàng", "ngành tài chính - ngân hàng", "học tài chính - ngân hàng", "7340201"],
    question: 'Thông tin chi tiết ngành Tài chính - Ngân hàng (Mã ngành 7340201) tại DNC?',
    answer: `### 🎓 **Ngành Tài chính - Ngân hàng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7340201\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 20, 'code': 'D10', 'subject1': 'Toán', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Tài chính – Ngân hànglà lĩnh vực nghiên cứu và vận hành các hoạt động liên quan đến giao dịch tài chính, lưu thông tiền tệ và hệ thống ngân hàng, phục vụ nhu cầu thanh toán, đầu tư và quản lý tài chính trong nước và quốc tế.  Đây là ngành học có phạm vi rộng, đóng vai trò quan trọng trong việc...

**Cơ hội nghề nghiệp:**
Ngành Tài chính – Ngân hàngmang đến cơ hội việc làm đa dạng và thu nhập hấp dẫn, phù hợp với xu hướng phát triển của nền kinh tế và thị trường tài chính hiện đại.  Sinh viên tốt nghiệp ngành Tài chính – Ngân hàng tại Trường Đại học Nam Cần Thơ (DNC) có thể đảm nhận các vị trí:  ## 1. Làm việc tại ng...`
  },
  {
    id: 'dnc-major-ke_toan',
    category: 'nganh_hoc',
    keywords: ["kế toán", "ngành kế toán", "học kế toán", "7340301"],
    question: 'Thông tin chi tiết ngành Kế toán (Mã ngành 7340301) tại DNC?',
    answer: `### 🎓 **Ngành Kế toán - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7340301\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 20, 'code': 'D10', 'subject1': 'Toán', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhKế toánlà lĩnh vực chuyên thực hiện việc thu thập, xử lý và cung cấp thông tin về tình hình tài chính của doanh nghiệp, tổ chức, cơ sở kinh doanh hoặc cơ quan nhà nước.  Thông qua các hoạt động ghi chép, tổng hợp và phân tích dữ liệu tài chính, kế toán giúp phản ánh chính xác hiệu quả hoạt động...

**Cơ hội nghề nghiệp:**
NgànhKế toánmang đến nhiều cơ hội việc làm đa dạng trong các lĩnh vực tài chính – kinh tế, với nhu cầu tuyển dụng ổn định và lộ trình phát triển nghề nghiệp rõ ràng.  Sinh viên tốt nghiệp ngànhKế toántạiTrường Đại học Nam Cần Thơcó thể đảm nhận nhiều vị trí quan trọng như:  * Kế toán viên: Thực hiện...`
  },
  {
    id: 'dnc-major-kinh_te_so',
    category: 'nganh_hoc',
    keywords: ["kinh tế số", "ngành kinh tế số", "học kinh tế số", "7310109"],
    question: 'Thông tin chi tiết ngành Kinh tế số (Mã ngành 7310109) tại DNC?',
    answer: `### 🎓 **Ngành Kinh tế số - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7310109\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 20, 'code': 'D10', 'subject1': 'Toán', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhKinh tế số (Digital Economy)là lĩnh vực nghiên cứu và ứng dụng các hoạt động kinh tế được vận hành chủ yếu dựa trên công nghệ số, đặc biệt là các giao dịch điện tử thông qua Internet.  Trong nền kinh tế số, dữ liệu và công nghệ trở thành yếu tố cốt lõi, giúp tối ưu hóa hoạt động sản xuất, kinh ...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệp ngànhKinh tế sốtạiTrường Đại học Nam Cần Thơ (DNC)có khả năng làm việc trong nhiều lĩnh vực khác nhau, đặc biệt trong bối cảnh chuyển đổi số và kinh tế số đang phát triển mạnh mẽ.  ## 1. Nghiên cứu và phát triển công nghệ số  * Thực hiện nghiên cứu khoa học trong lĩnh vực kinh t...`
  },
  {
    id: 'dnc-major-thuong_mai_dien_tu',
    category: 'nganh_hoc',
    keywords: ["thương mại điện tử", "ngành thương mại điện tử", "học thương mại điện tử", "7340122"],
    question: 'Thông tin chi tiết ngành Thương mại điện tử (Mã ngành 7340122) tại DNC?',
    answer: `### 🎓 **Ngành Thương mại điện tử - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7340122\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 20, 'code': 'D10', 'subject1': 'Toán', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Thương mại điện tử (E-Commerce)là lĩnh vực kinh doanh dựa trên nền tảng số và Internet, cho phép thực hiện các hoạt động như mua bán, trao đổi hàng hóa và thanh toán trực tuyến một cách nhanh chóng và tiện lợi.  Đây là mô hình kinh doanh hiện đại, giúp doanh nghiệp tiếp cận khách hàng trên phạ...

**Cơ hội nghề nghiệp:**
Tân cử nhânngành Thương mại điện tửtại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm trong bối cảnh kinh doanh online và chuyển đổi số đang phát triển mạnh mẽ.  Sinh viên tốt nghiệp có thể đảm nhận các vai trò:  * Chuyên viên Thương mại điện tử  * Xây dựng và quản trị hệ thống kinh doanh...`
  },
  {
    id: 'dnc-major-quan_he_cong_chung',
    category: 'nganh_hoc',
    keywords: ["quan hệ công chúng (pr)", "ngành quan hệ công chúng (pr)", "học quan hệ công chúng (pr)", "7320108"],
    question: 'Thông tin chi tiết ngành Quan hệ công chúng (PR) (Mã ngành 7320108) tại DNC?',
    answer: `### 🎓 **Ngành Quan hệ công chúng (PR) - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7320108\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 10, 'code': 'C00', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Địa'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 22, 'code': 'D15', 'subject1': 'Văn', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}, {'id': 43, 'code': 'Y07', 'subject1': 'Văn', 'subject2': 'GDKTPL', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Quan hệ công chúng (Public Relations – PR)là lĩnh vực chuyên thực hiện các hoạt động và chiến lược truyền thông nhằm xây dựng, duy trì và phát triển mối quan hệ giữa tổ chức, doanh nghiệp với:  * Khách hàng hiện tại và tiềm năng  * Cộng đồng và công chúng  * Nhà đầu tư và đối tác  * Cơ quan bá...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Quan hệ công chúng (PR)tại Trường Đại học Nam Cần Thơ (DNC) có đủ năng lực làm việc trong nhiều môi trường khác nhau, từ cơ quan nhà nước, tổ chức phi chính phủ đến doanh nghiệp và công ty truyền thông.  ## 1. Môi trường làm việc đa dạng  Cử nhân ngành PR có thể công tác tạ...`
  },
  {
    id: 'dnc-major-truyen_thong_da_phuong_tien',
    category: 'nganh_hoc',
    keywords: ["truyền thông đa phương tiện", "ngành truyền thông đa phương tiện", "học truyền thông đa phương tiện", "7320104"],
    question: 'Thông tin chi tiết ngành Truyền thông đa phương tiện (Mã ngành 7320104) tại DNC?',
    answer: `### 🎓 **Ngành Truyền thông đa phương tiện - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7320104\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 10, 'code': 'C00', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Địa'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 22, 'code': 'D15', 'subject1': 'Văn', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}, {'id': 43, 'code': 'Y07', 'subject1': 'Văn', 'subject2': 'GDKTPL', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Truyền thông đa phương tiện (Multimedia)là lĩnh vực tích hợp giữa truyền thông, công nghệ thông tin, báo chí, marketing và nghệ thuật, nhằm tạo ra các sản phẩm nội dung số sáng tạo phục vụ nhiều mục đích khác nhau.  Đây là ngành học mang tính liên ngành cao, phù hợp với xu hướng phát triển của...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Truyền thông đa phương tiệntại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm trong các lĩnh vực truyền thông, sáng tạo nội dung, thiết kế và công nghệ số.  ## 1. Làm việc trong lĩnh vực báo chí – truyền thông  * Biên tập viên, phóng viên, quản lý nội dung tại bá...`
  },
  {
    id: 'dnc-major-qt_truyen_thong_da_phuong_tien',
    category: 'nganh_hoc',
    keywords: ["truyền thông đa phương tiện", "ngành truyền thông đa phương tiện", "học truyền thông đa phương tiện", "7320104"],
    question: 'Thông tin chi tiết ngành Truyền thông đa phương tiện (Mã ngành 7320104) tại DNC?',
    answer: `### 🎓 **Ngành Truyền thông đa phương tiện - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7320104\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình Quốc tế ngành Truyền thông đa phương tiện tại Đại học Nam Cần Thơ được thiết kế nhằm đào tạo nguồn nhân lực chất lượng cao, có khả năng sáng tạo nội dung, thiết kế đồ họa, sản xuất video và quản lý các dự án truyền thông trong môi trường toàn cầu.  Sinh viên sẽ được trang bị kiến thức c...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệp ngành Truyền thông đa phương tiện chương trình quốc tế có thể làm việc tại các công ty truyền thông, quảng cáo, đài truyền hình, công ty thiết kế đồ họa, công ty sản xuất video, hoặc đảm nhận vai trò quản lý dự án truyền thông ở nhiều lĩnh vực như giáo dục, giải trí, marketing, ...`
  },
  {
    id: 'dnc-major-quan_tri_khach_san',
    category: 'nganh_hoc',
    keywords: ["quản trị khách sạn", "ngành quản trị khách sạn", "học quản trị khách sạn", "7810201"],
    question: 'Thông tin chi tiết ngành Quản trị khách sạn (Mã ngành 7810201) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị khách sạn - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7810201\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 10, 'code': 'C00', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Địa'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 22, 'code': 'D15', 'subject1': 'Văn', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 38, 'code': 'X25', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'GDKTPL'}, {'id': 43, 'code': 'Y07', 'subject1': 'Văn', 'subject2': 'GDKTPL', 'subject3': 'Tin'}]

**Mô tả ngành:**
Quản trị Khách sạnlà ngành học thuộc lĩnh vực dịch vụ – du lịch, chuyên về quản lý, tổ chức và vận hành các hoạt động kinh doanh khách sạn, resort và cơ sở lưu trú nhằm đảm bảo hiệu quả hoạt động và nâng cao trải nghiệm khách hàng.  Ngành học này bao gồm các hoạt động như:  * Quản lý lưu trú, lễ tân...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp Ngành Quản trị Khách sạn tại Trường Đại học Nam Cần Thơ (DNC), sinh viên có thể làm việc trong môi trường khách sạn – resort – nhà hàng – dịch vụ lưu trú cao cấp, với nhiều vị trí từ cơ bản đến quản lý cấp cao.  ## 1. Lễ tân khách sạn (Front Office)  * Tiếp nhận và xử lý cuộc gọi,...`
  },
  {
    id: 'dnc-major-quan_tri_nha_hang_va_dich_vu_an_uong',
    category: 'nganh_hoc',
    keywords: ["quản trị nhà hàng và dịch vụ ăn uống", "ngành quản trị nhà hàng và dịch vụ ăn uống", "học quản trị nhà hàng và dịch vụ ăn uống", "7810202"],
    question: 'Thông tin chi tiết ngành Quản trị nhà hàng và dịch vụ ăn uống (Mã ngành 7810202) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị nhà hàng và dịch vụ ăn uống - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7810202\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 10, 'code': 'C00', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Địa'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 22, 'code': 'D15', 'subject1': 'Văn', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 38, 'code': 'X25', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'GDKTPL'}, {'id': 43, 'code': 'Y07', 'subject1': 'Văn', 'subject2': 'GDKTPL', 'subject3': 'Tin'}]

**Mô tả ngành:**
Quản trị Nhà hàng và Dịch vụ Ăn uốnglà ngành học thuộc lĩnh vực dịch vụ – du lịch – ẩm thực, chuyên đào tạo nguồn nhân lực có khả năng tổ chức, quản lý và vận hành các hoạt động kinh doanh nhà hàng, khách sạn và dịch vụ ăn uống.  Ngành học này tập trung vào việc quản lý toàn diện các hoạt động liên ...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp Ngành Quản trị Nhà hàng và Dịch vụ Ăn uống tại Trường Đại học Nam Cần Thơ, sinh viên có thể làm việc trong lĩnh vực F&B với nhiều vị trí đa dạng, từ vận hành đến quản lý và sáng tạo.  ## 1. Nhóm vị trí quản lý  * Quản lý nhà hàng / chuỗi nhà hàng  * Giám đốc điều hành (F&B Manager...`
  },
  {
    id: 'dnc-major-quan_tri_dich_vu_du_lich_va_lu_hanh',
    category: 'nganh_hoc',
    keywords: ["quản trị dịch vụ du lịch và lữ hành", "ngành quản trị dịch vụ du lịch và lữ hành", "học quản trị dịch vụ du lịch và lữ hành", "7810103"],
    question: 'Thông tin chi tiết ngành Quản trị dịch vụ du lịch và lữ hành (Mã ngành 7810103) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị dịch vụ du lịch và lữ hành - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7810103\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 10, 'code': 'C00', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Địa'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 22, 'code': 'D15', 'subject1': 'Văn', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 38, 'code': 'X25', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'GDKTPL'}, {'id': 43, 'code': 'Y07', 'subject1': 'Văn', 'subject2': 'GDKTPL', 'subject3': 'Tin'}]

**Mô tả ngành:**
Quản trị Dịch vụ Du lịch và Lữ hànhlà ngành học thuộc lĩnh vực dịch vụ – du lịch, chuyên đào tạo nguồn nhân lực có khả năng tổ chức, quản lý, điều hành và kinh doanh các hoạt động du lịch trong nước và quốc tế.  Ngành học này bao gồm toàn bộ quá trình:  * Xây dựng, thiết kế và vận hành chương trình ...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp Ngành Quản trị Dịch vụ Du lịch và Lữ hành tại Trường Đại học Nam Cần Thơ (DNC), sinh viên có thể đảm nhận nhiều vị trí việc làm đa dạng trong lĩnh vực du lịch – dịch vụ – sự kiện, với môi trường làm việc năng động và cơ hội phát triển rộng mở.  * Hướng dẫn viên du lịch:Dẫn dắt và ...`
  },
  {
    id: 'dnc-major-ths_quan_tri_dich_vu_du_lich_lu_hanh',
    category: 'nganh_hoc',
    keywords: ["quản trị dịch vụ du lịch & lữ hành", "ngành quản trị dịch vụ du lịch & lữ hành", "học quản trị dịch vụ du lịch & lữ hành", "8810103"],
    question: 'Thông tin chi tiết ngành Quản trị dịch vụ du lịch & lữ hành (Mã ngành 8810103) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị dịch vụ du lịch & lữ hành - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8810103\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** <ul>
	<li>Tổng quan du lịch</li>
	<li>Quản trị kinh doanh lữ hành</li>
	<li>Điểm trung bình tích luỹ <br class="d-none d-lg-block"/>ở bậc đại học</li>
</ul>

**Mô tả ngành:**
Du lịch ngày nay đã trở thành ngành kinh tế lớn trên thế giới và là ngành   trọng yếu của nhiều quốc gia. Ở Việt Nam, du lịch được xác định là ngành kinh   tế mũi nhọn, đóng vai trò to lớn trong phát triển kinh tế - xã hội của đất   nước. Vì vậy, nhu cầu...

**Cơ hội nghề nghiệp:**
Tốt nghiệp thạc sĩ ngành Quản trị dịch vụ du lịch và lữ hành, học viên có thể đảm nhiệm các công việc sau:  * Giảng viên ở các cơ sở đào tạo du lịch từ trung cấp, cao đẳng đến đại học;  * Nghiên cứu viên tại các cơ sở nghiên cứu về du lịch hoặc có liên quan đến du lịch;  * Cán...`
  },
  {
    id: 'dnc-major-qt_quan_tri_dich_vu_du_lich_va_lu_hanh',
    category: 'nganh_hoc',
    keywords: ["quản trị dịch vụ du lịch & lữ hành", "ngành quản trị dịch vụ du lịch & lữ hành", "học quản trị dịch vụ du lịch & lữ hành", "7810103"],
    question: 'Thông tin chi tiết ngành Quản trị dịch vụ du lịch & lữ hành (Mã ngành 7810103) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị dịch vụ du lịch & lữ hành - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7810103\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Ngành Quản trị dịch vụ du lịch và Lữ hành chương trình quốc tế tại Đại học Nam Cần Thơ được thiết kế nhằm đáp ứng nhu cầu ngày càng cao về nguồn nhân lực chuyên nghiệp trong ngành du lịch, lữ hành, đặc biệt trong bối cảnh hội nhập quốc tế mạnh mẽ.  Sinh viên sẽ được trang bị toàn diện từ kiến thức c...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệp ngành Quản trị dịch vụ du lịch và Lữ hành có thể làm việc tại các công ty du lịch, lữ hành, khách sạn, resort cao cấp, hãng hàng không, tổ chức sự kiện, cơ quan xúc tiến du lịch quốc gia và quốc tế.  Bên cạnh đó, sinh viên có thể đảm nhận các vị trí như điều hành tour, quản lý d...`
  },
  {
    id: 'dnc-major-bat_dong_san',
    category: 'nganh_hoc',
    keywords: ["bất động sản", "ngành bất động sản", "học bất động sản", "7340116"],
    question: 'Thông tin chi tiết ngành Bất động sản (Mã ngành 7340116) tại DNC?',
    answer: `### 🎓 **Ngành Bất động sản - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7340116\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 15, 'code': 'C05', 'subject1': 'Văn', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 16, 'code': 'C08', 'subject1': 'Văn', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 38, 'code': 'X25', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhBất động sảnlà lĩnh vực liên quan đến quản lý, kinh doanh, đầu tư và phát triển các loại tài sản gắn liền với đất đai như: nhà ở, căn hộ, đất nền, khu đô thị, khu công nghiệp, trung tâm thương mại…  Ngành này bao gồm nhiều hoạt động quan trọng như:  * Môi giới và kinh doanh bất động sản  * Định...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp Cử nhânngành Bất động sảntại Trường Đại học Nam Cần Thơ (DNC), sinh viên có thể đảm nhiệm nhiều vị trí việc làm đa dạng trong lĩnh vực kinh doanh, quản lý và đầu tư bất động sản tại Việt Nam.  * Tập đoàn, tổng công ty, doanh nghiệp đầu tư và phát triển bất động sản  * Công ty kinh...`
  },
  {
    id: 'dnc-major-kien_truc',
    category: 'nganh_hoc',
    keywords: ["kiến trúc", "ngành kiến trúc", "học kiến trúc", "7580101"],
    question: 'Thông tin chi tiết ngành Kiến trúc (Mã ngành 7580101) tại DNC?',
    answer: `### 🎓 **Ngành Kiến trúc - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7580101\`
* **Văn bằng tốt nghiệp:** Kiến trúc sư
* **Thời gian đào tạo:** 5 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 26, 'code': 'V00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Vẽ'}, {'id': 27, 'code': 'V01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Vẽ'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 40, 'code': 'X56', 'subject1': 'Toán', 'subject2': 'Tin', 'subject3': 'CN'}]

**Mô tả ngành:**
Ngành Kiến trúclà lĩnh vực mang tính liên ngành và đa ngành, kết hợp giữa nghệ thuật sáng tạo và khoa học kỹ thuật, nhằm thiết kế và xây dựng các công trình phục vụ đời sống con người.  Sinh viênngành Kiến trúckhông chỉ học về thiết kế mà còn nghiên cứu các yếu tố như văn hóa, lịch sử, xã hội, con n...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Kiến trúctại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm trong bối cảnh ngành xây dựng, thiết kế và quy hoạch đô thị ngày càng phát triển mạnh mẽ.  ## 1. Làm việc tại doanh nghiệp thiết kế và xây dựng  * Chuyên viên, kỹ thuật viên thiết kế kiến trúc  * Làm việ...`
  },
  {
    id: 'dnc-major-ky_thuat_xay_dung',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật xây dựng", "ngành kỹ thuật xây dựng", "học kỹ thuật xây dựng", "7580201"],
    question: 'Thông tin chi tiết ngành Kỹ thuật xây dựng (Mã ngành 7580201) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật xây dựng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7580201\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 4, 'code': 'A03', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sử'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Kỹ thuật Xây dựnglà lĩnh vực thuộc khối kỹ thuật, chuyên đào tạo kỹ sư có kiến thức và kỹ năng trong thiết kế, thi công, giám sát, quản lý và bảo trì các công trình xây dựng dân dụng và công nghiệp.  Đây là ngành học giữ vai trò quan trọng trong quá trình phát triển hạ tầng, đô thị hóa và công...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Kỹ thuật Xây dựngtại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm trong bối cảnh nhu cầu phát triển hạ tầng, đô thị và công nghiệp ngày càng tăng cao.  ## 1. Làm việc tại cơ quan nhà nước và quản lý xây dựng  * Nhân viên tại Sở Xây dựng, UBND, phòng kinh tế – h...`
  },
  {
    id: 'dnc-major-quan_ly_dat_dai',
    category: 'nganh_hoc',
    keywords: ["quản lý đất đai", "ngành quản lý đất đai", "học quản lý đất đai", "7850103"],
    question: 'Thông tin chi tiết ngành Quản lý đất đai (Mã ngành 7850103) tại DNC?',
    answer: `### 🎓 **Ngành Quản lý đất đai - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7850103\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Quản lý đất đailà lĩnh vực đào tạo chuyên sâu về quản lý, sử dụng, quy hoạch và khai thác hiệu quả tài nguyên đất nhằm phục vụ phát triển kinh tế – xã hội và bảo vệ môi trường. Đây là ngành học kết hợp giữa khoa học kỹ thuật, kinh tế và pháp luật, giúp đảm bảo việc sử dụng đất đúng quy định, h...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Quản lý Đất đaitại DNC có nhiều cơ hội việc làm hấp dẫn trong khu vực nhà nước và tư nhân, đáp ứng nhu cầu nhân lực ngày càng cao trong bối cảnh đô thị hóa và phát triển bất động sản.  ## Làm việc tại cơ quan nhà nước  * Công tác tại các Bộ, Sở, ban, ngành liên quan đến quả...`
  },
  {
    id: 'dnc-major-quan_ly_tai_nguyen_va_moi_truong',
    category: 'nganh_hoc',
    keywords: ["quản lý tài nguyên và môi trường", "ngành quản lý tài nguyên và môi trường", "học quản lý tài nguyên và môi trường", "7850101"],
    question: 'Thông tin chi tiết ngành Quản lý tài nguyên và môi trường (Mã ngành 7850101) tại DNC?',
    answer: `### 🎓 **Ngành Quản lý tài nguyên và môi trường - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7850101\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Quản lý Tài nguyên và Môi trườnglà lĩnh vực nghiên cứu và ứng dụng tổng hợp các giải pháp kỹ thuật, kinh tế, pháp lý và xã hội nhằm quản lý, khai thác hợp lý tài nguyên thiên nhiên và bảo vệ môi trường sống, hướng đến mục tiêu phát triển bền vững.  Trong bối cảnh biến đổi khí hậu và ô nhiễm mô...

**Cơ hội nghề nghiệp:**
Ngành Quản lý Tài nguyên và Môi trườngtại DNC mở ra nhiều cơ hội việc làm đa dạng trong lĩnh vực quản lý, nghiên cứu và bảo vệ môi trường, đáp ứng nhu cầu nhân lực chất lượng cao trong bối cảnh phát triển bền vững.  ## Vị trí việc làm sau khi tốt nghiệp  * Chuyên viên tại các viện nghiên cứu, cơ qua...`
  },
  {
    id: 'dnc-major-ky_thuat_xay_dung_cong_trinh_giao_thong',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật xây dựng công trình giao thông", "ngành kỹ thuật xây dựng công trình giao thông", "học kỹ thuật xây dựng công trình giao thông", "7580205"],
    question: 'Thông tin chi tiết ngành Kỹ thuật xây dựng công trình giao thông (Mã ngành 7580205) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật xây dựng công trình giao thông - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7580205\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4.5 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 4, 'code': 'A03', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sử'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Kỹ thuật Xây dựng Công trình Giao thôngtại DNC là lĩnh vực đào tạo kỹ sư chuyên thiết kế, thi công và quản lý các công trình hạ tầng giao thông hiện đại như đường bộ, cầu, hầm, sân bay và hệ thống giao thông đô thị.  Trong bối cảnh Việt Nam đẩy mạnh công nghiệp hóa – hiện đại hóa, nhu cầu xây ...

**Cơ hội nghề nghiệp:**
Trong những năm gần đây, khu vực Đồng bằng sông Cửu Long đang bước vào giai đoạn phát triển mạnh mẽ về hạ tầng giao thông, đô thị và logistics. Hàng loạt dự án quy mô lớn như đường cao tốc, cầu trọng điểm, hệ thống giao thông liên vùng và hạ tầng ven biển liên tục được triển khai, tạo ra nhu cầu rất...`
  },
  {
    id: 'dnc-major-quan_ly_xay_dung',
    category: 'nganh_hoc',
    keywords: ["quản lý xây dựng", "ngành quản lý xây dựng", "học quản lý xây dựng", "7580302"],
    question: 'Thông tin chi tiết ngành Quản lý xây dựng (Mã ngành 7580302) tại DNC?',
    answer: `### 🎓 **Ngành Quản lý xây dựng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7580302\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 4, 'code': 'A03', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sử'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Quản lý Xây dựnglà ngành học thuộc khối kỹ thuật – kinh tế, chuyên đào tạo nguồn nhân lực có kiến thức và kỹ năng trong quản lý, điều hành và giám sát các dự án xây dựng từ giai đoạn lập kế hoạch đến thi công và hoàn thiện công trình.  Trong bối cảnh ngành xây dựng phát triển mạnh mẽ cùng với ...

**Cơ hội nghề nghiệp:**
Ngành Quản lý Xây dựngtại Trường Đại học Nam Cần Thơ (DNC) mang đến cơ hội việc làm rộng mở và đa dạng, đặc biệt trong bối cảnh nhu cầu phát triển hạ tầng, đô thị và đầu tư xây dựng ngày càng gia tăng.  Sinh viên sau khi tốt nghiệp có thể làm việc tại:  * Công ty tư vấn – thiết kế xây dựng  * Doanh ...`
  },
  {
    id: 'dnc-major-qt_ky_thuat_xay_dung',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật xây dựng", "ngành kỹ thuật xây dựng", "học kỹ thuật xây dựng", "7580201"],
    question: 'Thông tin chi tiết ngành Kỹ thuật xây dựng (Mã ngành 7580201) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật xây dựng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7580201\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 4, 'code': 'A03', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sử'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Kỹ thuật xây dựng chương trình quốc tế được thiết kế nhằm đào tạo kỹ sư xây dựng chất lượng cao, đáp ứng yêu cầu phát triển cơ sở hạ tầng hiện đại trong nước và quốc tế.  Sinh viên sẽ hiểu sâu hơn về kiến thức tích hợp giữa kỹ thuật xây dựng truyền thống với các xu hướng mới như công trình xan...

**Cơ hội nghề nghiệp:**
Tốt nghiệp ngành Kỹ thuật xây dựng, sinh viên có thể làm việc tại các công ty xây dựng, tư vấn thiết kế, giám sát công trình, nhà thầu quốc tế hoặc các tổ chức chuyên môn trong lĩnh vực cơ sở hạ tầng, giao thông, công nghiệp và dân dụng.  Ngoài ra, sinh viên có thể đảm nhận các vai trò như kỹ sư kết...`
  },
  {
    id: 'dnc-major-thiet_ke_do_hoa',
    category: 'nganh_hoc',
    keywords: ["thiết kế đồ họa", "ngành thiết kế đồ họa", "học thiết kế đồ họa", "7210403"],
    question: 'Thông tin chi tiết ngành Thiết kế đồ họa (Mã ngành 7210403) tại DNC?',
    answer: `### 🎓 **Ngành Thiết kế đồ họa - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7210403\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 26, 'code': 'V00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Vẽ'}, {'id': 27, 'code': 'V01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Vẽ'}]

**Mô tả ngành:**
Ngành Thiết kế đồ họa (Graphic Design)là ngành học thuộc lĩnh vực mỹ thuật ứng dụng và công nghiệp sáng tạo, tập trung nghiên cứu và triển khai các nguyên lý thiết kế thị giác (visual design) nhằm truyền tải thông điệp và xây dựng nhận diện thương hiệu thông qua hình ảnh, màu sắc, typography và các ...

**Cơ hội nghề nghiệp:**
Trong bối cảnh chuyển đổi số và phát triển kinh tế sáng tạo, nhu cầu về nguồn nhân lựcngành Thiết kế đồ họatại Việt Nam nói chung và khu vực Đồng bằng sông Cửu Long nói riêng đang gia tăng mạnh mẽ. Các doanh nghiệp ngày càng chú trọng xây dựng thương hiệu, thiết kế truyền thông và phát triển nội dun...`
  },
  {
    id: 'dnc-major-do_thi_thong_minh',
    category: 'nganh_hoc',
    keywords: ["đô thị thông minh", "ngành đô thị thông minh", "học đô thị thông minh", "7580302 - 01"],
    question: 'Thông tin chi tiết ngành Đô thị thông minh (Mã ngành 7580302 - 01) tại DNC?',
    answer: `### 🎓 **Ngành Đô thị thông minh - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7580302 - 01\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 4, 'code': 'A03', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sử'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Chương trình đào tạo Kỹ sưQuản lý xây dựng – chuyên ngành Đô thị thông minh (Smart City)tại Trường Đại học Nam Cần Thơ được xây dựng theo định hướng liên ngành – ứng dụng – gắn với chuyển đổi số, nhằm đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực quản lý xây dựng và phát triển đô thị hiện đại...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp chương trình Kỹ sưQuản lý xây dựng – chuyên ngành Đô thị thông minhtại Trường Đại học Nam Cần Thơ (DNC), sinh viên có thể làm việc trong nhiều lĩnh vực thuộc xây dựng, quản lý dự án, phát triển đô thị và công nghệ đô thị thông minh (smart city).  Sinh viên tốt nghiệpngành Quản lý ...`
  },
  {
    id: 'dnc-major-duong_sat_toc_do_cao_va_duong_sat_do_thi',
    category: 'nganh_hoc',
    keywords: ["đường sắt tốc độ cao và đường sắt đô thị", "ngành đường sắt tốc độ cao và đường sắt đô thị", "học đường sắt tốc độ cao và đường sắt đô thị", "7580205-01"],
    question: 'Thông tin chi tiết ngành Đường sắt tốc độ cao và đường sắt đô thị (Mã ngành 7580205-01) tại DNC?',
    answer: `### 🎓 **Ngành Đường sắt tốc độ cao và đường sắt đô thị - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7580205-01\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4.5 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 4, 'code': 'A03', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sử'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 29, 'code': 'X02', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Tin'}, {'id': 30, 'code': 'X05', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Chương trình đào tạoKỹ thuật xây dựng công trình giao thông – chuyên ngành Kỹ thuật xây dựng đường sắt tốc độ cao và đường sắt đô thịtại Trường Đại học Nam Cần Thơ được xây dựng theo định hướng hiện đại – ứng dụng – hội nhập quốc tế, nhằm đáp ứng nhu cầu cấp thiết về nguồn nhân lực kỹ thuật chất lượ...

**Cơ hội nghề nghiệp:**
Trong chiến lược phát triển hạ tầng giao thông Việt Nam, lĩnh vực đường sắt hiện đại và đường sắt tốc độ cao đang được ưu tiên đầu tư mạnh mẽ. Nổi bật là dự án đường sắt tốc độ cao Bắc – Nam với chiều dài khoảng 1.541 km, kết nối Hà Nội – TP. Hồ Chí Minh, dự kiến khởi công từ năm 2026 với tốc độ thi...`
  },
  {
    id: 'dnc-major-ths_ky_thuat_xay_dung',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật xây dựng", "ngành kỹ thuật xây dựng", "học kỹ thuật xây dựng", "8580201"],
    question: 'Thông tin chi tiết ngành Kỹ thuật xây dựng (Mã ngành 8580201) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật xây dựng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8580201\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** Đang cập nhập

**Mô tả ngành:**
Chương trình đào tạo Thạc sĩ ngànhKỹ thuật xây dựngtại Trường Đại học Nam Cần Thơ nhằm đào tạo học viên có kiến thức chuyên môn sâu và kỹ năng nghề nghiệp vững vàng, có năng lực làm việc độc lập, sáng tạo, tư duy đổi mới và khởi nghiệp trong lĩnh vựcKỹ thuật xây dựng. Học viên có khả năng phát hiện ...

**Cơ hội nghề nghiệp:**
* Tham gia thi công công trình xây dựng dân dụng và công nghiệp, lập kế hoạch, thiết kế thi công, quản lý và triển khai các dự ánKỹ thuật xây dựngquy mô lớn, phức tạp.  * Làm việc trong lĩnh vực giao thông vận tải, tham gia thiết kế cầu, đường, công trình giao thông và kết cấu hạ tầng đô thị.  * Tha...`
  },
  {
    id: 'dnc-major-ths_tai_chinh_ngan_hang',
    category: 'nganh_hoc',
    keywords: ["tài chính - ngân hàng", "ngành tài chính - ngân hàng", "học tài chính - ngân hàng", "8340201"],
    question: 'Thông tin chi tiết ngành Tài chính - Ngân hàng (Mã ngành 8340201) tại DNC?',
    answer: `### 🎓 **Ngành Tài chính - Ngân hàng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8340201\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** Đang cập nhập

**Mô tả ngành:**
Chương trình đào tạo Thạc sĩTài chính – Ngân hàngtại Trường Đại học Nam Cần Thơ theo định hướng ứng dụng nhằm đào tạo học viên có phẩm chất nghề nghiệp, kiến thức chuyên sâu và tư duy phân tích hiện đại trong lĩnh vựctài chính – ngân hàng. Người học có khả năng vận dụng lý thuyết, công cụ và dữ liệu...

**Cơ hội nghề nghiệp:**
* Chuyên viên, chuyên gia phân tích tài chính, tín dụng, đầu tư và quản trị rủi ro tại các ngân hàng, tổ chức tài chính và doanh nghiệp.  * Chuyên viên tư vấn tài chính, thẩm định, định giá doanh nghiệp và quản trị tài chính doanh nghiệp.  * Khởi nghiệp trong lĩnh vựcTài chính – Ngân hàng, đầu tư tà...`
  },
  {
    id: 'dnc-major-ths_cong_nghe_thuc_pham',
    category: 'nganh_hoc',
    keywords: ["công nghệ thực phẩm", "ngành công nghệ thực phẩm", "học công nghệ thực phẩm", "8540101"],
    question: 'Thông tin chi tiết ngành Công nghệ thực phẩm (Mã ngành 8540101) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ thực phẩm - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8540101\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** Đang cập nhập

**Mô tả ngành:**
Chương trình đào tạo ngành Thạc sĩCông nghệ thực phẩmtại Trường Đại học Nam Cần Thơ nhằm đào tạo học viên có kiến thức chuyên sâu, kỹ năng nghiên cứu và ứng dụng, phẩm chất chính trị, đạo đức, tác phong nghề nghiệp và sức khỏe tốt để có thể làm việc hiệu quả trong các lĩnh vực liên quan đếncông nghệ...

**Cơ hội nghề nghiệp:**
* Chuyên viên vận hành và kiểm nghiệm trong các nhà máy, cơ sở sản xuất và doanh nghiệp thực phẩm (quản lý sản xuất, giám sát công nghệ, vận hành dây chuyền công nghệ, nghiên cứu cải tiến sản xuất).  * Chuyên viên quản lý hệ thống quản lý, đảm bảo chất lượng và an toàn thực phẩm.  * Khởi nghiệp tron...`
  },
  {
    id: 'dnc-major-ths_kien_truc',
    category: 'nganh_hoc',
    keywords: ["kiến trúc", "ngành kiến trúc", "học kiến trúc", "8580101"],
    question: 'Thông tin chi tiết ngành Kiến trúc (Mã ngành 8580101) tại DNC?',
    answer: `### 🎓 **Ngành Kiến trúc - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8580101\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** Đang cập nhập

**Mô tả ngành:**
Chương trình đào tạo Thạc sĩ ngànhKiến trúctại Trường Đại học Nam Cần Thơ được xây dựng nhằm cung cấp cho người học chương trình đào tạo sau đại học chất lượng cao, làm nền tảng cho nghiên cứu lý luận và hành nghề kiến trúc trong bối cảnh Việt Nam. Người học sau khi tốt nghiệp có khả năng vận dụng k...

**Cơ hội nghề nghiệp:**
* Đảm nhận các vị trí lãnh đạo, quản lý tại các công ty, doanh nghiệp, đơn vị hành chính sự nghiệp nhà nước hoặc tư nhân trong lĩnh vựcKiến trúcvà xây dựng.  * Hành nghề tư vấn, thiết kếKiến trúctại các công ty, đơn vị tư vấn thuộc lĩnh vựcKiến trúcvà xây dựng.  * Tham gia giảng dạy, đào tạo ngànhKi...`
  },
  {
    id: 'dnc-major-duoc_hoc',
    category: 'nganh_hoc',
    keywords: ["dược học", "ngành dược học", "học dược học", "7720201"],
    question: 'Thông tin chi tiết ngành Dược học (Mã ngành 7720201) tại DNC?',
    answer: `### 🎓 **Ngành Dược học - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720201\`
* **Văn bằng tốt nghiệp:** Dược sĩ
* **Thời gian đào tạo:** 5 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}]

**Mô tả ngành:**
NgànhDược họclà lĩnh vực thuộc khoa học sức khỏe, chuyên nghiên cứu về thuốc và cách sử dụng thuốc nhằm bảo vệ, chăm sóc và nâng cao sức khỏe con người.  Chương trình đào tạo ngànhDược họctạiTrường Đại học Nam Cần Thơđược xây dựng theo định hướng hiện đại – thực tiễn – ứng dụng, nhằm phát triển toàn...

**Cơ hội nghề nghiệp:**
NgànhDược họclà một trong những lĩnh vực trọng yếu trong hệ thống chăm sóc sức khỏe cộng đồng, gắn liền với các hoạt động nghiên cứu, sản xuất, kiểm nghiệm, phân phối và hướng dẫn sử dụng thuốc an toàn, hợp lý.  Trong bối cảnh xã hội ngày càng quan tâm đến sức khỏe và nhu cầu sử dụng dược phẩm không...`
  },
  {
    id: 'dnc-major-ngon_ngu_anh',
    category: 'nganh_hoc',
    keywords: ["ngôn ngữ anh", "ngành ngôn ngữ anh", "học ngôn ngữ anh", "7220201"],
    question: 'Thông tin chi tiết ngành Ngôn ngữ anh (Mã ngành 7220201) tại DNC?',
    answer: `### 🎓 **Ngành Ngôn ngữ anh - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7220201\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 22, 'code': 'D15', 'subject1': 'Văn', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 38, 'code': 'X25', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}, {'id': 42, 'code': 'X78', 'subject1': 'Văn', 'subject2': 'GDKTPL', 'subject3': 'Anh'}]

**Mô tả ngành:**
Ngành Ngôn ngữ Anhlà ngành học chuyên sâu về tiếng Anh – ngôn ngữ quốc tế phổ biến nhất hiện nay, đóng vai trò quan trọng trong học tập, làm việc và giao lưu văn hóa toàn cầu. Đây được xem là “chìa khóa vàng” giúp người học tiếp cận tri thức, mở rộng cơ hội nghề nghiệp và hội nhập quốc tế trong thời...

**Cơ hội nghề nghiệp:**
Tiếng Anh là ngôn ngữ toàn cầu, được sử dụng trong hầu hết các lĩnh vực từ kinh doanh, giáo dục, du lịch đến truyền thông, công nghệ. Vì vậy, Cử nhânNgôn ngữ Anhluôn là một trong những nhóm nhân lực được săn đón nhất trong thời kỳ hội nhập quốc tế.  Với nền tảng kiến thức vững chắc và kỹ năng sử dụn...`
  },
  {
    id: 'dnc-major-cong_nghe_thong_tin',
    category: 'nganh_hoc',
    keywords: ["công nghệ thông tin", "ngành công nghệ thông tin", "học công nghệ thông tin", "7480201"],
    question: 'Thông tin chi tiết ngành Công nghệ thông tin (Mã ngành 7480201) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ thông tin - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7480201\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}, {'id': 38, 'code': 'X25', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Công nghệ thông tin (Information Technology – IT)là lĩnh vực kỹ thuật ứng dụng máy tính, phần mềm và mạng Internet để thu thập, xử lý, lưu trữ, bảo mật và truyền tải thông tin trong mọi hoạt động của đời sống xã hội.  Trong thời đại chuyển đổi số và kinh tế số,Công nghệ thông tingiữ vai trò cố...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệpKỹ sư Công nghệ thông tintại Trường Đại học Nam Cần Thơ (DNC), sinh viên có nhiều cơ hội việc làm đa dạng trong bối cảnh chuyển đổi số và phát triển kinh tế số.  ## 1. Nhân viên IT – Quản trị hệ thống & hỗ trợ kỹ thuật  Sinh viên có thể làm việc tại các doanh nghiệp, tổ chức, cơ qu...`
  },
  {
    id: 'dnc-major-ky_thuat_phan_mem',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật phần mềm", "ngành kỹ thuật phần mềm", "học kỹ thuật phần mềm", "7480103"],
    question: 'Thông tin chi tiết ngành Kỹ thuật phần mềm (Mã ngành 7480103) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật phần mềm - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7480103\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhKỹ thuật phần mềm (Software Engineering)là lĩnh vực thuộc công nghệ thông tin, chuyên nghiên cứu, thiết kế, phát triển và bảo trì các phần mềm, ứng dụng và hệ thống công nghệ phục vụ hoạt động quản lý, vận hành và kinh doanh của doanh nghiệp, tổ chức trong thời đại số.  Khác với lập trình đơn t...

**Cơ hội nghề nghiệp:**
NgànhKỹ thuật phần mềm (Software Engineering)mang đến cơ hội việc làm rộng mở trong nhiều lĩnh vực, đặc biệt trong bối cảnh công nghệ thông tin và chuyển đổi số đang phát triển mạnh mẽ.  Sinh viên Kỹ thuật phần mềm DNC sau khi tốt nghiệp có thể làm việc tại:  * Công ty phát triển phần mềm, thiết kế ...`
  },
  {
    id: 'dnc-major-khoa_hoc_may_tinh',
    category: 'nganh_hoc',
    keywords: ["khoa học máy tính", "ngành khoa học máy tính", "học khoa học máy tính", "7480101"],
    question: 'Thông tin chi tiết ngành Khoa học máy tính (Mã ngành 7480101) tại DNC?',
    answer: `### 🎓 **Ngành Khoa học máy tính - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7480101\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}]

**Mô tả ngành:**
NgànhKhoa học Máy tính (Computer Science)là lĩnh vực nghiên cứu về các hệ thống tính toán thông minh, nguyên lý hoạt động của máy tính và các thuật toán xử lý dữ liệu. Ngành học này tập trung vào việc phát triển công nghệ mới, tối ưu hiệu suất hệ thống và cải thiện sự tương tác giữa con người với má...

**Cơ hội nghề nghiệp:**
Sau khi hoàn thành chương trình đào tạo ngànhKhoa học Máy tính (Computer Science), sinh viên được trang bị đầy đủ kiến thức và kỹ năng để làm việc trong nhiều lĩnh vực công nghệ cao, đặc biệt là các lĩnh vực liên quan đến trí tuệ nhân tạo (AI), hệ thống thông minh và công nghệ mới.  Sinh viên ngànhK...`
  },
  {
    id: 'dnc-major-mang_may_tinh_va_truyen_thong_du_lieu',
    category: 'nganh_hoc',
    keywords: ["mạng máy tính và truyền thông dữ liệu", "ngành mạng máy tính và truyền thông dữ liệu", "học mạng máy tính và truyền thông dữ liệu", "7480102"],
    question: 'Thông tin chi tiết ngành Mạng máy tính và truyền thông dữ liệu (Mã ngành 7480102) tại DNC?',
    answer: `### 🎓 **Ngành Mạng máy tính và truyền thông dữ liệu - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7480102\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhMạng máy tính và Truyền thông dữ liệu(Computer Networks and Data Communications) là lĩnh vực thuộc công nghệ thông tin, tập trung vào việc kết nối, truyền tải và xử lý dữ liệu giữa các thiết bị thông qua hệ thống mạng.  Sinh viên theo học ngành này sẽ được tìm hiểu về cách các hệ thống mạng hoạ...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp ngành Mạng máy tính và Truyền thông dữ liệu, sinh viênTrường Đại học Nam Cần Thơcó nhiều cơ hội việc làm đa dạng trong lĩnh vực công nghệ thông tin, đặc biệt trong bối cảnh chuyển đổi số diễn ra mạnh mẽ.  Cụ thể, sinh viên có thể đảm nhận các vị trí như:  * Kỹ sư mạng, quản trị hệ...`
  },
  {
    id: 'dnc-major-cong_nghe_ky_thuat_ban_dan',
    category: 'nganh_hoc',
    keywords: ["công nghệ kỹ thuật bán dẫn", "ngành công nghệ kỹ thuật bán dẫn", "học công nghệ kỹ thuật bán dẫn", "7480101."],
    question: 'Thông tin chi tiết ngành Công nghệ kỹ thuật bán dẫn (Mã ngành 7480101.) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ kỹ thuật bán dẫn - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7480101.\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}, {'id': 38, 'code': 'X25', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Công nghiệp kỹ thuật bán dẫn (Semiconductor Engineering)là lĩnh vực đào tạo chuyên sâu về thiết kế, chế tạo và kiểm thử vi mạch (IC – Integrated Circuit), đóng vai trò nền tảng trong sự phát triển của công nghệ số, trí tuệ nhân tạo (AI), IoT và điện tử thông minh.  Trong bối cảnh toàn cầu đang...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệpngành Công nghệ kỹ thuật bán dẫntại Trường Đại học Nam Cần Thơ (DNC), sinh viên có nhiều cơ hội làm việc trong lĩnh vực thiết kế vi mạch, sản xuất chip và công nghệ cao – một trong những ngành đang “khát” nhân lực toàn cầu.  ## 1. Kỹ sư bán dẫn – Thiết kế, sản xuất & kiểm định chip...`
  },
  {
    id: 'dnc-major-cong_nghe_ky_thuat_dien_dien_tu',
    category: 'nganh_hoc',
    keywords: ["công nghệ kỹ thuật điện, điện tử", "ngành công nghệ kỹ thuật điện, điện tử", "học công nghệ kỹ thuật điện, điện tử", "7510301"],
    question: 'Thông tin chi tiết ngành Công nghệ kỹ thuật điện, điện tử (Mã ngành 7510301) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ kỹ thuật điện, điện tử - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7510301\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 28, 'code': 'X01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'GDKTPL'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhCông nghệ Kỹ thuật Điện – Điện tửlà lĩnh vực đào tạo kỹ sư có kiến thức và kỹ năng chuyên môn về hệ thống điện, thiết bị điện, điện tử và các ứng dụng công nghệ trong công nghiệp và đời sống.  Chương trình học tập trung vào việc nghiên cứu, thiết kế, vận hành và bảo trì các hệ thống điện và điệ...

**Cơ hội nghề nghiệp:**
## Cơ hội nghề nghiệp lĩnh vực chip bán dẫn và công nghệ điện – điện tử  Trong bối cảnh ngành công nghiệp bán dẫn đang phát triển mạnh mẽ trên toàn cầu, sinh viên tốt nghiệp ngànhCông nghệ Kỹ thuật Điện – Điện tửtạiTrường Đại học Nam Cần Thơcó nhiều cơ hội việc làm hấp dẫn trong lĩnh vực thiết kế và...`
  },
  {
    id: 'dnc-major-ths_cong_nghe_thong_tin',
    category: 'nganh_hoc',
    keywords: ["công nghệ thông tin", "ngành công nghệ thông tin", "học công nghệ thông tin", "8480201"],
    question: 'Thông tin chi tiết ngành Công nghệ thông tin (Mã ngành 8480201) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ thông tin - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8480201\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** <ul>
	<li>Lập trình căn bản</li>
	<li>Toán rời rạc 1</li>
	<li>Điểm trung bình tích luỹ <br class="d-none d-lg-block"/>ở bậc đại học</li>
</ul>

**Mô tả ngành:**
Chương trình Công nghệ thông tin (CNTT) trình độ thạc sĩ đào tạo nguồn nhân   lực cao cấp đứng đầu trong nhóm phân tích, tư vấn, thiết kế, phát triển và   triển khai các giải pháp Công nghệ thông tin (bao gồm xây dựng hạ tầng, cung   cấp dịch vụ và phát triển ứng dụng Công nghệ thông tin) và vận ...

**Cơ hội nghề nghiệp:**
* Cơ hội nghề nghiệp mở rộng cả trong nước và các công ty quốc tế, có nhiều cơ hội thăng tiến trong sự nghiệp, có thể đảm nhận các vị trí chịu trách nhiệm cao tại các tổ chức, công ty.  * Có thể trở thành cố vấn cao cấp hoặc trực tiếp điều hành, hướng dẫn hoặc trực tiếp thực hiện các công việc thiết...`
  },
  {
    id: 'dnc-major-tri_tue_nhan_tao',
    category: 'nganh_hoc',
    keywords: ["trí tuệ nhân tạo", "ngành trí tuệ nhân tạo", "học trí tuệ nhân tạo", "7480107"],
    question: 'Thông tin chi tiết ngành Trí tuệ nhân tạo (Mã ngành 7480107) tại DNC?',
    answer: `### 🎓 **Ngành Trí tuệ nhân tạo - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7480107\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}, {'id': 38, 'code': 'X25', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Trí tuệ nhân tạo (Artificial Intelligence – AI)là ngành nghiên cứu và phát triển các hệ thống thông minh có khả năng học hỏi, suy luận, thích nghi và tự động ra quyết định, mô phỏng trí tuệ của con người.  Ngành AI tập trung vào việc xây dựng các mô hình và thuật toán tiên tiến như:  * Machine Learn...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệpngành Trí tuệ nhân tạotại Trường Đại học Nam Cần Thơ (DNC), sinh viên có thể đảm nhiệm nhiều vị trí quan trọng trong lĩnh vực công nghệ cao, dữ liệu và chuyển đổi số, với nhu cầu nhân lực ngày càng tăng mạnh trên toàn cầu.  ## 1. Kỹ sư AI/ML (AI Engineer / Machine Learning Engineer...`
  },
  {
    id: 'dnc-major-qt_cong_nghe_thong_tin',
    category: 'nganh_hoc',
    keywords: ["công nghệ thông tin", "ngành công nghệ thông tin", "học công nghệ thông tin", "7480201"],
    question: 'Thông tin chi tiết ngành Công nghệ thông tin (Mã ngành 7480201) tại DNC?',
    answer: `### 🎓 **Ngành Công nghệ thông tin - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7480201\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình Công nghệ thông tin quốc tế tại Trường Đại học Nam Cần Thơ đào tạo bằng tiếng Anh, trang bị cho sinh viên nền tảng vững chắc về lập trình, thuật toán, phát triển phần mềm, hệ thống mạng, bảo mật thông tin và ứng dụng công nghệ mới trong thời đại số. Sinh viên không chỉ học kiến thức chu...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệp chương trình quốc tế ngành Công nghệ Thông tin có thể làm việc tại các công ty phần mềm, tập đoàn công nghệ đa quốc gia, startup, trung tâm dữ liệu, hoặc tổ chức nghiên cứu trong nước và quốc tế. Các vị trí có thể đảm nhận gồm: Kỹ sư phần mềm, Lập trình viên, Chuyên viên AI/Data...`
  },
  {
    id: 'dnc-major-an_toan_thong_tin',
    category: 'nganh_hoc',
    keywords: ["an toàn thông tin", "ngành an toàn thông tin", "học an toàn thông tin", "7480202"],
    question: 'Thông tin chi tiết ngành An toàn thông tin (Mã ngành 7480202) tại DNC?',
    answer: `### 🎓 **Ngành An toàn thông tin - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7480202\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 11, 'code': 'C01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Lí'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}, {'id': 38, 'code': 'X25', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhAn toàn thông tin (Information Security)là lĩnh vực bảo vệ dữ liệu và hệ thống trước các nguy cơ tấn công mạng, rò rỉ thông tin. Ngành tập trung đảm bảo bảo mật dữ liệu, tính toàn vẹn và khả năng sẵn sàng của hệ thống thông tin thông qua các giải pháp kỹ thuật và quản lý hiện đại...

**Cơ hội nghề nghiệp:**
Tốt nghiệp ngànhAn toàn thông tintại Trường Đại học Nam Cần Thơ (DNC), sinh viên được trang bị kiến thức chuyên sâu và kỹ năng thực hành vững chắc trong lĩnh vực an ninh mạng, bảo mật hệ thống, bảo vệ dữ liệu và phòng chống các nguy cơ tấn công mạng, mở ra nhiều cơ hội nghề nghiệp hấp dẫn tại các do...`
  },
  {
    id: 'dnc-major-quan_tri_kinh_doanh',
    category: 'nganh_hoc',
    keywords: ["quản trị kinh doanh", "ngành quản trị kinh doanh", "học quản trị kinh doanh", "7340101"],
    question: 'Thông tin chi tiết ngành Quản trị kinh doanh (Mã ngành 7340101) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị kinh doanh - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7340101\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 20, 'code': 'D10', 'subject1': 'Toán', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Quản trị kinh doanh (Business Administration)là lĩnh vực đào tạo kiến thức và kỹ năng về quản lý, điều hành và phát triển doanh nghiệp trong môi trường kinh tế hiện đại.  Đây là một trong những ngành học phổ biến và đa dạng nhất, đóng vai trò quan trọng trong việc đào tạo nhà quản lý, nhà lãnh...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Quản trị kinh doanhtại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm trong đa dạng lĩnh vực, phù hợp với xu hướng phát triển kinh tế và hội nhập hiện nay.  ## 1. Môi trường làm việc đa dạng  Cử nhân ngành Quản trị kinh doanh có thể làm việc tại:  * Doanh nghiệp ...`
  },
  {
    id: 'dnc-major-marketing',
    category: 'nganh_hoc',
    keywords: ["marketing", "ngành marketing", "học marketing", "7340115"],
    question: 'Thông tin chi tiết ngành Marketing (Mã ngành 7340115) tại DNC?',
    answer: `### 🎓 **Ngành Marketing - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7340115\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 20, 'code': 'D10', 'subject1': 'Toán', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Marketinglà lĩnh vực nghiên cứu và triển khai các hoạt động nhằm kết nối doanh nghiệp với khách hàng, thông qua việc nghiên cứu thị trường, xây dựng chiến lược và quảng bá sản phẩm/dịch vụ.  Trong bối cảnh chuyển đổi số, Marketing không chỉ dừng lại ở quảng cáo truyền thống mà còn mở rộng sang...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Marketingtại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm trong bối cảnh kinh tế số và truyền thông số phát triển mạnh mẽ.  ## 1. Các vị trí công việc phổ biến  Cử nhân ngành Marketing có thể đảm nhận các vị trí:  * Chuyên viên quản trị thương hiệu (Branding)  ...`
  },
  {
    id: 'dnc-major-kinh_doanh_quoc_te',
    category: 'nganh_hoc',
    keywords: ["kinh doanh quốc tế", "ngành kinh doanh quốc tế", "học kinh doanh quốc tế", "7340120"],
    question: 'Thông tin chi tiết ngành Kinh doanh quốc tế (Mã ngành 7340120) tại DNC?',
    answer: `### 🎓 **Ngành Kinh doanh quốc tế - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7340120\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 20, 'code': 'D10', 'subject1': 'Toán', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Kinh doanh quốc tế (International Business)là lĩnh vực nghiên cứu và thực hành các hoạt động kinh doanh, thương mại, đầu tư và hợp tác kinh tế vượt ra khỏi phạm vi một quốc gia, diễn ra trên thị trường toàn cầu.  Ngành học này tập trung vào:  * Xuất nhập khẩu hàng hóa và dịch vụ giữa các quốc ...

**Cơ hội nghề nghiệp:**
Trong bối cảnh toàn cầu hóa và hội nhập quốc tế,ngành Kinh doanh quốc tếtại Trường Đại học Nam Cần Thơ (DNC) mở ra cơ hội nghề nghiệp đa dạng, môi trường làm việc năng động và tiềm năng phát triển toàn cầu.  ## 1. Môi trường làm việc đa dạng  Sinh viên tốt nghiệp ngành Kinh doanh quốc tế có thể làm ...`
  },
  {
    id: 'dnc-major-ths_quan_tri_kinh_doanh',
    category: 'nganh_hoc',
    keywords: ["quản trị kinh doanh", "ngành quản trị kinh doanh", "học quản trị kinh doanh", "8340101"],
    question: 'Thông tin chi tiết ngành Quản trị kinh doanh (Mã ngành 8340101) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị kinh doanh - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8340101\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** <ul>
	<li>Kinh tế học</li>
	<li>Quản trị học</li>
	<li>Điểm trung bình tích luỹ <br class="d-none d-lg-block"/>ở bậc đại học</li>
</ul>

**Mô tả ngành:**
Chương trình Thạc sĩ Quản trị kinh doanh được thiết kế để trang bị cho người học kiến thức và kỹ năng quản lý hiện đại cần thiết, đồng thời chuẩn bị cho người học một tinh thần dám nghĩ dám làm dựa trên các thực tiễn kinh doanh vững chắc. Chương trình cũng cung cấp cho người học khả năng phân tích v...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp thạc sĩ chuyên ngành Quản trị kinh doanh tại Trường Đại học Nam Cần Thơ, học viên có đủ năng lực chuyên môn để đảm nhiệm những công việc sau:  * Quản trị các hoạt động kinh doanh của một doanh nghiệp hoặc một bộ phận, một lĩnh vực doanh nghiệp;  * Trưởng thành nhanh, có thể đảm nh...`
  },
  {
    id: 'dnc-major-ts_quan_tri_kinh_doanh',
    category: 'nganh_hoc',
    keywords: ["quản trị kinh doanh", "ngành quản trị kinh doanh", "học quản trị kinh doanh", "9340101"],
    question: 'Thông tin chi tiết ngành Quản trị kinh doanh (Mã ngành 9340101) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị kinh doanh - Đại học Nam Cần Thơ**
* **Mã ngành:** \`9340101\`
* **Văn bằng tốt nghiệp:** Tiến sĩ
* **Thời gian đào tạo:** 3-4 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình đào tạo tiến sĩ chuyên ngành Quản trị kinh doanh tại Trường Đại   học Nam Cần Thơ nhằm đào tạo người nghiên cứu có trình độ cao về lý thuyết và   khả năng ứng dụng chủ động, nắm bắt những kiến thức chuyên sâu về lĩnh vực   quản trị kinh doanh, phát hiện và giải qùyết được những vấn đ...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp tiến sĩ chuyên ngành Quản trị kinh doanh tại Trường Đại học Nam Cần Thơ, nghiên cứu sinh có đủ năng lực chuyên môn để đảm nhiệm những vai trò sau:  * Có đủ năng lực tham gia vào các hoạt động đào tạo và nghiên cứu khoa học. Chủ trì các đề tài và nhiệm vụ nghiên cứu khoa học trong ...`
  },
  {
    id: 'dnc-major-qt_quan_tri_kinh_doanh_must',
    category: 'nganh_hoc',
    keywords: ["quản trị kinh doanh / must", "ngành quản trị kinh doanh / must", "học quản trị kinh doanh / must", "7340101"],
    question: 'Thông tin chi tiết ngành Quản trị kinh doanh / MUST (Mã ngành 7340101) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị kinh doanh / MUST - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7340101\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 3.5 năm
* **Tổ hợp xét tuyển:** A00(Toán, Vật lí, Hóa học)<br/>
A01(Toán, Vật lí, Tiếng Anh)<br/>
C04(Ngữ văn, Toán, Địa lí)<br/>
D01(Ngữ văn, Toán, Tiếng Anh)

**Mô tả ngành:**
Học tập theo chương trình cử nhân Quản trịnh kinh doanh MUST giúp sinh viên trải nghiệm chương trình học tập theo     chuẩn quốc tế. Điều này sẽ tạo điều kiện cho sinh viên phát triển kỹ năng giao tiếp, hiểu biết văn hóa, và mở rộng     tầm nhìn, tiếp cận kiến thức đa dạng và chất lượng. Không nhữ...

**Cơ hội nghề nghiệp:**
Chương trình đào tạo kế thừa các trường đại học ở Hoa kỳ, Anh, Úc, nên đáp ứng với thị trường lao động toàn cầu, tính ứng dụng cao, có đội ngũ giảng viên được chọn lọc từ thực tế kinh doanh, quản trị thành công. Nên sau khi kết thúc khóa học, khả năng có việc làm cao. Khi tốt nghiệp có cơ hội làm vi...`
  },
  {
    id: 'dnc-major-qt_quan_tri_kinh_doanh',
    category: 'nganh_hoc',
    keywords: ["quản trị kinh doanh", "ngành quản trị kinh doanh", "học quản trị kinh doanh", "7340101"],
    question: 'Thông tin chi tiết ngành Quản trị kinh doanh (Mã ngành 7340101) tại DNC?',
    answer: `### 🎓 **Ngành Quản trị kinh doanh - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7340101\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Ngành Quản trị kinh doanh chương trình quốc tế tại Đại học Nam Cần Thơ được xây dựng nhằm đào tạo đội ngũ nhân sự có khả năng tư duy chiến lược, điều hành doanh nghiệp và thích ứng với môi trường kinh doanh toàn cầu.  Chương trình không chỉ cung cấp kiến thức quản trị hiện đại mà còn chú trọng kỹ nă...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệp ngành Quản trị kinh doanh có thể làm việc tại các công ty đa quốc gia, tập đoàn tài chính, ngân hàng, công ty khởi nghiệp hoặc đảm nhận vai trò quản lý ở nhiều lĩnh vực như nhân sự, marketing, xuất nhập khẩu, logistics,...  Ngoài ra, sinh viên có thể khởi nghiệp kinh doanh, học ...`
  },
  {
    id: 'dnc-major-rang_ham_mat',
    category: 'nganh_hoc',
    keywords: ["răng - hàm - mặt", "ngành răng - hàm - mặt", "học răng - hàm - mặt", "7720501"],
    question: 'Thông tin chi tiết ngành Răng - Hàm - Mặt (Mã ngành 7720501) tại DNC?',
    answer: `### 🎓 **Ngành Răng - Hàm - Mặt - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720501\`
* **Văn bằng tốt nghiệp:** Bác sĩ Răng - hàm - mặt
* **Thời gian đào tạo:** 6 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}]

**Mô tả ngành:**
Ngành Răng Hàm Mặt (Dentistry)là lĩnh vực thuộc khối khoa học sức khỏe, chuyên nghiên cứu, chẩn đoán, điều trị và phòng ngừa các bệnh lý liên quan đến răng, hàm, mặt và khoang miệng.  Đây là ngành học kết hợp giữa y học và nha khoa, không chỉ giúp bảo vệ sức khỏe răng miệng mà còn góp phần nâng cao ...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp Ngành Răng Hàm Mặt tại Trường Đại học Nam Cần Thơ (DNC), sinh viên có thể đảm nhận nhiều vị trí công việc trong lĩnh vực y tế – nha khoa – thẩm mỹ, với cơ hội phát triển rộng mở và thu nhập hấp dẫn tại:  * Bệnh viện, phòng khám Răng Hàm Mặt (công lập và tư nhân):Đảm nhiệm vai trò ...`
  },
  {
    id: 'dnc-major-luat',
    category: 'nganh_hoc',
    keywords: ["luật", "ngành luật", "học luật", "7380101"],
    question: 'Thông tin chi tiết ngành Luật (Mã ngành 7380101) tại DNC?',
    answer: `### 🎓 **Ngành Luật - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7380101\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 10, 'code': 'C00', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Địa'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 22, 'code': 'D15', 'subject1': 'Văn', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}, {'id': 43, 'code': 'Y07', 'subject1': 'Văn', 'subject2': 'GDKTPL', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Luậtlà lĩnh vực đào tạo chuyên sâu về hệ thống pháp luật, quy định và nguyên tắc điều chỉnh các quan hệ trong xã hội, nhằm đảm bảo trật tự, công bằng và phát triển bền vững. Đây là ngành học kết hợp giữa tư duy logic, phân tích và lập luận chặt chẽ, giúp người học có khả năng giải quyết các vấ...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Luậttại DNC có cơ hội đảm nhiệm nhiều vị trí việc làm đa dạng trong các cơ quan nhà nước, tổ chức và doanh nghiệp, với nhu cầu nhân lực ổn định và lâu dài.  ## Làm việc tại cơ quan nhà nước  * Công tác tại các cơ quan như Tòa án nhân dân, Viện kiểm sát nhân dân, Cơ quan thi...`
  },
  {
    id: 'dnc-major-luat_kinh_te',
    category: 'nganh_hoc',
    keywords: ["luật kinh tế", "ngành luật kinh tế", "học luật kinh tế", "7380107"],
    question: 'Thông tin chi tiết ngành Luật kinh tế (Mã ngành 7380107) tại DNC?',
    answer: `### 🎓 **Ngành Luật kinh tế - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7380107\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 10, 'code': 'C00', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Địa'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 22, 'code': 'D15', 'subject1': 'Văn', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}, {'id': 43, 'code': 'Y07', 'subject1': 'Văn', 'subject2': 'GDKTPL', 'subject3': 'Tin'}]

**Mô tả ngành:**
Luật Kinh tếlà ngành học nghiên cứu các quy định pháp luật điều chỉnh hoạt động kinh doanh, thương mại và quan hệ kinh tế giữa các chủ thể trong nền kinh tế. Ngành này tập trung vào các lĩnh vực như:  * Pháp luật doanh nghiệp  * Pháp luật thương mại  * Pháp luật đầu tư  * Pháp luật hợp đồng  * Giải ...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệp chương trình Cử nhânLuật Kinh tếtại Trường Đại học Nam Cần Thơ (DNC) có nhiều cơ hội việc làm đa dạng trong các cơ quan nhà nước, tổ chức pháp lý, doanh nghiệp và môi trường quốc tế.  ## Làm việc tại cơ quan nhà nước  * Công tác tại Tòa án, Viện kiểm sát, Cơ quan thi hành án  * ...`
  },
  {
    id: 'dnc-major-ths_luat_kinh_te',
    category: 'nganh_hoc',
    keywords: ["luật kinh tế", "ngành luật kinh tế", "học luật kinh tế", "8380107"],
    question: 'Thông tin chi tiết ngành Luật kinh tế (Mã ngành 8380107) tại DNC?',
    answer: `### 🎓 **Ngành Luật kinh tế - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8380107\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** <ul>
	<li>Luật thương mại</li>
<li>Luật dân sự</li>
<li>Điểm trung bình tích luỹ <br class="d-none d-lg-block"/>ở bậc đại học</li>
</ul>

**Mô tả ngành:**
Chương trình đào tạo trình độ thạc sĩ ngành Luật kinh tế theo định hướng ứng   dụng, đào tạo những thạc sĩ Luật kinh tế có kiến thức chuyên sâu về lĩnh vực   pháp luật kinh tế cũng như có kỹ năng, phẩm chất chính trị, đạo đức, tác phong   nghề nghiệp để có thể giải quyết được các tình huống pháp ...

**Cơ hội nghề nghiệp:**
* Có khả năng nghiên cứu, phân tích tình huống để ứng dụng giải quyết các vấn đề thực tiễn trong lĩnh vực kinh tế.  * Có khả năng tự định hướng, thích nghi với môi trường nghề nghiệp thay đổi, cập nhật kiến thức và thực tiễn ứng dụng pháp Luật kinh tế; có khả năng phối hợp làm việc nhóm và hướng dẫn...`
  },
  {
    id: 'dnc-major-ths_luat',
    category: 'nganh_hoc',
    keywords: ["luật", "ngành luật", "học luật", "8380101"],
    question: 'Thông tin chi tiết ngành Luật (Mã ngành 8380101) tại DNC?',
    answer: `### 🎓 **Ngành Luật - Đại học Nam Cần Thơ**
* **Mã ngành:** \`8380101\`
* **Văn bằng tốt nghiệp:** Thạc sĩ
* **Thời gian đào tạo:** 2 năm
* **Tổ hợp xét tuyển:** <ul>
	<li>Luật hành chính</li>
	<li>Luật hiến pháp</li>
	<li>Điểm trung bình tích luỹ <br class="d-none d-lg-block"/>ở bậc đại học</li>
</ul>

**Mô tả ngành:**
Chương trình đào tạo trình độ thạc sĩ ngành Luật theo định hướng ứng dụng đào tạo thạc sĩ Luật có kiến thức chuyên sâu về pháp luật cũng như có kỹ năng, phẩm chất chính trị, đạo đức, tác phong nghề nghiệp để có thể giải quyết hiệu quả các công việc phức tạp trong lĩnh vực liên quan đến pháp luật. Ch...

**Cơ hội nghề nghiệp:**
Người tốt nghiệp thạc sĩ ngành Luật theo định hướng ứng dụng có thể đảm nhiệm các vị trí sau đây:  * Làm việc tại các cơ quan lập pháp, hành pháp, tư pháp ở trung ương và địa phương; làm việc tại tổ chức chính trị, tổ chức chính trị xã hội, tổ chức xã hội nghề nghiệp; làm việc tại các tổ chức quốc t...`
  },
  {
    id: 'dnc-major-ts_luat_kinh_te',
    category: 'nganh_hoc',
    keywords: ["luật kinh tế", "ngành luật kinh tế", "học luật kinh tế", "9380107"],
    question: 'Thông tin chi tiết ngành Luật kinh tế (Mã ngành 9380107) tại DNC?',
    answer: `### 🎓 **Ngành Luật kinh tế - Đại học Nam Cần Thơ**
* **Mã ngành:** \`9380107\`
* **Văn bằng tốt nghiệp:** Tiến sĩ
* **Thời gian đào tạo:** 3-4 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình đào tạoTiến sĩ ngành Luật kinh tếnhằm phát triển nguồn nhân lực pháp lý chất lượng cao, có năng lực nghiên cứu, kiến thức tiên tiến, chuyên sâu về lĩnh vực pháp luật kinh tế và đóng góp vào phát triển kinh tế - xã hội, xây dựng Nhà nước pháp quyền và hội nhập quốc tế. Người học được rèn...

**Cơ hội nghề nghiệp:**
* Làm Thẩm phán tại Tòa án các cấp, Kiểm sát viên của Viện kiểm sát nhân dân các cấp, Chấp hành viên của cơ quan thi hành án các cấp; chuyên gia hoạch định chính sách pháp luật tại các cơ quan tham mưu của Quốc hội, Chính phủ (Các Bộ, Cơ quan ngang Bộ, cơ quan thuộc Chính phủ, Văn phòng Chính phủ, V...`
  },
  {
    id: 'dnc-major-luat_quoc_te',
    category: 'nganh_hoc',
    keywords: ["luật quốc tế", "ngành luật quốc tế", "học luật quốc tế", "7380108"],
    question: 'Thông tin chi tiết ngành Luật Quốc tế (Mã ngành 7380108) tại DNC?',
    answer: `### 🎓 **Ngành Luật Quốc tế - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7380108\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 10, 'code': 'C00', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Địa'}, {'id': 13, 'code': 'C03', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Sử'}, {'id': 14, 'code': 'C04', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Địa'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 21, 'code': 'D14', 'subject1': 'Văn', 'subject2': 'Sử', 'subject3': 'Anh'}, {'id': 22, 'code': 'D15', 'subject1': 'Văn', 'subject2': 'Địa', 'subject3': 'Anh'}, {'id': 37, 'code': 'X17', 'subject1': 'Toán', 'subject2': 'Sử', 'subject3': 'GDKTPL'}, {'id': 39, 'code': 'X26', 'subject1': 'Toán', 'subject2': 'Anh', 'subject3': 'Tin'}, {'id': 43, 'code': 'Y07', 'subject1': 'Văn', 'subject2': 'GDKTPL', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhLuật Quốc tế (International Law)là lĩnh vực nghiên cứu và áp dụng các quy phạm pháp luật điều chỉnh mối quan hệ giữa các quốc gia, tổ chức quốc tế, doanh nghiệp và cá nhân trong phạm vi toàn cầu.  Ngành này tập trung vào việc giải quyết các vấn đề pháp lý phát sinh trong bối cảnh toàn cầu hóa, ...

**Cơ hội nghề nghiệp:**
Sinh viên ngành Luật Quốc tế tại Trường Đại học Nam Cần Thơ sau khi tốt nghiệp có thể đảm nhiệm các công việc ở các cơ quan, tổ chức sau đây:  * Làm việc trong hầu hết các cơ quan nhà nước bao gồm: Tòa án nhân dân, Viện kiểm sát nhân dân, Thi hành án, Văn phòng Quốc hội, Văn phòng Chủ tịch nước, Văn...`
  },
  {
    id: 'dnc-major-ky_thuat_xet_nghiem_y_hoc',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật xét nghiệm y học", "ngành kỹ thuật xét nghiệm y học", "học kỹ thuật xét nghiệm y học", "7720601"],
    question: 'Thông tin chi tiết ngành Kỹ thuật xét nghiệm y học (Mã ngành 7720601) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật xét nghiệm y học - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720601\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}, {'id': 34, 'code': 'X09', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'GDKTPL'}, {'id': 35, 'code': 'X10', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Tin'}]

**Mô tả ngành:**
NgànhKỹ thuật Xét nghiệm Y họclà lĩnh vực thuộc khối khoa học sức khỏe, chuyên đào tạo kỹ thuật viên thực hiện các xét nghiệm y học nhằm hỗ trợ chẩn đoán, theo dõi và điều trị bệnh.  Ngành học này tập trung vào việc phân tích các mẫu bệnh phẩm như máu, nước tiểu, dịch cơ thể… bằng các phương pháp si...

**Cơ hội nghề nghiệp:**
NgànhKỹ thuật Xét nghiệm Y họcmang đến nhiều cơ hội việc làm đa dạng trong hệ thống y tế, nghiên cứu và doanh nghiệp, đáp ứng nhu cầu nhân lực chất lượng cao trong bối cảnh y học hiện đại.  ## 1. Làm việc tại các cơ sở y tế  Sinh viên tốt nghiệp ngành Kỹ thuật xét nghiệm tạiTrường Đại học Nam Cần Th...`
  },
  {
    id: 'dnc-major-ky_thuat_hinh_anh_y_hoc',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật hình ảnh y học", "ngành kỹ thuật hình ảnh y học", "học kỹ thuật hình ảnh y học", "7720602"],
    question: 'Thông tin chi tiết ngành Kỹ thuật hình ảnh y học (Mã ngành 7720602) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật hình ảnh y học - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720602\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}]

**Mô tả ngành:**
NgànhKỹ thuật Hình ảnh Y học (Medical Imaging Technology)là một ngành học quan trọng thuộc khối Khoa học Sức khỏe, đào tạo sinh viên kiến thức và kỹ năng vận hành, sử dụng các thiết bị chẩn đoán hình ảnh hiện đại nhằm quan sát, phân tích cấu trúc bên trong cơ thể, hỗ trợ bác sĩ chẩn đoán và điều trị...

**Cơ hội nghề nghiệp:**
NgànhKỹ thuật Hình ảnh Y họccủaTrường Đại học Nam Cần Thơmang đến nhiều cơ hội việc làm hấp dẫn trong hệ thống y tế, nghiên cứu và doanh nghiệp, đặc biệt trong bối cảnh công nghệ chẩn đoán hình ảnh ngày càng phát triển mạnh mẽ.  ## 1. Làm việc tại các cơ sở y tế  Sau khi tốt nghiệp, sinh viên có thể...`
  },
  {
    id: 'dnc-major-ky_thuat_y_sinh',
    category: 'nganh_hoc',
    keywords: ["kỹ thuật y sinh", "ngành kỹ thuật y sinh", "học kỹ thuật y sinh", "7520212"],
    question: 'Thông tin chi tiết ngành Kỹ thuật y sinh (Mã ngành 7520212) tại DNC?',
    answer: `### 🎓 **Ngành Kỹ thuật y sinh - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7520212\`
* **Văn bằng tốt nghiệp:** Kỹ sư
* **Thời gian đào tạo:** 4.5 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 2, 'code': 'A01', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Anh'}, {'id': 3, 'code': 'A02', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Sinh'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 31, 'code': 'X06', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Tin'}, {'id': 33, 'code': 'X08', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'CN'}]

**Mô tả ngành:**
NgànhKỹ thuật Y Sinh (Biomedical Engineering)là lĩnh vực liên ngành kết hợp giữa y học, sinh học, kỹ thuật và công nghệ, nhằm nghiên cứu và phát triển các giải pháp kỹ thuật phục vụ cho chẩn đoán, điều trị, chăm sóc và phục hồi sức khỏe con người.  Đây là ngành học đóng vai trò quan trọng trong việc...

**Cơ hội nghề nghiệp:**
NgànhKỹ thuật Y Sinhmở ra nhiều cơ hội việc làm trong lĩnh vực y tế, công nghệ và nghiên cứu, đặc biệt trong bối cảnh chuyển đổi số và ứng dụng công nghệ cao trong chăm sóc sức khỏe.  ## 1. Làm việc tại bệnh viện và cơ sở y tế  Sinh viên tốt nghiệp ngànhKỹ thuật Y SinhtạiTrường Đại học Nam Cần Thơcó...`
  },
  {
    id: 'dnc-major-dieu_duong',
    category: 'nganh_hoc',
    keywords: ["điều dưỡng đa khoa", "ngành điều dưỡng đa khoa", "học điều dưỡng đa khoa", "7720301"],
    question: 'Thông tin chi tiết ngành Điều dưỡng Đa khoa (Mã ngành 7720301) tại DNC?',
    answer: `### 🎓 **Ngành Điều dưỡng Đa khoa - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720301\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}, {'id': 34, 'code': 'X09', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'GDKTPL'}, {'id': 35, 'code': 'X10', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Tin'}]

**Mô tả ngành:**
Ngành Điều dưỡng đa khoalà một trong những lĩnh vực quan trọng và không thể thiếu trong hệ thống y tế, giữ vai trò nòng cốt trong công tác chăm sóc, bảo vệ và nâng cao sức khỏe cho người bệnh và cộng đồng.  Người học ngành Điều dưỡng đa khoa tại Trường Đại học Nam Cần Thơ không chỉ được đào tạo để t...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệpngành Điều dưỡng đa khoacó thể đảm nhiệm nhiều vị trí công việc đa dạng trong hệ thống y tế, từ lâm sàng đến quản lý, nghiên cứu và hội nhập quốc tế. Đây là ngành có nhu cầu nhân lực cao, ổn định và cơ hội phát triển lâu dài.  ## Lĩnh vực lâm sàng  * Làm việc tại các bệnh viện đa...`
  },
  {
    id: 'dnc-major-dieu_duong_gay_me_hoi_suc',
    category: 'nganh_hoc',
    keywords: ["điều dưỡng gây mê hồi sức", "ngành điều dưỡng gây mê hồi sức", "học điều dưỡng gây mê hồi sức", "7720301"],
    question: 'Thông tin chi tiết ngành Điều dưỡng Gây mê hồi sức (Mã ngành 7720301) tại DNC?',
    answer: `### 🎓 **Ngành Điều dưỡng Gây mê hồi sức - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720301\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}, {'id': 34, 'code': 'X09', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'GDKTPL'}, {'id': 35, 'code': 'X10', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Tin'}]

**Mô tả ngành:**
Điều dưỡng Gây mê Hồi sứclà một chuyên ngành đặc thù trong lĩnh vực điều dưỡng, giữ vai trò quan trọng trong các hoạt động phẫu thuật, thủ thuật và chăm sóc người bệnh nặng.  Ngành học này tập trung vào việc hỗ trợ bác sĩ trong quá trình gây mê – hồi sức, đồng thời đảm bảo an toàn cho người bệnh tro...

**Cơ hội nghề nghiệp:**
Trong bối cảnh hệ thống y tế ngày càng phát triển, số lượng ca phẫu thuật và điều trị chuyên sâu tăng mạnh, kéo theo nhu cầu lớn về điều dưỡng gây mê hồi sức, nhân lực tại phòng mổ, ICU, cấp cứu. Đây là một trong những chuyên ngành “khát nhân lực” nhưng đòi hỏi tay nghề cao.  Sinh viên tốt nghiệp ng...`
  },
  {
    id: 'dnc-major-dieu_duong_tham_my',
    category: 'nganh_hoc',
    keywords: ["điều dưỡng thẩm mỹ", "ngành điều dưỡng thẩm mỹ", "học điều dưỡng thẩm mỹ", "7720301"],
    question: 'Thông tin chi tiết ngành Điều dưỡng Thẩm mỹ (Mã ngành 7720301) tại DNC?',
    answer: `### 🎓 **Ngành Điều dưỡng Thẩm mỹ - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720301\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}, {'id': 34, 'code': 'X09', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'GDKTPL'}, {'id': 35, 'code': 'X10', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Tin'}]

**Mô tả ngành:**
Điều dưỡng thẩm mỹlà những điều dưỡng viên được đào tạo chuyên môn để làm việc trong lĩnh vực chăm sóc sắc đẹp và thẩm mỹ y khoa, tại các cơ sở như bệnh viện thẩm mỹ, phòng khám da liễu, spa y khoa và thẩm mỹ viện.  Tại Trường Đại học Nam Cần Thơ (DNC), sinh viên ngành Điều dưỡng được định hướng phá...

**Cơ hội nghề nghiệp:**
Trong bối cảnh ngành thẩm mỹ y khoa và chăm sóc sắc đẹp tại Việt Nam phát triển mạnh mẽ, Điều dưỡng thẩm mỹ đang trở thành một trong những hướng nghề nghiệp có tiềm năng cao, thu nhập hấp dẫn và môi trường làm việc hiện đại.  Sinh viên tốt nghiệp ngành Điều dưỡng tại Trường Đại học Nam Cần Thơ (DNC)...`
  },
  {
    id: 'dnc-major-dieu_duong_ho_sinh',
    category: 'nganh_hoc',
    keywords: ["điều dưỡng hộ sinh", "ngành điều dưỡng hộ sinh", "học điều dưỡng hộ sinh", "7720301"],
    question: 'Thông tin chi tiết ngành Điều dưỡng Hộ sinh (Mã ngành 7720301) tại DNC?',
    answer: `### 🎓 **Ngành Điều dưỡng Hộ sinh - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720301\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}, {'id': 34, 'code': 'X09', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'GDKTPL'}, {'id': 35, 'code': 'X10', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Tin'}]

**Mô tả ngành:**
Điều dưỡng Hộ sinhlà ngành chuyên môn thuộc lĩnh vực chăm sóc sức khỏe sinh sản, tập trung chăm sóc toàn diện cho phụ nữ, bà mẹ và trẻ sơ sinh trong các giai đoạn quan trọng như thai kỳ, sinh nở và sau sinh.  Tại Trường Đại học Nam Cần Thơ (DNC), ngành Điều dưỡng Hộ sinh được đào tạo nhằm góp phần b...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp Ngành Điều dưỡng Hộ sinh tại Trường Đại học Nam Cần Thơ (DNC), sinh viên có nhiều cơ hội việc làm trong lĩnh vực chăm sóc sức khỏe sinh sản, chăm sóc mẹ và bé với nhu cầu nhân lực luôn ở mức cao.  Sinh viên tốt nghiệp có thể đảm nhận các vị trí như:  * Hộ sinh tại bệnh viện, khoa ...`
  },
  {
    id: 'dnc-major-dieu_duong_rang_ham_mat',
    category: 'nganh_hoc',
    keywords: ["điều dưỡng răng hàm mặt (nha khoa)", "ngành điều dưỡng răng hàm mặt (nha khoa)", "học điều dưỡng răng hàm mặt (nha khoa)", "7720301"],
    question: 'Thông tin chi tiết ngành Điều dưỡng Răng Hàm Mặt (Nha khoa) (Mã ngành 7720301) tại DNC?',
    answer: `### 🎓 **Ngành Điều dưỡng Răng Hàm Mặt (Nha khoa) - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720301\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** [{'id': 1, 'code': 'A00', 'subject1': 'Toán', 'subject2': 'Lí', 'subject3': 'Hóa'}, {'id': 7, 'code': 'B00', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Sinh'}, {'id': 8, 'code': 'B03', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Văn'}, {'id': 17, 'code': 'D01', 'subject1': 'Toán', 'subject2': 'Văn', 'subject3': 'Anh'}, {'id': 18, 'code': 'D07', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Anh'}, {'id': 19, 'code': 'D08', 'subject1': 'Toán', 'subject2': 'Sinh', 'subject3': 'Anh'}, {'id': 34, 'code': 'X09', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'GDKTPL'}, {'id': 35, 'code': 'X10', 'subject1': 'Toán', 'subject2': 'Hóa', 'subject3': 'Tin'}]

**Mô tả ngành:**
Điều dưỡng Răng Hàm Mặt (Điều dưỡng nha khoa)là chuyên ngành thuộc lĩnh vực điều dưỡng, tập trung vào chăm sóc sức khỏe răng miệng và hỗ trợ bác sĩ trong các hoạt động khám, chẩn đoán và điều trị nha khoa.  Trong bối cảnh cộng đồng ngày càng quan tâm đến chăm sóc răng miệng, thẩm mỹ nha khoa và phòn...

**Cơ hội nghề nghiệp:**
Sau khi tốt nghiệp Ngành Điều dưỡng chuyên ngành Điều dưỡng Răng Hàm Mặt tại Trường Đại học Nam Cần Thơ (DNC), sinh viên có thể đảm nhiệm nhiều vị trí công việc đa dạng trong lĩnh vực y tế, nha khoa và chăm sóc sức khỏe cộng đồng.  Sinh viên tốt nghiệp có thể làm việc tại:  * Bệnh viện có chuyên kho...`
  },
  {
    id: 'dnc-major-qt_y_khoa',
    category: 'nganh_hoc',
    keywords: ["y khoa", "ngành y khoa", "học y khoa", "7720101"],
    question: 'Thông tin chi tiết ngành Y khoa (Mã ngành 7720101) tại DNC?',
    answer: `### 🎓 **Ngành Y khoa - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720101\`
* **Văn bằng tốt nghiệp:** Bác sĩ Đa khoa
* **Thời gian đào tạo:** 6 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình Y khoa Quốc tế đào tạo các bác sĩ có khả năng thích nghi với môi trường làm việc năng động, cường độ cao và chịu được áp lực lớn ở các bệnh viện quốc tế, các cơ sở y tế, phòng khám trong và ngoài nước.  Chương trình Y Khoa Quốc tế là một sự kết hợp tuyệt vời giữa kiến thức y học và tầm ...

**Cơ hội nghề nghiệp:**
Chương trình đào tạo kế thừa các trường đại học ở Hoa kỳ, Canada, Đài Loan, Hàn Quốc,… đáp ứng với thị trường lao động toàn cầu, tính ứng dụng cao, có đội ngũ giảng viên ưu tú trong nước và quốc tế. Sau khi tốt nghiệp, sinh viên chương trình Y Khoa Quốc tế có thể làm việc tại các bệnh viện, tổ chức ...`
  },
  {
    id: 'dnc-major-qt_rang_ham_mat',
    category: 'nganh_hoc',
    keywords: ["răng - hàm - mặt", "ngành răng - hàm - mặt", "học răng - hàm - mặt", "7720501"],
    question: 'Thông tin chi tiết ngành Răng - Hàm - Mặt (Mã ngành 7720501) tại DNC?',
    answer: `### 🎓 **Ngành Răng - Hàm - Mặt - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720501\`
* **Văn bằng tốt nghiệp:** Bác sĩ Răng - hàm - mặt
* **Thời gian đào tạo:** 6 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình Răng-Hàm-Mặt quốc tế tại Trường Đại học Nam Cần Thơ được giảng dạy hoàn toàn bằng tiếng Anh, giúp sinh viên nâng cao khả năng ngoại ngữ chuyên ngành và sẵn sàng hội nhập môi trường làm việc quốc tế. Chương trình chú trọng tích hợp lý thuyết với thực hành lâm sàng hiện đại; sinh viên đượ...

**Cơ hội nghề nghiệp:**
Sau khi hoàn thành chương trình đào tạo ngành Răng-Hàm-Mặt theo chuẩn quốc tế tại Trường Đại học Nam Cần Thơ, sinh viên có nhiều cơ hội nghề nghiệp đa dạng. Bạn có thể làm việc tại các bệnh viện, phòng khám nha khoa, trung tâm thẩm mỹ trong và ngoài nước hoặc tham gia các tổ chức y tế toàn cầu như T...`
  },
  {
    id: 'dnc-major-qt_dieu_duong',
    category: 'nganh_hoc',
    keywords: ["điều dưỡng", "ngành điều dưỡng", "học điều dưỡng", "7720802"],
    question: 'Thông tin chi tiết ngành Điều dưỡng (Mã ngành 7720802) tại DNC?',
    answer: `### 🎓 **Ngành Điều dưỡng - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720802\`
* **Văn bằng tốt nghiệp:** Cử nhân
* **Thời gian đào tạo:** 4 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình Điều dưỡng quốc tế tại Trường Đại học Nam Cần Thơ được giảng dạy hoàn toàn bằng tiếng Anh, trang bị cho sinh viên kiến thức chuyên ngành sâu rộng cùng khả năng sử dụng ngoại ngữ thành thạo trong môi trường chuyên môn. Sinh viên không chỉ nắm vững kỹ năng chuyên môn mà còn được đào tạo c...

**Cơ hội nghề nghiệp:**
Sinh viên tốt nghiệp chương trình Điều dưỡng quốc tế có thể làm việc tại các bệnh viện đa khoa, bệnh viện quốc tế, trung tâm chăm sóc sức khỏe cộng đồng trong và ngoài nước. Ngoài ra, sinh viên có thể đảm nhiệm vị trí điều dưỡng trưởng, điều dưỡng hành chính, hoặc tiếp tục học lên Thạc sĩ, Tiến sĩ t...`
  },
  {
    id: 'dnc-major-qt_duoc_hoc',
    category: 'nganh_hoc',
    keywords: ["dược học", "ngành dược học", "học dược học", "7720201"],
    question: 'Thông tin chi tiết ngành Dược học (Mã ngành 7720201) tại DNC?',
    answer: `### 🎓 **Ngành Dược học - Đại học Nam Cần Thơ**
* **Mã ngành:** \`7720201\`
* **Văn bằng tốt nghiệp:** Dược sĩ
* **Thời gian đào tạo:** 5 năm
* **Tổ hợp xét tuyển:** A00, A01, B00, C00, D01 (tùy ngành)

**Mô tả ngành:**
Chương trình Dược học Quốc tế tại Trường Đại học Nam Cần Thơ hướng đến đào tạo đội ngũ dược sĩ có trình độ chuyên môn cao, vững vàng về kiến thức và thành thạo ngoại ngữ, đáp ứng nhu cầu phát triển ngành dược trong nước và quốc tế. Sinh viên sẽ được học tập trong môi trường hiện đại, với chương trìn...

**Cơ hội nghề nghiệp:**
Tốt nghiệp chương trình Dược học quốc tế, sinh viên có thể làm việc tại bệnh viện, nhà thuốc, công ty sản xuất, kinh doanh, xuất nhập khẩu dược phẩm, phòng kiểm nghiệm thuốc hoặc viện nghiên cứu y sinh học. Với nền tảng ngoại ngữ và chuyên môn vững chắc, sinh viên có thể tham gia các tổ chức y tế qu...`
  },
  {
    id: 'dnc-cau-lac-bo-tong-hop',
    category: 'cau_lac_bo',
    keywords: ['câu lạc bộ', 'clb', 'hoạt động sinh viên', 'ngoại khóa', 'đoàn hội', 'phong trào'],
    question: 'Các câu lạc bộ (CLB) và hoạt động ngoại khóa tại Đại học Nam Cần Thơ?',
    answer: `### 🎯 **Hệ thống 57 Câu Lạc Bộ Sinh Viên DNC**
Sinh viên DNC được tham gia rất nhiều hoạt động đoàn thể, kỹ năng và học thuật sôi nổi:
* **Học thuật & Chuyên môn:** CLB Công nghệ thông tin, CLB Tiếng Anh E2C, CLB Dược sĩ tương lai, CLB Bác sĩ trẻ, CLB Luật gia tương lai, CLB Kỹ sư Ô tô...
* **Kỹ năng & Nghệ thuật:** CLB MC & Tổ chức sự kiện, CLB Âm nhạc, CLB Nhiếp ảnh, CLB Dance, CLB Bạn đọc...
* **Thể thao & Tình nguyện:** CLB Bóng đá, CLB Bóng chuyền, Đội Công tác xã hội, CLB Máu DNC...

*(Danh sách tiêu biểu: CLB Bạn đọc, CLB MC và Tổ chức sự kiện, CLB Tiếng Anh Khoa Kinh tế - E2C, CLB Công nghệ thông tin, CLB Tiếng Anh DNC - Khoa Ngoại ngữ, CLB Tiếng Anh pháp lý - Khoa Luật, CLB Tiếng Anh Khoa QTKD - Easy Going English, CLB Anh văn Chuyên ngành Y Khoa, CLB Pickleball DNC, CLB Bóng chuyền DNC, CLB Bơi lội DNC, CLB Taekwondo DNC, CLB Quần vợt DNC, CLB Bóng rổ DNC, CLB Bóng đá DNC, CLB Tiếng Anh Khoa KT-XD&MT, CLB Tiếng Anh Khoa KT-CN, CLB Tiếng Anh Chuyên ngành CNKT Ô tô, CLB Âm nhạc, CLB Tuổi trẻ DNC, CLB Mỹ thuật DNC, CLB Sinh viên 5 tốt, CLB Khởi nghiệp, CLB Dancing, CLB Nữ sinh duyên dáng...)*`
  },
];


function removeTones(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/**
 * Format danh sách tổ hợp môn thô dạng JSON thành định dạng Markdown đẹp, dễ đọc
 */
export function formatSubjectGroups(raw: string): string {
  const matches = [...raw.matchAll(/code':\s*'([^']+)',\s*'subject1':\s*'([^']+)',\s*'subject2':\s*'([^']+)',\s*'subject3':\s*'([^']+)'/g)];
  if (matches.length === 0) return raw;
  return matches.map((m) => `* \`${m[1]}\`: ${m[2]}, ${m[3]}, ${m[4]}`).join('\n');
}

/**
 * Tìm kiếm ngành học DNC theo tên/từ khóa người dùng nhập
 */
export function findMajorByQuery(noTone: string): KnowledgeItem | null {
  const majorItems = DNC_KNOWLEDGE_BASE.filter((item) => item.category === 'nganh_hoc');

  // Ưu tiên các ngành phổ biến với từ khóa rõ ràng, tránh bắt nhầm từ con (như 'ai' trong 'tai'/'dai')
  if (/\b(o to|dong luc)\b/.test(noTone) && (noTone.includes('nganh') || noTone.includes('hoc') || noTone.includes('ky thuat')) && !noTone.includes('showroom')) {
    return majorItems.find((m) => m.id === 'dnc-major-cong_nghe_ky_thuat_o_to') || null;
  }
  if (/\b(y khoa|y da khoa|bac si da khoa)\b/.test(noTone)) {
    return majorItems.find((m) => m.id === 'dnc-major-y_khoa') || null;
  }
  if (noTone.includes('rang ham mat')) {
    return majorItems.find((m) => m.id === 'dnc-major-rang_-_ham_-_mat') || null;
  }
  if (noTone.includes('duoc hoc') || noTone.includes('duoc si') || noTone.includes('nganh duoc') || noTone.includes('khoa duoc') || /\b(hoc duoc)\b/.test(noTone)) {
    return majorItems.find((m) => m.id === 'dnc-major-duoc_hoc') || null;
  }
  if (noTone.includes('xet nghiem y hoc') || noTone.includes('ky thuat xet nghiem')) {
    return majorItems.find((m) => m.id.includes('xet_nghiem')) || null;
  }
  if (noTone.includes('hinh anh y hoc') || noTone.includes('ky thuat hinh anh')) {
    return majorItems.find((m) => m.id.includes('hinh_anh')) || null;
  }
  if (noTone.includes('dieu duong') && (noTone.includes('nganh') || noTone.includes('hoc'))) {
    return majorItems.find((m) => m.id.includes('dieu_duong')) || null;
  }
  if (/\b(cntt|cong nghe thong tin)\b/.test(noTone)) {
    return majorItems.find((m) => m.id === 'dnc-major-cong_nghe_thong_tin') || null;
  }
  if (noTone.includes('tri tue nhan tao') || /\b(nganh ai|hoc ai|cong nghe ai)\b/.test(noTone)) {
    return majorItems.find((m) => m.id.includes('tri_tue_nhan_tao')) || null;
  }
  if (noTone.includes('ky thuat phan mem') || noTone.includes('nganh phan mem')) {
    return majorItems.find((m) => m.id.includes('phan_mem')) || null;
  }
  if (noTone.includes('khoa hoc may tinh')) {
    return majorItems.find((m) => m.id.includes('khoa_hoc_may_tinh')) || null;
  }
  if (noTone.includes('kinh te so')) {
    return majorItems.find((m) => m.id.includes('kinh_te_so')) || null;
  }
  if (noTone.includes('marketing') && (noTone.includes('nganh') || noTone.includes('hoc'))) {
    return majorItems.find((m) => m.id.includes('marketing')) || null;
  }
  if (noTone.includes('logistics') && (noTone.includes('nganh') || noTone.includes('hoc'))) {
    return majorItems.find((m) => m.id.includes('logistics')) || null;
  }
  if (noTone.includes('luat kinh te')) {
    return majorItems.find((m) => m.id.includes('luat_kinh_te')) || null;
  }
  if (noTone.includes('nganh luat') || noTone.includes('luat hoc') || noTone.includes('khoa luat')) {
    return majorItems.find((m) => m.id.includes('luat_hoc')) || null;
  }
  if (noTone.includes('ngon ngu anh')) {
    return majorItems.find((m) => m.id.includes('ngon_ngu_anh')) || null;
  }
  if (noTone.includes('quan tri kinh doanh') || /\b(qtkd)\b/.test(noTone)) {
    return majorItems.find((m) => m.id.includes('quan_tri_kinh_doanh')) || null;
  }
  if (noTone.includes('quan tri du lich') || noTone.includes('nganh du lich')) {
    return majorItems.find((m) => m.id.includes('du_lich')) || null;
  }
  if (noTone.includes('nganh kien truc') || noTone.includes('hoc kien truc')) {
    return majorItems.find((m) => m.id.includes('kien_truc')) || null;
  }
  if (noTone.includes('nganh xay dung') || noTone.includes('ky thuat xay dung')) {
    return majorItems.find((m) => m.id.includes('xay_dung')) || null;
  }

  // Quét qua toàn bộ danh sách 86 ngành CHỈ KHI câu hỏi có chữ 'ngành' hoặc 'học ngành'
  if (noTone.includes('nganh ') || noTone.includes('chuyen nganh ') || noTone.startsWith('nganh') || noTone.includes('hoc nganh ')) {
    for (const item of majorItems) {
      for (const kw of item.keywords) {
        const kwNoTone = removeTones(kw);
        if (kwNoTone.length >= 6 && noTone.includes(kwNoTone)) {
          return item;
        }
      }
    }
  }
  return null;
}

/**
 * Trả lời chuyên sâu và chính xác về ĐỊA CHỈ & VỊ TRÍ
 */
export function resolveDncAddress(noTone: string): string {
  // 1. Showroom Ô tô Nam Cần Thơ DNC
  if (noTone.includes('showroom') || (noTone.includes('o to') && (noTone.includes('xe') || noTone.includes('gara') || noTone.includes('xuong')))) {
    return `**Showroom Ô tô Nam Cần Thơ DNC** có địa chỉ tại: **Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ**.\n\n* **Vị trí cụ thể:** Tọa lạc ngay bên trong khuôn viên Trường Đại học Nam Cần Thơ.\n* **Quy mô & Tiện ích:** Bao gồm khu trưng bày các dòng xe ô tô hiện đại cùng hệ thống xưởng bảo dưỡng, sửa chữa quy mô lớn. Nơi đây vừa phục vụ đào tạo thực hành thực tế cho sinh viên ngành Công nghệ Kỹ thuật Ô tô, vừa hoạt động kinh doanh dịch vụ cho khách hàng bên ngoài.`;
  }

  // 2. Bệnh viện Đại học Nam Cần Thơ
  if (noTone.includes('benh vien') || noTone.includes('bv dnc')) {
    return `**Bệnh viện Đại học Nam Cần Thơ** có địa chỉ tại: **Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ**.\n\n* **Vị trí:** Tọa lạc ngay bên trong khuôn viên Trường Đại học Nam Cần Thơ (DNC).\n* **Hotline cấp cứu & khám chữa bệnh:** \`02923 686 868\`\n* **Quy mô:** Đạt chuẩn quốc tế AACI Hoa Kỳ với quy mô 300 giường bệnh giai đoạn 1, trang bị máy móc y khoa hiện đại và là cơ sở thực hành lâm sàng cho sinh viên khối ngành Sức khỏe.`;
  }

  // 3. Ký túc xá DNC
  if (noTone.includes('ky tuc xa') || noTone.includes('ktx') || noTone.includes('noi tru')) {
    return `**Khu phức hợp Ký túc xá Đại học Nam Cần Thơ** nằm ngay bên trong khuôn viên trường tại địa chỉ: **Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ**.\n\n* **Đặc điểm:** Sức chứa hơn 2.000 sinh viên, gồm các dãy phòng quạt và phòng máy lạnh tiện nghi, wifi bao phủ, an ninh thẻ từ 24/7 và sát cạnh căng-tin trường.`;
  }

  // 4. Viện dược liệu / Viện sức khỏe / Trung tâm phần mềm / Thư viện / Hồ bơi / Sân vận động
  if (
    noTone.includes('vien duoc lieu') ||
    noTone.includes('vien nghien cuu') ||
    noTone.includes('trung tam phan mem') ||
    noTone.includes('ho boi') ||
    noTone.includes('san bong') ||
    noTone.includes('san van dong') ||
    noTone.includes('thu vien')
  ) {
    return `Cơ sở này nằm ngay bên trong khuôn viên Trường Đại học Nam Cần Thơ, địa chỉ: **Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ**.`;
  }

  // 5. Kiểm tra câu hỏi về Resort / Khu sinh thái
  if (noTone.includes('resort') || noTone.includes('khu sinh thai') || noTone.includes('du lich sinh thai')) {
    return `Khu thực hành Du lịch Sinh thái – Resort DNC (DNC Resort) nằm ngay **bên trong khuôn viên Trường Đại học Nam Cần Thơ**, địa chỉ: **Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ**. Công trình có quy mô hơn 25.000 m² với các căn bungalow phong cách Châu Âu, hồ bơi ngoài trời và cụm sân thể thao đa năng.`;
  }

  // 6. Phòng Đào tạo / CTSV / Văn phòng một cửa
  if (noTone.includes('phong dao tao') || noTone.includes('ctsv') || noTone.includes('cong tac sinh vien') || noTone.includes('mot cua')) {
    return `Văn phòng Một cửa, Phòng Đào tạo và Phòng Công tác Sinh viên nằm tại **Tòa nhà Hành chính Trung tâm**, bên trong khuôn viên Trường Đại học Nam Cần Thơ (Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ). Bạn cũng có thể gửi yêu cầu trực tuyến tại mục **"Hỗ trợ"** trên Cổng HTSV này nhé!`;
  }

  // 7. Kiểm tra nếu người dùng hỏi về trường khác ngoài DNC
  if (
    noTone.includes('bach khoa') ||
    noTone.includes('kinh te quoc dan') ||
    noTone.includes('ngoai thuong') ||
    noTone.includes('fpt') ||
    noTone.includes('y duoc can tho') ||
    noTone.includes('dai hoc can tho') ||
    (noTone.includes('dai hoc') && !noTone.includes('nam can tho') && !noTone.includes('dnc') && !noTone.includes('truong minh') && !noTone.includes('truong nay'))
  ) {
    return `Dạ trường này mình không biết địa chỉ nha bạn! Vì mình là trợ lý chuyên sâu về Trường Đại học Nam Cần Thơ (DNC) thôi nè. Bạn có thể tra cứu trên Google Maps hoặc website chính thức của trường đó nhé!`;
  }

  // 8. Toàn trường Đại học Nam Cần Thơ
  if (
    noTone.includes('nam can tho') ||
    noTone.includes('dnc') ||
    noTone.includes('truong minh') ||
    noTone.includes('truong nay') ||
    noTone.includes('truong')
  ) {
    return `**Trường Đại học Nam Cần Thơ (DNC)** có địa chỉ chính thức tại: **Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ**.\n\n* **Hotline Tuyển sinh & Hỗ trợ:** \`0939 257 838\` - \`02923 798 222\`\n* **Email:** \`phongtuyensinh@nctu.edu.vn\`\n* **Website chính thức:** [https://nctu.edu.vn](https://nctu.edu.vn)`;
  }

  // 9. Hỏi địa chỉ nơi lạ / không xác định
  return `Dạ địa chỉ này mình không biết nha bạn! Mình chỉ nắm rõ thông tin và các địa điểm bên trong khuôn viên Trường Đại học Nam Cần Thơ (DNC) thôi nè. Nếu bạn cần hỏi về cơ sở hay phòng ban của trường, bạn vui lòng liên hệ Tổng đài DNC: **0939 257 838** - **02923 798 222** để được thầy cô hướng dẫn vị trí nhé!`;
}

/**
 * Trả lời chuyên sâu và chính xác về HỌC PHÍ
 */
export function resolveDncTuition(noTone: string): string {
  if (noTone.includes('ktx') || noTone.includes('ky tuc xa')) {
    return `Mức phí Ký túc xá Đại học Nam Cần Thơ dao động từ **450.000đ - 1.200.000đ / tháng / sinh viên** tùy loại phòng:\n* **Phòng quạt:** Khoảng 450.000đ - 600.000đ / tháng.\n* **Phòng máy lạnh:** Khoảng 800.000đ - 1.200.000đ / tháng.\n* Đã bao gồm an ninh thẻ từ 24/7, wifi và các tiện ích nội trú.`;
  }

  if (noTone.includes('o to') || noTone.includes('dong luc')) {
    return `Mức học phí ngành **Công nghệ Kỹ thuật Ô tô** tại Đại học Nam Cần Thơ là khoảng **14 - 15 triệu đồng / học kỳ** (mỗi năm có 3 học kỳ).\n\n* **Chính sách:** Nhà trường cam kết giữ nguyên mức học phí ổn định suốt toàn khóa (không tăng giá tín chỉ).\n* **Thực hành:** Đã bao gồm các học phần thực hành chuyên sâu tại Showroom Ô tô Nam Cần Thơ DNC và xưởng bảo dưỡng của trường.`;
  }

  if (noTone.includes('y khoa') || noTone.includes('bac si') || noTone.includes('rang ham mat')) {
    return `Mức học phí ngành **Y khoa** và **Răng - Hàm - Mặt** tại Đại học Nam Cần Thơ là khoảng **45 - 50 triệu đồng / học kỳ** (mỗi năm gồm 3 học kỳ).\n\n* **Cam kết:** Học phí ổn định suốt toàn bộ khóa học 6 năm.\n* **Đặc quyền:** Đã bao gồm chi phí thực tập lâm sàng tại Bệnh viện Đại học Nam Cần Thơ và các bệnh viện liên kết lớn.`;
  }

  if (noTone.includes('duoc')) {
    return `Mức học phí ngành **Dược học** (Bằng Dược sĩ) tại Đại học Nam Cần Thơ là khoảng **18 - 22 triệu đồng / học kỳ** (ổn định toàn bộ khóa học 5 năm).`;
  }

  if (noTone.includes('cntt') || noTone.includes('cong nghe thong tin') || noTone.includes('ai') || noTone.includes('phan mem')) {
    return `Mức học phí ngành **Công nghệ thông tin, Phần mềm & AI** tại Đại học Nam Cần Thơ là khoảng **10 - 11 triệu đồng / học kỳ** (mỗi năm gồm 3 học kỳ, cam kết ổn định suốt khóa).`;
  }

  if (noTone.includes('kinh te') || noTone.includes('quan tri') || noTone.includes('marketing') || noTone.includes('logistics') || noTone.includes('luat') || noTone.includes('ngon ngu anh')) {
    return `Mức học phí khối ngành **Kinh tế, Quản trị, Marketing, Logistics, Luật và Ngôn ngữ Anh** tại DNC dao động khoảng **10 - 11 triệu đồng / học kỳ** (ổn định suốt toàn khóa).`;
  }

  return `### 💵 **Chính sách Học phí Đại học Nam Cần Thơ (Cam kết ổn định toàn khóa)**
Mỗi năm học gồm 3 học kỳ:
* **Nhóm ngành 1 (Kinh tế, CNTT, Luật, Ngôn ngữ, Du lịch...):** Khoảng **10 - 11 triệu đồng / học kỳ**.
* **Nhóm ngành 2 (Kiến trúc, Bất động sản, CNKT Hóa học, Thực phẩm...):** Khoảng **12 - 13 triệu đồng / học kỳ**.
* **Nhóm ngành 3 (CNKT Ô tô, Điện - Điện tử, Kỹ thuật xét nghiệm, Điều dưỡng...):** Khoảng **14 - 15 triệu đồng / học kỳ**.
* **Khối Sức khỏe đặc thù:**
  * **Dược học:** Khoảng **18 - 22 triệu đồng / học kỳ**.
  * **Y khoa & Răng - Hàm - Mặt:** Khoảng **45 - 50 triệu đồng / học kỳ** (đã bao gồm lâm sàng Bệnh viện DNC).`;
}

/**
 * Hàm tìm kiếm tri thức chuyên sâu DNC từ website nctu.edu.vn
 * Hỗ trợ nhận diện ý định chuẩn xác (Địa chỉ, Học phí, Mã ngành, Thời gian học, Tổ hợp môn)
 */
export function searchDncKnowledge(query: string): string | null {
  const normalized = query.toLowerCase().trim();
  const noTone = removeTones(normalized);

  // 1. Ý định ĐỊA CHỈ / Ở ĐÂU / VỊ TRÍ
  const isAddressQuery =
    noTone.includes('dia chi') ||
    noTone.includes('o dau') ||
    noTone.includes('cho nao') ||
    noTone.includes('nam o dau') ||
    noTone.includes('tai dau') ||
    noTone.includes('vi tri') ||
    noTone.includes('toa lac') ||
    noTone.includes('duong nao') ||
    noTone.includes('dia diem') ||
    noTone.includes('tim duong') ||
    noTone.includes('o quan nao') ||
    noTone.includes('o tinh nao');

  if (isAddressQuery) {
    return resolveDncAddress(noTone);
  }

  // 2. Ý định HỌC PHÍ / BAO NHIÊU TIỀN
  const isTuitionQuery =
    noTone.includes('hoc phi') ||
    noTone.includes('bao nhieu tien') ||
    noTone.includes('tien hoc') ||
    noTone.includes('chi phi hoc') ||
    noTone.includes('dong bao nhieu') ||
    noTone.includes('dong tien') ||
    noTone.includes('bieu phi') ||
    noTone.includes('muc phi');

  if (isTuitionQuery) {
    return resolveDncTuition(noTone);
  }

  // 3. Ý định MÃ NGÀNH / MÃ XÉT TUYỂN
  const isCodeQuery =
    noTone.includes('ma nganh') ||
    noTone.includes('ma xet tuyen') ||
    noTone.includes('ma tuyen sinh') ||
    noTone.includes('ma code');

  if (isCodeQuery) {
    const major = findMajorByQuery(noTone);
    if (major) {
      const match = major.answer.match(/\*\*Mã ngành:\*\*\s*`?([0-9A-Z]+)`?/);
      const code = match ? match[1] : '';
      const nameMatch = major.question.match(/ngành\s+([^(]+)\s*\(/i);
      const name = nameMatch ? nameMatch[1].trim() : major.id;
      return `Mã ngành của ngành **${name}** tại Trường Đại học Nam Cần Thơ là: \`${code}\`.`;
    }
  }

  // 4. Ý định THỜI GIAN ĐÀO TẠO / MẤY NĂM HỌC
  const isDurationQuery =
    noTone.includes('may nam') ||
    noTone.includes('thoi gian dao tao') ||
    noTone.includes('thoi gian hoc') ||
    noTone.includes('hoc bao lau') ||
    noTone.includes('bao nhieu nam') ||
    noTone.includes('may hoc ky');

  if (isDurationQuery) {
    const major = findMajorByQuery(noTone);
    if (major) {
      const match = major.answer.match(/\*\*Thời gian đào tạo:\*\*\s*([^\n*]+)/);
      const dur = match ? match[1].trim() : '';
      const degreeMatch = major.answer.match(/\*\*Văn bằng tốt nghiệp:\*\*\s*([^\n*]+)/);
      const degree = degreeMatch ? degreeMatch[1].trim() : '';
      const nameMatch = major.question.match(/ngành\s+([^(]+)\s*\(/i);
      const name = nameMatch ? nameMatch[1].trim() : major.id;
      return `Thời gian đào tạo ngành **${name}** tại Đại học Nam Cần Thơ là **${dur}**${degree ? `, sinh viên tốt nghiệp được cấp bằng **${degree}**` : ''}.`;
    }
  }

  // 5. Ý định TỔ HỢP XÉT TUYỂN
  const isSubjectGroupQuery =
    noTone.includes('to hop') ||
    noTone.includes('khoi nao') ||
    noTone.includes('mon nao') ||
    noTone.includes('xet khoi gi');

  if (isSubjectGroupQuery) {
    const major = findMajorByQuery(noTone);
    if (major) {
      const match = major.answer.match(/\*\*Tổ hợp xét tuyển:\*\*\s*([^\n]+)/);
      const rawGroups = match ? match[1].trim() : '';
      const formatted = formatSubjectGroups(rawGroups);
      const nameMatch = major.question.match(/ngành\s+([^(]+)\s*\(/i);
      const name = nameMatch ? nameMatch[1].trim() : major.id;
      return `Các tổ hợp môn xét tuyển ngành **${name}** tại Trường Đại học Nam Cần Thơ gồm có:\n\n${formatted}`;
    }
  }

  // 6. Tra cứu trực tiếp theo mã ngành 7 chữ số (ví dụ 7720101, 7480201...)
  const codeMatch = normalized.match(/\b(7[0-9]{6})\b/);
  if (codeMatch) {
    const code = codeMatch[1];
    const found = DNC_KNOWLEDGE_BASE.find((item) => item.keywords.includes(code));
    if (found) {
      let clean = found.answer;
      const match = clean.match(/\*\*Tổ hợp xét tuyển:\*\*\s*(\[\{.+?\}\])/);
      if (match) clean = clean.replace(match[0], `**Tổ hợp xét tuyển:**\n${formatSubjectGroups(match[1])}`);
      return clean;
    }
  }

  // 7. Ý định Phương thức tuyển sinh cụ thể (100, 200, 402, 407, 411)
  if (
    noTone.includes('phuong thuc xet') ||
    noTone.includes('xet hoc ba') ||
    noTone.includes('100') ||
    noTone.includes('200') ||
    noTone.includes('402') ||
    noTone.includes('407') ||
    noTone.includes('411')
  ) {
    const admItem = DNC_KNOWLEDGE_BASE.find((item) => item.id === 'dnc-phuong-thuc-xet-tuyen');
    if (admItem) return admItem.answer;
  }

  // 8. Ý định Câu lạc bộ (CLB)
  if (noTone.includes('cau lac bo') || noTone.includes('clb')) {
    const clubItem = DNC_KNOWLEDGE_BASE.find((item) => item.id === 'dnc-cau-lac-bo-tong-hop');
    if (clubItem) return clubItem.answer;
  }

  // 8.5. Ý định Ký túc xá DNC (KTX) - Tiện nghi, đăng ký phòng, cơ sở vật chất
  if (noTone.includes('ky tuc xa') || noTone.includes('ktx') || noTone.includes('noi tru')) {
    if (
      (noTone.includes('gia') || noTone.includes('chi phi') || noTone.includes('bao nhieu tien') || noTone.includes('tien phong') || noTone.includes('dong tien') || noTone.includes('phi')) &&
      !noTone.includes('tien nghi') &&
      !noTone.includes('dang ky')
    ) {
      return resolveDncTuition('ktx');
    }
    return `### 🏢 **Ký túc xá Đại học Nam Cần Thơ (DNC)**

Khu phức hợp Ký túc xá DNC tọa lạc ngay bên trong khuôn viên trường (Số 168, Đường Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ) với sức chứa hơn **2.000 sinh viên**:

* **Tiện nghi phòng ở & Cơ sở vật chất:**
  * Có 2 loại phòng: **Phòng quạt tiêu chuẩn** và **Phòng máy lạnh hiện đại**.
  * Trang bị sẵn: Giường tầng chắc chắn, nệm, bàn ghế học tập cá nhân, tủ đồ cá nhân có khóa riêng, quạt trần, máy lạnh và bình tắm nước nóng lạnh.
  * Mạng Wifi tốc độ cao bao phủ toàn bộ các tòa nhà KTX.
  * An ninh đảm bảo tuyệt đối: Camera giám sát 24/7, đội ngũ bảo vệ túc trực và hệ thống kiểm soát ra vào bằng thẻ từ sinh viên.
  * Tiện ích sinh hoạt liền kề: Nhà ăn căng-tin sinh viên giá bình dân, siêu thị mini tiện lợi, khu dịch vụ giặt sấy, phòng tập Gym, hồ bơi và khu liên hợp thể thao (sân bóng đá, tennis, pickleball).

* **Chi phí lưu trú tham khảo:**
  * **Phòng quạt:** Khoảng **450.000đ - 600.000đ / tháng / sinh viên**.
  * **Phòng máy lạnh:** Khoảng **800.000đ - 1.200.000đ / tháng / sinh viên**.
  * Tiền điện, nước tính theo chỉ số đồng hồ riêng của từng phòng theo khung giá ưu đãi sinh viên của nhà nước.

* **Cách thức đăng ký phòng Ký túc xá:**
  * **Cách 1 (Đăng ký Online):** Bạn có thể nộp đơn trực tuyến ngay trên **Cổng HTSV** tại mục **"Hỗ trợ"** hoặc **"Đời sống sinh viên"** → Chọn thủ tục **"Đăng ký phòng Ký túc xá DNC"**.
  * **Cách 2 (Đăng ký trực tiếp):** Đến trực tiếp **Văn phòng Ban Quản lý Ký túc xá DNC** (tại sảnh tầng trệt Khu KTX của trường) để được cán bộ hướng dẫn chọn phòng và làm thủ tục nhận phòng.
  * **Hotline hỗ trợ KTX DNC:** Tổng đài trường \`02923 798 222\` - \`02923 798 333\`.`;
  }

  // 9. Câu hỏi về Cơ sở thực hành tại Bệnh viện Đại học Nam Cần Thơ
  if (
    noTone.includes('benh vien') &&
    (noTone.includes('thuc hanh') || noTone.includes('co so') || noTone.includes('lam sang') || noTone.includes('ra sao') || noTone.includes('the nao') || noTone.includes('co gi') || noTone.includes('dao tao'))
  ) {
    return `### 🏥 **Cơ sở thực hành tại Bệnh viện Đại học Nam Cần Thơ**

Bệnh viện Đại học Nam Cần Thơ là cơ sở thực hành lâm sàng trực tiếp cho toàn bộ sinh viên khối ngành Sức khỏe (Y khoa, Dược học, Răng - Hàm - Mặt, Điều dưỡng, Kỹ thuật xét nghiệm y học, Kỹ thuật hình ảnh y học...):

* **Quy mô đạt chuẩn quốc tế:** Bệnh viện đa khoa quốc tế với quy mô giai đoạn 1 là **300 giường bệnh** đạt chứng nhận tiêu chuẩn chất lượng AACI Hoa Kỳ. Trường đã khởi công xây dựng giai đoạn 2 (Bệnh viện Quốc tế 1.500 tỷ đồng) nâng quy mô lên 1.000 giường theo mô hình Trung tâm Y học học thuật (Academic Medical Center).
* **Vị trí thuận tiện:** Tọa lạc ngay bên trong khuôn viên Trường Đại học Nam Cần Thơ (Số 168, Đường Nguyễn Văn Cừ nối dài, P. An Bình, Q. Ninh Kiều, TP. Cần Thơ).
* **Trang thiết bị tiên tiến:** Hệ thống phòng mổ vô trùng áp lực âm, máy chụp cộng hưởng từ MRI, CT-Scanner đa lát cắt, máy siêu âm màu 4D, hệ thống xét nghiệm tự động hóa.
* **Quyền lợi sinh viên:** Sinh viên được thực tập lâm sàng thực tế, tiếp xúc bệnh nhân và theo học trực tiếp cùng các Giáo sư, Tiến sĩ, Bác sĩ chuyên khoa giàu kinh nghiệm; đồng thời sinh viên được đăng ký khám chữa bệnh BHYT ban đầu đúng tuyến ngay tại bệnh viện.
* **Hotline hỗ trợ & cấp cứu:** \`02923 686 868\`.`;
  }

  // 10. Câu hỏi về Showroom Ô tô Nam Cần Thơ DNC có gì đặc biệt / thực hành
  if (
    noTone.includes('showroom') &&
    (noTone.includes('co gi') || noTone.includes('thuc hanh') || noTone.includes('dac biet') || noTone.includes('ra sao') || noTone.includes('the nao'))
  ) {
    return `### 🚗 **Showroom Ô tô Nam Cần Thơ DNC & Xưởng bảo dưỡng thực hành**

Showroom Ô tô Nam Cần Thơ DNC là mô hình doanh nghiệp trong trường đại học tiên phong của trường DNC:
* **Vị trí:** Tọa lạc ngay trong khuôn viên Trường Đại học Nam Cần Thơ (Số 168, Đường Nguyễn Văn Cừ nối dài, TP. Cần Thơ).
* **Quy mô:** Khu trưng bày và kinh doanh các dòng xe ô tô hiện đại, kết hợp xưởng bảo hành, bảo dưỡng, sửa chữa cơ khí - điện ô tô quy mô lớn.
* **Thực hành sinh viên:** Sinh viên ngành Công nghệ Kỹ thuật Ô tô được cầm đồ nghề thực hành trực tiếp trên các dòng xe hiện đại (cả xe động cơ truyền thống và ô tô điện thông minh) ngay từ những năm học đầu tiên.`;
  }

  // 11. Câu hỏi về Khu thực hành Du lịch Sinh thái – Resort DNC
  if (
    noTone.includes('resort') ||
    noTone.includes('khu sinh thai') ||
    (noTone.includes('du lich') && (noTone.includes('sinh thai') || noTone.includes('bungalow')))
  ) {
    const resortItem = DNC_KNOWLEDGE_BASE.find((item) => item.id === 'dnc-resort');
    if (resortItem) return resortItem.answer;
  }

  // 12. Tìm kiếm tổng quan ngành học (CHỈ KHI người dùng thực sự hỏi về ngành học cụ thể)
  const isAskingAboutMajor =
    noTone.includes('nganh ') ||
    noTone.startsWith('nganh') ||
    noTone.includes('chuyen nganh') ||
    noTone.includes('hoc nganh') ||
    noTone.includes('thong tin ve nganh') ||
    noTone.includes('tim hieu nganh') ||
    noTone.includes('gioi thieu nganh');

  if (isAskingAboutMajor) {
    const major = findMajorByQuery(noTone);
    if (major) {
      let clean = major.answer;
      const match = clean.match(/\*\*Tổ hợp xét tuyển:\*\*\s*(\[\{.+?\}\])/);
      if (match) clean = clean.replace(match[0], `**Tổ hợp xét tuyển:**\n${formatSubjectGroups(match[1])}`);
      return clean;
    }
  }

  return null;
}
