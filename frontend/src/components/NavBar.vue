<script setup></script>
<template>
    <nav>
        <div class="sm:w-32  sm:h-screen shadow-md text-center px-1 py-5">
        <ul class="sm:pl-5 grid grid-cols-5 sm:grid-cols-1 text-xs text-gray-700 duration-300 hover:text-gray-900">
            <li class="">
                <RouterLink class="sm:flex items-center  py-4" to="/clientmenu">Client Menu</RouterLink>
            </li>
            <li class="">
                <RouterLink class="sm:flex items-center  py-4" to="/jobmenu">Job Menu</RouterLink>
            </li>
            <li class="">
                <RouterLink class="sm:flex items-center  py-4" to="/search">Search</RouterLink>
            </li>
            <li class="">
                <RouterLink class="sm:flex items-center  py-4" to="/match">Match</RouterLink>
            </li>
            <li class="">
                <RouterLink class="sm:flex items-center  py-4" to="/logout">Logout</RouterLink>
            </li>
        </ul>
    </div>
    </nav>
</template>
<style></style>
  