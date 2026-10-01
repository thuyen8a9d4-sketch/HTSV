# AI HANDOFF: CODEX IMPLEMENTATION CHECKLIST
**Dự án:** HTSV (Cổng Hỗ Trợ Sinh Viên)  
**Nhiệm vụ:** Xây dựng giao diện Cổng Hỗ Trợ Sinh Viên (Student Support Portal) kết hợp ngôn ngữ Liquid Glass theo [docs/FRONTEND_BRIEF.md](FRONTEND_BRIEF.md) và ảnh tham chiếu thực tế.  
**Kỹ sư thực hiện:** Codex (Frontend Implementation Engineer)  
**Reviewer:** Anti (UI/UX Designer & Reviewer)  
**Quy tắc bất di bất dịch:** **FRONTEND ONLY**. Tuyệt đối không sửa backend, API, Prisma schema, migrations, database.

---

## DANH MỤC CÔNG VIỆC DÀNH CHO CODEX (PRIORITIZED CHECKLIST)

### GIAI ĐOẠN 1: MÔ HÌNH DỮ LIỆU & STATE SINH VIÊN CLIENT-SIDE
- [x] **Task 1.1**: Tạo thư mục `apps/web/src/features/student/` chứa:
  - `student-types.ts`: Định nghĩa kiểu dữ liệu cho Lịch học (ca học, phòng máy, giảng viên), Dịch vụ sinh viên, Yêu cầu hỗ trợ (mã YC, loại thủ tục, trạng thái, ngày gửi), và câu hỏi FAQ.
  - `student-mock-data.ts`: Dữ liệu lịch học tuần này (tương tự ảnh tham chiếu: Thứ 2, Thứ 3, Thứ 4... với môn Thiết kế đồ họa, Quản trị mạng máy tính, Lập trình di động...), danh mục 18 dịch vụ sinh viên, và 5 câu hỏi FAQ học vụ thường gặp.
  - `student-store.ts`: Zustand store (hoặc localStorage) quản lý danh sách yêu cầu sinh viên đã gửi, cho phép tạo yêu cầu mới và cập nhật trạng thái ngay trên client.

---

### GIAI ĐOẠN 2: NÂNG CẤP KHUNG GIAO DIỆN CHÍNH (`PortalLayout.tsx`)
- [x] **Task 2.1**: Tái cấu trúc `apps/web/src/layouts/PortalLayout.tsx` thành chuẩn Cổng Sinh Viên:
  - **Top Header Liquid Glass**:
    - Nút Hamburger mở Sidebar Drawer trên mobile/tablet (<1024px).
    - Logo HTSV + Tên cổng: "CỔNG HỖ TRỢ SINH VIÊN" kèm biểu tượng trường học.
    - Thanh tìm kiếm kính mờ trung tâm: "Tìm kiếm dịch vụ, giấy tờ, câu hỏi FAQ...".
    - Icon chuông thông báo có badge đỏ, icon chuyển nhanh Diễn đàn, nút Quản trị (nếu admin).
    - Avatar sinh viên kèm tên, dropdown menu cá nhân & nút Đăng xuất.
  - **Sidebar Sinh Viên Trái (Collapsible/Drawer)**:
    - 4 nhóm menu:
      1. *Tổng quan*: Trang chủ, Thông báo chung.
      2. *Cổng hỗ trợ & Dịch vụ*: Gửi yêu cầu, Dịch vụ giấy tờ, Theo dõi yêu cầu, Hỏi đáp FAQ.
      3. *Học tập & Đời sống*: Lịch học & Lịch thi, Học phí & BHYT, Đăng ký Ký túc xá.
      4. *Cộng đồng*: Diễn đàn Confession (liên kết sang `/forum`).
    - Nằm cố định `w-64` trên desktop, tự động thành Drawer trượt mượt mà trên mobile/tablet.

---

