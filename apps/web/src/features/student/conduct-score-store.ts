import { create } from 'zustand';
import { z } from 'zod';
import { emptyConductScores, currentSemesterLabel } from './conduct-score-data';
import type { ConductRecord, ConductScoreMap } from './student-types';

export const conductStorageKey = 'htsv-conduct-scores-v1';

const scoreMapSchema = z.record(z.string(), z.number());
const recordSchema = z.object({
  semester: z.string(),
  status: z.enum(['DRAFT', 'SUBMITTED', 'MONITOR_REVIEWED', 'RETURNED', 'PUBLISHED']),
  selfScores: scoreMapSchema,
  selfNote: z.string(),
  monitorScores: scoreMapSchema.nullable(),
  monitorNote: z.string(),
  facultyScores: scoreMapSchema.nullable(),
  facultyNote: z.string(),
  submittedAt: z.string().nullable(),
  monitorReviewedAt: z.string().nullable(),
  publishedAt: z.string().nullable(),
});
const storageSchema = z.record(z.string(), z.array(recordSchema));
type ConductBuckets = Record<string, ConductRecord[]>;

function readRecords(): { records: ConductBuckets; storageError: string } {
  try {
    const raw = localStorage.getItem(conductStorageKey);
    return { records: raw ? storageSchema.parse(JSON.parse(raw)) : {}, storageError: '' };
  } catch {
    return { records: {}, storageError: 'Không đọc được phiếu điểm rèn luyện đã lưu. Dữ liệu cũ được giữ nguyên.' };
  }
}

function freshRecord(semester: string): ConductRecord {
  return {
    semester,
    status: 'DRAFT',
    selfScores: emptyConductScores(),
    selfNote: '',
    monitorScores: null,
    monitorNote: '',
    facultyScores: null,
    facultyNote: '',
    submittedAt: null,
    monitorReviewedAt: null,
    publishedAt: null,
  };
}

interface ConductState {
  records: ConductBuckets;
  storageError: string;
  ensureCurrent: (owner: string) => ConductRecord | null;
  saveDraft: (owner: string, semester: string, selfScores: ConductScoreMap, selfNote: string) => void;
  submit: (owner: string, semester: string) => void;
  monitorForward: (owner: string, semester: string, monitorScores: ConductScoreMap, monitorNote: string) => void;
  monitorReturn: (owner: string, semester: string, monitorNote: string) => void;
  facultyPublish: (owner: string, semester: string, facultyScores: ConductScoreMap, facultyNote: string) => void;
  facultyReturn: (owner: string, semester: string, facultyNote: string) => void;
}

// Each account has its own bucket, giống student-store.ts — dữ liệu chỉ mô phỏng, lưu trên trình duyệt.
export const useConductScoreStore = create<ConductState>((set, get) => {
  const commit = (records: ConductBuckets) => {
    try {
      localStorage.setItem(conductStorageKey, JSON.stringify(records));
    } catch {
      throw new Error('Không thể lưu phiếu điểm rèn luyện. Hãy cho phép lưu trữ hoặc giải phóng dung lượng trình duyệt rồi thử lại.');
    }
    set({ records, storageError: '' });
  };
  const updateRecord = (owner: string, semester: string, patch: Partial<ConductRecord>) => {
    const fresh = readRecords();
    if (fresh.storageError) throw new Error(fresh.storageError);
    const list = fresh.records[owner] ?? [];
    const next = list.map((record) => (record.semester === semester ? { ...record, ...patch } : record));
    commit({ ...fresh.records, [owner]: next });
  };
  return {
    ...readRecords(),
    ensureCurrent: (owner) => {
      const { records } = get();
      const list = records[owner] ?? [];
      const open = list.find((record) => record.status !== 'PUBLISHED');
      if (open) return open;
      const semester = currentSemesterLabel();
      // Học kỳ hiện tại đã được công bố rồi (cùng ngày) — không tạo phiếu trùng tên, chờ sang học kỳ mới.
      if (list.some((record) => record.semester === semester)) return null;
      const record = freshRecord(semester);
      const fresh = readRecords();
      commit({ ...fresh.records, [owner]: [record, ...(fresh.records[owner] ?? [])] });
      return record;
    },
    saveDraft: (owner, semester, selfScores, selfNote) => updateRecord(owner, semester, { selfScores, selfNote }),
    submit: (owner, semester) => updateRecord(owner, semester, { status: 'SUBMITTED', submittedAt: new Date().toISOString() }),
    monitorForward: (owner, semester, monitorScores, monitorNote) =>
      updateRecord(owner, semester, { status: 'MONITOR_REVIEWED', monitorScores, monitorNote, monitorReviewedAt: new Date().toISOString() }),
    monitorReturn: (owner, semester, monitorNote) => updateRecord(owner, semester, { status: 'RETURNED', monitorNote }),
    facultyPublish: (owner, semester, facultyScores, facultyNote) =>
      updateRecord(owner, semester, { status: 'PUBLISHED', facultyScores, facultyNote, publishedAt: new Date().toISOString() }),
    facultyReturn: (owner, semester, facultyNote) => updateRecord(owner, semester, { status: 'RETURNED', facultyNote }),
  };
});
