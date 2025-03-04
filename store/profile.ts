import { defineStore } from 'pinia';

interface UserProfile {
  id: number;
  user_id: string;
  created_at: string;
  avatar_url: string | null;
  first_name: string;
  last_name: string;
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    user: null as UserProfile | null,
    loading: false,
  }),
  actions: {
    async updateProfile(user: UserProfile) {
      this.user = user;
      console.log(user);
      
    },
    async fetchProfile(user_id: string) {
      const { supabase } = useSupabaseClient();

      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('user_id', user_id);
        
      this.user = data?.length ? data[0] : null;
      this.loading = true;
    },
    clearData() {
      this.user = null;
    },
  },
});