<script setup>
function toggleNav() {
  let nav = document.getElementById("nav-bar");
  nav.classList.toggle("hidden");
}
</script>
<template>
  <nav id="nav-bar" class="hidden sm:block duration-300">
    <div class="sm:w-32 sm:h-screen shadow-sm text-center bg-light ">
      <img class="p-3 border-b-2 hidden sm:block" src="../assets/images/logo.png">
      <RouterLink class="py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light"
        to="/searchClients">Client Menu
      </RouterLink>
      <RouterLink class="py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light" to="/searchJobs">
        Job Menu</RouterLink>
      <RouterLink class="py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light" to="/match">
        Match</RouterLink>
      <RouterLink class="py-2 border-b-2 sm:py-3 text-center flex justify-center hover:bg-accentDark hover:text-light" to="/logout">
        Logout</RouterLink>
    </div>
  </nav>
  <button class="sm:hidden flex mx-auto border-b border-x shadow-l bg-light" @click="toggleNav()">
    <svg class="h-7 w-32 text-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </button>
</template>
<style>

</style>