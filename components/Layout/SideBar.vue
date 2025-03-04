<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import logo from "~/assets/img/logo.svg";

const { supabase } = useSupabaseClient();
const { user, logout } = useAuthStore();
const isOpen = ref(true);
const emit = defineEmits(["toggle-side-bar"]);

const links = [
  { label: "Dashboard", icon: "i-heroicons-home", to: "/" },
  { label: "Tasks", icon: "i-heroicons-clipboard-document-list", to: "/tasks" },
  { label: "Analytics", icon: "i-heroicons-chart-bar", to: "/analytics" },
];

const toggleSideBar = () => {
  isOpen.value = !isOpen.value;
  emit("toggle-side-bar", isOpen.value);
};
</script>

<template>
  <aside
    class="border-r border-(--ui-border) dark:bg-gray-900 dark:border-gray-800 px-4 pb-4 h-full"
    :class="{ 'w-60': isOpen, 'w-[72px]': !isOpen }"
  >
    <div class="h-12 items-center flex mb-4 sm:mb-6 lg:mb-8 cursor-pointer">
      <UAvatar size="md" :src="logo" class="mr-2" />
      <span
        class="text-gray-900 dark:text-white text-lg font-medium animate-[fade-in_500ms_ease-in_1]"
        :class="{ hidden: !isOpen }"
        >Todo App</span
      >
    </div>
    <UVerticalNavigation
      :ui="{
        wrapper: `flex-grow justify-between h-full flex flex-col`,
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
        <span :class="{ hidden: !isOpen }" class="animate-[fade-in_500ms_ease-in_1]">{{
          link.label
        }}</span>
      </template>
      <template #icon="{ link }">
        <UTooltip :text="link.label" :popper="{ placement: 'right' }" v-if="!isOpen">
          <UIcon :name="link.icon" size="20" />
        </UTooltip>
        <UIcon :name="link.icon" size="20" v-else />
      </template>
    </UVerticalNavigation>
    <!-- SideBar Toggle -->
    <UButton
      :icon="`i-heroicons-chevron-${isOpen ? 'left' : 'right'}`"
      :ui="{
        rounded:
          'w-8 h-8 p-0 flex justify-center items-center absolute top-0 bottom-0 m-auto left-auto -right-[15px] scale-[0.7] z-20',
      }"
      variant="solid"
      color="gray"
      size="sm"
      @click="toggleSideBar"
    />
  </aside>
</template>
