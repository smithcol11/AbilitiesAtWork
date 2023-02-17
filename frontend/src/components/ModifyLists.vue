<script setup>
import { reactive, ref, toRaw } from "vue";
import DropDown from "./DropDown.vue";

const listItems = ref([]);
const listType = ref("");
const chosen = ref(false);

const toEdit = ref(false);
const toRemove = ref(false);
const toAdd = ref(false);
const toInput = ref(false);
const submitReady = ref(false);

const choice = ref("");
const change = ref("");

const matchText = (element) => element === choice.value;

function resetOptions() {
  submitReady.value = false;
  choice.value = "";
  toEdit.value = false;
  toRemove.value = false;
  toInput.value = false;
  toAdd.value = false;
  change.value = "";
}

const formOptions = reactive({
  _id: "",
  counties: [],
  cities: [],
  zips: [],
  positions: [],
  industries: [],
  shiftOptions: [],
  timeCommitmentOptions: [],
});

function chooseList(e) {
  if (e) {
    resetOptions();
    listType.value = e;
    getListContents(listType.value);
    chosen.value = true;
  }
}

function startAdd() {
  resetOptions();
  toAdd.value = true;
  toInput.value = true;
  submitReady.value = true;
}

function startRemove() {
  resetOptions();
  toRemove.value = true;
}

function startEdit() {
  resetOptions();
  toEdit.value = true;
}

function openInput(e) {
  if (toRemove.value == false) {
    toInput.value = true;
  }

  choice.value = e.target.options[e.target.options.selectedIndex].text;
  submitReady.value = true;
}

function onSubmit() {
  let selectedList = null;
  
  if (listType.value === "Positions") {
    selectedList = formOptions.positions;
  } else if (listType.value === "Industries") {
    selectedList = formOptions.industries;
  } else {
    // No list selected; modify nothing.
    return;
  }

  if (toAdd.value) {
    selectedList.push(choice.value);
  } else {
    let matchIndex = selectedList.findIndex(matchText);
    if (matchIndex < 0) {
      // Due due dropdown selection, this case should be impossible.
    } else if (toRemove.value) {
      selectedList.splice(matchIndex, 1);
    } else if (toEdit.value) {
      selectedList[matchIndex] = change.value;
    }
  } 
    
  console.log(toRaw(formOptions));
  //sendChanges();
}

async function getListContents(listName) {
  await fetch("http://localhost:3000/GetJobOptions")
    .then((res) => res.json())

    .then((newOptions) => {
      for (const key in formOptions) {
        formOptions[key] = newOptions[key];
      }
    })
    .catch((err) => console.log(err));
  if (listName === "Positions") {
    listItems.value = formOptions.positions;
  } else {
    listItems.value = formOptions.industries;
  }
}

async function sendChanges() {
  await fetch("http://localhost:3000/jobOptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      _id: formOptions._id,
      counties: formOptions.counties,
      cities: formOptions.cities,
      zips: formOptions.zips,
      positions: formOptions.positions,
      industries: formOptions.industries,
      shiftOptions: formOptions.shiftOptions,
      timeCommitmentOptions: formOptions.timeCommitmentOptions,
    }),
  })
    .then((response) => console.log(response))
    .catch((errors) => console.log(errors));
}
</script>

<template>
  <div class="flex flex-col items-center justify-center shadow-lg border bg-light m-3">
    <div class="w-3/4 p-5">
      <label class="block text-left px-1 p-3">Which List?</label>
      <DropDown
        class="l-2 w-full"
        v-on:change="chooseList($event)"
        :options="['Industries', 'Positions']"
        placeholder="Text" 
      />
    </div>
    <div v-if="chosen" class="w-3/4 p-5">
      <label class="block text-left">What would you like to do?</label>
      <div class="grid grid-cols-3">
        <button @click="startAdd()" type="button"
          class="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-3 m-5 rounded">
          Add
        </button>
        <button @click="startRemove()" type="button"
          class="bg-red-600 hover:bg-red-900 text-white font-bold py-2 m-5 rounded">
          Remove
        </button>
        <button @click="startEdit()" type="button"
          class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 m-5 rounded">
          Edit
        </button>
      </div>

      <div v-if="toEdit">
        <label class="block text-left px-1 p-3">What would you like to edit?</label>
        <select @change="openInput($event)" class="rounded bg-white pl-2 pt-1 pb-2 border w-full" name="listType"
          id="list" v-model="choice" required>
          <option v-for="items in listItems" class="block w-full">
            {{ items }}
          </option>
        </select>
        <div v-if="toInput">
          <label v-if="toEdit" class="block text-left px-1 p-3">Make changes here.</label>
          <input class="rounded bg-white pl-2 pt-1 pb-2 border w-full" v-model="change" :placeholder="choice" />
        </div>
      </div>

      <div v-if="toAdd">
        <div v-if="toInput">
          <label v-if="toAdd" class="block text-left px-1 p-3">What would you like to add?</label>
          <input class="rounded bg-white pl-2 pt-1 pb-2 border w-full" v-model="choice" :placeholder="choice" />
        </div>
      </div>

      <div v-if="toRemove">
        <label v-if="toRemove" class="block text-left px-1 p-3">What would you like to remove?</label>
        <select @change="openInput($event)" class="rounded bg-white pl-2 pt-1 pb-2 border w-full" name="listType"
          id="list" v-model="choice" required>
          <option v-for="items in listItems" class="block w-full">
            {{ items }}
          </option>
        </select>
      </div>

      <button v-if="submitReady" @click="onSubmit()" type="button"
        class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 m-5 rounded">
        Submit
      </button>
    </div>
</div>
</template>
