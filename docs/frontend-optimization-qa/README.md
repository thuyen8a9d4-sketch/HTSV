# Kiểm tra tối ưu frontend — 01/10/2026

Giữ giao diện bản trên máy theo lựa chọn của Zuzong. Bản phát hành được ghép từ `origin/main` tại `d4dec3c`, sau đó đồng bộ cập nhật mới đến `bdcbd49`. Giữ logic chatbot mới trên GitHub cùng giao diện trên máy; không thay đổi backend, database, biến môi trường, dependency hay lockfile. Không đưa tệp nén logo vào bản phát hành.

## Thay đổi

- Tách tải các trang, chatbot và WebGL. Trang dịch vụ không tải Three.js, gallery hoặc xylophone.
- Tạm dừng gallery khi khuất màn hình, dừng hiệu ứng khi tab bị ẩn; dọn texture/model tải xong sau khi rời trang.
- Dùng chung query diễn đàn và định dạng thời gian. Cache 30 giây, hủy request không còn dùng, cập nhật cache sau đăng bài/bình luận/cảm xúc/chia sẻ. Không tìm tên thật trong bài ẩn danh.
- Khắc phục diễn đàn tràn ngang ở 360px; cho thông tin tác giả và chủ đề xếp xuống dòng trên điện thoại. Tăng vùng chạm, cỡ nhập liệu, xử lý vùng an toàn dưới màn hình và chatbot khi xoay ngang.
- Chặn câu trả lời chatbot về muộn sau khi làm mới hội thoại, phục hồi lịch sử sai định dạng, dọn timer sao chép, tái sử dụng kết quả render Markdown. Không chạy hiệu ứng gõ chữ khi người dùng giảm chuyển động.
- Gộp request khởi tạo phiên đăng nhập trong StrictMode; không tự gọi refresh lần nữa khi endpoint xác thực trả 401. Giữ nguyên endpoint và dữ liệu API.

## Cách kiểm tra

`pnpm --filter web lint` và `pnpm --filter web build` chạy thành công tại checkout gốc. Trên checkout phát hành, chạy trực tiếp cùng Oxlint, TypeScript và Vite đã cài vì trình khởi chạy pnpm cố cài lại modules qua junction; không thực hiện cài lại.

Chạy bản production bằng Vite preview, rồi:

```text
node apps/web/scripts/verify-optimization.cjs <duong-dan-playwright> http://127.0.0.1:4187
```

Script chặn API bằng dữ liệu kiểm thử và chặn dịch vụ bên ngoài. `results.json` ghi kết quả theo trang/kích thước và các kiểm tra tương tác. Ảnh trang chủ được chụp sau khi cuộn qua nội dung để kích hoạt hiệu ứng hiện nội dung.

Kết quả: **69/69 lượt bố cục**, **12/12 nhóm tương tác**, **0 lỗi JavaScript**. Đã xem ảnh trang chủ và diễn đàn trên điện thoại, diễn đàn desktop. Sau khi ghép logic chatbot mới, chạy lại lint/build và các nhóm tương tác; bằng chứng riêng trong `post-merge/results.json`.

Gói JavaScript chính trước tối ưu: **1.444,05 KB** (gzip **443,30 KB**). Sau tối ưu: khoảng **345,72 KB** (gzip **106,58 KB**). Đây là kích thước entry chunk, không phải tổng tải hoặc mức tăng FPS. Three.js vẫn khoảng **572,38 KB** và còn cảnh báo chunk lớn, nhưng được tải riêng theo nhu cầu.

## Giới hạn

Kiểm tra bằng Chrome headless tại 360, 768 và 1280px cùng màn hình ngang 667×375; chưa đo FPS trên điện thoại thật hoặc xác minh Safari/iOS. Không kiểm tra backend thật, Google Maps, Gemini thật hay trạng thái triển khai Cloudflare. Giữ nguyên các dữ liệu mẫu frontend hiện có.
