<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();

useHead({
  title: "Todo • Login",
});
definePageMeta({
  name: "dashbaord",
  layout: "auth",
  middleware: "guest",
});

const handleLogin = () => {
  authStore.login();
  navigateTo("/");
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button @click="handleLogin">Login</button>
    </form>
  </div>
</template>
