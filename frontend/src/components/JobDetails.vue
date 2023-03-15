<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import TextBox from "./TextBox.vue";
import { useAuthenticationStore } from "../stores/AuthenticationStore.js";

const auth = useAuthenticationStore(); //use auth store for authorizing admin-only capabilities
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
    //default: 100,
  },
  formOptions: {
    type: Object,
    required: true,
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
  employer: "",
  contact: {
    email: "",
    name: "",
    phone: "",
  },
  address: "",
  city: "",
  zip: "",
  county: "",
  shift: "",
  industry: "",
  position: "",
  hourlyWage: "",
  timeCommitment: "",
  openingDate: "",
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
  if (props.index > -1) props.removeJob(props.data);
  displayBasic.value = false;
  displayDel.value = false;
}

function save() {
  if (props.index > -1) {
    for (let key in updatedJob.value) {
      //remain the same data if no new input
      if (updatedJob.value[key].name == "") {
        updatedJob.value[key].name = props.data[key].name;
      }
      if (updatedJob.value[key].email == "") {
        updatedJob.value[key].email = props.data[key].email;
      }
      if (updatedJob.value[key].phone == "") {
        updatedJob.value[key].phone = props.data[key].phone;
      }
      if (updatedJob.value[key] == "" || updatedJob.value[key] == 0) {
        updatedJob.value[key] = props.data[key];
      }
    }
    props.saveUpdate(updatedJob.value, props.data);
  }

  displayUpdate.value = false;

  updatedJob.value["contact"].name = "";
  updatedJob.value["contact"].email = "";
  updatedJob.value["contact"].phone = "";
  for (let key in updatedJob.value) {
    if (key != "contact") updatedJob.value[key] = "";
  }
}

const isAdmin = () => auth.validateJWT() && auth.isAuthAdmin;
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
            Company: <span class="font-normal">{{ data.employer }}</span>
          </p>
          <p class="pt-2">
            Contact Name:
            <span class="font-normal">{{ data.contact.name }}</span>
          </p>
          <p class="pt-2">
            Contact Phone Number:
            <span class="font-normal">{{ data.contact.phone }}</span>
          </p>
          <p class="pt-2">
            Contact Email:
            <span class="font-normal">{{ data.contact.email }}</span>
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
            Hours: <span class="font-normal">{{ data.timeCommitment }}</span>
          </p>
          <p class="pt-2">
            Date Posted:
            <span class="font-normal">{{
              data.openingDate.substr(0, 10)
            }}</span>
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
        v-if="isAdmin() == true"
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
              <TextBox
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.employer"
                v-model="updatedJob.employer"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Contact Name:
              <TextBox
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.contact.name"
                v-model="updatedJob.contact.name"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Contact Phone Number:
              <TextBox
                type="number"
                class="p-inputtext-sm"
                :placeholder="data.contact.phone.toString()"
                v-model="updatedJob.contact.phone"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Contact Email:
              <TextBox
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.contact.email"
                v-model="updatedJob.contact.email"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Address:
              <TextBox
                type="text"
                class="p-inputtext-sm"
                :placeholder="data.address"
                v-model="updatedJob.address"
              />
            </div>
            <div class="pt-2 basis-1/5">
              City:
              <DropDown
                type="text"
                class="p-inputtext-sm font-normal"
                :placeholder="data.city"
                :options="props.formOptions.cities"
                v-model="updatedJob.city"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Zip:
              <DropDown
                type="text"
                class="p-inputtext-sm font-normal"
                :placeholder="data.zip"
                :options="props.formOptions.zips"
                v-model="updatedJob.zip"
              />
            </div>
            <div class="pt-2 basis-1/5">
              County:
              <DropDown
                type="text"
                class="p-inputtext-sm font-normal"
                :placeholder="data.county"
                :options="props.formOptions.counties"
                v-model="updatedJob.county"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Shift:
              <DropDown
                type="text"
                class="p-inputtext-sm font-normal"
                :placeholder="data.shift"
                :options="props.formOptions.shiftOptions"
                v-model="updatedJob.shift"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Industry:
              <DropDown
                type="text"
                class="p-inputtext-sm font-normal"
                :placeholder="data.industry"
                :options="props.formOptions.industries"
                v-model="updatedJob.industry"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Position:
              <DropDown
                type="text"
                class="p-inputtext-sm font-normal"
                :placeholder="data.position"
                :options="props.formOptions.positions"
                v-model="updatedJob.position"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Hours:
              <DropDown
                type="text"
                class="p-inputtext-sm font-normal"
                :placeholder="data.timeCommitment"
                :options="props.formOptions.timeCommitmentOptions"
                v-model="updatedJob.timeCommitment"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Date Posted:
              <TextBox
                type="date"
                class="p-inputtext-sm"
                :placeholder="data.openingDate"
                v-model="updatedJob.openingDate"
              />
            </div>
            <div class="pt-2 basis-1/5">
              Notes:
              <TextBox
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
