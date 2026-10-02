export interface MockAdvisee {
  id: string;
  studentCode: string;
  fullName: string;
  gpa4: number;
  creditsEarned: number;
  atRisk: boolean;
}

// Sinh viên phụ trách mẫu — chỉ để minh họa giao diện cố vấn, không phải dữ liệu thật.
export const mockAdvisees: MockAdvisee[] = [
  { id: 'sv-02', studentCode: '233881', fullName: 'Trần Thị Mỹ Duyên', gpa4: 3.45, creditsEarned: 78, atRisk: false },
  { id: 'sv-03', studentCode: '233882', fullName: 'Lê Hoàng Phúc', gpa4: 1.85, creditsEarned: 52, atRisk: true },
  { id: 'sv-04', studentCode: '233883', fullName: 'Phạm Thị Ngọc Hân', gpa4: 2.95, creditsEarned: 70, atRisk: false },
];

export interface MockRosterEntry {
  studentCode: string;
  fullName: string;
}

// Sĩ số lớp mẫu dùng cho màn điểm danh demo ở cổng giảng viên.
export const mockClassRoster: MockRosterEntry[] = [
  { studentCode: '233880', fullName: 'Bạn (tài khoản đang đăng nhập)' },
  { studentCode: '233881', fullName: 'Trần Thị Mỹ Duyên' },
  { studentCode: '233882', fullName: 'Lê Hoàng Phúc' },
  { studentCode: '233883', fullName: 'Phạm Thị Ngọc Hân' },
  { studentCode: '233884', fullName: 'Võ Minh Khang' },
];