### GIAI ĐOẠN 3: XÂY DỰNG TRANG CHỦ SINH VIÊN (`StudentHomePage.tsx`)
- [x] **Task 3.1**: Tạo trang `apps/web/src/features/student/StudentHomePage.tsx`:
  - **Hero Welcome & Quick Search Bar**:
    - Lời chào: *"Xin chào! Hôm nay bạn cần hỗ trợ thủ tục gì?"*.
    - Ô tìm kiếm lớn bo tròn Liquid Glass với gợi ý tức thì (Xin giấy xác nhận SV, Hoãn thi, BHYT, Vay vốn, Học phí...).
  - **Widget "Lịch tuần này" (Weekly Schedule Binder Strip)**:
    - Thiết kế đúng phong cách ảnh tham chiếu: Đầu thẻ có vòng sổ còng `0 0 0 0`.
    - Dải 7 ngày trong tuần; ngày hôm nay có viền kính xanh sáng và badge "Hôm nay".
    - Các thẻ ca học hiển thị rõ: Giờ học (`13:00 - 17:15`), Tên môn học, Phòng máy/giảng đường, Giảng viên.
    - Nút liên kết "Xem chi tiết thời khóa biểu →".
  - **Lưới Dịch Vụ Nhanh (Service Quick Action Grid)**:
    - Nhóm 1: *Học tập & Học vụ* (8 ô: Thời khóa biểu, Lớp học, Kết quả học tập, Đăng ký học phần, Chương trình đào tạo, Tình trạng tốt nghiệp, Chứng chỉ, Điểm rèn luyện).
    - Nhóm 2: *Dịch vụ & Tiện ích sinh viên* (10 ô: Thông báo, Cổng hỗ trợ, Góp ý, Dịch vụ giấy tờ, Đăng ký chứng nhận, Học phí, Bảo hiểm y tế, Hoạt động sinh viên, Tài liệu chung, Ký túc xá).
    - Mỗi ô là 1 `liquid-glass-card` có icon nét vẽ màu sắc nổi bật, khi click sẽ mở modal gửi yêu cầu hoặc hiển thị thông tin thủ tục.
  - **Widget "Theo Dõi Yêu Cầu Của Tôi" (Support Request Tracker)**:
    - Thẻ kính hiển thị danh sách hồ sơ sinh viên đã gửi kèm trạng thái (`StatusBadge`: Chờ tiếp nhận, Đang xử lý, Sẵn sàng nhận).
    - Nút nổi bật: **"+ Gửi yêu cầu hỗ trợ mới"**.
  - **Khu vực "Hỏi Đáp / FAQ Học Vụ"**:
    - Danh sách câu hỏi thường gặp dạng Accordion (Quy trình cấp lại thẻ, đóng học phí, hoãn thi, v.v.).
  - **Khu vực "Bảng Tin Confession Nổi Bật"**:
    - Fetch dữ liệu bài viết mới nhất từ API `/forum/posts` qua TanStack Query và hiển thị 2-3 thẻ bài viết kèm nút "Xem tất cả trên Diễn đàn →".

---

### GIAI ĐOẠN 4: MODAL GỬI YÊU CẦU HỖ TRỢ (`SubmitRequestModal.tsx`)
- [x] **Task 4.1**: Tạo component modal `apps/web/src/features/student/SubmitRequestModal.tsx`:
  - Ứng dụng `GlassModal` có sẵn.
  - Form chọn loại thủ tục (Xin giấy xác nhận SV, Hoãn thi, Cấp lại thẻ SV, Đăng ký KTX, Góp ý...).
  - Nhập họ tên, mã sinh viên, lý do yêu cầu và ghi chú.
  - Khi submit: lưu yêu cầu vào `student-store` và hiển thị thông báo thành công kèm mã hồ sơ để sinh viên theo dõi.

---

### GIAI ĐOẠN 5: ĐIỀU CHỈNH ROUTING TRONG `App.tsx`
- [x] **Task 5.1**: Cập nhật `apps/web/src/App.tsx`:
  - Chuyển route `/` từ `<Navigate to="/forum" replace />` sang render `<StudentHomePage />`.
  - Giữ nguyên các route `/forum`, `/forum/:id`, `/forum/new`, `/login`, `/register`, `/admin/*`.

---

### GIAI ĐOẠN 6: KIỂM TRA LINT & BUILD
- [x] **Task 6.1**: Chạy `pnpm --filter web lint` và sửa triệt để cảnh báo nếu có.
- [x] **Task 6.2**: Chạy `pnpm --filter web build` xác minh TypeScript biên dịch thành công 100%.
- [x] **Task 6.3**: Kiểm tra hiển thị responsive ở 360px, 768px, 1280px.
- [x] **Task 6.4**: Điền thông tin vào mục "Codex Implementation Notes" bên dưới.

