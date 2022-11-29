<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue"
import Login from "./components/LoginMenu.vue"
</script>

<template>
  <header>

  </header>
  <div v-if="isAdmin">
            <label>Username:</label>
            <input type="username"  v-model ="username">
            <label>password:</label>
            <input type="password"   v-model="password">
        </div>
         <div v-else>
            <label>name:</label>
            <input type="name"   v-model="name">
        </div>

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