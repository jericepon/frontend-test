<script lang="ts" setup>
import { computed } from "vue";
const route = useRoute();

const pageTitle = computed(() => {
  return route.meta.title || "Default Title";
});
</script>

<template>
  <header
    class="relative w-full flex items-center justify-between max-h-12 h-full px-4 sm:px-6 lg:px-8"
  >
    <nav class="flex items-center justify-between flex-grow">
      <div class="flex justify-center items-center">
        <span>{{ pageTitle }}</span>
      </div>
      <UButton
        to="/"
        icon="i-heroicons-plus"
        :ui="{ rounded: 'rounded-full w-8 h-8 p-0 flex justify-center items-center' }"
      />
    </nav>
  </header>
</template>
