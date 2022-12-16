<script setup></script>
<template>
  <div class="Job Menu mx-auto text-2xl rounded w-1/3 h-100 bg-light p-5 shadow-lg text-center border">
    <h1>Job Menu</h1>
    <div class = "pt-6 text-lg">
    <p>Please select from the following options:</p>
    </div>
    <div class = "pt-5">
      <button
        type="add"
        class=" w-40 duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click=""
      >
        Add Job
      </button>
      </div>
      <div class = "pt-5">
      <button
        type="remove"
        class=" w-40 duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click=""
      >
        Remove Job
      </button>
      </div>
      <div class = "pt-5">
      <button
        type="edit"
        class=" w-40 duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click=""
      >
        Edit Job
      </button>
      </div>
      <div class = "pt-5">
      <button
        type="all"
        class=" w-40 duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click=""
      >
        View All Jobs
      </button>
      </div>
  </div>
</template>

<style></style>