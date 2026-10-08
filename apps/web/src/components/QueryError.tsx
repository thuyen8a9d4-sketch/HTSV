import { GlassButton } from './GlassButton';

export function QueryError({ retry }: { retry: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
      <p className="font-medium">
        Chưa thể tải dữ liệu.
      </p>
      <p className="mb-3 text-sm">
        Vui lòng kiểm tra kết nối và thử lại.
      </p>
      <GlassButton onClick={retry}>
        Thử lại
      </GlassButton>
    </div>
  );
}
