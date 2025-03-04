import type { Session, User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';

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
      const { supabase } = useSupabaseClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      error && this.handleAuthError(error);
    },
    async signUp(user: { name?: string, email: string, password: string }) {
      const { supabase } = useSupabaseClient();
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      error && this.handleAuthError(error);
    },
    async signInWithPassword(user: { email: string, password: string }) {
      const { supabase } = useSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      error && this.handleAuthError(error);

      this.session = data?.session;
      this.user = data?.user;
    },
    handleAuthError(error: Error) {
      const toast = useToast();
      toast.add({
        description: error.message,
        color: "red",
        icon: "i-heroicons-information-circle",
      });
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.session = null;
    },
  },
  persist: true,
});