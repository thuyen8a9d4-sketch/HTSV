export type ServiceIcon = 'calendar' | 'laptop' | 'chart' | 'edit' | 'book' | 'graduate' | 'award' | 'clipboard' | 'bell' | 'headset' | 'bulb' | 'file' | 'mail' | 'wallet' | 'shield' | 'people' | 'home';

export interface StudentService {
  id: string;
  name: string;
  description: string;
  group: 'learning' | 'affairs';
  icon: ServiceIcon;
  tone: 'blue' | 'green' | 'amber' | 'rose';
  guidance: string;
  requestType?: string;
  path?: string;
  keywords?: string;
}

export interface StudySession {
  time: string;
  subject: string;
  room: string;
  lecturer: string;
}

export interface ScheduleDay {
  date: Date;
  label: string;
  isToday: boolean;
  sessions: StudySession[];
}

export interface StudentFaq {
  id: string;
  question: string;
  answer: string;
}

export type RequestStatus = 'WAITING' | 'PROCESSING' | 'READY' | 'CANCELLED';

export interface RequestDraft {
  type: string;
  fullName: string;
  studentId: string;
  reason: string;
  notes: string;
}

export interface SupportRequest extends RequestDraft {
  id: string;
  createdAt: string;
  status: RequestStatus;
}

export interface StudentPortalContext {
  openRequest: (type?: string) => void;
  openService: (service: StudentService) => void;
}
