import { isAxiosError } from 'axios';

export function httpErrorMessage(error: unknown, fallback: string): string {
  if (!isAxiosError(error)) return fallback;
  const message: unknown = error.response?.data?.message;
  if (typeof message === 'string') return message;
  if (Array.isArray(message) && message.every((item) => typeof item === 'string')) return message.join('. ');
  return fallback;
}
