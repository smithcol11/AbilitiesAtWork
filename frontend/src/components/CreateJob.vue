<script setup>
import { reactive, ref, computed, onBeforeMount } from "vue";
import DropDown from "./DropDown.vue";
import TextBox from "./TextBox.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, integer } from "@vuelidate/validators";
import successBanner from "./SuccessBanner.vue";
import errorBanner from "./ErrorBanner.vue";

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

const formData = reactive({
  contactName: "",
  businessName: "",
  industry: "",
  position: "",
  shift: "",
  hours: "",
  city: "",
  zip: "",
  date: "",
  address: "",
  county: "",
  notes: "",
  contactEmail: "",
  contactPhoneNumber: "",
});

const formOptions = reactive({
  counties: [],
  cities: [],
  zips: [],
  positions: [],
  industries: [],
  shiftOptions: [],
  timeCommitmentOptions: [],
});

const rules = computed(() => {
  return {
    contactName: { required },
    businessName: { required },
    industry: { required },
    position: { required },
    shift: { required },
    hours: { required },
    city: { required },
    zip: { required },
    date: { required },
    address: { required },
    county: { required },
    contactPhoneNumber: { required },
    contactEmail: { email },
    notes: "",
  };
});

//pass the data and rules the data must follow
const v$ = useVuelidate(rules, formData);

const SubmitForm = async () => {
  banner.displaySuccess = false;
  banner.displayFailed = false;

  //check that all required fields have valid input
  const result = await v$.value.$validate();
  if (result) {
    addJob();
    ResetFormValues();
    DisplayBanner("success");
    v$.value.$reset();
  } else {
    DisplayBanner("failed");
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

async function addJob() {
  console.log("POST request called");
  // will need routing in the backend for this to work
  await fetch("http://localhost:3000/createJob", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      contactName: formData.contactName,
      contactPhoneNumber: formData.contactPhoneNumber,
      contactEmail: formData.contactEmail,
      businessName: formData.businessName,
      city: formData.city,
      zip: formData.zip,
      industry: formData.industry,
      position: formData.position,
      shift: formData.shift,
      hours: formData.hours,
      date: formData.date,
      address: formData.address,
      county: formData.county,
      notes: formData.notes,
    }),
  })
    .then((response) => console.log(response))
    .catch((errors) => console.log(errors));
}

function ResetFormValues() {
  (formData.contactName = ""),
    (formData.businessName = ""),
    (formData.industry = ""),
    (formData.position = ""),
    (formData.shift = ""),
    (formData.hours = ""),
    (formData.city = ""),
    (formData.zip = ""),
    (formData.date = ""),
    (formData.address = ""),
    (formData.county = ""),
    (formData.notes = ""),
    (formData.contactEmail = ""),
    (formData.contactPhoneNumber = "");
}

let requestFormOptions = async () => {
  await fetch("http://localhost:3000/GetJobOptions")
    .then(res => res.json())
    .then(newOptions => {
      for(const key in formOptions) {
        formOptions[key] = newOptions[key];
      };
    })
    .catch((err) => console.log(err));;
};

onBeforeMount(async () => {
  await requestFormOptions();
});
</script>

<template>
  <form @submit.prevent>
    <div class="JobCreation shadow-lg border bg-light">
      <div class="h-84 p-5">
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
        <div class="grid grid-cols-2 gap-4 place-content-around">
          <div class="basis-1/5">
            <TextBox
              label="Business Name"
              type="text"
              placeholder="Enter Business Name"
              v-model="formData.businessName"
            >
            </TextBox>
            <span class="text-red-700" v-if="v$.businessName.$error"
              >Enter a Business Name!</span
            >
          </div>
          <div class="basis-1/5">
            <TextBox
              label="Contact Name"
              type="text"
              placeholder="Enter Contact Name "
              v-model="formData.contactName"
            >
            </TextBox>
            <span class="text-red-700" v-if="v$.contactName.$error"
              >Enter a Contact Name!</span
            >
          </div>
          <div class="basis-1/5">
            <TextBox
              label="Contact Phone Number"
              type="number"
              placeholder="Enter Contact Phone"
              v-model="formData.contactPhoneNumber"
            >
            </TextBox>
            <span class="text-red-700" v-if="v$.contactPhoneNumber.$error"
              >Enter a Phone Number!</span
            >
          </div>
          <div class="basis-1/5">
            <TextBox
              label="Contact Email"
              type="email"
              placeholder="Enter Contact Email"
              v-model="formData.contactEmail"
            >
            </TextBox>
            <span class="text-red-700" v-if="v$.contactEmail.$error"
              >Enter a Valid Email!</span
            >
          </div>
          <div class="basis-1/5">
            <TextBox
              label="Address"
              type="text"
              placeholder="Enter Address Info"
              v-model="formData.address"
            >
            </TextBox>
            <span class="text-red-700" v-if="v$.address.$error"
              >Enter Address Info!</span
            >
          </div>
          <div class="basis-1/5">
            <DropDown
              label="City"
              v-model="formData.city"
              :options="formOptions.cities"
              placeholder="Select City"
            ></DropDown>
            <span class="text-red-700" v-if="v$.city.$error">Select City!</span>
          </div>
          <div class="basis-1/5">
            <DropDown
              label="Zip Code"
              v-model="formData.zip"
              :options="formOptions.zips"
              placeholder="Select Zip Code"
            ></DropDown>
            <span class="text-red-700" v-if="v$.zip.$error"
              >Select Zip Code!</span
            >
          </div>

          <div class="basis-1/5">
            <DropDown
              label="County"
              v-model="formData.county"
              :options="formOptions.counties"
              placeholder="Select County"
            ></DropDown>

            <span class="text-red-700" v-if="v$.county.$error"
              >Select County!</span
            >
          </div>
          <div class="basis-1/5">
            <DropDown
              label="Position"
              v-model="formData.position"
              :options="formOptions.positions"
              placeholder="Select Position"
            ></DropDown>
            <span class="text-red-700" v-if="v$.position.$error"
              >Select Position!</span
            >
          </div>
          <div class="basis-1/5">
            <DropDown
              label="Industry"
              v-model="formData.industry"
              :options="formOptions.industries"
              placeholder="Select Industy"
            ></DropDown>
            <span class="text-red-700" v-if="v$.industry.$error"
              >Select Industry!</span
            >
          </div>
          <div class="basis-1/5">
            <DropDown
              label="Shift"
              v-model="formData.shift"
              :options="formOptions.shiftOptions"
              placeholder="Select Shift"
            ></DropDown>
            <span class="text-red-700" v-if="v$.shift.$error"
              >Select Shift!</span
            >
          </div>
          <div class="basis-1/5">
            <DropDown
              label="Hours"
              v-model="formData.hours"
              :options="formOptions.timeCommitmentOptions"
              placeholder="Select Hours"
            ></DropDown>
            <span class="text-red-700" v-if="v$.hours.$error"
              >Select Hours!</span
            >
          </div>
          <div>
            <div class="basis-1/5">
              <TextBox type="date" v-model="formData.date" label="Date Posted">
              </TextBox>
              <span class="text-red-700" v-if="v$.date.$error"
                >Select Date!</span
              >
            </div>
          </div>
          <div class="basis-1/5">
            <label class="form-label inline-block mb-2 text-gray-700"
              >Notes</label
            >
            <p style="white-space: pre-line"></p>
            <textarea
              class="form-control block w-full px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              v-model="formData.notes"
              placeholder="Add Notes (Optional)"
            ></textarea>
          </div>
        </div>
        <div>
          <button
            @click="SubmitForm()"
            class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 mt-5 rounded"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
