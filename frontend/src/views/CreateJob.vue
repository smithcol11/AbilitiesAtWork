<script setup>
import Multiselect from "@vueform/multiselect";
import { ref } from "vue";

const selectedContactName = ref("");
let contactNameOptions = [];
const contactInfo = ref(null);
const selectedBusinessName = ref("");
let businessNameOptions = [];
let industryOptions = [];
const selectedIndustries = ref([]);
const selectedPosition = ref("");
let positionOptions = [];
const shiftOptions = ref(["Morning", "Afternoon", "Night"]);
const selectedShifts = ref([]);
const hoursOptions = ref(["Full-Time", "Part-Time", "Both"]);
const selectedHours = ref("");
const date = ref();
const address = ref("");
const countyOptions = ref(["Clackamas", "Multnomah", "Yamhill", "Washington"]);
const selectedCounty = ref("");
const notes = ref("");

//Will be used to fetch industries when industries are added to the database.
//Used dummy data in the meantime
function FetchDataOptions() {
  console.log("Called 'FetchData' function");
  FetchIndustries();
  FetchBusinessNames();
  FetchContactNames();
  FetchPositions();
}
function FetchContactNames() {
  console.log("Called 'FetchContactNames' function");
  contactNameOptions = [
    "Keith Karrie",
    "Byrne Earnestine",
    "Dinah Kelsi",
    "Caleb Cailin",
  ];
}
function FetchIndustries() {
  console.log("Called 'FetchIndustries' function");
  industryOptions = [
    "Production",
    "Manufacturing",
    "Finance",
    "Construction",
    "Hospitality",
    "Accounting",
  ];
}
function FetchBusinessNames() {
  console.log("Called 'FetchBusiness' function");
  businessNameOptions = [
    "Nike",
    "Kroger",
    "Intel",
    "Amazon",
    "OHSU",
    "Autodesk",
    "Ford",
  ];
}
function FetchPositions() {
  console.log("Called 'FetchPositions' function");
  positionOptions = [
    "Cashier",
    "Cook",
    "Clerk",
    "Janitor",
    "Manager",
    "Sales Rep",
    "Host",
  ];
}

//called functions when window is loaded
window.onload = FetchDataOptions();
</script>

<template>
  <form @submit.prevent>
    <div class="JobCreation">
      <div class="grid grid-cols-2 gap-4 place-content-around h-84 max-w-md">
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Contact Name</label
          >
          <multiselect
            class="vueform-multiselect"
            v-model="selectedContactName"
            :options="contactNameOptions"
            :clear-on-select="true"
            :preserve-search="true"
            :searchable="true"
            :show-labels="false"
            placeholder="Select Contact"
            required
          >
          </multiselect>
        </div>
        <div>
          <div class="basis-1/5">
            <label class="form-label inline-block mb-2 text-gray-700"
              >Contact Info</label
            >
            <input
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              placeholder="Enter Contact Info"
              v-model="contactInfo"
              required
            />
          </div>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Business Name</label
          >
          <multiselect
            class="vueform-multiselect"
            v-model="selectedBusinessName"
            :options="businessNameOptions"
            :close-on-select="true"
            :searchable="true"
            :preserve-search="true"
            :hideSelected="false"
            placeholder="Select Business"
            label="selectedBusinessName"
            required
          >
          </multiselect>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Industry</label
          >
          <multiselect
            class="vueform-multiselect"
            v-model="selectedIndustries"
            :options="industryOptions"
            :clear-on-select="true"
            :preserve-search="true"
            :searchable="true"
            :show-labels="false"
            placeholder="Select industy"
            required
            :multiple="true"
          >
          </multiselect>
        </div>

        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Position</label
          >
          <multiselect
            class="vueform-multiselect"
            v-model="selectedPosition"
            :options="positionOptions"
            :clear-on-select="true"
            :preserve-search="true"
            :searchable="true"
            placeholder="Select Position"
            track-by="selectedPosition"
            required
          >
          </multiselect>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Shift</label
          >
          <multiselect
            class="vueform-multiselect"
            v-model="selectedShifts"
            :options="shiftOptions"
            :clear-on-select="true"
            :preserve-search="true"
            :searchable="true"
            placeholder="Select Shift"
            required
          >
          </multiselect>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Hours</label
          >
          <multiselect
            class="vueform-multiselect"
            v-model="selectedHours"
            :options="hoursOptions"
            :clear-on-select="true"
            :preserve-search="true"
            :searchable="true"
            placeholder="Select Hours"
            track-by="selectedHours"
            required
          >
          </multiselect>
        </div>
        <div>
          <div class="basis-1/5">
            <label class="form-label inline-block mb-2 text-gray-700"
              >Date Posted</label
            >
            <input
              type="date"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
              v-model="date"
              required
            />
          </div>
        </div>

        <div>
          <div class="basis-1/5">
            <label class="form-label inline-block mb-2 text-gray-700"
              >Address</label
            >
            <input
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              placeholder="Enter Address"
              v-model="address"
              required
            />
          </div>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >County</label
          >
          <multiselect
            class="vueform-multiselect"
            v-model="selectedCounty"
            :options="countyOptions"
            :clear-on-select="true"
            :preserve-search="true"
            :searchable="true"
            placeholder="Select County"
            track-by="selectedCounty"
            required
          >
          </multiselect>
        </div>
        <div>
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
      </div>
      <div>
        <button
          @click="submit"
          class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 rounded"
        >
          SUBMIT
        </button>
      </div>
    </div>
    <br />
    <span>---------------------------------------------</span>
    <p>Contact Name: {{ selectedContactName }}</p>
    <p>Contact Info: {{ contactInfo }}</p>
    <p>Business Name: {{ selectedBusinessName }}</p>
    <p>Industry: {{ selectedIndustries }}</p>
    <p>Position: {{ selectedPosition }}</p>
    <p>Selected shifts: {{ selectedShifts }}</p>
    <p>Selected hours: {{ selectedHours }}</p>
    <p>Date: {{ date }}</p>
    <p>Address: {{ address }}</p>
    <p>Selected county: {{ selectedCounty }}</p>
    <p>Notes: {{ notes }}</p>
  </form>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
