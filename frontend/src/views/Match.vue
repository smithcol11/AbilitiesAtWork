<script setup></script>
<template>
  <div id="Job Match" class ="mx-auto rounded w-1/2 h-1/3 bg-light p-5 text-center shadow-lg border" >
    <h2 class="text-center">Client-Job Match </h2>
    <form method="post" @submit.prevent>
      <div class="p-5 text-center">
        <label class="px-5" for="client">Initials:</label>
        <input
          class="rounded border w-60 p-1"
          type="text"
          name="initials"
          id="initials"
          aria-describedby="initialEntry"
          placeholder="Enter the client's initials"
          required
        />
      </div>
      <div class = "text-center">
      <button
        type="match"
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click=""
      >
        Match
      </button>
      </div>
    </form>
  </div>
</template>

<style></style>