<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue"
</script>

<template>
  <header>

  </header>
  <div class="sm:flex">
    <div class="">
      <NavBar />
    </div>
    <div class="p-5 sm:text-align-center">
      <RouterView />
    </div>
  </div>

</template>

<style scoped>

</style>