---

## CODEX IMPLEMENTATION NOTES

- **Ngày thực hiện:** 27/09/2026.
- **Trạng thái:** Hoàn tất các task 1.1–6.4 trong phạm vi frontend. Mã ứng dụng nằm tại `E:\Du_an_ho_tro_sv\HTSV`.
- **Các file frontend đã tạo mới:**
  - `apps/web/src/features/student/student-types.ts`, `student-mock-data.ts`, `student-store.ts`: kiểu dữ liệu, 18 dịch vụ (8 học tập + 10 tiện ích), 5 FAQ, lịch 7 ngày tính theo tuần hiện tại và Zustand/localStorage.
  - `StudentHomePage.tsx`, `WeeklySchedule.tsx`, `StudentSearch.tsx`, `StudentIcon.tsx`, `student.css`: hero, tìm kiếm không dấu, lịch sổ còng, lưới dịch vụ và FAQ có liên kết mở trực tiếp câu hỏi.
  - `SubmitRequestModal.tsx`, `RequestTracker.tsx`: form React Hook Form/Zod, chọn sẵn thủ tục, sinh mã YC, chi tiết/tìm kiếm/lọc hồ sơ, hủy có xác nhận và mô phỏng tiến độ xử lý.
  - `FeaturedPosts.tsx`: tái sử dụng query key `forum-posts`, gọi `/forum/posts` qua `apiClient`, hiển thị 3 bài mới nhất và tôn trọng trạng thái ẩn danh.
  - `apps/web/scripts/verify-student-ui.cjs`: kiểm tra trình duyệt với Playwright đã có sẵn; toàn bộ API được giả lập trong trình duyệt thử nghiệm.
- **Các file frontend đã chỉnh sửa:**
  - `apps/web/src/layouts/PortalLayout.tsx`: header Glass, tìm kiếm nhanh, sidebar 4 nhóm, drawer dưới 1024px, hồ sơ cá nhân, số hồ sơ mẫu sẵn sàng nhận, quản trị theo role và đăng xuất hiện có.
  - `apps/web/src/App.tsx`: `/` hiển thị StudentHomePage; thêm `/schedule`, `/services`, `/requests`, `/faq`, `/support`, `/tuition`, `/dorm`, `/announcements`. Giữ các route Auth/Forum/Admin và ProtectedRoute. Tải trang sinh viên bằng lazy/Suspense.
  - `apps/web/src/main.tsx`: nhập CSS sinh viên sau CSS gốc để giữ đúng thứ tự layer Tailwind.
  - `apps/web/src/components/StatusBadge.tsx`: thêm WAITING/PROCESSING/READY/CANCELLED, giữ nguyên các trạng thái đang dùng.
- **Kết quả Lint & Build:**
  - Lint: **PASS**, không còn cảnh báo.
  - Build: **PASS**, TypeScript và Vite production; bundle chính 493 kB, module sinh viên 18,58 kB.
- **Kiểm tra UI và tương tác:**
  - 19 nhóm kiểm tra PASS trên Chrome ở 360/768/1280px; không tràn ngang toàn trang. Lịch có vùng cuộn ngang riêng.

---

## ANTI UI/UX REVIEW & RECOMMENDATIONS
*(Đánh giá trực quan bởi Anti - 27/09/2026)*

### 1. Đánh giá tổng quan (Overall Assessment): **XUẤT SẮC (EXCELLENT)**
- **Đúng chuẩn nghiệp vụ sinh viên**: Giao diện đã thoát hoàn toàn khỏi bóng dáng SaaS/Admin rập khuôn. Tái hiện xuất sắc các nhu cầu thường trực của sinh viên đại học (sổ còng thời khóa biểu tuần, 18 ô dịch vụ học tập & thủ tục 1 cửa, tracker hồ sơ, FAQ học đường và bảng tin confession).
- **Phân cấp thị giác**: Bố cục mạch lạc, thông thoáng, tương phản WCAG AA cao, màu sắc pastel hài hòa với tone xanh thương hiệu HTSV.
- **Co giãn di động (360px Mobile-first)**: Xuất sắc, không tràn ngang, các ô lưới co thành 2 cột vừa vặn, drawer trượt êm ái.

