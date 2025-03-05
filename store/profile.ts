import { defineStore } from 'pinia';

interface UserProfile {
  user_id?: string;
  name: string;
  email: string;
  avatar_url?: string;
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    user_profile: null as UserProfile | null,
  }),
  actions: {
    updateProfile(user: UserProfile) {
      this.user_profile = user;
    },
    async fetchProfile(user_id: string) {
      const supabase = useSupabase();

      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('user_id', user_id);

      this.user_profile = data?.length ? data[0] : null;
    },
    async addProfile(profile: UserProfile) {
      const supabase = useSupabase();

      //  Handling sing in / sign up with OAuth
      // Check if the user already exists
      this.checkUserExists(profile.email).then(({ data }) => {
        if (data && data.length) return;

        supabase
          .from('profiles')
          .insert([
            profile,
          ])
          .select()
          .then(({ data, error }) => {
            data && this.handleProfieNofication({ description: 'Profile created successfully', type: 'success' });
            error && this.handleProfieNofication({ description: error.message, type: 'error' })
          });
      });

      this.user_profile = profile;
    },
    async checkUserExists(email: string) {
      const supabase = useSupabase();
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('email', email);

      return { data, error };
    },
    handleProfieNofication(data: any) {
      const { notify } = useAuthNotifications();
      notify(data);
    },
    clearProfile() {
      this.user_profile = null;
    },
  },
});