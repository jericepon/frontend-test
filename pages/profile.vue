<script lang="ts" setup>
useHead({
  title: "Todo • Profile",
});
definePageMeta({
  name: "profile",
  middleware: "auth",
});
</script>

<template>
  <div class="w-full grid grid-cols-3 gap-4">
    <ColorModeBtn />
    <DashboardWelcomeCard />
    <USkeleton class="min-h-[200px]" :ui="{}" v-for="i in Array(3)" />
  </div>
</template>

<style></style>
