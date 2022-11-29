<script setup></script>
<template>
  <nav>
    <div class="sm:w-32 sm:h-screen shadow-md text-center px-1 py-5">
      <ul
        class="sm:pl-5 grid grid-cols-5 sm:grid-cols-1 text-xs sm:text-sm text-black"
      >
        <li class="">
          <RouterLink
            class="sm:flex items-center py-4 hover:text-gray-500 duration-300"
            to="/clientmenu"
            >Client Menu</RouterLink
          >
        </li>
        <li class="">
          <RouterLink
            class="sm:flex items-center py-4 hover:text-gray-500 duration-300"
            to="/jobmenu"
            >Job Menu</RouterLink
          >
        </li>
        <li class="">
          <RouterLink
            class="sm:flex items-center py-4 hover:text-gray-500 duration-300"
            to="/search"
            >Search</RouterLink
          >
        </li>
        <li class="">
          <RouterLink
            class="sm:flex items-center py-4 hover:text-gray-500 duration-300"
            to="/match"
            >Match</RouterLink
          >
        </li>
        <li class="">
          <RouterLink
            class="sm:flex items-center py-4 hover:text-gray-500 duration-300"
            to="/logout"
            >Logout</RouterLink
          >
        </li>
        <li class="">
          <RouterLink
            class="sm:flex items-center py-4 hover:text-gray-500 duration-300"
            to="/userlogin"
            >UserLogin</RouterLink
          >
        </li>
        <li class="">
          <RouterLink
            class="sm:flex items-center py-4 hover:text-gray-500 duration-300"
            to="/adminlogin"
            >AdminLogin</RouterLink
          >
        </li>
        <li class="">
          <RouterLink
            class="sm:flex items-center py-4 hover:text-gray-500 duration-300"
            to="/test"
            >Test</RouterLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<style></style>
