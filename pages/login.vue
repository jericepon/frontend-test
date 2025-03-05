<script lang="ts" setup>
import { Auth } from "@supa-kit/auth-ui-vue";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuthStore } from "~/store/auth";

const supabaseClient = useSupabase();
const { login } = useAuthStore();
const isSignUp = ref(false);

useHead({
  title: `Todo`,
});
definePageMeta({
  name: "auth",
  layout: "auth",
  middleware: "guest",
});

onMounted(() => {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session && session.user) login(session.user);
    if (event === "SIGNED_IN") navigateTo("/");
  });
});
</script>

<template>
  <UCard class="min-w-80">
    <Auth
      :supabaseClient
      :show-links="false"
      :view="`${isSignUp ? 'sign_up' : 'sign_in'}`"
      :appearance="{
        brand: 'green',
        theme: ThemeSupa,
        style: {
          divider: {
            display: 'none!important',
            color: 'hsl(0 0% 0% / 0.1)',
          },
        },
      }"
      :providers="['google']"
    />
    <div class="mt-1 text-sm text-pretty">
      {{ !isSignUp ? "Don't have an account?" : "Already have an account?" }}
      <UButton variant="link" @click="isSignUp = !isSignUp">{{
        !isSignUp ? "Sign up" : "Login"
      }}</UButton>
    </div>
  </UCard>
  <div class="fixed z-10 top-auto right-4 bottom-4 left-auto">
    <ColorModeBtn />
  </div>
</template>

<style lang="scss">
.supabase-auth-ui_ui-container [role="separator"] {
  @apply dark:bg-slate-800;
  & > span {
    display: none;
  }
}
</style>
