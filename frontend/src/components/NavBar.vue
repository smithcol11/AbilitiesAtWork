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
  <nav id="nav-bar" class="hidden sm:block transition duration-300 ">
    <div class="sm:w-32 sm:h-screen shadow-sm text-center duration-300 bg-light text-dark dark:bg-darkGray dark:text-light dark:border-r-2 dark:border-r-darkGrayAccent">
      <img
        class="p-3 border-b-2 hidden sm:block dark:border-b-darkGrayAccent"
        src="../assets/images/logo.png"
      />
      <RouterLink class="nav-button dark:hover:bg-darkGrayAccent dark:border-b-darkGrayAccent" to="/clientMenu"> Client Menu </RouterLink>
      <RouterLink class="nav-button dark:hover:bg-darkGrayAccent dark:border-b-darkGrayAccent" to="/JobMenu"> Job Menu </RouterLink>
      <RouterLink class="nav-button dark:hover:bg-darkGrayAccent dark:border-b-darkGrayAccent" to="/match"> Match </RouterLink>
      <button
        class="w-full py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light dark:hover:bg-darkGrayAccent dark:text-light dark:border-b-darkGrayAccent"
        @click="toggleLogout()"
      >
        Logout
      </button>
      <div class = "sm:absolute sm:left-10 sm:bottom-4 sm:w-12">
        <button class=" rounded-full sm:w-full h-12 w-16 text-center mx-auto border dark:border-darkGrayAccent sm:py-1 sm:px-2 flex justify-center hover:bg-slate-200 hover:text-light dark:hover:bg-darkGrayAccent dark:text-light dark:border-b-darkGrayAccent">
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="transition ml-2 duration-300 dark:fill-light fill-yellow-400" @click="toggleDark()"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>
          <svg v-if="isDark == false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="transition mx-1 duration-300 dark:fill-light fill-yellow-400" @click="toggleDark()"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z"/></svg>
        </button>
        <!-- <button 
        class="w-full py-2 sm:py-3 text-center tracking-wide flex justify-center hover:bg-accentDark hover:text-light dark:hover:bg-darkGrayAccent dark:text-light"
        @click="toggleDark()">
        Dark Mode: {{ isDark ? 'On' : 'Off' }}
        </button> -->
      </div>
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