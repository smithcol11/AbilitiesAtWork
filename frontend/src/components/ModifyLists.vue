<script setup>
import { reactive, ref, toRaw } from "vue";
import DropDown from "./DropDown.vue";
import Label from "./Label.vue";

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

  choice.value = e;
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

  let matchIndex = selectedList.findIndex(matchText);
  if (toAdd.value && matchIndex < 0) {
    selectedList.push(choice.value.toLowerCase());
    selectedList.sort();
  } else if (toRemove.value && matchIndex >= 0) {
    selectedList.splice(matchIndex, 1);
  } else if (toEdit.value && matchIndex >= 0) {
    selectedList[matchIndex] = change.value.toLowerCase();
    selectedList.sort();
  }

  choice.value = "";
  change.value = "";
  sendChanges();
  getListContents("Positions");
  getListContents("industries");
}

async function getListContents(listName) {
  try{
    await fetch("http://localhost:3000/GetJobOptions")
      .then((res) => res.json())

      .then((newOptions) => {
        for (const key in formOptions) {
          formOptions[key] = newOptions[key];
        }
      })
  } catch(error){
    console.log(error)
  }
  if (listName === "Positions") {
    FormatPositions(formOptions);
    listItems.value = formOptions.positions;
  } else {
    FormatIndustries(formOptions);
    listItems.value = formOptions.industries;
  }
}

function FormatIndustries(data) {
  formOptions.industries = formOptions.industries.map((industry) =>
    industry
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function FormatPositions(data) {
  formOptions.positions = formOptions.positions.map((position) =>
    position
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

async function sendChanges() {
  try{
    await fetch("http://localhost:3000/updateJobOptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(toRaw(formOptions)),
    })
      .then((response) => console.log(response))
  } catch(error){
    console.log(error)
  }
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center shadow-lg border bg-light m-3 pb-3"
  >
    <div class="w-3/4 p-5">
      <Label position="left" text="Which List?" class="py-3" />
      <DropDown
        class="w-full"
        v-on:change="chooseList($event)"
        :options="['Industries', 'Positions']"
        placeholder=""
      />
    </div>
    <div v-if="chosen" class="w-3/4 p-5">
      <Label position="left" text="What would you like to do?" />
      <div class="grid grid-cols-3">
        <button
          @click="startAdd()"
          type="button"
          class="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-3 m-5 rounded"
        >
          Add
        </button>
        <button
          @click="startRemove()"
          type="button"
          class="bg-red-600 hover:bg-red-900 text-white font-bold py-2 m-5 rounded"
        >
          Remove
        </button>
        <button
          @click="startEdit()"
          type="button"
          class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 m-5 rounded"
        >
          Edit
        </button>
      </div>

      <div v-if="toAdd">
        <div v-if="toInput">
          <Label
            position="left"
            text="What would you like to add?"
            class="py-3"
          />
          <input
            class="rounded bg-white pl-2 pt-2 pb-2 border w-full"
            v-model="choice"
            :placeholder="choice"
          />
        </div>
      </div>

      <div v-if="toRemove">
        <Label
          position="left"
          text="What would you like to remove?"
          class="py-3"
        />
        <DropDown
          class="w-full"
          v-on:change="openInput($event)"
          v-model="choice"
          :options="listItems"
          placeholder=""
        />
      </div>

      <div v-if="toEdit">
        <Label
          position="left"
          text="What would you like to edit?"
          class="py-3"
        />
        <DropDown
          class="w-full"
          v-on:change="openInput($event)"
          v-model="choice"
          :options="listItems"
          placeholder=""
        />
        <div v-if="toInput">
          <Label position="left" text="Make changes here." class="pb-3 pt-6" />
          <input
            class="rounded bg-white pl-2 pt-2 pb-2 border w-full"
            v-model="change"
            :placeholder="choice"
          />
        </div>
      </div>

      <button
        v-if="submitReady"
        @click="onSubmit()"
        type="button"
        class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 mx-5 mt-5 rounded"
      >
        Submit
      </button>
    </div>
  </div>
</template>
