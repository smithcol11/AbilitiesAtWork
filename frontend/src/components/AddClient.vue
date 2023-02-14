<script setup>
import { reactive, ref, computed, onBeforeMount } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import successBanner from "./SuccessBanner.vue";
import errorBanner from "./ErrorBanner.vue";
import Button from "./Button.vue";
import DropDown from "./DropDown.vue";
import TextBox from "./TextBox.vue";
import Label from "./Label.vue";

const formOptions = reactive({
  industries: [],
  timeCommitmentOptions: [],
});
let requestFormOptions = async () => {
  await fetch("http://localhost:3000/GetJobOptions")
    .then((res) => res.json())
    .then((newOptions) => {
      for (const key in formOptions) {
        formOptions[key] = newOptions[key];
      }
    })
    .catch((err) => console.log(err));
};
onBeforeMount(async () => {
  await requestFormOptions();
});

const banner = reactive({
  displaySuccess: {
    type: Boolean,
    default: false,
  },
  displayFailed: {
    type: Boolean,
    default: false,
  },
  duration: 4,
  timeRemaining: {
    type: Number,
    default: 4,
  },
  timer: {
    type: Number,
    default: 4,
  },
});

const data = reactive({
  initials: "",
  industry: [],
  hours: "",
});
const rules = computed(() => {
  return {
    initials: {
      required: helpers.withMessage("Please enter initials.", required),
      minLength: helpers.withMessage(
        "Must have at least two initials.",
        minLength(2)
      ),
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
  data.hours = "";
  data.initials = "";
  data.industry = "";
};

function DisplayBanner(bannerType) {
  if (bannerType == "success") banner.displaySuccess = true;
  else banner.displayFailed = true;

  clearInterval(banner.timer);
  banner.timeRemaining = banner.duration;

  //create a timer to display banner
  banner.timer = setInterval(() => {
    banner.timeRemaining--;
    if (banner.timeRemaining <= 0) {
      clearInterval(banner.timer);
      banner.displaySuccess = false;
      banner.displayFailed = false;
    }
  }, 1000);
}
// create the post request and send it to the backend
async function postClient() {
  await fetch("http://localhost:3000/addClient", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      initials: data.initials,
      hours: data.hours,
      industry: data.industry,
    }),
  })
    .then((response) => console.log(response))
    .catch((errors) => console.log(errors));
}
// use the rules the data must follow
const v$ = useVuelidate(rules, data);

const submitForm = async () => {
  banner.displaySuccess = false;
  banner.displayFailed = false;

  // check that the data matches requirements
  const result = await v$.value.$validate();
  if (result) {
    postClient();
    resetForm();
    DisplayBanner("success");
    v$.value.$reset();
  } else {
    DisplayBanner("failed");
  }
};
</script>

<template>
  <Transition>
    <div role="alert">
      <div v-if="banner.displaySuccess == true">
        <successBanner
          topText="Job has been successfully created"
          bottomText="Job was added to the available jobs! "
        ></successBanner>
      </div>
      <div v-if="banner.displayFailed == true">
        <errorBanner
          topText="ERROR: Invalid data field!"
          bottomText="One or more data fields is missing or incorrect!"
        ></errorBanner>
      </div>
    </div>
  </Transition>

  <form method="post" ref="clientForm" @submit.prevent>
    <div class="px-1 sm:px-1 max-w-xl py-5 w-full">
      <div
        class="mx-auto rounded w-full h-1/2 bg-light p-5 text-left shadow-lg border"
      >
        <div>
          <Label postion="middle" text="Initals"></Label>
          <div class="flex justify-start my-2">
            <div class="md:w-4/5 sm:w-1/5">
              <TextBox
                type="text"
                placeholder="Enter Initals"
                v-model="data.initials"
                required
              >
              </TextBox>
            </div>
          </div>
          <p class="px-1 py-1 text-red-700" v-if="v$.initials.$error">
            {{ v$.initials.$errors[0].$message }}
          </p>
        </div>
        <div class="md:flex flex-wrap grid-cols-2 justify-start">
          <div class="md:w-2/5 sm:w-1/5">
            <label class="block px-1 pt-5">Industry</label>
            <DropDown
              v-model="data.industry"
              :options="formOptions.industries"
              placeholder="Select Industy"
              required
            ></DropDown>
            <p class="px-1 py-1 text-red-700" v-if="v$.industry.$error">
              {{ v$.industry.$errors[0].$message }}
            </p>
          </div>
          <div class="md:w-2/5 sm:w-2/5">
            <label class="block text-left px-1 pt-5">Hours</label>
            <DropDown
              label="Hours"
              v-model="data.hours"
              :options="formOptions.timeCommitmentOptions"
              :optionLabel="formOptions.timeCommitmentOptions"
              placeholder="Select Hours"
              required
            ></DropDown>
          </div>
        </div>
        <div
          class="md:flex flex-wrap grid-cols-2 gap-2 place-content-start py-4"
        >
          <Button text="Add Client" @click="submitForm()"></Button>
          <Button text="Reset form" @click="resetForm()"></Button>
        </div>
      </div>
    </div>
  </form>
</template>
