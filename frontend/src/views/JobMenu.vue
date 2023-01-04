<script setup>
import { useAuthStore } from "../stores/Authentication";
import AddJobScreen from "../components/AddJob.vue";
import UserLogin from "../components/UserLogin.vue";
import { ref } from "vue";
const auth = useAuthStore();
const JobOption = ref(0);
</script>

<template>
  <div
    class="mx-auto text-2xl rounded w-2/3 max-w-xl h-100 bg-light p-5 shadow-lg text-center border"
  >
    <h1>Job Menu</h1>
    <div class="pt-6 text-lg">
      <p>Please select from the following options:</p>
    </div>
    <div class="grid grid-cols-1 mx-auto w-40">
      <RouterLink to="/AddJob" class="menuButton"> Add Job </RouterLink>
      <RouterLink to="/RemoveJob" class="menuButton"> Remove Job </RouterLink>
      <RouterLink to="/EditJob" class="menuButton"> Edit Job </RouterLink>
      <RouterLink to="/ViewAllJobs" class="menuButton">
        View All Jobs
      </RouterLink>
    </div>
  </div>
</template>
