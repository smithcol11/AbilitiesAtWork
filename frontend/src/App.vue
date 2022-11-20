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

  <RouterView />
</template>

<style scoped></style>
