<script>
var open = true;</script>

<template>
    <nav>
        <div class="w-60 h-full shadow-md bg-white px-1">
        <ul class="relative">
            <li class="relative">
                    <RouterLink class="md:flex sm:inline-block items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to="/">Home</RouterLink>
            </li>
            <li class="relative">
                <RouterLink class="md:flex sm:inline-block items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to="/clientmenu">Client Menu</RouterLink>
            </li>
            <li class="relative">
                <RouterLink class="md:flex sm:inline-block items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to="/jobmenu">JobMenu</RouterLink>
            </li>
            <li class="relative">
                <RouterLink class="md:flex sm:inline-block items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to="/search">Search</RouterLink>
            </li>
            <li class="relative">
                <RouterLink class="md:flex sm:inline-block items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" to="">Exit</RouterLink>
   
            </li>
        </ul>
    </div>
    </nav>
</template>
<style scoped>

</style>
  