### 2. Các điểm tinh chỉnh nhẹ đề xuất cho Codex (Phase 7: Micro-refinements):
- [x] **Task 7.1 (Bật Liquid Glass nhẹ cho ô dịch vụ)**: Trong `apps/web/src/features/student/student.css`, hiện tại `.student-service` đang để `backdrop-filter: none`. Hãy bật nhẹ `backdrop-filter: blur(10px) saturate(150%)` và `-webkit-backdrop-filter: blur(10px) saturate(150%)` kết hợp viền specular `inset 0 1px 0 0 rgba(255, 255, 255, 0.95)` để khi cuộn qua vệt sáng ambient phía sau, các ô dịch vụ có cảm giác khúc xạ kính mờ đúng chuẩn Liquid Glass hơn.
- [x] **Task 7.2 (Scroll snap cho Lịch tuần này trên mobile)**: Thêm `scroll-snap-type: x mandatory` cho `.schedule-scroll` và `scroll-snap-align: start` cho `.schedule-day` để khi vuốt lịch trên điện thoại, các thẻ ngày dừng khựng lại ngay ngắn ở từng ca học.
- [x] **Task 7.3 (Nút đóng modal thanh lịch)**: Trong `apps/web/src/components/GlassModal.tsx`, nút đóng `✕` hiện tại đang có viền xanh tròn đậm (`border-blue-500`). Chuyển viền và màu nút đóng thành kính xám trung tính tinh tế (`text-slate-400 hover:text-slate-700 hover:bg-slate-100/70 border border-slate-200/50`) để nút Primary Action ("Lưu yêu cầu mẫu") nổi bật nhất trong modal.
- [x] **Task 7.4 (Hero Art trên màn hình 1024px-1439px)**: Cho phép `.student-hero-art` hiển thị từ breakpoint `lg:` (thay vì chỉ `min-width: 1440px`), scale nhẹ kích thước ở mức `scale(0.85)` để khoảng trống bên phải lời chào trên màn hình 1024px - 1366px (laptop sinh viên phổ thông) trông sinh động, ấm cúng hơn.

### CODEX PHASE 7 — ĐÃ HOÀN TẤT (27/09/2026)

- **7.1:** Bật blur 10px/saturate 150% cho ô dịch vụ, gồm tiền tố WebKit; giữ specular 0,95 cả khi hover. Có nền trắng khi không hỗ trợ backdrop-filter và tắt blur khi người dùng chọn giảm độ trong suốt.
- **7.2:** Thêm scroll snap ngang mandatory và căn đầu thẻ ngày, scroll padding 2px khớp khoảng lề của dải lịch.
- **7.3:** Nút đóng dùng viền/nền xám trung tính; focus bàn phím là outline xám 2px, bỏ quầng xanh nhưng giữ Tab trap, Escape và trả focus. Dùng icon slate-500 thay slate-400 để giữ tương phản trên nền sáng, hover slate-700; vùng bấm 46 × 44px. Viền xanh trước đó là focus indicator, không phải border-blue-500 cố định.
- **7.4:** Hero art hiện từ 1024px, scale 0,85 đến 1439px và kích thước gốc từ 1440px. Dùng class `student-hero-content` thay utility `max-w-2xl` để dành đúng khoảng trống cho art, tránh CSS utility ghi đè và chồng chữ/tìm kiếm.
- **File sửa:** `apps/web/src/features/student/student.css`, `StudentHomePage.tsx`, `apps/web/src/components/GlassModal.tsx`; tài liệu bàn giao và bằng chứng QA. Không sửa backend/API/database/dependency.
- **Lint:** PASS, không cảnh báo. **Build:** PASS, TypeScript + Vite, không cảnh báo; bundle chính 493,27 kB, chunk sinh viên 18,59 kB.
- Đã chạy `--filter web lint` và `--filter web build` bằng pnpm sẵn có tại `C:\Users\zuzong\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd`.
- **QA:** 11 kiểm tra trên Chrome gồm 360/768/1024/1280/1366/1439/1440px, không tràn trang hoặc chồng hero; scroll dừng tại thẻ thứ hai ở 138px; focus nút đóng, Tab/Escape/trả focus; nút đóng drawer Portal/Admin và reduced transparency. Không có lỗi JavaScript. Đã xem trực tiếp ảnh laptop và modal mobile.
- **Bằng chứng:** [kết quả Phase 7](student-qa/phase-7/results.json), [hero 1024px](student-qa/phase-7/home-1024.png), [hero 1366px](student-qa/phase-7/home-1366.png), [modal mobile](student-qa/phase-7/modal-focus-360.png).
- Kiểm tra trình duyệt sử dụng API fixture trong phiên riêng; chưa xác minh backend thật hoặc Safari/iOS. Dữ liệu ứng dụng và hợp đồng API được giữ nguyên.

