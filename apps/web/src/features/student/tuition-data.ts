export type FeeStatus = 'PAID' | 'UNPAID';

export interface FeeItem {
  id: string;
  name: string;
  semester: string;
  amount: number;
  dueDate: string;
  status: FeeStatus;
}

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

// Khoản thu mẫu — hạn đóng tính tương đối theo ngày hiện tại để luôn minh họa đúng cảnh báo "sắp tới hạn".
export const feeItems: FeeItem[] = [
  { id: 'hp-hien-tai', name: 'Học phí học kỳ hiện tại', semester: 'Học kỳ 1 · 2025-2026', amount: 8_500_000, dueDate: daysFromNow(25), status: 'UNPAID' },
  { id: 'bhyt-hien-tai', name: 'Bảo hiểm y tế học sinh, sinh viên', semester: 'Học kỳ 1 · 2025-2026', amount: 991_800, dueDate: daysFromNow(10), status: 'UNPAID' },
  { id: 'phi-ktx', name: 'Phí ký túc xá', semester: 'Học kỳ 1 · 2025-2026', amount: 1_800_000, dueDate: daysFromNow(80), status: 'UNPAID' },
  { id: 'hp-ky-truoc', name: 'Học phí học kỳ trước', semester: 'Học kỳ 2 · 2024-2025', amount: 8_200_000, dueDate: daysFromNow(-120), status: 'PAID' },
];

export const dueSoonThresholdDays = 60;

export function daysUntil(dueDate: string) {
  return Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function formatVnd(amount: number) {
  return `${amount.toLocaleString('vi-VN')} đ`;
}
