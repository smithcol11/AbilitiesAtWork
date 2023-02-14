<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref } from "vue";
import Button from "../components/Button.vue";
import Label from "../components/Label.vue";
const auth = useAuthenticationStore();
let showLogout = ref(false);

function toggleNav() {
  let nav = document.getElementById("nav-bar");
  nav.classList.toggle("hidden");
}

function toggleLogout() {
  showLogout.value = !showLogout.value;
}
</script>

<template>
  <nav id="nav-bar" class="hidden sm:block duration-300">
    <div class="sm:w-32 sm:h-screen shadow-sm text-center bg-light">
      <img
        class="p-3 border-b-2 hidden sm:block"
        src="../assets/images/logo.png"
      />
      <RouterLink class="nav-button" to="/clientMenu"> Client Menu </RouterLink>
      <RouterLink class="nav-button" to="/JobMenu"> Job Menu </RouterLink>
      <RouterLink class="nav-button" to="/match"> Match </RouterLink>
      <button class="nav-button" @click="toggleLogout()">Logout</button>
    </div>
  </nav>
  <Button class="nav-button" @click="toggleNav()">
    <svg
      class="h-7 w-32 text-dark"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </Button>
  <div
    v-if="showLogout"
    class="absolute top-0 w-screen h-screen bg-opacity-50 bg-dark mx-auto text-center z-10"
  >
    <div class="w-72 h-28 shadow-lg mx-auto bg-light mt-24 p-5">
      <Label text="Do you want to logout?"></Label>

      <div class="grid grid-cols-2 gap-4 place-content-around mt-2">
        <Button class="red-button my-5" @click="auth.Logout()" text="Logout">
        </Button>
        <Button class="grey-button my-5" @click="toggleLogout" text="Cancel">
        </Button>
      </div>
    </div>
  </div>
</template>
