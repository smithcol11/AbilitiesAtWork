<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref, watch, reactive } from "vue";
import Button from "../components/Button.vue";
import Label from "../components/Label.vue";


import {useDark, useToggle} from "@vueuse/core";

const isDark = reactive(useDark());

let observer = {};
let themeName = "";
let loadedThemes = {};
const callback = (list) => {

  // Walk through all the DOM mutations. We're looking for the
  // addition of a STYLE element to the document head.
  for (const mutation of list) {
    if (mutation.type === 'childList') {

      // Walk the added nodes
      mutation.addedNodes.forEach((node) => {

        // See if it's our target
        if (mutation.target === document.head && node.nodeName === "STYLE") {
          loadedThemes[themeName] = node
          // Remove our mutation listener as we're done with it
          observer.disconnect();
        }
      })
    }
  }
}
const loadTheme = (newName, oldName) => {

  // Make sure we actually got a theme name change
  if (newName !== oldName) {
    themeName = newName;
    // See if we have an already loaded theme. If so, we have to remove it
    if (loadedThemes[oldName]) {
      document.head.removeChild(loadedThemes[oldName]);
    }

    // If we've loaded this theme before, then get it from the cache.
    if (loadedThemes[newName]) {
      document.head.appendChild(loadedThemes[newName])
    } else {

        // Setup the callback so that we catch the style change
        setupCallback()
        // Change the theme by importing it.
        import("../../node_modules/primevue/resources/themes/" + newName + "/theme.css"/* @vite-ignore */);
    }
  }
}
const setupCallback = () => {
    const config = { attributes: true, childList: true, subtree: true }

    // Create an observer instance linked to the callback function
    observer = new MutationObserver(callback)

    // Start observing the target node for configured mutations
    observer.observe(document.head, config)
}
const tearDownCallback = () => {
    observer.disconnect()
}

const toggleDark = () => {
  useToggle(isDark)();
  if(isDark.value == true){
    loadTheme("mdc-dark-deeppurple", "saga-blue");
  } else {
    loadTheme("saga-blue", "mdc-dark-deeppurple");
  }
}


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
  <nav id="nav-bar" class="hidden sm:block transition duration-300">
    <div class="sm:w-32 sm:h-screen shadow-sm text-center duration-300 bg-light text-dark dark:bg-darkGray dark:text-light">
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
      Dark Mode: {{ isDark ? 'On' : 'Off' }}
      </button>
      <button
        class="w-full py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light dark:hover:bg-darkGrayAccent dark:text-light"
        @click="toggleLogout()"
      >
        Logout
      </button>
    </div>
  </nav>
  <button
    class="sm:hidden nav-button flex mx-auto border-b border-x shadow-l bg-light"
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
