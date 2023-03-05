<script setup>
import { reactive, toRaw, computed, onBeforeMount } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, helpers } from "@vuelidate/validators";
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
  firstName: "",
  middleInitial: "",
  lastInitial: "",
  industry: [],
  hours: "",
});

const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage("Please enter first name.", required),
    },
    middleInitial: {
      required: helpers.withMessage("Please enter middle initial.", required),
      maxLength: helpers.withMessage(
        "Please enter only one middle initial.",
        maxLength(1)
      ),
    },
    lastInitial: {
      required: helpers.withMessage("Please enter last initial.", required),
      maxLength: helpers.withMessage(
        "Please enter only one last initial.",
        maxLength(1)
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
  v$.value.$reset();
  for (const field in data) {
    data[field] = "";
  }
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

// use the rules the data must follow
const v$ = useVuelidate(rules, data);

const submitForm = async () => {
  banner.displaySuccess = false;
  banner.displayFailed = false;

  // check that the data matches requirements
  const result = await v$.value.$validate();
  if (await v$.value.$validate()) {
    // if an error prevents saving the client, warn the user
    if (await postClient()) {
      resetForm();
      DisplayBanner("success");
    }
  } else {
    DisplayBanner("failed");
  }
};

// create the post request and send it to the backend
async function postClient() {
  return await fetch("http://localhost:3000/addClient", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(toRaw(data)),
  }).catch((errors) => {
    console.log(errors);
    return null;
  });
}
</script>

<template>
  <form @submit.prevent>
    <div class="shadow-lg border rounded bg-light">
      <div class="h-84 p-5">
        <Transition>
          <div role="alert">
            <div v-if="banner.displaySuccess == true">
              <successBanner
                class="mb-4"
                topText="Job has been successfully created"
                bottomText="Job was added to the available jobs! "
              ></successBanner>
            </div>
            <div v-if="banner.displayFailed == true">
              <errorBanner
                class="mb-4"
                topText="ERROR: Invalid data field!"
                bottomText="One or more data fields is missing or incorrect!"
              ></errorBanner>
            </div>
          </div>
        </Transition>
        <div class="grid grid-cols-2 gap-4 place-content-around">
          <div class="basis-1/5">
            <Label text="First Name"></Label>
            <TextBox
              type="text"
              placeholder="Enter First Name"
              v-model="data.firstName"
            />
            <p class="text-red-700" v-if="v$.firstName.$error">
              {{ v$.firstName.$errors[0].$message }}
            </p>
          </div>
          <div class="basis-1/5">
            <Label text="Middle Initial"></Label>
            <TextBox
              type="text"
              placeholder="Enter Middle Initial"
              v-model="data.middleInitial"
              maxLength="1"
            />
            <p class="text-red-700" v-if="v$.middleInitial.$error">
              {{ v$.middleInitial.$errors[0].$message }}
            </p>
          </div>
          <div class="basis-1/5">
            <Label text="Last Initial"></Label>
            <TextBox
              type="text"
              placeholder="Enter Last Initial"
              v-model="data.lastInitial"
              maxLength="1"
            />
            <p class="text-red-700" v-if="v$.lastInitial.$error">
              {{ v$.lastInitial.$errors[0].$message }}
            </p>
          </div>
          <div class="basis-1/5">
            <Label text="Industries"></Label>
            <DropDown
              v-model="data.industry"
              :options="formOptions.industries"
              mode="multiple"
              placeholder="Select Industries"
            />
            <!-- <p class="text-red-700" v-if="v$.hours.$error">
              {{ v$.industry.$errors[0].$message }}
            </p> -->
          </div>
          <div class="basis-1/5">
            <Label text="Hours"></Label>
            <DropDown
              v-model="data.hours"
              :options="formOptions.timeCommitmentOptions"
              placeholder="Select Hours"
            />
            <p class="text-red-700" v-if="v$.hours.$error">
              {{ v$.hours.$errors[0].$message }}
            </p>
          </div>
        </div>
        <div
          class="md:flex flex-wrap grid-cols-2 gap-2 place-content-center py-4"
        >
          <Button text="Add Client" @click="submitForm()"></Button>
          <Button text="Reset form" @click="resetForm()"></Button>
        </div>
      </div>
    </div>
  </form>
</template>
