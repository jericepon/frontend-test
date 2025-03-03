<script setup lang="ts">
const isSideBarOpen = ref(true);
const links = [
  [
    { label: "Dashboard", icon: "i-heroicons-home", to: "/" },
    { label: "Tasks", icon: "i-heroicons-clipboard-document-list", to: "/tasks" },
    { label: "Analytics", icon: "i-heroicons-chart-bar", to: "/analytics" },
  ],
  [
    { label: "Settings", icon: "i-heroicons-cog", to: "/settings" },
    { label: "Logout", icon: "i-ic-outline-logout", click: () => console.log("Logout") },
  ],
];

const toggleSideBar = () => {
  isSideBarOpen.value = !isSideBarOpen.value;
};
</script>

<template>
  <aside
    class="border-r border-(--ui-border) dark:border-gray-800 px-4 pb-4 justify-between h-full flex flex-col relative"
  >
    <div class="h-12 items-center flex mb-4 sm:mb-6 lg:mb-8 cursor-pointer">
      <UAvatar
        size="sm"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
        class="mr-2"
      />
      <span
        class="text-gray-900 dark:text-white text-lg font-medium"
        :class="{ hidden: !isSideBarOpen }"
        >John Doe</span
      >
    </div>
    <UVerticalNavigation
      :ui="{
        wrapper: `flex-grow justify-between h-full flex flex-col ${
          isSideBarOpen ? 'w-60' : 'w-auto'
        }`,
        divider: {
          wrapper: {
            base: 'hidden',
          },
        },
        base: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors',
      }"
      :links
    >
      <template #default="{ link }">
        <span :class="{ hidden: !isSideBarOpen }">{{ link.label }}</span>
      </template>
      <template #icon="{ link }">
        <UTooltip :text="link.label" :popper="{ placement: 'right' }" v-if="!isSideBarOpen">
          <UIcon :name="link.icon" size="20" />
        </UTooltip>
        <UIcon :name="link.icon" size="20" v-else />
      </template>
    </UVerticalNavigation>
    <!-- SideBar Toggle -->
    <UButton
      to="/"
      :icon="`i-heroicons-chevron-${isSideBarOpen ? 'left' : 'right'}`"
      :ui="{
        rounded:
          'w-8 h-8 p-0 flex justify-center items-center absolute top-[8px] bottom-auto m-auto left-auto -right-[15px] scale-[0.7] z-10',
      }"
      variant="solid"
      color="gray"
      size="sm"
      @click="toggleSideBar"
    />
  </aside>
</template>
