# FRONTEND DESIGN BRIEF: CỔNG HỖ TRỢ SINH VIÊN (HTSV)
**Dự án:** Hỗ Trợ Sinh Viên (HTSV Student Support Portal)  
**Tài liệu:** Bản đặc tả kiến trúc giao diện & trải nghiệm người dùng (UI/UX)  
**Tác giả:** Antigravity (UI/UX Designer & Reviewer)  
**Kỹ sư triển khai:** Codex (Frontend Implementation Engineer)  
**Tài liệu tham chiếu:**
- Triết lý thị giác: [Liquid Glass Design](https://liquidglassdesign.com/) (Kính quang học, khúc xạ, specular highlight, depth phân lớp)
- Bố cục & Nghiệp vụ: Cổng thông tin sinh viên thực tế (Layout tham chiếu: Topbar, Sidebar phân nhóm, Lịch tuần này dạng sổ còng, Lưới dịch vụ học tập & công tác sinh viên)

---

## 1. PHẠM VI & NGUYÊN TẮC BẮT BUỘC (MANDATORY RULES)

> [!IMPORTANT]
> **FRONTEND ONLY**: Nghiêm cấm tuyệt đối chỉnh sửa backend, API controller/service, Prisma schema, migrations, database, session cookies, hoặc file cấu hình máy chủ. Mọi cải tiến chỉ diễn ra bên trong `apps/web/` hoặc file tài liệu `docs/`.

### 1.1. Đúng bản chất "Web Hỗ Trợ Sinh Viên"
- **Đối tượng sử dụng chính**: Sinh viên đại học (cần giải quyết thủ tục nhanh, tra cứu lịch học, nộp yêu cầu giấy tờ, đọc FAQ, giao lưu diễn đàn).
- **Tránh sai lầm thiết kế (Anti-Pattern)**: Tuyệt đối không làm giao diện thành bảng điều khiển SaaS doanh nghiệp chung chung (không có Analytics, Revenue, MRR, Conversion rate, v.v.).
- **Nghiệp vụ trọng tâm của sinh viên**:
  1. **Xin giấy xác nhận sinh viên** (Vay vốn ngân hàng, tạm hoãn nghĩa vụ quân sự, vé xe buýt, thực tập).
  2. **Hỗ trợ học vụ** (Đăng ký học phần, đổi lớp, hoãn thi, phúc khảo điểm).
  3. **Học phí & Học bổng** (Tra cứu học phí, tài khoản đóng học phí, học bổng khuyến khích).
  4. **Lịch tuần này / Lịch học & Lịch thi** (Thời khóa biểu theo ngày, phòng máy, giảng viên).
  5. **Dịch vụ giấy tờ & BHYT** (Gia hạn BHYT, cấp lại thẻ sinh viên, sổ đoàn viên).
  6. **Gửi yêu cầu hỗ trợ 1 cửa & Theo dõi trạng thái yêu cầu** (Đang chờ duyệt $\rightarrow$ Đang xử lý $\rightarrow$ Đã hoàn thành).
  7. **Hỏi đáp / FAQ học đường** (Các câu hỏi thường gặp).
  8. **Diễn đàn / Confession sinh viên** (Kết nối dữ liệu thực từ module `/forum` hiện có).

### 1.2. Ứng dụng Liquid Glass có chọn lọc
- **Nơi dùng Liquid Glass**:
  - Top Navigation Bar (Header)
  - Hộp tìm kiếm thông minh (Search Bar)
  - Thẻ lịch tuần này (Weekly Schedule Binder Cards)
  - Các ô lưới dịch vụ nhanh (Service Quick Action Tiles)
  - Thẻ theo dõi yêu cầu hỗ trợ (Support Request Tracker)
  - Dialog / Modal gửi yêu cầu hỗ trợ (GlassModal)
  - Thẻ profile sinh viên và thanh reaction nổi
- **Nơi giữ nền đục (Opaque/Solid)**:
  - Form nhập liệu, bảng điểm, danh sách câu hỏi FAQ dài, nội dung chi tiết bài viết. Phải đảm bảo chuẩn độ tương phản WCAG AA (tối thiểu 4.5:1) trên mọi điều kiện ánh sáng.

---

## 2. KIẾN TRÚC THÔNG TIN & BỐ CỤC TỔNG THỂ (INFORMATION ARCHITECTURE)

Lấy cảm hứng trực tiếp từ giao diện cổng sinh viên thực tế (tham chiếu trường Đại học Nam Cần Thơ), hệ thống được cấu trúc thành 3 khối chính:

```
┌────────────────────────────────────────────────────────────────────────┐
│ TOPBAR (Liquid Glass Header):                                          │
│ [☰] [Logo HTSV] ─── [🔎 Tìm kiếm dịch vụ, giấy tờ, FAQ...] ─── [🔔] [Apps] [Avatar]│
├──────────────┬─────────────────────────────────────────────────────────┤
│ SIDEBAR      │ MAIN STUDENT WORKSPACE                                  │
│ (Glass Nav): │ 1. HERO BANNER: Chào sinh viên + Ô tìm kiếm thủ tục     │
│              │ 2. WIDGET "LỊCH TUẦN NÀY": Dạng sổ còng (Binder strip)  │
│ • Trang chủ  │    Thứ 2 (1 tiết) | Thứ 3 (2 tiết) | Hôm nay...         │
│ • Cổng hỗ trợ│ 3. DỊCH VỤ & TIỆN ÍCH HỌC TẬP (Lưới 8 ô icon màu)       │
│ • Giấy tờ SV │    Thời khóa biểu, Đăng ký môn, Bảng điểm, BHYT...      │
│ • Học phí    │ 4. THEO DÕI YÊU CỦA TÔI (Tracker tiến độ hồ sơ)         │
│ • Lịch học   │ 5. HỎI ĐÁP / FAQ PHỔ BIẾN (Học vụ, BHYT, Học phí)       │
│ • Diễn đàn   │ 6. BẢNG TIN CONFESSION NỔI BẬT (API /forum/posts)       │
└──────────────┴─────────────────────────────────────────────────────────┘
```

---

## 3. CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN (COMPONENT SPECIFICATIONS)

### 3.1. Top Navigation Bar (`PortalLayout.tsx`)
- **Hiệu ứng Liquid Glass**: `sticky top-0 z-30`, `backdrop-filter: blur(16px) saturate(180%)`, nền `rgba(255, 255, 255, 0.82)`, viền dưới `border-b border-white/80`, bóng mờ tinh tế `box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05)`.
- **Cấu trúc từ trái sang phải**:
  1. **Nút Hamburger (Mobile & Tablet toggle)**: Bật/tắt Drawer Sidebar linh hoạt trên màn hình dưới 1024px.
  2. **Thương hiệu HTSV**: Logo biểu tượng ngọn lửa tri thức & mũ cử nhân cách điệu, tên cổng: **"CỔNG HỖ TRỢ SINH VIÊN"**.
  3. **Thanh tìm kiếm thông minh (Quick Search Pill)**: Ô tìm kiếm bo tròn `rounded-full` dạng kính mờ, placeholder: *"Tìm giấy xác nhận, học phí, lịch thi, câu hỏi FAQ..."*, phím tắt `⌘K` hoặc icon kính lúp.
  4. **Khu vực thao tác cá nhân**:
     - Chuông thông báo (Notification Bell) với chấm đỏ báo tin mới.
     - Lối tắt Diễn đàn Confession.
     - Nút Quản trị (hiện khi có vai trò `ADMIN`).
     - Avatar sinh viên kèm tên, khi bấm mở dropdown: *Hồ sơ sinh viên, Trạng thái yêu cầu, Đổi mật khẩu, Đăng xuất*.

---

### 3.2. Sidebar Điều Hướng Sinh Viên (Student Navigation Drawer/Sidebar)
Phân nhóm khoa học, thân thuộc với sinh viên đại học:
- **Nhóm 1: Tổng quan**:
  - Trang chủ (`/`) - Icon Home
  - Thông báo chung (`/announcements`) - Icon Bell
- **Nhóm 2: Cổng Hỗ Trợ & Dịch Vụ**:
  - Gửi yêu cầu hỗ trợ (`/support`) - Icon Headset/Support
  - Dịch vụ giấy tờ 1 cửa (`/services`) - Icon Document
  - Theo dõi yêu cầu của tôi (`/requests`) - Icon ClipboardCheck
  - Hỏi đáp / FAQ (`/faq`) - Icon HelpCircle
- **Nhóm 3: Học Tập & Đời Sống**:
  - Lịch học & Lịch thi (`/schedule`) - Icon Calendar
  - Học phí & Bảo hiểm y tế (`/tuition`) - Icon Wallet
  - Đăng ký ký túc xá (`/dorm`) - Icon HomeModern
- **Nhóm 4: Cộng Đồng**:
  - Diễn đàn Confession (`/forum`) - Icon ChatBubbleLeftRight

*Ghi chú kỹ thuật*: Trên desktop ($\ge$1024px), sidebar nằm cố định bên trái `w-64` dạng kính mờ thanh lịch; trên mobile/tablet (<1024px), sidebar tự động co vào slide-over drawer mượt mà, không bao giờ làm vỡ layout.

---

### 3.3. Widget "Lịch Tuần Này" (Weekly Schedule Binder Strip)
Mô phỏng chân thực và hiện đại phong cách sổ còng sinh viên:
- **Phần đầu sổ**: Các vòng còng kim loại nhỏ `0 0 0 0` tạo cảm giác sổ tay sinh viên chân thực.
- **Dải thẻ 7 ngày (Thứ 2 $\rightarrow$ Chủ Nhật)**:
  - Header mỗi thẻ: Ngày trong tháng lớn (VD: `28/09`), Thứ trong tuần, nhãn phụ (VD: `1 tiết học`).
  - **Thẻ Hôm Nay (Active Day)**: Viền kính xanh sáng (`border-blue-500/80`), nền kính phủ nhẹ vệt sáng xanh dương, có badge "Hôm nay".
  - **Nội dung ca học trong thẻ**:
    - Thời gian: `13:00 - 17:15` (Badge xanh lá nhẹ).
    - Tên môn: **Thiết kế đồ họa - Thực hành** (chữ đậm sắc nét).
    - Phòng học: `📍 I3-03 (Phòng máy 3)`.
    - Giảng viên: `👤 ThS. Nguyễn Việt Nga`.
  - Ngày không có tiết: Hiển thị minh họa cây bút chì nhẹ nhàng và dòng chữ *"Không có tiết học"*.
  - Góc trên bên phải có nút: *"Xem chi tiết thời khóa biểu →"*.

---

### 3.4. Lưới Dịch Vụ Nhanh (Service Quick Action Grid)
Chia làm 2 nhóm thẻ biểu tượng thân thiện (mỗi ô là một `liquid-glass-card` bo tròn 16px, có icon nét vẽ màu sắc nổi bật, hiệu ứng hover nhấc nhẹ `translateY(-3px)`):

#### Nhóm 1: Học Tập & Học Vụ (8 dịch vụ)
1. 📅 **Thời khóa biểu**: Tra cứu lịch học, lịch thực hành máy tính.
2. 💻 **Lớp học phần**: Danh sách nhóm lớp, tài liệu bài giảng.
3. 📝 **Kết quả học tập**: Xem điểm quá trình, điểm thi kết thúc môn.
4. ✍️ **Đăng ký học phần**: Đăng ký môn học kỳ mới, rút môn học.
5. 📚 **Chương trình đào tạo**: Khung chương trình đào tạo tích lũy tín chỉ.
6. 🎓 **Tình trạng tốt nghiệp**: Tra cứu điều kiện chuẩn đầu ra, tín chỉ.
7. 🎖️ **Chứng chỉ & Ngoại ngữ**: Tra cứu chứng chỉ tin học, tiếng Anh.
8. 📋 **Điểm rèn luyện**: Tự đánh giá và theo dõi điểm rèn luyện từng kỳ.

#### Nhóm 2: Dịch Vụ & Tiện Ích Sinh Viên (10 dịch vụ)
1. 📢 **Thông báo phòng Đào tạo**: Các thông báo khẩn, lịch nghỉ lễ.
2. 🎧 **Cổng hỗ trợ 1 cửa**: Gửi phản ánh, đề nghị hỗ trợ học vụ.
3. 💡 **Góp ý sinh viên**: Kênh lắng nghe ý kiến đóng góp cho nhà trường.
4. 📄 **Dịch vụ giấy tờ**: Đăng ký nhận giấy tờ trực tuyến.
5. ✉️ **Đăng ký chứng nhận**: Xin giấy xác nhận sinh viên, vay vốn, hoãn NVQS.
6. 💳 **Học phí**: Xem định mức học phí, hóa đơn điện tử, số tài khoản thu.
7. 🛡️ **Bảo hiểm y tế**: Tra cứu hạn BHYT, thủ tục gia hạn trực tuyến.
8. 👥 **Hoạt động sinh viên**: Hoạt động Đoàn - Hội, chiến dịch tình nguyện.
9. 📖 **Tài liệu chung**: Biểu mẫu đơn từ quy chuẩn của nhà trường.
10. 🏠 **Đăng ký Ký túc xá**: Xét duyệt chỗ ở nội trú, báo hỏng phòng.

*Cơ chế tương tác*: Khi sinh viên bấm vào các dịch vụ cần nộp đơn (như *Đăng ký chứng nhận*, *Cổng hỗ trợ*, *Dịch vụ giấy tờ*), hệ thống mở ngay **Modal Gửi Yêu Cầu Hỗ Trợ (SubmitRequestModal)** với các trường thông tin điền sẵn loại thủ tục!

---

### 3.5. Khu Vực "Theo Dõi Yêu Cầu Hỗ Trợ" (Request Tracker)
Hiển thị danh sách các hồ sơ/yêu cầu sinh viên đã gửi tới phòng ban nhà trường:
- Bảng thẻ hiển thị:
  - Mã hồ sơ (VD: `#YC-2026-0819`)
  - Loại thủ tục: *Giấy xác nhận sinh viên (Tạm hoãn NVQS)*
  - Ngày nộp: *26/09/2026*
  - Trạng thái: `StatusBadge` rõ ràng:
    - 🟡 **Chờ tiếp nhận**: Đang gửi đến Phòng Công tác sinh viên.
    - 🔵 **Đang xử lý**: Cán bộ đang in ấn và ký duyệt.
    - 🟢 **Sẵn sàng nhận**: Mời sinh viên đến Ô số 3 - Tòa nhà A để nhận hoặc tải bản PDF có ký số.
  - Nút bấm *"Xem chi tiết hồ sơ"* hoặc *"Hủy yêu cầu"*.
  - Nút chính: **"+ Gửi yêu cầu hỗ trợ mới"** (dạng `btn-liquid-glass primary`).

---

### 3.6. Khu Vực "Hỏi Đáp / FAQ Nhanh"
Các câu hỏi học vụ phổ biến nhất dưới dạng Accordion đóng/mở mượt mà:
- *Làm thế nào để xin cấp lại thẻ sinh viên khi bị mất?*
- *Hạn chót đóng học phí học kỳ này là ngày nào và có được gia hạn không?*
- *Quy trình xin hoãn thi vì lý do sức khỏe như thế nào?*
- *Làm sao để đăng ký học vượt hoặc học cải thiện điểm?*

---

### 3.7. Khu Vực "Diễn Đàn Confession Nổi Bật" (Tích hợp API thực)
- Hiển thị 2-3 bài viết mới nhất lấy trực tiếp từ TanStack Query gọi endpoint `/forum/posts` hiện có của hệ thống!
- Giúp sinh viên từ trang chủ vừa theo dõi được thủ tục hành chính, vừa nắm bắt được không khí thảo luận sôi nổi của cộng đồng sinh viên.
- Có nút chuyển nhanh: *"Vào Diễn đàn trao đổi →"*.

---

## 4. HỆ THỐNG MÀU SẮC & PHONG CÁCH LIQUID GLASS CHI TIẾT

```css
:root {
  /* Bảng màu nhận diện HTSV */
  --htsv-canvas: #f8fafc;
  --htsv-primary: #2563eb;
  --htsv-primary-hover: #1d4ed8;
  --htsv-primary-light: rgba(37, 99, 235, 0.08);
  
  /* Liquid Glass Surface Tokens */
  --glass-bg: rgba(255, 255, 255, 0.82);
  --glass-border: rgba(255, 255, 255, 0.9);
  --glass-specular: inset 0 1px 0 0 rgba(255, 255, 255, 0.95);
  --glass-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02);
  --glass-shadow-hover: 0 16px 36px -6px rgba(37, 99, 235, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.03);
}
```

---

## 5. HƯỚNG DẪN DÀNH CHO KỸ SƯ CODEX

1. **Trang chủ mới**: Cập nhật route `/` trong `apps/web/src/App.tsx` trỏ tới trang chủ sinh viên `StudentHomePage.tsx` thay vì redirect thẳng sang `/forum`.
2. **Quản lý dữ liệu yêu cầu hỗ trợ (Client State)**:
   - Vì backend hiện tại chưa có bảng lưu đơn từ sinh viên (chỉ có bảng bài viết forum, báo cáo và user), Codex tạo một store nhẹ hoặc lưu `localStorage` cho danh sách yêu cầu hỗ trợ sinh viên trong `apps/web/src/features/student/` để sinh viên có thể tạo yêu cầu, theo dõi trạng thái, lọc tìm kiếm một cách chân thực 100% mà **hoàn toàn không sửa backend**!
3. **Các API hiện có (Auth, Forum, Admin)**: Giữ nguyên 100% kết nối backend thật qua `apiClient`.

Codex hãy triển khai theo danh mục công việc chi tiết trong [**`docs/AI_HANDOFF.md`**](file:///E:/Du_an_ho_tro_sv/docs/AI_HANDOFF.md).
