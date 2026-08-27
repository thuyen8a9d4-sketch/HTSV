import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

interface Order {
  id: number;
  userId: number;
  status: string;
  totalAmount: string;
  createdAt: string;
  paidAt: string | null;
}

interface RevenueSummary {
  totalRevenue: string;
  monthlyRevenue: string;
  paidOrderCount: number;
  totalOrderCount: number;
  orders: Order[];
}

export function RevenuePage() {
  const { data } = useQuery<RevenueSummary>({
    queryKey: ['admin-revenue'],
    queryFn: async () => (await apiClient.get('/admin/revenue')).data,
  });

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-slate-900">Doanh thu</h1>
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-500">Tổng doanh thu</div>
          <div className="mt-1 text-xl font-bold">
            {Number(data?.totalRevenue ?? 0).toLocaleString('vi-VN')}đ
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-500">Doanh thu tháng này</div>
          <div className="mt-1 text-xl font-bold">
            {Number(data?.monthlyRevenue ?? 0).toLocaleString('vi-VN')}đ
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-500">Đơn đã thanh toán</div>
          <div className="mt-1 text-xl font-bold">{data?.paidOrderCount ?? 0}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-500">Tổng đơn hàng</div>
          <div className="mt-1 text-xl font-bold">{data?.totalOrderCount ?? 0}</div>
        </div>
      </div>
      <table className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-sm">
        <thead className="bg-slate-100 text-left text-slate-600">
          <tr>
            <th className="p-3">Mã đơn</th>
            <th className="p-3">Số tiền</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {data?.orders.map((o) => (
            <tr key={o.id} className="border-t border-slate-100">
              <td className="p-3">#{o.id}</td>
              <td className="p-3">{Number(o.totalAmount).toLocaleString('vi-VN')}đ</td>
              <td className="p-3">{o.status}</td>
              <td className="p-3">{new Date(o.createdAt).toLocaleDateString('vi-VN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
