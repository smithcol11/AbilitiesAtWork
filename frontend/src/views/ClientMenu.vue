<script setup>
import { useAuthStore } from "../stores/Authentication";
import AddClientScreen from "../components/AddClient.vue";
import UserLogin from "../components/UserLogin.vue";
import { ref } from "vue";
const auth = useAuthStore();
const JobOption = ref(0);
</script>

<template>
  <div class="flex justify-center whitespace-nowrap">
          <RouterLink class="block border-solid border-2 border-black rounded text-center w-25 mt-2 mb-2 mr-4 ml-4 sm:text-sm md:text-base lg:text-lg hover:bg-accentDark hover:text-light"
        to="/AddClient">Add Client
      </RouterLink>
      <RouterLink class="block mt-2 mb-2 mr-4 ml-4 border-solid border-2 border-black rounded w-30 sm:text-sm md:text-base lg:text-lg hover:bg-accentDark hover:text-light"  to="/searchClients">
        Search/Filter Clients</RouterLink>  
        </div>
   
  
</template>

