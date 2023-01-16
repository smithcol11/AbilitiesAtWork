<script setup>
import { ref } from "vue";
import DropDown from "../components/DropDown.vue";
import TextBox from "../components/TextBox.vue";
import { useJobDataStore } from "../stores/JobData";
const jobStore = useJobDataStore();
const contactName = ref("");
const businessName = ref("");
const industry = ref("");
const position = ref("");
const shift = ref("");
const hours = ref("");
const city = ref("");
const zip = ref("");
const date = ref("");
const address = ref("");
const county = ref("");
const notes = ref("");
const contactPhoneNumber = ref("");
const contactEmail = ref("");

function createPOST() {
  console.log("POST request called");
  // using the jsonplaceholder to test, will need to replace with actual server address
  fetch("https://jsonplaceholder.typicode.com/posts", {
    // fetch('https://capstone:pdxaaw@capstone.dxz1tza.mongodb.net/test/jobs', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contactName: contactName,
      contactPhoneNumber: contactPhoneNumber,
      contactEmail: contactEmail,
      businessName: businessName,
      industry: industry,
      position: position,
      shift: shift,
      hours: hours,
      date: date,
      address: address,
      county: county,
      notes: notes,
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
            >Contact Name</label
          >
          <DropDown
            v-model="contactName"
            :options="jobStore.GetContactNames()"
            placeholder="Select Contact"
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Business Name</label
          >
          <DropDown
            v-model="businessName"
            :options="jobStore.GetBusinessNames()"
            placeholder="Select Business"
          ></DropDown>
        </div>

        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Contact Phone Number</label
          >
          <TextBox
            type="text"
            placeholder="Enter Contact Phone"
            v-model="contactPhoneNumber"
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
            v-model="contactEmail"
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
            v-model="address"
          >
          </TextBox>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700">City</label>
          <DropDown
            v-model="city"
            :options="jobStore.GetCities()"
            placeholder="Select City"
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Zip Code</label
          >
          <DropDown
            v-model="zip"
            :options="jobStore.GetZipCodes()"
            placeholder="Enter Zip Code"
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Industry</label
          >
          <DropDown
            v-model="industry"
            :options="jobStore.GetIndustries()"
            placeholder="Select Industy"
          ></DropDown>
        </div>

        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Position</label
          >
          <DropDown
            v-model="position"
            :options="jobStore.GetPostions()"
            placeholder="Select Position"
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Shift</label
          >
          <DropDown
            v-model="shift"
            :options="jobStore.GetShifts()"
            placeholder="Select Shift"
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Hours</label
          >
          <DropDown
            v-model="hours"
            :options="jobStore.GetHours()"
            placeholder="Select Hours"
          ></DropDown>
        </div>
        <div>
          <div class="basis-1/5">
            <label class="form-label inline-block mb-2 text-gray-700"
              >Date Posted</label
            >
            <TextBox type="date" v-model="date"> </TextBox>
          </div>
        </div>

        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >County</label
          >
          <DropDown
            v-model="county"
            :options="jobStore.GetCounties()"
            placeholder="Select County"
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Notes</label
          >
          <p style="white-space: pre-line"></p>
          <textarea
            v-model="notes"
            placeholder="Add Notes (Optional)"
          ></textarea>
        </div>
      </div>
      <div>
        <button
          @click.native="createPOST"
          class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 rounded"
        >
          SUBMIT
        </button>
      </div>
    </div>
    <br />
    <span>---------------------------------------------</span>
    <p>Contact Name: {{ contactName }}</p>
    <p>Contact Phonenumber: {{ contactPhoneNumber }}</p>
    <p>Contact email: {{ contactEmail }}</p>
    <p>Business Name: {{ businessName }}</p>
    <p>Industry: {{ industry }}</p>
    <p>Position: {{ position }}</p>
    <p>Selected shift: {{ shift }}</p>
    <p>Selected hours: {{ hours }}</p>
    <p>Date: {{ date }}</p>
    <p>Address: {{ address }}</p>
    <p>Selected county: {{ county }}</p>
    <p>Notes: {{ notes }}</p>
  </form>
</template>
