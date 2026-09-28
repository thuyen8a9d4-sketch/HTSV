---
name: frontend-design
description: Thiết kế, triển khai hoặc cải thiện giao diện web HTSV bằng React và Tailwind; áp dụng cho trang, layout và component, không áp dụng cho công việc chỉ backend.
---

# Frontend Design

Tạo UI hiện đại, chuyên nghiệp, dễ dùng cho sinh viên và quản trị viên. Giữ nội dung tiếng Việt, luồng nghiệp vụ và quyền truy cập của HTSV.

## Cách thực hiện
- Đọc trang liên quan, layout, component dùng chung và `src/index.css` trước khi sửa. Dựa vào nhiệm vụ người dùng và phong cách hiện có để chọn hướng thiết kế; mở rộng nhất quán, chỉ đổi toàn bộ phong cách khi được yêu cầu.
- Dùng React + Tailwind hiện có. Đặt trang trong `features/`, khung trong `layouts/`, thành phần dùng chung trong `components/`; dùng API client và state/query hiện có. Không cài UI kit, icon pack hoặc animation library mới nếu thư viện hiện tại đáp ứng được.
- Tạo thứ bậc rõ giữa tiêu đề, nội dung và hành động chính. Dùng bảng màu gọn, font hỗ trợ dấu tiếng Việt, line-height dễ đọc, độ dài dòng hợp lý và nhịp spacing nhất quán; dùng lại tokens/CSS variables cho giá trị lặp.
- Tránh UI AI rập khuôn: gradient tím-xanh vô cớ, glow dày, emoji làm icon, mọi nội dung đều đóng card và khoảng trống trang trí quá lớn. Dùng bố cục phù hợp diễn đàn, form hoặc bảng quản trị; không bịa dữ liệu để làm đẹp bản triển khai.

## Liquid Glass và chuyển động
- Chỉ dùng Liquid Glass/glassmorphism khi giúp phân lớp, chẳng hạn thanh điều hướng hoặc panel nổi. Nội dung dài, form và bảng ưu tiên nền dễ đọc.
- Kết hợp tint, viền nhẹ, shadow tiết chế và blur vừa đủ; kiểm tra tương phản trên nền thực tế. Có nền đủ đục khi `backdrop-filter` không hỗ trợ; tránh blur toàn màn, nhiều lớp blur lồng nhau hoặc animation blur gây tải GPU.
- Chuyển động ngắn, có mục đích cho hover/focus, mở panel và phản hồi thao tác; ưu tiên opacity/transform, dùng CSS hoặc Framer Motion đã có. Tôn trọng `prefers-reduced-motion`, không che hoặc trì hoãn hành động chính.

## Responsive và accessibility
- Mobile-first; thử 360px, khoảng 768px và desktop, thêm nội dung dài và zoom 200%. Không tràn ngang toàn trang; bảng có vùng cuộn riêng, navigation thu gọn và form xếp lại hợp lý.
- Dùng button/link đúng ngữ nghĩa, label liên kết input, tên truy cập cho icon button, focus nhìn thấy và thao tác bàn phím. Modal cần quản lý focus và trả focus khi đóng; không truyền thông tin chỉ bằng màu.
- Đảm bảo tương phản tối thiểu 4.5:1 cho chữ thường, 3:1 cho chữ lớn và điều khiển; vùng chạm chính khoảng 44px. Lỗi form gắn với trường, thông báo động có cơ chế đọc phù hợp.
- Hoàn thiện loading, empty, error, success và disabled states. Kiểm tra role-specific navigation, submit form và trạng thái đăng nhập; không thay đổi API contract để phục vụ trang trí.

## Hoàn tất
- Tái sử dụng hoặc cải thiện component chung khi phù hợp; kiểm tra các trang đang dùng component đó. Giữ component theo trách nhiệm rõ, tránh API props phức tạp chỉ cho một trường hợp.
- Chạy lint/build web theo `AGENTS.md`; kiểm tra bố cục, tương tác, bàn phím và reduced motion nếu có môi trường. Nêu rõ phần đã kiểm tra và phần chưa xác minh, không coi build thành công là bằng chứng UI đã được kiểm tra trực quan.
