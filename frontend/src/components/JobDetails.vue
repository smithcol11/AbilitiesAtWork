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
    default: 100,
  },
  removeJob: {
    //from parent(SearchTable.vue)
    type: Function,
    default: null,
  },
  saveUpdate: {
    //from parent(SearchTable.vue)
    type: Function,
    default: null,
  },
});

const displayBasic = ref(false);
const displayDel = ref(false);
const displayUpdate = ref(false);

const updatedJob = ref({
  company: "",
  contactName: "",
  contactPhoneNumber: "",
  contactEmail: "",
  address: "",
  city: "",
  zip: "",
  county: "",
  shift: "",
  industry: "",
  position: "",
  hours: "",
  datePosted: "",
  notes: "",
});

function openDel() {
  displayBasic.value = false;
  displayDel.value = true;
}

function closeDel() {
  displayDel.value = false;
}

function openUpdate() {
  displayBasic.value = false;
  displayUpdate.value = true;
}

function closeUpdate() {
  displayUpdate.value = false;
}

function openBasic() {
  displayBasic.value = true;
}

function closeBasic() {
  displayBasic.value = false;
}

function remove() {
  if (index > -1) remove(index);
  displayBasic.value = false;
  displayDel.value = false;
}

function save() {
  console.log(props.index);
  console.log(index);
  throw "error";

  if (index > -1) {
    for (let key in updatedJob) {
      if (updatedJob[key] == "") {
        //remain the same data if no new input
        updatedJob[key] = data[key];
      }
    }
    saveUpdate(updatedJob, index);
  }

  //reset data
  for (let key in updatedJob) {
    updatedJob[key] = "";
  }

  displayUpdate.value = false;
}

</script>

<template>
  <Button
    label="More Info"
    class="p-button-outlined p-button-secondary"
    @click="openBasic()"
  />
  <Dialog
    header="More Information:"
    v-model:visible="displayBasic"
    :style="{ width: '550px' }"
  >
    <div class="mt-3 text-center">
      <div class="mt-2 px-7 py-3">
        <div class="bg-white text-left italic font-bold text-gray-700">
          <p class="pt-2">
            Company: <span class="font-normal">{{ data.company }}</span>
          </p>
          <p class="pt-2">
            Contact Name:
            <span class="font-normal">{{ data.contactName }}</span>
          </p>
          <p class="pt-2">
            Contact Phone Number:
            <span class="font-normal">{{ data.contactPhoneNumber }}</span>
          </p>
          <p class="pt-2">
            Contact Email:
            <span class="font-normal">{{ data.contactEmail }}</span>
          </p>
          <p class="pt-2">
            Address: <span class="font-normal">{{ data.address }}</span>
          </p>
          <p class="pt-2">
            City: <span class="font-normal">{{ data.city }}</span>
          </p>
          <p class="pt-2">
            Zip: <span class="font-normal">{{ data.zip }}</span>
          </p>
          <p class="pt-2">
            County: <span class="font-normal">{{ data.county }}</span>
          </p>
          <p class="pt-2">
            Industry: <span class="font-normal">{{ data.industry }}</span>
          </p>
          <p class="pt-2">
            Position: <span class="font-normal">{{ data.position }}</span>
          </p>
          <p class="pt-2">
            Shift: <span class="font-normal">{{ data.shift }}</span>
          </p>
          <p class="pt-2">
            Hours: <span class="font-normal">{{ data.hours }}</span>
          </p>
          <p class="pt-2">
            Date Posted: <span class="font-normal">{{ data.datePosted }}</span>
          </p>
          <p class="pt-2">
            Notes: <span class="font-normal">{{ data.notes }}</span>
          </p>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Update"
        icon="pi pi-refresh"
        @click="openUpdate()"
        class="p-button-text p-button-secondary"
      />
      <Button
        label="Delete"
        icon="pi pi-times"
        @click="openDel()"
        class="p-button-text p-button-secondary"
      />
    </template>
  </Dialog>
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
              Company:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.company"
                v-model="updatedJob.company"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Contact Name:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.contactName"
                v-model="updatedJob.contactName"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Contact Phone Number:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.contactPhoneNumber"
                v-model="updatedJob.contactPhoneNumber"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Contact Email:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.contactEmail"
                v-model="updatedJob.contactEmail"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Address:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.address"
                v-model="updatedJob.address"
              />
            </div>
            <div class="pt-2 basis-1/5">
              City:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.city"
                v-model="updatedJob.city"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Zip:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.zip"
                v-model="updatedJob.zip"
              />
            </div>
            <div class="pt-2 basis-1/5">
              County:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.county"
                v-model="updatedJob.county"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Shift:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.shift"
                v-model="updatedJob.shift"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Industry:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.industry"
                v-model="updatedJob.industry"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Position:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.position"
                v-model="updatedJob.position"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Hours:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.hours"
                v-model="updatedJob.hours"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Date Posted:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.datePosted"
                v-model="updatedJob.datePosted"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Notes:
              <InputText
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.notes"
                v-model="updatedJob.notes"
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
          label="Cancel"
          icon="pi pi-times"
          @click="closeUpdate()"
          class="p-button-text p-button-secondary"
        />
      </div>
    </form>
  </Dialog>
  <Dialog
    header="Do you want to delete this job?"
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
