<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import LoginMenu from "./components/LoginMenu.vue";
</script>

<template>
  <header>
    <div class="">
      <LoginMenu/>

      
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
       
      </nav> 
    </div>
  </header>

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
