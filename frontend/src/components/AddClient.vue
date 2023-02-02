<script setup>
import { ref } from "vue";
import router from "../router/index";
const clientInitials = ref('')
const clientIndustry = ref('')
const clientHours = ref("0")
const success = ref(false)
const visible = ref(false)

  const data = {
    initials: clientInitials.value,
    preference: {
      industry: clientIndustry.value,
      hours: clientHours.value,
    }
  };

function delay(time) {
  return new Promise(resolve => setTimeout(resolve,time));
}

const resetForm = () => {
  clientHours.value = "0"
  clientInitials.value = ''
  clientIndustry.value = ''
}

const displaySuccess = () => {
  success.value = false;
  visible.value = true;
  console.log("Success started");
  setTimeout(() => {visible.value = false}, 3000);
  console.log("Success finished");
  resetForm();
}

const displayError = () => {
  success.value = false;
  visible.value = true;
  setTimeout(() => {visible.value = false}, 3000);
  resetForm();
}

async function postClient() {
  console.log("Please work");
  await fetch("https://localhost:3000/addClient", {
    method: "POST",
    body: JSON.stringify({
      initials: data.initials,
      hours: data.preference.hours,
      industry: data.preference.industry,
    }),
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success', data);
      displaySuccess();
    })
    .catch((error) => {
      console.log('Error: ', error);
      displayError();
    });
}

</script>

<template>
  <div v-if="success && visible" class="p-5 rounded bg-green-400 max-w-xl">
    <h1 class="text-green-700 text-center"><b>Successfully added client!</b></h1>
  </div>
  <div v-if="!success && visible" class="p-5 rounded bg-red-400 max-w-xl">
    <h1 class="text-red-700 text-center"><b>Error: Something went wrong.</b></h1>
  </div>
  <form method="post" ref="clientForm" @submit.prevent>
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
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 mt-5 mr-3 font-bold text-base text-light hover:text-dark rounded "
        @click="postClient"
      >
        Add client
      </button>
      <button
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 mt-5 font-bold text-base text-light hover:text-dark rounded"
        type="reset" @click="resetForm"
      >
        Reset form
      </button>
      </div>
    </div>
  </form>
</template>

