<script lang="ts" setup>
import NavBar from "~/components/Layout/NavBar.vue";
import SideBar from "~/components/Layout/SideBar.vue";
import "~/assets/css/main.css";
</script>

<template>
  <div class="flex flex-grow">
    <!-- <UVerticalNavigation :links="vNavLinks" /> -->
    <SideBar />
    <main class="flex flex-col flex-1">
      <NavBar />
      <UContainer class="w-full h-full pt-4 sm:pt-6 lg:pt-8">
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<style></style>
