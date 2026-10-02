import type { QuickSuggestion } from './chatbot-types';

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: 'dnc-gioi-thieu',
    label: 'Giới thiệu DNC',
    prompt: 'Giới thiệu ngắn về Trường Đại học Nam Cần Thơ.',
    category: 'academic',
    iconType: 'school',
  },
  {
    id: 'dnc-tuyen-sinh',
    label: 'Xét tuyển 2026',
    prompt: 'DNC có những phương thức xét tuyển nào năm 2026?',
    category: 'academic',
    iconType: 'graduation',
  },
  {
    id: 'dnc-hoc-phi',
    label: 'Học phí 2026',
    prompt: 'Học phí ngành Công nghệ thông tin tại DNC năm 2026 là bao nhiêu?',
    category: 'academic',
    iconType: 'tuition',
  },
  {
    id: 'dnc-cntt',
    label: 'Mã ngành CNTT',
    prompt: 'Mã ngành Công nghệ thông tin tại DNC năm 2026 là gì?',
    category: 'academic',
    iconType: 'tech',
  },
  {
    id: 'dnc-y-duoc',
    label: 'Bệnh viện DNC',
    prompt: 'Sinh viên DNC được thực hành tại Bệnh viện Đại học Nam Cần Thơ không?',
    category: 'academic',
    iconType: 'medical',
  },
  {
    id: 'dorm-guide',
    label: 'Ký túc xá',
    prompt: 'Tân sinh viên DNC đăng ký ký túc xá như thế nào?',
    category: 'service',
    iconType: 'building',
  },
];

// Chỉ đề xuất câu hỏi khi có ngữ cảnh rõ; tránh gợi ý lạc chủ đề.
export function generateFollowUpSuggestions(_userPrompt: string, _botResponse: string): string[] {
  return [];
}
