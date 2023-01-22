<script setup>
import { reactive, ref, computed } from "vue";
import DropDown from "../components/DropDown.vue";
import TextBox from "../components/TextBox.vue";
import { useJobDataStore } from "../stores/JobData";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const jobStore = useJobDataStore();

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
    contactEmail: { required, email },
    notes: "",
  };
});

//pass the data and rules the data must follow
const v$ = useVuelidate(rules, formData);

const SubmitForm = async () => {
  //check that all required fields have valid input
  const result = await v$.value.$validate();
  if (result) {
    createPOST();
  }
};

function createPOST() {
  console.log("POST request called");
  // will need routing in the backend for this to work
  fetch('http://localhost:3000/createJob', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contactName: formData.contactName,
      contactPhoneNumber: formData.contactPhoneNumber,
      contactEmail: formData.contactEmail,
      businessName: formData.businessName,
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
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((errors) => console.log(errors));
}
</script>

<template>
  <form @submit.prevent>
    <div class="JobCreation">
      <div class="grid grid-cols-2 gap-4 place-content-around h-84 max-w-md">
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Business Name</label
          >
          <TextBox
            type="text"
            placeholder="Enter Business Name"
            v-model="formData.businessName"
            required
          >
          </TextBox>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Contact Name</label
          >
          <TextBox
            type="text"
            placeholder="Enter Contact Name "
            v-model="formData.contactName"
            required
          >
          </TextBox>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Contact Phone Number</label
          >
          <TextBox
            type="text"
            placeholder="Enter Contact Phone"
            v-model="formData.contactPhoneNumber"
            required
          >
          </TextBox>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Contact Email</label
          >
          <TextBox
            type="email"
            placeholder="Enter Contact Email"
            v-model="formData.contactEmail"
            required
          >
          </TextBox>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Address</label
          >
          <TextBox
            type="text"
            placeholder="Enter Address Info"
            v-model="formData.address"
            required
          >
          </TextBox>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700">City</label>
          <DropDown
            v-model="formData.city"
            :options="jobStore.GetCities()"
            placeholder="Select City"
            required
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Zip Code</label
          >
          <DropDown
            v-model="formData.zip"
            :options="jobStore.GetZipCodes()"
            placeholder="Select Zip Code"
            required
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >County</label
          >
          <DropDown
            v-model="formData.county"
            :options="jobStore.GetCounties()"
            placeholder="Select County"
            required
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Position</label
          >
          <DropDown
            v-model="formData.position"
            :options="jobStore.GetPostions()"
            placeholder="Select Position"
            required
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Industry</label
          >
          <DropDown
            v-model="formData.industry"
            :options="jobStore.GetIndustries()"
            placeholder="Select Industy"
            required
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Shift</label
          >
          <DropDown
            v-model="formData.shift"
            :options="jobStore.GetShifts()"
            placeholder="Select Shift"
            required
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Hours</label
          >
          <DropDown
            v-model="formData.hours"
            :options="jobStore.GetHours()"
            placeholder="Select Hours"
            required
          ></DropDown>
        </div>
        <div>
          <div class="basis-1/5">
            <label class="form-label inline-block mb-2 text-gray-700"
              >Date Posted</label
            >
            <TextBox type="date" v-model="formData.date" required> </TextBox>
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
          class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 rounded"
        >
          SUBMIT
        </button>
      </div>
      <span>---------------------------------------------</span>
      <p>Business Name: {{ formData.businessName }}</p>
      <p>Contact Name: {{ formData.contactName }}</p>
      <p>Contact Phone number: {{ formData.contactPhoneNumber }}</p>
      <p>Contact email: {{ formData.contactEmail }}</p>
      <p>Address: {{ formData.address }}</p>
      <p>City: {{ formData.city }}</p>
      <p>Zip: {{ formData.zip }}</p>
      <p>County: {{ formData.county }}</p>
      <p>Position: {{ formData.position }}</p>
      <p>Industry: {{ formData.industry }}</p>
      <p>Shift: {{ formData.shift }}</p>
      <p>Hours: {{ formData.hours }}</p>
      <p>Date: {{ formData.date }}</p>
      <p>Notes: {{ formData.notes }}</p>
    </div>
  </form>
</template>
