<script setup>
  import { ref } from "vue";
  import datePick from '../components/DatePick.vue';

  const businessName = ref("");
  const contactName = ref("");
  const position = ref("");
  const contactInfo = ref("");
  let industries = [];
  const selectedIndustries = ref([]);
  const hours = ref(["Full-Time", "Part-Time", "Both"]);
  const selectedHours = ref("");
  const shifts = ref(["Morning", "Afternoon", "Night"]);
  const selectedShifts = ref([]);
  const selectedCounty = ref("");
  const address = ref("");
  const notes = ref("");
  const datePosted = ref();


  //variables used in the first draft. I did not remove these
  //yet since the console will display warnings if they are not defined
  const industry = ref("");
  const message = ref("");
  const vald = ref(false);
  const name = ref("");
  const shift = ref("");

  //Will be used to fetch industries when industries are added to the database.
  //Used dummy data in the meantime
  function FetchIndustries() {
    console.log("Called 'FetchIndustries' function");
    industries = ["Cafe", "Retail", "Food", "Janitorial"];
  }

  //called functions when window is loaded
  window.onload = FetchIndustries();

</script>

<template>
  <form>
    <div class="CreateJob">
      <div class="container ms space-y-2">
        <div class="flex flex-row gap-x-4">
          <div>
            <span>Business Name: </span>
            <input
              class="border-2"
              type="text"
              v-model="businessName"
              placeholder="Enter here"
            />
          </div>
          <div>
            <span>Contact Name: </span>
            <input
              class="border-2 border-accentDark placeholder-accentLight"
              type="text"
              v-model="contactName"
              placeholder="Contact Name"
            />
          </div>
        </div>
        <div class="flex flex-row gap-x-4">
          <div>
            <span>Position: </span>
            <input
              class="border-2 border-accentDark placeholder-accentLight"
              type="text"
              v-model="position"
              placeholder="Position"
            />
          </div>
          <div>
            <span>Contact Info: </span>
            <input
              class="border-2 border-accentDark placeholder-accentLight"
              type="text"
              v-model="contactInfo"
              placeholder="Contact Info "
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-x-4">
          <span>Industry:</span>
          <div v-for="industry in industries">
            <input
              type="checkbox"
              :value="industry"
              v-model="selectedIndustries"
              
            />
            <span class="checkbox-label">{{ industry }}</span>
          </div>
        </div>
        <div class="flex flex-wrap gap-x-4">
          <span>Hours:</span>
          <div v-for="hour in hours">
            <input type="radio" :value="hour" v-model="selectedHours" />
            <span class="checkbox-label">{{ hour }}</span>
          </div>
        </div>
        <div class="flex flex-wrap gap-x-4">
          <span>Shift(s):</span>
          <div v-for="shift in shifts">
            <input type="checkbox" :value="shift" v-model="selectedShifts" />
            <span class="checkbox-label">{{ shift }}</span>
          </div>
        </div>
        <span> County: </span>
        <select v-model="selectedCounty">
          <option disabled value="">Please select one</option>
          <option>Clackamas</option>
          <option>Multnomah</option>
          <option>Washington</option>
        </select>
        <div>
        <span>Address: </span>
         <input
            class="border-2"
            type="text"
            v-model="address"
            placeholder="Enter here"
          />
        </div>

        <!-- <datePick /> -->

        <!-- <template>
          <div>
            <datePick />
          </div>
        </template> -->

        <div>
          <span>Notes: </span>
          <input
            class="border-2"
            type="text"
            v-model="notes"
            placeholder="Enter here"
          />
        </div>
      </div>

      <br/>
      <div>
        <button class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 rounded">
          SUBMIT
        </button>
      </div>
      <br/>
    </div>
    <span>---------------------------------------------</span>
    <p>businessName: {{ businessName }}</p>
    <p>Contact Name: {{ contactName }}</p>
    <p>Position: {{ position }}</p>
    <p>Contact Info: {{ contactInfo }}</p>
    <p>Selected industries: {{ selectedIndustries }}</p>
    <p>Selected hours: {{ selectedHours }}</p>
    <p>Selected shifts: {{ selectedShifts }}</p>
    <p>Selected county: {{ selectedCounty }}</p>
    <p>Address: {{ address }}</p>
    <p>Notes: {{ notes }}</p>
  </form>
</template>
