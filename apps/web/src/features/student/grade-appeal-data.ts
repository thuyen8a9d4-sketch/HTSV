import { academicRecord } from './academic-record-data';

// Lấy từ học kỳ gần nhất trong bảng điểm mẫu (academic-record-data.ts) để không lệch dữ liệu giữa các trang.
export const gradedSubjects = academicRecord.at(-1)!.courses.map((course) => ({ name: course.name, currentScore: course.score10 }));

export const appealDeadlineNote = 'Thời hạn nộp: trong vòng 7 ngày kể từ khi điểm được công bố (demo — trường có thể quy định khác).';
