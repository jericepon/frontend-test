<script lang="ts" setup>
useHead({
  title: "Task • Tasks",
});
definePageMeta({
  name: "tasks",
});
</script>

<template>
  <div class="w-full grid grid-cols-3 gap-4">
    <USkeleton class="min-h-[200px]" :ui="{}" v-for="i in Array(2)" />
  </div>
</template>

<style></style>
