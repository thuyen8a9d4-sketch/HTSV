# Student Portal QA

Ngày 27/09/2026. **19 nhóm kiểm tra PASS** với Chrome/Playwright trên Vite dev và production preview. `results.json` và các ảnh hiện tại được tạo từ bản production tại `http://127.0.0.1:4173`.

## Phạm vi

- 10 route tại 360, 768, 1280px; không tràn ngang toàn trang; computed style của padding/title/bo góc đúng.
- 18 dịch vụ, lịch 7 ngày và hôm nay, 3 confession mới nhất và ẩn danh.
- Drawer, bàn phím, focus trap/restore, tìm kiếm không dấu, FAQ deep link.
- Validate, tạo hồ sơ, mã YC, reload, tìm kiếm/lọc, mô phỏng xử lý, hủy có xác nhận.
- Tách dữ liệu khách/tài khoản, role admin, hồ sơ cá nhân; guard và route Forum giữ nguyên.
- Loading/empty/error/retry của confession; localStorage lỗi/hết dung lượng và dữ liệu lỗi được bảo toàn.
- Reduced motion; reflow tương đương zoom 200% bằng 640 CSS px.

Tất cả `/api/**` bị chặn và trả fixture trong browser context độc lập. Không gọi backend hay ghi database. Các dữ liệu trên ảnh chỉ phục vụ QA. Kết nối backend thật, screen reader, zoom trình duyệt thực và đối chiếu pixel với ảnh tham chiếu gốc chưa được xác minh.

## Chạy lại

Từ thư mục `E:\Du_an_ho_tro_sv\HTSV`, khi Vite dev hoặc preview đang chạy:

```powershell
node apps/web/scripts/verify-student-ui.cjs 'C:\Users\zuzong\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\playwright' http://127.0.0.1:4173
```

Không cần cài thêm dependency. Có thể thay URL bằng `http://127.0.0.1:5173` để kiểm tra Vite dev.

Ảnh `home-360.png`, `home-768.png`, `home-1280.png`, `drawer-360.png`, `request-modal-360.png` đã được xem trực tiếp trong quá trình QA. Script ghi lại ảnh và kết quả tại thư mục này.
