<script lang="ts" setup>
import "~/assets/css/main.css";

const toast = useToast();

let sideBarOptions = {
  onToggleSideBar: (isOpen: boolean) => {
    const baseWidth = `${isOpen ? 240 : 72}px`;
    document.documentElement.style.setProperty("--base-layout-width", `calc(100% - ${baseWidth})`);
  },
};
</script>

<template>
  <div class="grid flex-grow">
    <LayoutSideBar class="fixed z-20 transition-[width]" v-bind="sideBarOptions" />
    <LayoutNavBar
      class="fixed top-0 z-10 left-auto right-0 w-full max-w-[var(--base-layout-width)] transition-all"
    />
    <main
      class="flex flex-grow flex-col mt-[48px] ml-auto w-full max-w-[var(--base-layout-width)] dark:bg-gray-900 transition-all"
    >
      <UContainer class="w-full py-4 sm:pt-6 lg:pt-8">
        <slot />
      </UContainer>
    </main>
  </div>
  <UNotifications />
</template>

<style></style>
