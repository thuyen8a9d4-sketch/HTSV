import { create } from 'zustand';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isInitializing: boolean;
  setSession: (accessToken: string, user: AuthUser) => void;
  clearSession: () => void;
  setInitializing: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isInitializing: true,
  setSession: (accessToken, user) => set({ accessToken, user }),
  clearSession: () => set({ accessToken: null, user: null }),
  setInitializing: (value) => set({ isInitializing: value }),
}));
