<script setup>
import { useAuthStore } from "../stores/Authentication";
import AdminLogin from "../components/AddJob.vue";
import UserLogin from "../components/UserLogin.vue";
import { ref } from "vue";
const auth = useAuthStore();
const JobOption = ref(0);

function AddJob() {
  JobOption.value = 1;
}
function RemoveJob() {
  JobOption.value = 2;
}
function EditJob() {
  JobOption.value = 3;
}
function ViewAllJobs() {
  JobOption.value = 4;
}

</script>
<template>
  <div class="Job Menu mx-auto text-2xl rounded w-1/3 h-100 bg-light p-5 shadow-lg text-center border">
    <h1>Job Menu</h1>
    <div class = "pt-6 text-lg">
    <p>Please select from the following options:</p>
    </div>
    <div class = "pt-3 py-3 md:pt-5 md:py-5 lg:pt-0 lg:py-0 mx-auto">
      <button
        type="add"
        class=" w-20 bg-accentDark pt-1 py-1 md:pt-2 md:py-2 lg:pt-2 lg:py-2 lg:px-4 lg:py-1 lg:my-5 lg:w-40 md:w-40 sm:w-30 sm:bg-accentDark duration-300 lg:bg-accentDark hover:bg-accentLight font-bold text-base text-light hover:text-dark rounded"
        @click="AddJob()"
      >
        Add Job
      </button>
      </div>
      <div class = "pt-3 py-3 md:pt-5 md:py-5 lg:pt-0 lg:py-0 mx-auto">
      <button
        type="remove"
        class=" w-20 bg-accentDark pt-1 py-1 md:pt-2 md:py-2 lg:pt-2 lg:py-2 lg:px-4 lg:py-1 lg:my-5 lg:w-40 md:w-40 sm:w-20 sm:bg-accentDark  duration-300 lg:bg-accentDark hover:bg-accentLight font-bold text-base text-light hover:text-dark rounded"
        @click="RemoveJob()"
      >
        Remove Job
      </button>
      </div>
      <div class = "pt-3 py-3 md:pt-5 md:py-5 lg:pt-0 lg:py-0 mx-auto">
      <button
        type="add"
        class=" w-20 bg-accentDark pt-1 py-1 md:pt-2 md:py-2 lg:pt-2 lg:py-2 lg:px-4 lg:py-1 lg:my-5 lg:w-40 md:w-40 sm:w-30 sm:bg-accentDark duration-300 lg:bg-accentDark hover:bg-accentLight font-bold text-base text-light hover:text-dark rounded"
        @click="EditJob()"
      >
        Edit Job
      </button>
      </div>
 
      <div class = "pt-3 py-3 md:pt-5 md:py-5 lg:pt-0 lg:py-0 mx-auto">
      <button
        type="add"
        class=" w-20 bg-accentDark pt-1 py-1 md:pt-2 md:py-2 lg:pt-2 lg:py-2 lg:px-4 lg:py-1 lg:my-5 lg:w-40 md:w-40 sm:w-30 sm:bg-accentDark duration-300 lg:bg-accentDark hover:bg-accentLight font-bold text-base text-light hover:text-dark rounded"
        @click="EditJob()"
      >
        View All Jobs
      </button>
      </div>
  </div>
</template>

<style></style>