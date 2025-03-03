<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const pageTitle = computed(() => {
  return route.meta.name || "Task App";
});
</script>

<template>
  <header
    class="bg-white dark:bg-gray-900 flex items-center justify-between max-h-12 h-full px-4 sm:px-6 lg:px-8 py-1 border-b border-(--ui-border) dark:border-gray-800"
  >
    <nav class="flex items-center justify-between flex-grow">
      <div class="flex justify-center items-center">
        <span class="capitalize">{{ pageTitle }}</span>
      </div>
      <UButton
        to="/"
        icon="i-heroicons-plus"
        :ui="{ rounded: 'rounded-full w-8 h-8 p-0 flex justify-center items-center' }"
      />
    </nav>
  </header>
</template>
