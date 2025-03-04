<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "~/store/auth";
const route = useRoute();
const { supabase } = useSupabaseClient();
const { logout } = useAuthStore();

const pageTitle = computed(() => {
  return route.meta.name || "Task App";
});

const items = ref([
  [
    { label: "ben@example.com", slot: "account", disabled: true },
    { label: "Divider", icon: "i-heroicons-user", slot: "divider", class: "p-0", disabled: true },
    { label: "Profile", icon: "i-heroicons-user", to: "/profile" },
    { label: "Settings", icon: "i-heroicons-cog", to: "/settings" },
    {
      label: "Divider",
      icon: "i-heroicons-user",
      slot: "divider",
      class: "p-0 md:hidden",
      disabled: true,
    },
    { label: "Dashboard", icon: "i-heroicons-home", class: "md:hidden", to: "/" },
    {
      label: "Tasks",
      icon: "i-heroicons-clipboard-document-list",
      class: "md:hidden",
      to: "/tasks",
    },
    { label: "Analytics", icon: "i-heroicons-chart-bar", class: "md:hidden", to: "/analytics" },
    { label: "Divider", icon: "i-heroicons-user", slot: "divider", class: "p-0", disabled: true },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: async () => {
        await supabase.auth.signOut().then(() => {
          logout();
          navigateTo("/auth");
        });
      },
    },
  ],
]);
</script>

<template>
  <header
    class="bg-white dark:bg-gray-900 flex items-center justify-between max-h-12 h-full px-4 sm:px-6 lg:px-8 py-1 border-b border-(--ui-border) dark:border-gray-800"
  >
    <nav class="flex items-center justify-between flex-grow">
      <div class="flex justify-center items-center">
        <span class="capitalize">{{ pageTitle }}</span>
      </div>
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

        <template #account="{ item }">
          <div class="text-left">
            <p class="font-medium text-gray-900 dark:text-white">Jeric Epon</p>
            <p class="truncate">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template #divider="{ item }">
          <div class="border-t border-0.5 border-x-0 border-b-0 my-2 bg-gray-400 w-full" />
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>
          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdown>
    </nav>
  </header>
</template>
