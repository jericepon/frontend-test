<script setup lang="ts">
const links = [
  [{ label: "Dashboard", icon: "i-heroicons-home", to: "/" }],
  [{ label: "Settings", icon: "i-heroicons-cog", to: "/settings" }],
];
</script>

<template>
  <aside
    class="border-r border-(--ui-border) dark:border-gray-800 px-4 pb-4 justify-between h-full flex flex-col"
  >
    <div class="h-12 items-center flex mb-4 sm:mb-6 lg:mb-8">
      <UAvatar
        size="sm"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
        class="mr-2"
      />
      <span class="text-gray-900 dark:text-white text-lg font-medium">John</span>
    </div>
    <UVerticalNavigation
      :ui="{
        wrapper: 'flex-grow justify-between h-full flex flex-col',
        divider: {
          wrapper: {
            base: 'hidden',
          },
        },
      }"
      :links
    />
  </aside>
</template>
