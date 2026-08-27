import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

interface Settings {
  monetizationEnabled: boolean;
}

export function SettingsPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery<Settings>({
    queryKey: ['admin-settings'],
    queryFn: async () => (await apiClient.get('/admin/settings')).data,
  });

  const toggle = useMutation({
    mutationFn: (monetizationEnabled: boolean) =>
      apiClient.put('/admin/settings', { monetizationEnabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-xl font-bold text-slate-900">Cài đặt hệ thống</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-slate-900">Tính năng tính phí tài liệu</div>
            <p className="text-sm text-slate-500">
              Khi tắt, toàn bộ tài liệu trở thành miễn phí và không ai mua được tài liệu nữa,
              không cần đổi giá từng tài liệu.
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={data?.monetizationEnabled ?? true}
              onChange={(e) => toggle.mutate(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:outline-none" />
          </label>
        </div>
      </div>
    </div>
  );
}
