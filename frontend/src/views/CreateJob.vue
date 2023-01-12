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


    function submit(){
      if (this.businessName) {
        alert("New Job Submited");
      } else {
        console.log("Required field missing");
      }
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
              required
              class="border-2"
              type="text"
              v-model="businessName"
              placeholder=""
            />
          </div>
          <div>
            <span>Contact Name: </span>
            <input
              required
              class="border-2"
              type="text"
              v-model="contactName"
              placeholder=""
            />
          </div>
        </div>
        <div class="flex flex-row gap-x-4">
          <div>
            <span>Position: </span>
            <input
              required
              class="border-2"
              type="text"
              v-model="position"
              placeholder=""
            />
          </div>
          <div>
            <span>Contact Info: </span>
            <input
              required
              class="border-2"
              type="text"
              v-model="contactInfo"
              placeholder=""
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
            <input              
              type="radio" 
              :value="hour" 
              v-model="selectedHours" 
            />
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
        <select required v-model="selectedCounty">
          <option disabled value="">Please select one</option>
          <option>Clackamas</option>
          <option>Multnomah</option>
          <option>Washington</option>
        </select>
        <div>
        <span>Address: </span>
         <input
            required
            class="border-2"
            type="text"
            v-model="address"
            placeholder=""
          />
        </div>

        <div>
          <label>Date Posted: </label>
          <!-- <datePick /> -->
        </div>

        <span>Notes (optional): </span>
        <div>
          <textarea
            class="border-2"
            type="text"
            v-model="notes"
            placeholder=""
          ></textarea>
        </div>
      </div>

      <br/>
      <div>
        <button @click="submit"
          class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 rounded">
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
