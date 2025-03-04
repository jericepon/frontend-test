import type { User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login(user: User | null) {
      this.user = user ? { ...user } : null;
      this.isAuthenticated = true;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },
  },
  persist: true,
});