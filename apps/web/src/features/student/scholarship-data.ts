function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  deadline: string;
  requirements: string[];
  minGpa?: number;
}

// Học bổng mẫu — điều kiện GPA đối chiếu với GPA tích lũy thật tính từ academic-record-data.ts.
export const scholarships: Scholarship[] = [
  {
    id: 'khuyen-khich-hoc-tap',
    name: 'Học bổng Khuyến khích học tập',
    amount: 3_000_000,
    deadline: daysFromNow(35),
    requirements: ['GPA tích lũy từ 3.2/4.0 trở lên', 'Không có môn bị điểm D hoặc F trong học kỳ gần nhất', 'Không vi phạm nội quy, quy chế'],
    minGpa: 3.2,
  },
  {
    id: 'vuot-kho-hoc-tot',
    name: 'Học bổng Vượt khó học tốt',
    amount: 2_000_000,
    deadline: daysFromNow(50),
    requirements: ['GPA tích lũy từ 2.5/4.0 trở lên', 'Có minh chứng hoàn cảnh khó khăn (hộ nghèo/cận nghèo hoặc xác nhận của địa phương)'],
    minGpa: 2.5,
  },
  {
    id: 'tai-nang-tre',
    name: 'Học bổng Tài năng trẻ',
    amount: 5_000_000,
    deadline: daysFromNow(20),
    requirements: ['GPA tích lũy từ 3.6/4.0 trở lên', 'Có thành tích nghiên cứu khoa học hoặc giải thưởng cuộc thi cấp khoa/trường trở lên'],
    minGpa: 3.6,
  },
];
