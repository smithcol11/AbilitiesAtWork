<script setup>
import { reactive, ref } from "vue";

const listItems = ref([])
const listType = ref("")
const chosen = ref(false);
const toEdit = ref(false);
const toRemove = ref(false);
const toInput = ref(false);
const submitReady = ref(false)
const toAdd = ref(false);
const choice = ref("");
const change = ref("");

function resetOptions() {
  submitReady.value = false;
  choice.value = ""
  toEdit.value = false;
  toRemove.value = false;
  toInput.value = false;
  toAdd.value = false;
  change.value = ""
}

const formOptions = reactive({
  counties: [],
  cities: [],
  zips: [],
  positions: [],
  industries: [],
  shiftOptions: [],
  timeCommitmentOptions: [],
});

function chooseList(e) {
  resetOptions();
  listType.value = e.target.options[e.target.options.selectedIndex].text;

  if (listType.value != "") {
    getListContents(listType.value)
    chosen.value = true;
  }
}
async function getListContents(listName) {
  await fetch("http://localhost:3000/GetJobOptions")
    .then(res => res.json())
    .then(newOptions => {
      for (const key in formOptions) {
        formOptions[key] = newOptions[key];
      };
    })
    .catch((err) => console.log(err));
  if (listName === "Positions") {
    listItems.value = formOptions.positions;
  }
  else {
    listItems.value = formOptions.industries;
  }

}

function startAdd() {
  resetOptions()
  toAdd.value = true;
  toInput.value = true;
  submitReady.value = true;
}

function startRemove() {
  resetOptions()
  toRemove.value = true;

}

function startEdit() {
  resetOptions()
  toEdit.value = true;
}

function onSubmit() {
console.log(change.value)
console.log(choice.value)
if(listType.value === "Positions")
{
  if(toAdd)
  {
    
  }
  else if(toRemove)
  {

  }
  else{

  }
}
else
{
  if(toAdd)
  {

  }
  else if(toRemove)
  {

  }
  else{
    
  }
}
}

function openInput(e) {
  if (toRemove.value == false) {
    toInput.value = true
  }

  choice.value = e.target.options[e.target.options.selectedIndex].text;
  submitReady.value = true;
}

</script>

<template>
  <div class="flex flex-col  items-center justify-center shadow-lg border bg-light">
    <div class="w-3/4 p-5">
      <label class="block text-left px-1 p-3">Which List?</label>
      <select v-on:change="chooseList($event)" class="rounded bg-white pl-2 pt-1 pb-2 border w-full" name="listType"
        id="listpicker" required>
        <option class="block w-full" value="0"></option>
        <option class="block w-full" value="1">Industries</option>
        <option class="block w-full" value="2">Positions</option>
      </select>
    </div>
    <div v-if="chosen" class="w-3/4 p-5">
      <label class="block text-left">What would you like to do?</label>
      <div class="grid grid-cols-3">
        <button @click="startAdd()" type="button"
          class="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-3 m-5 rounded">
          Add
        </button>
        <button @click="startRemove()" type="button"
          class="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 m-5 rounded">
          Remove
        </button>
        <button @click="startEdit()" type="button"
          class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 m-5 rounded">
          Edit
        </button>
      </div>
      <div v-if="toEdit || toRemove">
        <label v-if="toEdit" class="block text-left px-1 p-3">What would you like to edit</label>
        <label v-if="toRemove" class="block text-left px-1 p-3">What would you like to remove</label>
        <select @change="openInput($event)" class="rounded bg-white pl-2 pt-1 pb-2 border w-full" name="listType"
          id="list" v-model="choice" required>
          <option v-for="items in listItems" class="block w-full"> {{ items }}</option>
        </select>
      </div>
      <div v-if="toInput">
        <label v-if="toEdit" class="block text-left px-1 p-3">Make changes here.</label>
        <label v-if="toAdd" class="block text-left px-1 p-3">What would you like to add?</label>
        <input class="rounded bg-white pl-2 pt-1 pb-2 border w-full" v-model="change" :placeholder="choice">
      </div>
      <p>{{ change }}</p>
      <button v-if="submitReady" @click="onSubmit()" type="button"
        class="bg-accentLight hover:bg-accentDark text-white font-bold py-2 px-4 m-5 rounded">
        Submit
      </button>
    </div>

  </div>
</template>