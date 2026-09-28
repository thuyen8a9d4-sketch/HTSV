# Frontend QA

Ngày: 27/09/2026. Kết quả: 53 kiểm tra PASS trên Chrome, xem `results.json`.

Ảnh là dữ liệu mô phỏng trong phiên Playwright; ứng dụng production vẫn dùng API thật. Script chặn toàn bộ `/api/**`, không chạy backend hoặc ghi database.

Chạy từ gốc `HTSV` khi Vite đang chạy tại `http://127.0.0.1:5173`:

```powershell
node apps/web/scripts/verify-ui.cjs <duong-dan-module-playwright-da-co> [base-url]
```

Dùng Playwright có sẵn và Chrome đã cài; không cần thêm dependency vào dự án. Script kiểm tra layout, tên truy cập và các thao tác với fixture, rồi lưu ảnh/JSON tại thư mục này. Các ảnh 360/768/1280 và drawer đã được Codex xem trực tiếp. `overflow-debug.png` là ảnh hỗ trợ chẩn đoán trong quá trình sửa, không dùng làm preview bàn giao.
