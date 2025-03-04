<template>
  <div class="h-12 items-center flex mb-4 sm:mb-6 lg:mb-8 cursor-pointer">
    <UAvatar size="sm" :src="authStore.user?.user_metadata.avatar_url" :alt="authStore.user?.user_metadata.name" class="mr-2" />
    <span
      class="text-gray-900 dark:text-white text-lg font-medium animate-[fade-in_500ms_ease-in_1]"
      :class="{ hidden: !isOpen }"
      >John Doe</span
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  size: string;
  src: string;
  alt: string;
  class: string;
}>();
</script>

<style></style>
