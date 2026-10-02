import { findDncEvidence } from './dnc-sources';

// Giữ API cũ cho mã đang dùng; tri thức DNC được quản lý tại dnc-sources.ts.
export function answerVerifiedDnc(question: string): string | null {
  return findDncEvidence(question)?.fallback ?? null;
}
