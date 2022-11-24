<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue"
</script>

<template>
  <header>

  </header>
  <div class="md:flex">
    <div class="">
      <NavBar />
    </div>
    <div class="md:p-7 sm:text-align-center">
      <RouterView />
    </div>
  </div>

</template>

<style scoped>

</style>
