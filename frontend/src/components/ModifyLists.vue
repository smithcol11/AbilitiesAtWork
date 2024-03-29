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

const success = ref(false);
const visible = ref(false);

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

// display success banner if post succeeded
const displaySuccess = () => {
  banner.success = true;
  setTimeout(() => {
    banner.success = false;
  }, 3000);
};

// display error banner if post failed
const displayError = () => {
  banner.failure = true;
  setTimeout(() => {
    banner.failure = false;
  }, 3000);
};

// use the rules the data must follow
//const v$ = useVuelidate(rules, null);

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
    selectedList.push(choice.value);
    selectedList.sort();
  } else if (toRemove.value && matchIndex >= 0) {
    selectedList.splice(matchIndex, 1);
  } else if (toEdit.value && matchIndex >= 0) {
    selectedList[matchIndex] = change.value;
    selectedList.sort();
  }
  choice.value = "";
  change.value = "";
  sendChanges();
}
async function getListContents(listName) {
  try {
    await fetch("http://localhost:3000/GetJobOptions")
      .then((res) => res.json())
      .then((newOptions) => {
        for (const key in formOptions) {
          formOptions[key] = newOptions[key];
        }
      });
  } catch (error) {
    console.log(error);
  }
  if (listName === "Positions") {
    listItems.value = formOptions.positions;
  } else {
    listItems.value = formOptions.industries;
  }
}
async function sendChanges() {
  try {
    await fetch("http://localhost:3000/updateJobOptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(toRaw(formOptions)),
    }).then((response) => {
      console.log(response);
      DisplayBanner("success");
    });
  } catch (error) {
    console.log(error);
    DisplayBanner("error");
  }
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center shadow-lg border bg-light dark:bg-darkGrayAccent dark:border-darkGray m-3 pb-3"
  >
    <Transition>
      <div role="alert">
        <div v-if="banner.displaySuccess == true" class="p-2">
          <successBanner
            topText="Success"
            bottomText="List updated successfully"
          />
        </div>
        <div v-if="banner.displayFailed == true" class="p-2">
          <errorBanner topText="ERROR" bottomText="List was not modified" />
        </div>
      </div>
    </Transition>
    <div class="w-3/4 p-5">
      <Label position="left" text="Which List?" class="py-3" />
      <DropDown
        class="w-full dark:bg-darkGrayAccent dark:hover:bg-darkGray dark:text-light"
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
            class="py-3 dark:text-light"
          />
          <input
            class="rounded bg-white dark:bg-darkGrayAccent dark:focus:bg-darkGray dark:text-light pl-2 pt-2 pb-2 border w-full"
            v-model="choice"
            :placeholder="choice"
          />
        </div>
      </div>

      <div v-if="toRemove">
        <Label
          position="left"
          text="What would you like to remove?"
          class="py-3 dark:text-light"
        />
        <DropDown
          class="w-full dark:bg-darkGrayAccent dark:border-darkGray dark:text-light"
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
          class="w-full dark:bg-darkGrayAccent dark:border-darkGray dark:text-light"
          v-on:change="openInput($event)"
          v-model="choice"
          :options="listItems"
          placeholder=""
        />
        <div v-if="toInput">
          <Label position="left" text="Make changes here." class="pb-3 pt-6 dark:text-light" />
          <input
            class="rounded bg-white pl-2 pt-2 pb-2 border w-full dark:bg-darkGrayAccent dark:border-darkGray dark:focus:bg-darkGray dark:text-light"
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
