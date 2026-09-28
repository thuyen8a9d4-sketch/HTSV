# Hướng dẫn dự án HTSV

## Phạm vi và giao tiếp
- Gọi người dùng là Zuzong; trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu. Giữ dấu tiếng Việt trong UI và tài liệu.
- Chỉ sửa trong phạm vi yêu cầu; không tự xóa file, gỡ app, dừng tải xuống hoặc sửa dữ liệu quan trọng. Kiểm tra trước, báo kết quả và xin phép khi cần thao tác nguy hiểm.

## Scope restriction
This task is FRONTEND ONLY.
Allowed:
- frontend pages
- frontend components
- CSS / Tailwind / styling
- frontend assets
- animations
- responsive layout
- accessibility
- frontend-only state needed for presentation

Forbidden:
- backend code
- API implementation
- database
- migrations
- authentication backend
- server logic
- environment variables
- API contracts
- database schemas
- backend dependencies

Do not modify backend files even if you think a backend change would improve the implementation.
If frontend requires backend data that does not currently exist, preserve the existing API interface and use the current data structure or frontend mock data when appropriate.
Never delete or refactor backend code.

## Stack và kiến trúc
- Monorepo pnpm (`apps/*`), TypeScript; hệ thống hỗ trợ sinh viên có diễn đàn confession, xác thực và quản trị.
- Web: React 19, Vite 8, Tailwind CSS 4, React Router 7; TanStack Query cho dữ liệu máy chủ, Zustand cho phiên đăng nhập, Axios cho HTTP, React Hook Form + Zod cho form, Framer Motion cho animation.
- API: NestJS 11, Prisma 7 + PostgreSQL; JWT/OAuth, guards theo vai trò và DTO validation. Controller nhận HTTP, service xử lý nghiệp vụ, `CorePrismaService` truy cập dữ liệu.
- Web gọi qua `src/lib/api-client.ts`; `/api` được Vite proxy tới `http://localhost:3000`. Giữ cơ chế cookie/refresh token và kiểm tra quyền phía server.

## Thư mục và tái sử dụng
- `apps/web/src/features/{auth,forum,admin}`: trang, schema và thành phần riêng từng tính năng; `layouts/`: khung Auth/Portal/Admin; `components/`: thành phần dùng chung; `lib/`: API client, query client, store và hooks dùng chung.
- Khai báo route trong `apps/web/src/App.tsx`; dùng `ProtectedRoute` cho trang cần đăng nhập/quyền. Tái sử dụng `FormField`, layouts và thành phần sẵn có; trích xuất phần lặp có ý nghĩa, tránh abstraction thừa.
- `apps/api/src/modules/<feature>`: module/controller/service và `dto/`; `common/`: guards/decorators; `config/`: cấu hình và kiểm tra biến môi trường.
- `apps/api/prisma/core/`: schema, migrations và seed; không sửa tay `src/generated/core-client`. Không chạy migration, seed hoặc `reset.sql` trên dữ liệu quan trọng khi chưa được phép.

## Quy cách code và UI
- Theo định dạng của file đang sửa: thụt 2 spaces, TypeScript có kiểu rõ ràng, ưu tiên `import type`; component PascalCase, hook `useX`, API file dạng `feature.service.ts`. Tránh thêm `any` và không định dạng lại file không liên quan.
- Backend theo `.prettierrc` (single quotes, trailing commas) và ESLint; web theo Oxlint và React Hooks rules. Validate đầu vào bằng DTO/schema, không hard-code bí mật hoặc commit `.env`.
- Thiết kế mobile-first; kiểm tra 360px, tablet và desktop, không tràn ngang toàn trang. Bảng rộng có vùng cuộn riêng; navigation, form và nội dung dài phải dùng được trên màn nhỏ.
- Dùng HTML ngữ nghĩa, label gắn với input, focus rõ, thao tác bàn phím, tương phản tốt và `prefers-reduced-motion`; xử lý trạng thái loading/empty/error/success.
- Khi tạo hoặc chỉnh giao diện, đọc [.agents/skills/frontend-design/SKILL.md](.agents/skills/frontend-design/SKILL.md). Ưu tiên thành phần và thư viện hiện có; không cài dependency không cần thiết, không đổi package manager/lockfile tùy tiện.

## Lệnh kiểm tra (chạy từ gốc HTSV)
| Mục đích | Lệnh |
| --- | --- |
| Chạy web / API | `pnpm dev:web` / `pnpm dev:api` |
| Lint web | `pnpm --filter web lint` |
| Build web (gồm TypeScript) | `pnpm --filter web build` |
| Lint API không tự sửa | `pnpm --filter api exec eslint "{src,apps,libs,test}/**/*.ts"` |
| Build API | `pnpm --filter api build` |
| Unit test API | `pnpm --filter api test -- --runInBand` |
| E2E API | `pnpm --filter api test:e2e -- --runInBand` |
| Sinh Prisma client | `pnpm prisma:generate:core` |

- Script `pnpm --filter api lint` có `--fix`, có thể sửa file. Web hiện chưa có script test; API chưa có unit spec và e2e còn mẫu `Hello World!`, không coi đó là bằng chứng kiểm thử chức năng.
- Chạy lint/build phù hợp phần thay đổi; với UI, kiểm tra trực quan và tương tác nếu có môi trường. API e2e cần cấu hình môi trường/database. Báo rõ kiểm tra đã chạy, lỗi và phần chưa xác minh; thay đổi chỉ tài liệu không cần build ứng dụng.
- Giữ file hướng dẫn ngắn; chỉ bổ sung quy tắc đã được xác minh, không chép nguyên tài liệu thư viện.
