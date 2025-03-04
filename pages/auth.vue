<script lang="ts" setup>
import { z } from "zod";
import { useAuthStore } from "~/store/auth";
import { useProfileStore } from "~/store/profile";

const toast = useToast();
const { supabase } = useSupabaseClient();
const { login, logout, signUp, signInWithPassword, providerOAuth } = useAuthStore();
const { updateProfile } = useProfileStore();

const isSignUp = ref(false);
const loading = ref(false);

const schema = z.object({
  name: z.string().optional(),
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
  name: "",
  email: "",
  password: "",
});

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.user) login(session.user);
  if (event === "SIGNED_OUT") logout();
  if (event === "SIGNED_IN") navigateTo("/");
});

const handleLogin = async (validatedState?: z.infer<typeof schema>, oAuth: boolean = false) => {
  try {
    loading.value = true;
    if (!oAuth && validatedState) {
      await signInWithPassword(validatedState);
    } else {
      await providerOAuth();
    }
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
  loading.value = false;
};

const onSubmit = async () => {
  const validatedState = schema.parse(state);

  !isSignUp.value ? await handleLogin(validatedState) : await signUp(validatedState);
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
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit()">
        <UFormGroup label="First name" name="text" v-if="isSignUp">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit" :loading class="w-full justify-center">
          {{ !isSignUp ? "Login" : "Sign up" }}
        </UButton>

        <div class="mt-1 text-sm text-pretty">
          {{ !isSignUp ? "Don't have an account?" : "Already have an account?" }}
          <UButton variant="link" @click="isSignUp = !isSignUp">{{
            !isSignUp ? "Sign up" : "Login"
          }}</UButton>
        </div>
      </UForm>
    </div>
  </UCard>
  <div class="fixed z-10 top-auto right-4 bottom-4 left-auto">
    <ColorModeBtn />
  </div>
</template>
