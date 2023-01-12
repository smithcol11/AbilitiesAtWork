<script setup>
import { ref } from "vue";
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

//variables used in the first draft. I did not remove these
//yet since the console will display warnings if they are not defined
const industry = ref("");
const message = ref("");
const vald = ref(false);
const datePosted = ref(null);
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
      <div class="container mx-auto">
        <div class="flex flex-row">
          <div>
            <span>Business Name: </span>
            <input
              class="border-2 border-accentDark placeholder-accentLight"
              type="text"
              v-model="businessName"
              placeholder="Business Name"
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
        <div class="flex flex-row">
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
        <div class="flex flex-wrap">
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
        <div class="flex flex-wrap">
          <span>Hours:</span>
          <div v-for="hour in hours">
            <input type="radio" :value="hour" v-model="selectedHours" />
            <span class="checkbox-label">{{ hour }}</span>
          </div>
        </div>
        <div class="flex flex-wrap">
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
      </div>

      <!--This is here to seperate what the first draft was from what is currently being created-->
      <p>|</p>
      <p>|</p>
      <p>|</p>
      <p>|</p>
      <p>|</p>
      <!-- <h1>This is the Create Job page </h1> -->
      <span>Business Name: </span>
      <input v-model="name" type="text" placeholder="" />
      <span>Contact Name:</span>
      <input v-model="name" type="text" placeholder="" /><br />
      <span>Position:</span>
      <input v-model="name" type="text" placeholder="" />
      <span>Contact info:</span>
      <input v-model="name" type="text" placeholder="" /><br />

      <span>Industry:</span>
      <input type="radio" v-model="industry" value="Cafe" />
      <label>Cafe</label>
      <input type="radio" v-model="industry" value="Retail" />
      <label>Retail</label>
      <input type="radio" v-model="industry" value="Food" />
      <label>Food</label>
      <input type="radio" v-model="industry" value="Janitorial" />
      <label>Janitorial</label>
      <button class="btn">Add Industry</button><br />

      <span>Hours:</span>
      <input type="radio" v-model="hours" value="Full-Time" />
      <label>Full-Time</label>
      <input type="radio" v-model="hours" value="Part-Time" />
      <label>Part-Time</label>
      <input type="radio" v-model="hours" value="Both" />
      <label>Both</label><br />

      <span>Shift(s):</span>
      <input type="radio" v-model="shift" value="Morning" />
      <label>Morning</label>
      <input type="radio" v-model="shift" value="Afternoon" />
      <label>Afternoon</label>
      <input type="radio" v-model="shift" value="Night" />
      <label>Night</label><br />

      <span>Country:</span>
      <input v-model="name" type="text" placeholder="" />
      <span>Address</span>
      <input v-model="name" type="text" placeholder="" /><br />

      <span>Date Posted</span>
      <input v-model="name" type="text" placeholder="" /><br />

      <span>Notes:</span><br />
      <textarea> </textarea><br />

      <br />
      <button class="btn">SUBMIT</button>
    </div>
    <p>businessName: {{ businessName }}</p>
    <p>Contact Name: {{ contactName }}</p>
    <p>Position: {{ position }}</p>
    <p>Contact Info: {{ contactInfo }}</p>
    <p>Selected industries: {{ selectedIndustries }}</p>
    <p>Selected hours: {{ selectedHours }}</p>
    <p>Selected shifts: {{ selectedShifts }}</p>
    <p>Selected county: {{ selectedCounty }}</p>
  </form>
</template>
<!--

  <style>
  input {
    padding: auto;
    margin: 4px;
    border-bottom: 0em;
  }
  .btn {
    background: rgb(206, 87, 198);
    color: #fff;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
  }
  
  input {
    border: 1px solid rgb(35, 173, 17);
  }
  
  textarea {
    border: 1px solid purple;
  }
</style>

-->
