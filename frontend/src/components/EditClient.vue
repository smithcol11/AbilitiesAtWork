<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import TextBox from "./TextBox.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  formOptions: {
    type: Object,
    required: true,
  },
  removeClient: {
    type: Function,
    default: null,
  },
  saveUpdate: {
    type: Function,
    default: null,
  },
});

const displayDel = ref(false);
const displayUpdate = ref(false);

var initialClient = {
  firstName: "",
  middleInitial: "",
  lastInitial: "",
};

const defaultClient = {
  firstName: "",
  middleInitial: "",
  lastInitial: "",
  industry: [],
  hours: "",
};

const updatedClient = ref(structuredClone(defaultClient));

function openDel() {
  displayDel.value = true;
}

function closeDel() {
  displayDel.value = false;
  displayUpdate.value = false;
}

//Set displayUpdate to true and grab the props.data value
//of the client before edits are made:
function openUpdate() {
  initialClient.firstName = props.data.firstName;
  initialClient.middleInitial = props.data.middleInitial;
  initialClient.lastInitial = props.data.lastInitial;
  displayUpdate.value = true;
}

function closeUpdate() {
  displayUpdate.value = false;
}

async function remove() {
  if (props.index > -1) props.removeClient(props.data);
  try {
    await fetch("http://localhost:3000/deleteClient", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.data),
    });
  } catch (error) {
    console.log(error);
  }
  displayUpdate.value = false;
  displayDel.value = false;
  resetForm();
}

function resetForm() {
  updatedClient.value = structuredClone(defaultClient);
}

async function save() {
  if (props.index > -1) {
    for (let key in updatedClient.value) {
      if (key == "industry" && updatedClient.value[key].length == 0)
        updatedClient.value[key] = props.data[key];
      else if (updatedClient.value[key] == "") {
        //remain the same data if no new input
        updatedClient.value[key] = props.data[key];
      }
    }
    props.saveUpdate(updatedClient.value, props.data);

    try {
      await fetch("http://localhost:3000/editClient", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initialData: initialClient,
          data: props.data,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  displayUpdate.value = false;
  resetForm();
}

function acceptAlphaKeys(keyEvent) {
  if (/[^a-zA-Z]/.test(keyEvent.key)) {
    keyEvent.preventDefault();
  }
}
</script>

<template>
  <Button
      label="Edit"
      icon="pi pi-pencil"
      @click="openUpdate()"
      class="p-button-text p-button-secondary"
  />
  <Dialog
    header="Update"
    v-model:visible="displayUpdate"
    @update:visible="resetForm()"
    :style="{ width: '550px' }"
  >
    <form action="">
      <div class="mt-3 text-center">
        <div class="mt-2 px-7 py-3">
          <div
            class="bg-white dark:bg-moreInfoGray italic font-bold text-gray-700 grid grid-cols-2 gap-4 p-6"
          >
            <div class="pt-2 basis-1/5 dark:text-light">
              First Name:
              <TextBox
                type="text"
                class="p-inputtext-sm dark:text-light"
                :placeholder="data.firstName"
                v-model="updatedClient.firstName"
              />
            </div>
            <div class="pt-2 basis-1/5 dark:text-light">
              Middle Initial:
              <TextBox
                type="text"
                class="p-inputtext-sm dark:text-light"
                maxlength="1"
                :placeholder="data.middleInitial"
                v-on:keypress="acceptAlphaKeys($event)"
                v-model="updatedClient.middleInitial"
              />
            </div>
            <div class="pt-2 basis-1/5 dark:text-light">
              Last Initial:
              <TextBox
                type="text"
                class="p-inputtext-sm dark:text-light"
                maxlength="1"
                :placeholder="data.lastInitial"
                v-on:keypress="acceptAlphaKeys($event)"
                v-model="updatedClient.lastInitial"
              />
            </div>
            <div class="pt-2 basis-1/5 dark:text-light">
              Industry:
              <DropDown
                type="text"
                mode="multiple"
                class="p-inputtext-sm font-normal"
                :placeholder="data.industry.join(',')"
                :options="props.formOptions.industries"
                v-model="updatedClient.industry"
              />
            </div>
            <div class="pt-2 basis-1/5 dark:text-light">
              Hours:
              <DropDown
                type="text"
                class="p-inputtext-sm font-normal"
                :placeholder="data.hours"
                :options="props.formOptions.timeCommitmentOptions"
                v-model="updatedClient.hours"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 text-right">
        <Button
          label="Confirm"
          icon="pi pi-check"
          @click="save()"
          class="p-button-text p-button-secondary"
        />
        <Button
          label="Delete"
          icon="pi pi-times"
          @click="openDel()"
          class="p-button-text p-button-danger"
        />
      </div>
    </form>
  </Dialog>
  <Dialog
    header="Do you want to delete this client?"
    v-model:visible="displayDel"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '25vw' }"
  >
    <div class="mt-3 text-right">
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="remove()"
        class="p-button-text p-button-secondary"
      />
      <Button
        label="No"
        icon="pi pi-times"
        @click="closeDel()"
        class="p-button-text p-button-danger"
      />
    </div>
  </Dialog>
</template>
