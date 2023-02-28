<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref, watch, reactive } from "vue";
import Button from "../components/Button.vue";
import Label from "../components/Label.vue";
import {useDark, useToggle} from "@vueuse/core";

const isDark = reactive(useDark());
const toggleDark = useToggle(isDark);
const auth = useAuthenticationStore();
let showLogout = ref(false);
// watch (() => isDark.value, (newvalue) => {console.log(newvalue);});

function toggleNav() {
  let nav = document.getElementById("nav-bar");
  nav.classList.toggle("hidden");
}

function toggleLogout() {
  showLogout.value = !showLogout.value;
}
</script>

<template>
  <nav id="nav-bar" class="hidden sm:block transition duration-300">
    <div class="sm:w-32 sm:h-screen shadow-sm text-center duration-300 bg-light dark:bg-darkGray dark:text-light">
      <img
        class="p-3 border-b-2 hidden sm:block"
        src="../assets/images/logo.png"
      />
      <RouterLink class="nav-button dark:hover:bg-darkGrayAccent" to="/clientMenu"> Client Menu </RouterLink>
      <RouterLink class="nav-button dark:hover:bg-darkGrayAccent" to="/JobMenu"> Job Menu </RouterLink>
      <RouterLink class="nav-button dark:hover:bg-darkGrayAccent" to="/match"> Match </RouterLink>
      <button 
      class="w-full py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light dark:hover:bg-darkGrayAccent dark:text-light"
      @click="toggleDark()">
      Dark Mode: {{ isDark }}
      </button>
      <button
        class="w-full py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light dark:hover:bg-darkGrayAccent dark:text-light"
        @click="toggleLogout()"
      >
        Logout
      </button>
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
    class="absolute top-0 w-screen h-screen bg-opacity-50 dark:bg-darkGrayAccent dark:bg-opacity-50 mx-auto text-center z-10"
  >
    <div class="w-72 h-28 shadow-lg mx-auto bg-light dark:bg-darkGray mt-24 p-5">
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
