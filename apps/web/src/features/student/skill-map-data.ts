import { academicRecord, scoreToLetter } from './academic-record-data';

export interface SkillDomain {
  name: string;
  keywords: string[];
}

// Gom môn học thành nhóm kỹ năng tham khảo — chưa phải phân tích AI thật (cần P1+P2+P4 ở backend).
const skillDomains: SkillDomain[] = [
  { name: 'Lập trình & phát triển phần mềm', keywords: ['lập trình', 'cấu trúc dữ liệu'] },
  { name: 'Dữ liệu & cơ sở dữ liệu', keywords: ['cơ sở dữ liệu', 'csdl', 'toán rời rạc'] },
  { name: 'Mạng & hệ thống', keywords: ['mạng', 'hệ điều hành'] },
  { name: 'Thiết kế', keywords: ['thiết kế'] },
  { name: 'Kỹ năng nền tảng', keywords: ['tiếng anh', 'giáo dục thể chất', 'triết học'] },
];

export interface SkillScore {
  name: string;
  score: number;
  courseCount: number;
}

function normalize(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();
}

export function computeSkillMap(): SkillScore[] {
  const allCourses = academicRecord.flatMap((semester) => semester.courses);
  return skillDomains
    .map((domain) => {
      const matches = allCourses.filter((course) => domain.keywords.some((keyword) => normalize(course.name).includes(normalize(keyword))));
      if (matches.length === 0) return { name: domain.name, score: 0, courseCount: 0 };
      const avgScore4 = matches.reduce((sum, course) => sum + scoreToLetter(course.score10).score4, 0) / matches.length;
      return { name: domain.name, score: Math.round((avgScore4 / 4) * 100), courseCount: matches.length };
    })
    .filter((domain) => domain.courseCount > 0);
}
