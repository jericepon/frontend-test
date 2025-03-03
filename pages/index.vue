<script lang="ts" setup>
import { useFeatureAStore } from "~/store/featureA";
const { $supabase } = useNuxtApp();
const featureAStore = useFeatureAStore();

useHead({
  title: "Todo • Dashboard",
  meta: [
    {
      name: "description",
      content: "Home page description",
    },
  ],
});
definePageMeta({
  name: "dashboard",
  middleware: "auth",
});
</script>

<template>
  <div class="w-full grid grid-cols-3 gap-4">
    <ColorModeBtn />
    <DashboardWelcomeCard />
    <USkeleton class="min-h-[200px]" :ui="{}" v-for="i in Array(10)" />
  </div>
</template>

<style></style>
