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

export type ConductStatus = 'DRAFT' | 'SUBMITTED' | 'MONITOR_REVIEWED' | 'RETURNED' | 'PUBLISHED';

export interface ConductCriterionItem {
  id: string;
  label: string;
  maxScore: number;
}

export interface ConductCriterionGroup {
  id: string;
  title: string;
  maxScore: number;
  items: ConductCriterionItem[];
}

export type ConductScoreMap = Record<string, number>;

export interface ConductRecord {
  semester: string;
  status: ConductStatus;
  selfScores: ConductScoreMap;
  selfNote: string;
  monitorScores: ConductScoreMap | null;
  monitorNote: string;
  facultyScores: ConductScoreMap | null;
  facultyNote: string;
  submittedAt: string | null;
  monitorReviewedAt: string | null;
  publishedAt: string | null;
}

export type AppealStatus = 'WAITING' | 'REVIEWING' | 'RESOLVED';

export interface GradeAppealDraft {
  subjectName: string;
  currentScore: number;
  reason: string;
}

export interface GradeAppeal extends GradeAppealDraft {
  id: string;
  createdAt: string;
  status: AppealStatus;
  resolution: string;
  resolvedAt: string | null;
}

export interface ClassSection {
  id: string;
  subject: string;
  lecturer: string;
  lecturerPhone: string;
  lecturerEmail: string;
  groupLink: string;
  schedule: string;
  room: string;
}

export interface LecturerEvaluation {
  classSectionId: string;
  ratings: Record<string, number>;
  comment: string;
  submittedAt: string;
}
