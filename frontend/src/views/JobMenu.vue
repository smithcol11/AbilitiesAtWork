<script setup>
import { useAuthStore } from "../stores/Authentication";
import AddJobScreen from "../components/AddJob.vue";
import UserLogin from "../components/UserLogin.vue";
import { ref } from "vue";
const auth = useAuthStore();
const JobOption = ref(0);



</script>
<template>
  <div class="Job Menu mx-auto text-2xl rounded w-2/3 h-100 bg-light p-5 shadow-lg text-center border">
    <h1>Job Menu</h1>
    <div class = "pt-6 text-lg">
    <p>Please select from the following options:</p>
    </div>
    <div class = "pt-3 py-3 md:pt-5 md:py-5 lg:pt-0 lg:py-0 mx-auto ">
      <router-link
      to="/AddJob"
      custom
      v-slot="{ navigate }"
    >
      <button
        type="add"
        class=" w-40 bg-accentDark pt-1 py-1 md:pt-2 md:py-2 lg:pt-2 lg:py-2 lg:px-4 lg:py-1 lg:my-5 lg:w-40 md:w-40 sm:w-30 sm:bg-accentDark duration-300 lg:bg-accentDark hover:bg-accentLight font-bold text-base text-light hover:text-dark rounded"
        @click="navigate"
      >
        Add Job
      </button>
      </router-link>
      </div>
      <div class = "pt-3 py-3 md:pt-5 md:py-5 lg:pt-0 lg:py-0 mx-auto">
        <router-link
      to="/RemoveJob"
      custom
      v-slot="{ navigate }"
    >
      <button
        type="remove"
        class=" w-40 bg-accentDark pt-1 py-1  md:pt-2 md:py-2 lg:pt-2 lg:py-2 lg:px-4 lg:py-1 lg:my-5 lg:w-40 md:w-40 sm:w-40 sm:bg-accentDark  duration-300 lg:bg-accentDark hover:bg-accentLight font-bold text-base text-light hover:text-dark rounded"
        @click="navigate"
      >
        Remove Job
      </button>
        </router-link>
      </div>
      <div class = "pt-3 py-3 md:pt-5 md:py-5 lg:pt-0 lg:py-0 mx-auto">
        <router-link
      to="/EditJob"
      custom
      v-slot="{ navigate }"
    >
      <button
        type="add"
        class=" w-40 bg-accentDark pt-1 py-1 md:pt-2 md:py-2 lg:pt-2 lg:py-2 lg:px-4 lg:py-1 lg:my-5 lg:w-40 md:w-40 sm:w-30 sm:bg-accentDark duration-300 lg:bg-accentDark hover:bg-accentLight font-bold text-base text-light hover:text-dark rounded"
        @click="navigate"
      >
        Edit Job
      </button>
      </router-link>
      </div>
 
      <div class = "pt-3 py-3 md:pt-5 md:py-5 lg:pt-0 lg:py-0 mx-auto">
        <router-link
      to="/ViewAllJobs"
      custom
      v-slot="{ navigate }"
    >
      <button
        type="add"
        class=" w-40 bg-accentDark pt-1 py-1 md:pt-2 md:py-2 lg:pt-2 lg:py-2 lg:px-4 lg:py-1 lg:my-5 lg:w-40 md:w-40 sm:w-30 sm:bg-accentDark duration-300 lg:bg-accentDark hover:bg-accentLight font-bold text-base text-light hover:text-dark rounded"
        @click="navigate"
      >
        View All Jobs
      </button>
      </router-link>
      </div>
  
  </div>
</template>

<style></style>