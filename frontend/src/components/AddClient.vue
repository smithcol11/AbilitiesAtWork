<script setup>
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
  };
});

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