import { defineStore } from 'pinia';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
  } | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login() {
      this.isAuthenticated = true;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },
  },
  persist: true,
});