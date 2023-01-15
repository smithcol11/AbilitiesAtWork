<script setup>
import { ref } from "vue";
import DropDown from "../components/DropDown.vue";
import TextBox from "../components/TextBox.vue";
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

function createPOST(){
    console.log("POST request called");
    // using the jsonplaceholder to test, will need to replace with actual server address
    fetch('https://jsonplaceholder.typicode.com/posts', {
    // fetch('https://capstone:pdxaaw@capstone.dxz1tza.mongodb.net/test/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contactName: selectedContactName,
        contactInfo: contactInfo,
        businessName: selectedBusinessName,
        industry: selectedIndustries,
        position: selectedPosition,
        shift: selectedShifts,
        hours: selectedHours,
        date: date,
        address: address,
        county: selectedCounty,
        notes: notes
      })
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(errors => console.log(errors))
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
          <DropDown
            v-model="selectedContactName"
            :options="contactNameOptions"
            placeholder="Select Contact"
          ></DropDown>
        </div>
        <div>
          <div class="basis-1/5">
            <label class="form-label inline-block mb-2 text-gray-700"
              >Contact Info</label
            >
            <TextBox
              type="text"
              placeholder="Enter Contact Info"
              v-model="contactInfo"
            >
            </TextBox>
          </div>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Business Name</label
          >
          <DropDown
            v-model="selectedBusinessName"
            :options="businessNameOptions"
            placeholder="Select Business"
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Industry</label
          >
          <DropDown
            v-model="selectedIndustries"
            :options="industryOptions"
            placeholder="Select industy"
          ></DropDown>
        </div>

        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Position</label
          >
          <DropDown
            v-model="selectedPosition"
            :options="positionOptions"
            placeholder="Select Position"
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Shift</label
          >
          <DropDown
            v-model="selectedShifts"
            :options="shiftOptions"
            placeholder="Select Shift"
          ></DropDown>
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >Hours</label
          >
          <DropDown
            v-model="selectedHours"
            :options="hoursOptions"
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

        <div>
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
        </div>
        <div class="basis-1/5">
          <label class="form-label inline-block mb-2 text-gray-700"
            >County</label
          >
          <DropDown
            v-model="selectedCounty"
            :options="countyOptions"
            placeholder="Select County"
          ></DropDown>
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
          @click.native="createPOST"
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
