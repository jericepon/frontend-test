<script lang="ts" setup>
import { z } from "zod";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const { $supabase } = useNuxtApp();

const isSignUp = ref(false);

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

useHead({
  title: `Todo`,
});
definePageMeta({
  name: "auth",
  layout: "auth",
  middleware: "guest",
});

type State = z.infer<typeof schema>;

const state = reactive<State>({
  email: undefined,
  password: undefined,
});

$supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.user) authStore.login(session.user);
  if (event === "SIGNED_OUT") authStore.logout();
  if (event === "SIGNED_IN") navigateTo("/");
});

const passwordLogin = async () => {
  const { data, error } = await $supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password,
  });

  if (error) {
    console.error(error);
    return;
  }
};

const oAuthLogin = async () => {
  const { data, error } = await $supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error(error);
    return;
  }
};

const handleLogin = async (
  validatedState: z.infer<typeof schema> | null = null,
  oAuth: boolean = false
) => {
  try {
    if (!oAuth && validatedState) {
      await passwordLogin();
    } else {
      await oAuthLogin();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleSignUp = async (validatedState: State) => {
  const { data, error } = await $supabase.auth.signUp({
    ...validatedState,
  });

  if (error) {
    console.error(error);
    return;
  }
  navigateTo("/");
};

const onSubmit = async () => {
  const validatedState = schema.parse(state);

  try {
    !isSignUp.value ? await handleLogin(validatedState) : await handleSignUp(validatedState);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <UCard class="min-w-80">
    <div class="space-y-6">
      <div class="flex flex-col text-center space-y-4">
        <div class="text-xl text-pretty font-semibold">{{ !isSignUp ? "Login" : "Sign up" }}</div>
        <div class="mt-1 text-sm text-pretty">
          {{ !isSignUp ? "Login to your account" : "Create an account" }}
        </div>
        <UButton
          class="w-full justify-center"
          icon="i-uim-google"
          color="gray"
          @click="handleLogin()"
        >
          Google
        </UButton>
      </div>
      <UDivider label="or" />
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit" class="w-full justify-center">
          {{ !isSignUp ? "Login" : "Sign up" }}
        </UButton>

        <div class="mt-1 text-sm text-pretty">
          {{ !isSignUp ? "Don't have an account?" : "Already have an account?" }}
          <UButton variant="link" @click="isSignUp = !isSignUp">{{
            !isSignUp ? "Login" : "Sign up"
          }}</UButton>
        </div>
      </UForm>
    </div>
  </UCard>
  <div class="fixed z-10 top-auto right-4 bottom-4 left-auto">
    <ColorModeBtn />
  </div>
</template>
