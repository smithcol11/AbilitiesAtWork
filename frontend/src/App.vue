<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import { useAuthenticationStore } from "./stores/AuthenticationStore";

const auth = useAuthenticationStore();
</script>

<template>
  <div v-if="!auth.isAuthAdmin && !auth.isAuthUser">
    <div class="sm:flex">
      <div class="p-5 sm:text-align-center h-screen w-full">
        <RouterView />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="sm:flex">
      <div class="">
        <NavBar />
      </div>
      <div class="p-5 sm:text-align-center h-screen w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
