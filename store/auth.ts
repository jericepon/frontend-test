import type { Session, User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { useProfileStore } from './profile';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
    session: null,
  }),
  actions: {
    login(user: User | null) {
      this.user = user ? { ...user } : null;
      this.isAuthenticated = true;
    },
    async providerOAuth() {
      const supabase = useSupabase();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      error && this.handleAuthNofication({ description: error.message, type: 'error' });
    },
    async signUp(user: { name?: string, email: string, password: string }) {
      const supabase = useSupabase();
      const { addProfile } = useProfileStore();
      const { data, error } = await supabase.auth.signUp({ email: user.email, password: user.password, });

      if (error)
      {
        this.handleAuthNofication({ description: error.message, type: 'error' });
        return;
      }

      this.login(data.user);
      this.handleAuthNofication({ description: 'Account created successfully', type: 'success' });
    },
    async signInWithPassword(user: { email: string, password: string }) {
      const supabase = useSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      error && this.handleAuthNofication({ description: error.message, type: 'error' });

      this.session = data?.session;
      this.user = data?.user;
    },
    handleAuthNofication(data: any) {
      const { notify } = useAuthNotifications();
      notify(data);
    },
    clearAuth() {
      this.isAuthenticated = false;
      this.user = null;
      this.session = null;
    },
  },
  persist: true,
});