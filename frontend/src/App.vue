<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Login from "./views/Login.vue";
let isAuthAdmin = true;
let isAuthUser = false;
</script>

<template>
  <div v-if="!isAuthAdmin && !isAuthUser">
    <div class="sm:flex">
      <div class="p-5 sm:text-align-center">
        <RouterView />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex">
      <div>
        <NavBar />
      </div>
      <div class="p-5 sm:text-align-center h-screen w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
