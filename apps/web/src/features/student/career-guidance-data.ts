export interface CareerArticle {
  id: string;
  title: string;
  field: string;
  summary: string;
  body: string[];
}

// Nội dung hướng nghiệp mẫu — bản đầu do admin đăng tay, sẽ thay bằng nội dung đồng bộ từ trang hướng nghiệp của trường (P7 trong backlog).
export const careerArticles: CareerArticle[] = [
  {
    id: 'phong-van-cntt',
    title: 'Chuẩn bị phỏng vấn thực tập ngành Công nghệ thông tin',
    field: 'Công nghệ thông tin',
    summary: 'Những câu hỏi thường gặp và cách trình bày dự án cá nhân khi phỏng vấn vị trí thực tập lập trình.',
    body: [
      'Nhà tuyển dụng thường hỏi về dự án bạn đã làm — hãy chuẩn bị 1-2 dự án (kể cả bài tập lớn trên trường) và nói rõ vai trò, công nghệ dùng, khó khăn đã gặp.',
      'Chuẩn bị một kho mã nguồn (GitHub) gọn gàng, có mô tả README rõ ràng để gửi kèm hồ sơ.',
      'Luyện tập giải thích code bằng lời — nhà tuyển dụng quan tâm cách bạn tư duy hơn là đáp án cuối cùng.',
    ],
  },
  {
    id: 'portfolio-thiet-ke',
    title: 'Xây dựng portfolio cho sinh viên Thiết kế đồ họa',
    field: 'Thiết kế đồ họa',
    summary: 'Portfolio là yếu tố quyết định khi ứng tuyển ngành thiết kế — nên chọn lọc và trình bày thế nào.',
    body: [
      'Chỉ chọn 6-10 sản phẩm tốt nhất, đa dạng thể loại (nhận diện thương hiệu, ấn phẩm in, social media…) thay vì đăng tất cả bài đã làm.',
      'Mỗi sản phẩm nên có phần mô tả ngắn: bối cảnh dự án, vai trò của bạn, công cụ sử dụng.',
      'Có thể dùng Behance hoặc một trang web cá nhân đơn giản để tổng hợp portfolio, kèm link trong hồ sơ xin việc.',
    ],
  },
  {
    id: 'chung-chi-mang',
    title: 'Chứng chỉ nên có khi ra trường ngành Quản trị mạng',
    field: 'Quản trị mạng máy tính',
    summary: 'Một số chứng chỉ quốc tế giúp hồ sơ nổi bật hơn khi ứng tuyển vị trí quản trị hệ thống/mạng.',
    body: [
      'CCNA (Cisco) là chứng chỉ nền tảng được nhiều nhà tuyển dụng trong nước công nhận.',
      'CompTIA Network+ hoặc Security+ phù hợp nếu định hướng thiên về bảo mật hệ thống.',
      'Nếu chưa có điều kiện thi chứng chỉ, hãy thực hành trên các phòng lab ảo (Packet Tracer, GNS3) và đưa vào hồ sơ như kinh nghiệm thực hành.',
    ],
  },
  {
    id: 'xu-huong-di-dong',
    title: 'Xu hướng tuyển dụng lập trình thiết bị di động 2026',
    field: 'Lập trình thiết bị di động',
    summary: 'Flutter và Kotlin Multiplatform tiếp tục được ưa chuộng để phát triển đa nền tảng với một bộ mã nguồn.',
    body: [
      'Nhiều công ty vừa và nhỏ ưu tiên Flutter vì tốc độ phát triển nhanh, một đội có thể ra cả bản iOS và Android.',
      'Kiến thức về tối ưu hiệu năng và quản lý state (Provider, Riverpod, Bloc) là điểm cộng lớn khi phỏng vấn.',
      'Nên có ít nhất một ứng dụng cá nhân đã publish thử (kể cả ở dạng APK demo) để minh họa năng lực thực tế.',
    ],
  },
];
