<script lang="ts" setup>
import { z } from "zod";
import { useAuthStore } from "~/store/auth";
import { useProfileStore } from "~/store/profile";

const toast = useToast();
const { $supabase } = useNuxtApp();
const authStore = useAuthStore();
const { updateProfile } = useProfileStore();

const isSignUp = ref(false);
const loading = ref(false);

const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(2),
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
  name: undefined,
  email: undefined,
  password: undefined,
});

$supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.user) authStore.login(session.user);
  if (event === "SIGNED_OUT") authStore.logout();
  if (event === "SIGNED_IN") {
    navigateTo("/");
  }
});

const passwordLogin = async () => {
  const { data, error } = await $supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password,
  });

  if (error) {
    toast.add({
      title: "Error",
      description: error.message,
      color: "red",
      icon: "i-heroicons-information-circle",
    });
    return;
  }
};

const oAuthLogin = async () => {
  const { data, error } = await $supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    toast.add({
      title: "Error",
      description: error.message,
      color: "red",
      icon: "i-heroicons-information-circle",
    });
    return;
  }
};

const handleLogin = async (
  validatedState: z.infer<typeof schema> | null = null,
  oAuth: boolean = false
) => {
  try {
    loading.value = true;
    if (!oAuth && validatedState) {
      await passwordLogin();
    } else {
      await oAuthLogin();
    }
  } catch (error) {
    console.error(error);
  }

  loading.value = false;
};

const handleSignUp = async (validatedState: State) => {
  const { data, error } = await $supabase.auth.signUp({
    ...validatedState,
  });

  if (error) {
    toast.add({
      title: "Warning",
      description: error.message,
      color: "orange",
      icon: "i-heroicons-information-circle",
    });
  } else {
    createProfile({
      user_id: data.user.id,
      name: validatedState.name,
    }).then(() => {
      authStore.login(data.user);
      navigateTo("/");
      toast.add({
        title: "Success",
        description: "Account created successfully",
        color: "green",
        icon: "i-heroicons-information-circle",
      });
    });
  }
};

const onSubmit = async () => {
  const validatedState = schema.parse(state);
  console.log(state);

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
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit()">
        <UFormGroup label="First name" name="text" v-if="isSignUp">
          <UInput v-model="state.first_name" />
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
