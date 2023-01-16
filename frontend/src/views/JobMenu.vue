<script setup>
import { useAuthStore } from "../stores/Authentication";
import AddJobScreen from "../components/AddJob.vue";
import UserLogin from "../components/UserLogin.vue";
import { ref } from "vue";
const auth = useAuthStore();
const JobOption = ref(0);
</script>

<template>

  <div class="flex justify-center whitespace-nowrap">
    
          <RouterLink class="block border-solid border-2 border-black rounded w-20 text-center  mt-2 mb-2 mr-4 ml-4 text-sm md:text-base lg:text-lg hover:bg-accentDark hover:text-light"
        to="/AddJob">Add Job
      </RouterLink>
      <RouterLink class="block mt-2 mb-2 mr-4 ml-4 border-solid border-2 border-black rounded w-30 text-sm md:text:base lg:text-lg hover:bg-accentDark hover:text-light"  to="/searchJobs">
        Search/Filter Jobs</RouterLink>  
        </div>
 
</template>
