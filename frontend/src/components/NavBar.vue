<script setup>
function toggleNav() {
  let nav = document.getElementById("nav-bar");
  nav.classList.toggle("hidden");
}
</script>
<template>
  <nav id="nav-bar" class="hidden sm:block duration-300">
    <div class="sm:w-32 sm:h-screen shadow-sm text-center bg-light ">
      <img class="hidden sm:block" src="../assets/images/logo.png">
      <RouterLink class=" sm:py-6 text-center flex justify-center hover:bg-accentDark hover:text-light"
        to="/clientmenu">Client Menu
      </RouterLink>
      <RouterLink class=" sm:py-6 text-center flex justify-center hover:bg-accentDark hover:text-light" to="/jobmenu">
        Job Menu</RouterLink>
      <RouterLink class=" sm:py-6 text-center flex justify-center hover:bg-accentDark hover:text-light" to="/search">
        Search</RouterLink>
      <RouterLink class=" sm:py-6 text-center flex justify-center hover:bg-accentDark hover:text-light" to="/match">
        Match</RouterLink>
      <RouterLink class=" sm:py-6 text-center flex justify-center hover:bg-accentDark hover:text-light" to="/logout">
        Logout</RouterLink>
    </div>
  </nav>
  <button class="sm:hidden flex mx-auto border-b border-x shadow-l bg-light" @click="toggleNav()">
    <svg class="h-6 w-24 text-accentDark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
    </svg>
  </button>
</template>
<style>

</style>