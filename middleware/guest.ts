import { type Context } from '@nuxt/types';
import { useAuthStore } from '~/store/auth';


export default function (context: Context) {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated)
  {
    return navigateTo('/');
  }
}