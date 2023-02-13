<script setup>
import { reactive, ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";

const banner = reactive({
  success: {
    type: Boolean,
    default: false,
  },
});

const hourString = ["Any", "Part-Time", "Full-Time"];

const data = reactive({
  initials: "",
  industry: "",
  hours: "0",
});

const rules = computed(() => {
  return {
    initials: {
      required: helpers.withMessage("Please enter initials.", required),
      minLength: helpers.withMessage("Must have at least two initials.", minLength(2)),
    },
    industry: {
      required: helpers.withMessage("Please enter an industry.", required),
    },
    hours: {
      required: helpers.withMessage("Please enter hours.", required),
    },
  };
});

// reset form values to default or empty values
const resetForm = () => {
  data.hours = "0";
  data.initials = "";
  data.industry = "";
};

// display success banner if post succeeded
const displaySuccess = () => {
  banner.success = true;
  setTimeout(() => {
    banner.success = false;
  }, 3000);
};

// create the post request and send it to the backend
async function postClient() {
  await fetch("http://localhost:3000/addClient", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      initials: data.initials,
      hours: hourString[parseInt(data.hours)],
      industry: data.industry,
    }),
  })
    .then((response) => console.log(response))
    .catch((errors) => console.log(errors));
}

// use the rules the data must follow
const v$ = useVuelidate(rules, data);

const submitForm = async () => {
  // check that the data matches requirements
  const result = await v$.value.$validate();

  if (result) {
    postClient();
    resetForm();
    v$.value.$reset()
    displaySuccess();
  }
};
</script>

<template>
  <div v-if="banner.success == true" class="p-5 rounded bg-green-400 max-w-xl">
    <h1 class="text-green-700 text-center">
      <b>Successfully added client!</b>
    </h1>
  </div>
  <form method="post" ref="clientForm" @submit.prevent>
    <div class="px-1 sm:px-1 max-w-xl py-5 w-full">
      <div class="mx-auto rounded w-full h-1/2 bg-light p-5 text-left shadow-lg border">
        <div>
          <label class="block px-1 py-1">Initials</label>
          <input class="rounded border px-1 py-1 sm:w-3/4 w-full" type="text" name="initials" id="initials"
            placeholder="Enter initials" v-model="data.initials" required />
          <p class="px-1 py-1 text-red-700" v-if="v$.initials.$error"> {{ v$.initials.$errors[0].$message }} </p>
        </div>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="w-full">
            <label class="block px-1 pt-5">Industry</label>
            <input class="rounded border px-1 py-1 sm:w-full w-full" type="text" name="industry" id="industry"
              placeholder="Enter industry" v-model="data.industry" required />
            <p class="px-1 py-1 text-red-700" v-if="v$.industry.$error"> {{ v$.industry.$errors[0].$message }} </p>
          </div>
          <div class="w-full sm:w-1/2">
            <label class="block text-left px-1 pt-5">Hours</label>
            <select class="rounded bg-white pl-2 pt-1 pb-2 border w-full" name="hours" id="hours" v-bind:value="1"
              v-model="data.hours" required>
              <option class="block w-full" value="0">Any</option>
              <option class="block w-full" value="1">Part-Time</option>
              <option class="block w-full" value="2">Full-Time</option>
            </select>
          </div>
        </div>
        <button class="simple-button px-4 py-1 mt-5 mr-3" @click="submitForm">
          Add client
        </button>
        <button class="simple-button px-4 py-1 mt-5" type="reset" @click="resetForm">
          Reset form
        </button>
      </div>
    </div>
  </form>
</template>
