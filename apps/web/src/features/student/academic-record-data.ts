export interface GradedCourse {
  name: string;
  credits: number;
  score10: number;
}

export interface SemesterRecord {
  semester: string;
  courses: GradedCourse[];
}

// Bảng điểm mẫu — hệ thống chưa có dữ liệu điểm thật (P2 trong backlog).
// Học kỳ gần nhất dùng đúng 5 môn đang có trong thời khóa biểu (student-mock-data.ts) để nhất quán giữa các trang.
export const academicRecord: SemesterRecord[] = [
  {
    semester: 'Học kỳ 1 · 2024-2025',
    courses: [
      { name: 'Nhập môn lập trình', credits: 3, score10: 8.5 },
      { name: 'Toán rời rạc', credits: 3, score10: 7.0 },
      { name: 'Cấu trúc dữ liệu & giải thuật', credits: 4, score10: 6.5 },
      { name: 'Tiếng Anh 1', credits: 2, score10: 8.0 },
      { name: 'Giáo dục thể chất 1', credits: 1, score10: 9.0 },
    ],
  },
  {
    semester: 'Học kỳ 2 · 2024-2025',
    courses: [
      { name: 'Lập trình hướng đối tượng', credits: 3, score10: 7.5 },
      { name: 'Cơ sở dữ liệu', credits: 3, score10: 8.0 },
      { name: 'Mạng máy tính', credits: 3, score10: 4.5 },
      { name: 'Tiếng Anh 2', credits: 2, score10: 7.0 },
      { name: 'Triết học Mác - Lênin', credits: 3, score10: 6.5 },
    ],
  },
  {
    semester: 'Học kỳ 1 · 2025-2026',
    courses: [
      { name: 'Thiết kế đồ họa', credits: 3, score10: 7.5 },
      { name: 'Quản trị mạng máy tính', credits: 3, score10: 8.0 },
      { name: 'Hệ điều hành', credits: 3, score10: 6.5 },
      { name: 'Lập trình thiết bị di động', credits: 3, score10: 8.5 },
      { name: 'Hệ quản trị CSDL', credits: 3, score10: 7.0 },
    ],
  },
];

// Thang quy đổi tham khảo (10 -> chữ -> hệ 4) — Phòng Đào tạo cần xác nhận bảng chính thức của trường.
export function scoreToLetter(score10: number) {
  if (score10 >= 9.0) return { letter: 'A', score4: 4.0 };
  if (score10 >= 8.5) return { letter: 'B+', score4: 3.5 };
  if (score10 >= 7.0) return { letter: 'B', score4: 3.0 };
  if (score10 >= 6.5) return { letter: 'C+', score4: 2.5 };
  if (score10 >= 5.5) return { letter: 'C', score4: 2.0 };
  if (score10 >= 5.0) return { letter: 'D+', score4: 1.5 };
  if (score10 >= 4.0) return { letter: 'D', score4: 1.0 };
  return { letter: 'F', score4: 0 };
}

export function courseRisk(score10: number): 'fail' | 'warning' | null {
  if (score10 < 4.0) return 'fail';
  if (score10 < 5.5) return 'warning';
  return null;
}

export function semesterGpa4(semester: SemesterRecord) {
  const totalCredits = semester.courses.reduce((sum, course) => sum + course.credits, 0);
  const weighted = semester.courses.reduce((sum, course) => sum + scoreToLetter(course.score10).score4 * course.credits, 0);
  return totalCredits ? weighted / totalCredits : 0;
}

export function cumulativeCredits(upToIndex: number) {
  return academicRecord.slice(0, upToIndex + 1).reduce((sum, semester) => sum + semester.courses.reduce((s, c) => s + c.credits, 0), 0);
}

export function cumulativeGpa4(upToIndex: number) {
  const slice = academicRecord.slice(0, upToIndex + 1);
  const totalCredits = slice.reduce((sum, semester) => sum + semester.courses.reduce((s, c) => s + c.credits, 0), 0);
  const weighted = slice.reduce((sum, semester) => sum + semester.courses.reduce((s, c) => s + scoreToLetter(c.score10).score4 * c.credits, 0), 0);
  return totalCredits ? weighted / totalCredits : 0;
}

// Tổng tín chỉ chương trình tham khảo — trường có thể quy định số khác theo từng ngành.
export const totalProgramCredits = 130;