---

### GIAI ĐOẠN 8: NÚT CUỘN LÊN ĐẦU TRANG (LIQUID GLASS SCROLL-TO-TOP BUTTON)
*(Thiết kế theo prompt tối giản, tròn 1:1, gradient mượt mà, cảm hứng Liquid Glass)*

- [x] **Task 8.1 (Component ScrollToTop)**: Tạo component `apps/web/src/components/ScrollToTop.tsx`:
  - **Kích thước & Hình dáng**: Tròn hoàn hảo tỉ lệ 1:1 (`w-12 h-12 rounded-full`, min 44px+ touch target).
  - **Phong cách thẩm mỹ**:
    - Bề mặt Liquid Glass khúc xạ đa lớp: `backdrop-filter: blur(20px) saturate(180%)`, `-webkit-backdrop-filter: blur(20px) saturate(180%)`.
    - Gradient mượt đơn sắc (monochromatic soft contrast): `linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(248, 250, 252, 0.68))`.
    - Viền specular bắt sáng đỉnh `border: 1px solid rgba(255, 255, 255, 0.9)`, `box-shadow: 0 10px 25px -4px rgba(15, 23, 42, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 1)`.
    - Tránh bóng đổ gắt (harsh shadow), hoa văn rối rắm hay màu sắc chói lọi.
  - **Biểu tượng mũi tên**:
    - Mũi tên hướng lên tối giản, thanh mảnh, thanh lịch (`ArrowUp` stroke 2px).
    - Màu xám đậm dịu mắt `text-slate-700`, hover chuyển xanh thương hiệu `text-blue-600`.
  - **Vị trí & Trạng thái kích hoạt**:
    - Nằm cố định góc dưới bên phải (`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30`).
    - Lắng nghe sự kiện `scroll` (passive): Ẩn khi ở đầu trang (`scrollY < 300`), tự động hiện mượt mà (`opacity`, `transform: translateY` và `scale`) khi cuộn xuống dưới.
    - Click vào sẽ cuộn mượt lên đầu trang (`window.scrollTo({ top: 0, behavior: 'smooth' })`).
  - **Khả năng tiếp cận & Tương thích**:
    - `aria-label="Cuộn lên đầu trang"`.
    - Tôn trọng `prefers-reduced-motion` (chuyển sang `behavior: 'auto'` và tắt hiệu ứng chuyển động).
    - Tôn trọng `prefers-reduced-transparency` (nền trắng mờ vững chắc).
- [x] **Task 8.2 (Tích hợp vào Layout)**:
  - Gắn `<ScrollToTop />` vào `apps/web/src/layouts/PortalLayout.tsx`.
- [x] **Task 8.3 (Thêm Icon ArrowUp)**:
  - Thêm icon `ArrowUp` vào `apps/web/src/components/Icons.tsx` nếu chưa có.
- [x] **Task 8.4 (Kiểm tra Lint & Build)**:
  - Chạy `& "C:\Users\zuzong\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" --filter web lint`.
  - Chạy `& "C:\Users\zuzong\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" --filter web build`.
  - Đảm bảo 0 warning, 0 error.

### CODEX PHASE 8 — ĐÃ HOÀN TẤT (27/09/2026)

