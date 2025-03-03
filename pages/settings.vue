<template>
  <div class="w-full grid grid-cols-3 gap-4">
    <USkeleton class="min-h-[200px]" :ui="{}" v-for="i in Array(4)" />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Task • Settings",
  meta: [
    {
      name: "description",
      content: "Settings page description",
    },
  ],
});
definePageMeta({
  title: "Settings",
});
</script>

<style></style>
