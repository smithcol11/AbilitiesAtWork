<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import { useAuthenticationStore } from "./stores/AuthenticationStore";

const auth = useAuthenticationStore();
</script>

<template>
  <div v-if="!auth.isAuthAdmin && !auth.isAuthUser">
    <div class="sm:flex">
      <div class="sm:text-align-center h-screen w-full dark:bg-darkGray">
        <RouterView />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex">
      <NavBar />
      <div class="sm:text-align-center h-screen w-full dark:bg-darkGray transition duration-300">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>