- **8.1:** Thêm `apps/web/src/components/ScrollToTop.tsx`. Nút tròn 48 × 48px, góc phải dưới 24px/mobile và 32px từ 640px, z-index 30. Glass blur 20px/saturate 180%, WebKit, gradient với alpha cuối 0,72 theo yêu cầu trực tiếp của Zuzong, viền specular và bóng nhẹ; hover nâng 4px và đổi xanh thương hiệu.
- Theo dõi scroll qua `useSyncExternalStore`, listener passive và gỡ listener khi unmount. Chỉ hiện từ `scrollY >= 300`; trạng thái ẩn có opacity/transform, không nhận click, không vào thứ tự Tab và ẩn khỏi accessibility tree.
- Click/Enter cuộn smooth; khi bật reduced motion dùng auto và bỏ chuyển động transform. Sau khi kích hoạt, focus chuyển về `main-content` với preventScroll để bàn phím không nằm trên nút đang ẩn. Focus ring rõ 2px.
- Reduced transparency dùng nền trắng, tắt blur; có nền trắng dự phòng khi trình duyệt không hỗ trợ backdrop-filter.
- **8.2:** Tích hợp vào `PortalLayout.tsx`, giữ nguyên các thay đổi giao diện hiện có. **8.3:** Thêm `ArrowUp` stroke 2px trong `Icons.tsx`. CSS đặt trong `apps/web/src/index.css`.
- **8.4:** Đã chạy đúng hai lệnh pnpm được yêu cầu: lint **PASS — 0 warning, 0 error**; build **PASS — 0 warning, 0 error** (TypeScript + Vite production).
- **QA Chrome:** kiểm tra 360/768/1280px, kích thước/offset/blur, ngưỡng 0/299/300/600px, ẩn khỏi Tab, focus ring, Enter/cuộn smooth, focus về nội dung, reduced motion/auto và reduced transparency. Không tràn ngang hoặc lỗi JavaScript; đã xem ảnh mobile và desktop. Nút không xuất hiện ngoài PortalLayout, đã kiểm tra trang login.
- Kiểm tra dùng API fixture trong browser context riêng, không gọi backend hoặc ghi dữ liệu thật. Chưa kiểm tra trực tiếp Safari/iOS. Chỉ sửa frontend trong `apps/web/` và cập nhật tài liệu bàn giao theo yêu cầu; không sửa backend/API/Prisma/database/dependency.

### BỔ SUNG DARK MODE — ĐÃ HOÀN TẤT (27/09/2026)

- [x] Thêm `ThemeToggle` dạng công tắc Liquid Glass với biểu tượng mặt trời/mặt trăng, nhãn Sáng/Tối; tích hợp Portal, Auth và Admin layout.
- [x] Thêm bảng màu tối trong `apps/web/src/theme.css` cho nền, navigation, thẻ, form, modal, bảng, trạng thái và nút cuộn lên đầu trang. Giữ nền kính xám, tương phản chữ rõ và bóng nhẹ.
- [x] Khởi tạo theme trước khi React render bằng `public/theme-init.js`; mặc định theo hệ thống, ghi nhớ lựa chọn vào `htsv-theme`, đồng bộ giữa tab. Khi storage bị chặn vẫn đổi theme trong phiên hiện tại.
- [x] Bỏ liên kết Đăng ký ở header và menu di động; giữ liên kết Đăng ký trong trang Đăng nhập. Thu gọn header theo breakpoint để đủ chỗ cho công tắc và menu quản trị.
- [x] Kiểm tra Chrome với API fixture: đổi theme, tải lại, theo hệ thống, đồng bộ tab, Space/Enter, focus outline 2px, reduced motion/transparency và storage bị chặn. Kiểm tra bố cục 360/768/1024/1280/1440/1536/1920px, không tràn ngang; xem trực tiếp trang chủ, đăng nhập, modal và quản trị. Chưa xác minh Safari/iOS hoặc backend thật.
- [x] Lint và production build cuối cùng PASS, không warning/error. Không thay đổi backend/API/schema/database/dependency.

### ĐỒNG BỘ GIAO DIỆN — BÀN GIAO (28/09/2026)

