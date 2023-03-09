<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
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

const updatedClient = ref({
    firstName: "",
    middleInitial: "",
    lastInitial: "",
    industry: "",
    hours: "",
});

function openDel() {
  displayDel.value = true;
}

function closeDel() {
  displayDel.value = false;
  displayUpdate.value = false;
}

function openUpdate() {
  displayUpdate.value = true;
}

function closeUpdate() {
  displayUpdate.value = false;
}


function remove() {
    //console.log(props.index)
  if (props.index > -1) props.removeClient(props.index);
  displayUpdate.value = false;
  displayDel.value = false;
}

function save() {
  if (props.index > -1) {
    for (let key in updatedClient.value) {
      if (updatedClient.value[key] == "" || updatedClient.value[key] == 0) {
        //remain the same data if no new input
        updatedClient.value[key] = props.data[key];
      }
    }
    props.saveUpdate(updatedClient.value, props.index);
  }

  displayUpdate.value = false;
}
</script>


<template>
    <Button
        label="Edit"
        icon="pi pi-refresh"
        @click="openUpdate()"
        class="p-button-text p-button-secondary"
    />
    <Dialog
    header="Update"
    v-model:visible="displayUpdate"
    :style="{ width: '550px' }"
    >
    <form action="">
      <div class="mt-3 text-center">
        <div class="mt-2 px-7 py-3">
          <div
            class="bg-white italic font-bold text-gray-700 grid grid-cols-2 gap-4 p-6"
          >
            <div class="pt-2 basis-1/5">
                First Name:
                <InputText
                    type="text"
                    class="p-inputtext-sm"
                    :placeholder="data.firstName"
                    v-model="updatedClient.firstName"
                />
            </div>
            <div class="pt-2 basis-1/5">
                Middle Initial:
                <InputText
                    type="text"
                    class="p-inputtext-sm"
                    :placeholder="data.middleInitial"
                    v-model="updatedClient.middleInitial"
                />
            </div>
            <div class="pt-2 basis-1/5">
                Last Initial:
                <InputText
                    type="text"
                    class="p-inputtext-sm"
                    :placeholder="data.lastInitial"
                    v-model="updatedClient.lastInitial"
                />
            </div>
            <div class="pt-2 basis-1/5">
                Industry:
                <InputText
                    type="text"
                    class="p-inputtext-sm"
                    :placeholder="data.industry"
                    v-model="updatedClient.industry"
                />
            </div>
            <div class="pt-2 basis-1/5">
                Hours:
                <InputText
                    type="text"
                    class="p-inputtext-sm"
                    :placeholder="data.hours"
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
            class="p-button-text p-button-secondary"
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
        class="p-button-text p-button-secondary"
      />
    </div>
  </Dialog>
</template>