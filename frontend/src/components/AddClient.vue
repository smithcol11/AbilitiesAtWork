<script setup>
<<<<<<< HEAD
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
=======
import { reactive, computed, toRaw } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
import DropDown from "./DropDown.vue";
import TextBox from "./TextBox.vue";
import successBanner from "./SuccessBanner.vue";
import errorBanner from "./ErrorBanner.vue";

const banner = reactive({
  success: {
    type: Boolean,
    default: false,
  },
  failure: {
    type: Boolean,
    default: false,
  }
});

const hourString = ["Any", "Part-Time", "Full-Time"];

const data = reactive({
  firstName: "",
  middleInitial: "",
  lastInitial: "",
  industry: "",
  hours: "",
});

const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage("Please enter first name.", required),
    },
    middleInitial: {
      required: helpers.withMessage("Please enter middle initial.", required),
      maxLength: helpers.withMessage("Please enter only one middle initial.", maxLength(1)),
    },
    lastInitial: {
      required: helpers.withMessage("Please enter last initial.", required),
      maxLength: helpers.withMessage("Please enter only one last initial.", maxLength(1)),
    },
    industry: {
      required: helpers.withMessage("Please enter an industry.", required),
    },
    hours: {
      required: helpers.withMessage("Please enter hours.", required),
    },
>>>>>>> main
  };

<<<<<<< HEAD
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
  await fetch("http://localhost:3000/addClient", {
    method: "POST",
    body: JSON.stringify(data),
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

=======
// reset form values to default or empty values
const resetForm = () => {
  v$.value.$reset();
  for (const field in data) {
    data[field] = "";
  }
};

// display success banner if post succeeded
const displaySuccess = () => {
  banner.success = true;
  setTimeout(() => {
    banner.success = false;
  }, 3000);
};

// display failure banner if post request failed
const displayFailure = () => {
  banner.failure = true;
  setTimeout(() => {
    banner.success = false;
  }, 3000);
};

// use the rules the data must follow
const v$ = useVuelidate(rules, data);

const submitForm = async () => {
  // check that the data matches requirements
  if (await v$.value.$validate()) {
    // if an error prevents saving the client, warn the user
    if (await postClient()) {
      resetForm();
      displaySuccess();
    } else {
      displayFailure();
    }
  }
};

// create the post request and send it to the backend
async function postClient() {
  return await fetch("http://localhost:3000/addClient", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(toRaw(data)),
  })
    .catch((errors) => { console.log(errors); return null });
}
</script>

<template>
  <form @submit.prevent>
    <div class="shadow-lg border rounded bg-light">
      <div class="h-84 p-5">
        <Transition>
          <div role="alert">
            <div v-if="banner.success == true">
              <successBanner class="mb-4" topText="Job has been successfully created"
                bottomText="Job was added to the available jobs! "></successBanner>
            </div>
            <div v-if="banner.failure == true">
              <errorBanner class="mb-4" topText="ERROR: Unable to save client!"
                bottomText="An error occurred while contacting the server."></errorBanner>
            </div>
          </div>
        </Transition>
        <div class="grid grid-cols-2 gap-4 place-content-around">
          <div class="basis-1/5">
            <TextBox label="First Name" type="text" placeholder="Enter First Name" v-model="data.firstName" />
            <p class="text-red-700" v-if="v$.firstName.$error"> {{ v$.firstName.$errors[0].$message }} </p>
          </div>
          <div class="basis-1/5">
            <TextBox label="Middle Initial" type="text" placeholder="Enter Middle Initial" v-model="data.middleInitial"
              maxLength="1" />
            <p class="text-red-700" v-if="v$.middleInitial.$error"> {{ v$.middleInitial.$errors[0].$message }} </p>
          </div>
          <div class="basis-1/5">
            <TextBox label="Last Initial" type="text" placeholder="Enter Last Initial" v-model="data.lastInitial"
              maxLength="1" />
            <p class="text-red-700" v-if="v$.lastInitial.$error"> {{ v$.lastInitial.$errors[0].$message }} </p>
          </div>
          <div class="basis-1/5">
            <TextBox label="Industry" type="text" placeholder="Enter Industry" v-model="data.industry" />
            <p class="text-red-700" v-if="v$.industry.$error"> {{ v$.industry.$errors[0].$message }} </p>
          </div>
          <div class="basis-1/5">
            <DropDown label="Hours" v-model="data.hours" :options="hourString" placeholder="Select Hours" />
            <p class="text-red-700" v-if="v$.hours.$error"> {{ v$.hours.$errors[0].$message }} </p>
          </div>
        </div>
        <div>
          <button class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 mt-5 mx-2 rounded"
            @click="submitForm">
            Add Client
          </button>
          <button class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 mt-5 mx-2 rounded"
            type="reset" @click="resetForm">
            Reset Form
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
>>>>>>> main
