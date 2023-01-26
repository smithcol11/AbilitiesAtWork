<script setup>
import { ref } from "vue";
import router from "../router/index";
const clientInitials = ref('')
const clientIndustry = ref('')
const clientHours = ref("0")
let success = ref(false)
let visible = ref(false)

const data = {
      initials: clientInitials.value,
      preference: {
        industry: clientIndustry.value,
        hours: clientHours.value,
      }};

async function postClient() {
  await fetch("https://localhost:3000/addClient", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      success = true;
      console.log('Success', data);
    })
    .catch((error) => {
      success = false;
      console.log('Error: ', error);
    });
}

</script>


<template>
  <div v-if="!success && visible" class="p-5 rounded bg-green-400 max-w-xl animation-delay:2s ">
    <h1 class="text-green-700 text-center"><b>Successfully added client!</b></h1>
  </div>
  <!--
  <div v-if="!success && visible" class="p-5 rounded bg-red-400 max-w-xl transition-opacity 5s">
    <h1 class="text-red-700 text-center"><b>Error: Something went wrong.</b></h1>
  </div>-->
  <form method="post" @submit.prevent>
    <div class="px-1 sm:px-1 max-w-xl py-5 w-full">
      <div class="mx-auto rounded w-full h-1/2 bg-light p-5 text-left shadow-lg border">
        <div>
            <label class="block px-1 py-1">Initials</label>
            <input
            class="rounded border px-1 py-1 sm:w-3/4 w-full"
            type="text"
            name="initials"
            id="initials"
            placeholder="Enter initials"
            v-model="clientInitials"
            required
            />
        </div>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="w-full">
            <label class="block px-1 pt-1">Industry</label>
              <input
              class="rounded border px-1 py-1 sm:w-full w-full"
              type="text"
              name="industry"
              id="industry"
              placeholder="Enter industry"
              v-model="clientIndustry"
              required
              />
          </div>
          <div class="w-full sm:w-1/2">
            <label class="block text-left px-1 pt-1">Hours</label>
            <select
            class="rounded bg-white pl-2 pt-1 pb-2 border w-full"
            name="hours"
            id="hours"
            v-bind:value="1"
            v-model="clientHours"
            required
            >
              <option class="block w-full" value="0">Any</option>
              <option class="block w-full" value="1">Part-Time</option>
              <option class="block w-full" value="2">Full-Time</option>
            </select>
          </div>
        </div>
        <button
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 mt-5 mr-3 font-bold text-base text-light hover:text-dark rounded"
        @click="postClient; visible=true"
      >
        Add client
      </button>
      <button
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 mt-5 font-bold text-base text-light hover:text-dark rounded"
        type="reset"
      >
        Reset form
      </button>
      </div>
    </div>
  </form>
</template>