- Navbar hiện dùng nút Đăng bài dạng dấu cộng 40 × 40px, luôn hiển thị, có tên truy cập và tooltip. Nút Đăng nhập xanh biển cao 48px trên desktop, 44px trên mobile.
- Theme toggle hiện là nút icon mặt trời/mặt trăng 40px. Giữ lựa chọn sáng/tối qua reload, chuyển trang và đồng bộ giữa tab.
- Nút chính, logo và màu nhấn dùng chung biến màu Ocean Blue trong `theme.css`; màu nền, chữ và viền theo theme. Trang đăng nhập có nền sáng khi chọn Light mode. Menu di động dùng cùng kiểu nút Đăng nhập với navbar.
- Xác minh cuối: lint/build web PASS bằng pnpm; npm hệ thống thiếu `npm-cli.js`. Chrome kiểm tra 24 tổ hợp trang chủ/diễn đàn/đăng nhập/đăng ký, hai theme, màn hình 360/768/1280px; không tràn ngang hoặc lỗi JavaScript. Kiểm tra thêm màu nút modal, lưu theme và đồng bộ tab.
- Các ảnh QA cũ trong tài liệu ghi nhận từng giai đoạn, không đại diện đầy đủ giao diện hiện tại. Script QA trong `apps/web/scripts` dùng đường dẫn runtime cục bộ và fixture; cần điều chỉnh đường dẫn khi chạy trên máy khác.
- Phạm vi bàn giao: frontend và tài liệu liên quan; backend, API contract, database và dependencies được giữ nguyên.

### ĐỒNG BỘ ĐIỀU HƯỚNG — HOÀN TẤT (30/09/2026)

- [x] Dùng chung cấu hình `student-navigation.ts` cho menu desktop, mobile và tìm kiếm: Trang chủ, Diễn đàn, Tiện ích, Đời sống, Hỗ trợ, Hỏi đáp. Giữ thiết kế Liquid Glass và lựa chọn sáng/tối hiện có.
- [x] Thay dấu cộng trên navbar bằng tìm kiếm. Hộp tìm kiếm hỗ trợ từ khóa có/không dấu, trang, dịch vụ, FAQ và KTX; có trạng thái không kết quả, điều hướng bàn phím, Escape và trả focus. Kết quả trong modal có vùng cuộn riêng.
- [x] Đưa lựa chọn Đăng bài / Đăng bài ẩn danh vào nút cộng của diễn đàn. Giữ query `anonymous` qua luồng chuyển đến đăng nhập hiện có; không sửa xác thực backend.
- [x] Tách Hỗ trợ thành ba lối vào: tạo yêu cầu mẫu, báo cáo mẫu, theo dõi yêu cầu. Hỏi đáp giữ trang riêng. Nêu rõ yêu cầu/báo cáo chỉ lưu trên trình duyệt, chưa gửi tới trường hoặc quản trị.
- [x] Trang Đời sống thay nội dung giữ chỗ bằng thông tin định hướng KTX, danh sách điều cần hỏi và liên kết chính thức `https://nctu.edu.vn/ky-tuc-xa`, `https://nctu.edu.vn/trang-sinh-vien/tan-sinh-vien`; không giả lập đăng ký phòng thật.
- [x] Chỉnh nội dung và đường dẫn gallery theo chức năng đang có; sửa hướng dẫn báo cáo trong FAQ cho đúng trạng thái mô phỏng. Giữ hình ảnh, hiệu ứng và nút tiện ích nổi hiện có.
- [x] Lint web PASS; production build PASS (TypeScript + Vite). Build còn cảnh báo chunk JavaScript lớn hơn 500 kB, gói chính khoảng 1,35 MB; không thay dependency hoặc cấu hình build để che cảnh báo.
- [x] Chrome QA dùng API fixture trong context riêng: 7 trang × 5 kích thước (360/768/1024/1280/1367px) × 2 theme, không tràn ngang/đè các cụm navbar hoặc lỗi JavaScript. Kiểm tra thêm menu tài khoản quản trị tại 360/768/1024/1280/1536px, tìm KTX bằng bàn phím, đóng và trả focus, không kết quả, chuyển từ tìm kiếm sang form, lưu/theo dõi yêu cầu mẫu, chọn loại báo cáo, hai chế độ đăng bài và FAQ deep link từ tiện ích nổi. Đã xem ảnh tìm kiếm sáng/tối trên mobile/desktop và Hỗ trợ tối; chưa xác minh Safari/iOS hoặc xử lý backend thật.
- Phạm vi lần cập nhật này: frontend và tài liệu bàn giao. Các thay đổi dependency/lockfile có sẵn trong working tree không thuộc lần triển khai này. Chưa commit/push.
