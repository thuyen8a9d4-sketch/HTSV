import type { ConductCriterionGroup, ConductScoreMap } from './student-types';

// Khung tiêu chí tham khảo theo cấu trúc phổ biến (Thông tư 16/2015/TT-BGDĐT và các văn bản sửa đổi).
// Đây là bản demo — Phòng Công tác sinh viên cần xác nhận lại tiêu chí và thang điểm chính thức của trường trước khi dùng thật.
export const conductCriteriaGroups: ConductCriterionGroup[] = [
  {
    id: 'hoc-tap',
    title: 'Ý thức tham gia học tập',
    maxScore: 20,
    items: [
      { id: 'ht-ket-qua', label: 'Kết quả học tập trong học kỳ', maxScore: 10 },
      { id: 'ht-nghien-cuu', label: 'Ý thức tham gia học tập, nghiên cứu khoa học', maxScore: 5 },
      { id: 'ht-vuot-kho', label: 'Tinh thần vượt khó, phấn đấu vươn lên trong học tập', maxScore: 5 },
    ],
  },
  {
    id: 'noi-quy',
    title: 'Ý thức chấp hành nội quy, quy chế, quy định',
    maxScore: 25,
    items: [
      { id: 'nq-phap-luat', label: 'Chấp hành chủ trương, chính sách, pháp luật của Nhà nước', maxScore: 15 },
      { id: 'nq-noi-quy-truong', label: 'Chấp hành nội quy, quy chế, quy định của nhà trường, ký túc xá', maxScore: 10 },
    ],
  },
  {
    id: 'hoat-dong',
    title: 'Ý thức tham gia hoạt động chính trị, xã hội, văn hóa, văn nghệ, thể thao',
    maxScore: 20,
    items: [
      { id: 'hd-phong-trao', label: 'Tham gia hoạt động, phong trào do Đoàn, Hội, nhà trường tổ chức', maxScore: 10 },
      { id: 'hd-tinh-nguyen', label: 'Tham gia hoạt động xã hội, từ thiện, tình nguyện', maxScore: 5 },
      { id: 'hd-suc-khoe', label: 'Tham gia chăm sóc sức khỏe, phòng chống dịch bệnh, tệ nạn xã hội', maxScore: 5 },
    ],
  },
  {
    id: 'cong-dan',
    title: 'Ý thức công dân trong quan hệ cộng đồng',
    maxScore: 25,
    items: [
      { id: 'cd-an-toan', label: 'Chấp hành pháp luật, quy định về trật tự an toàn xã hội', maxScore: 15 },
      { id: 'cd-ung-xu', label: 'Quan hệ, ứng xử có văn hóa trong cộng đồng', maxScore: 10 },
    ],
  },
  {
    id: 'can-bo',
    title: 'Công tác cán bộ lớp, Đoàn, Hội và thành tích đặc biệt',
    maxScore: 10,
    items: [
      { id: 'cb-nhiem-vu', label: 'Hoàn thành nhiệm vụ cán bộ lớp, Đoàn, Hội được giao', maxScore: 5 },
      { id: 'cb-thanh-tich', label: 'Đạt thành tích đặc biệt trong học tập, rèn luyện', maxScore: 5 },
    ],
  },
];

export const conductMaxTotal = conductCriteriaGroups.reduce((sum, group) => sum + group.maxScore, 0);

export function emptyConductScores(): ConductScoreMap {
  return Object.fromEntries(conductCriteriaGroups.flatMap((group) => group.items.map((item) => [item.id, 0])));
}

export function groupTotal(scores: ConductScoreMap, group: ConductCriterionGroup) {
  return group.items.reduce((sum, item) => sum + (scores[item.id] ?? 0), 0);
}

export function grandTotal(scores: ConductScoreMap) {
  return conductCriteriaGroups.reduce((sum, group) => sum + groupTotal(scores, group), 0);
}

export function classifyConduct(total: number) {
  if (total >= 90) return { label: 'Xuất sắc', style: 'text-emerald-700' };
  if (total >= 80) return { label: 'Tốt', style: 'text-green-700' };
  if (total >= 65) return { label: 'Khá', style: 'text-blue-700' };
  if (total >= 50) return { label: 'Trung bình', style: 'text-amber-700' };
  if (total >= 35) return { label: 'Yếu', style: 'text-orange-700' };
  return { label: 'Kém', style: 'text-red-700' };
}

export function currentSemesterLabel(now = new Date()) {
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  if (month >= 9) return `Học kỳ 1 · ${year}-${year + 1}`;
  if (month >= 2) return `Học kỳ 2 · ${year - 1}-${year}`;
  return `Học kỳ hè · ${year - 1}-${year}`;
}
