import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export const UPLOADS_ROOT = join(process.cwd(), 'uploads', 'materials');

export function ensureUploadsDir() {
  if (!existsSync(UPLOADS_ROOT)) {
    mkdirSync(UPLOADS_ROOT, { recursive: true });
  }
}

export function materialFilePath(fileName: string) {
  return join(UPLOADS_ROOT, fileName);
}
