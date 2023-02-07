<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref } from "vue";

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
      <RouterLink
        class="py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light"
        to="/clientMenu"
        >Client Menu
      </RouterLink>
      <RouterLink
        class="py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light"
        to="/JobMenu"
      >
        Job Menu</RouterLink
      >
      <RouterLink
        class="py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light"
        to="/match"
      >
        Match</RouterLink
      >
      <RouterLink
        class="py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light"
        to="/logout"
      >
        Logout</RouterLink
      >
    </div>
  </nav>
  <button
    class="sm:hidden flex mx-auto border-b border-x shadow-l bg-light"
    @click="toggleNav()"
  >
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
  </button>
  <div
    v-if="showLogout"
    class="absolute top-0 w-screen h-screen bg-opacity-50 bg-dark mx-auto text-center"
  >
    <div class="w-72 h-32 shadow-lg mx-auto bg-light mt-24 p-5">
      Do you want to logout?
      <div>
        <button
          @click="auth.Logout()"
          class="bg-rose-600 text-light shadow p-3 rounded-lg mt-5 mx-1 hover:bg-rose-700 duration-200"
        >
          Logout
        </button>
        <button
          @click="toggleLogout()"
          class="bg-slate-300 text-dark shadow p-3 rounded-lg mt-5 mx-1 hover:bg-slate-200 duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
