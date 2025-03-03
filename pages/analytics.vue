<script lang="ts" setup>
useHead({
  title: "Task • Analytics",
});
definePageMeta({
  name: "analytics",
});
</script>

<template>
  <div class="w-full grid grid-cols-3 gap-4">
    <USkeleton class="min-h-[200px]" :ui="{}" v-for="i in Array(10)" />
  </div>
</template>

<style></style>
