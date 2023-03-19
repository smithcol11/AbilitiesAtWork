<script setup>
import { ref, reactive, toRaw, onBeforeMount } from "vue";
import { FilterMatchMode, FilterService } from "primevue/api";
import { useAuthenticationStore } from "../stores/AuthenticationStore.js";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Filter from "./Filter.vue";
import InputText from "primevue/inputtext";
import JobDetails from "./JobDetails.vue";
import MultiSelect from "primevue/multiselect";

const props = defineProps({
  jobMatches: {
    type: Array,
    default() {
      return [];
    },
  },
});

// Select table columns. Only fields listed here will have columns.
const displayedFields = ref([
  "employer",
  "city",
  "industry",
  "position",
  "timeCommitment",
]);

const columns = reactive({
  employer: {
    cellContent: (data) => data.employer,
    header: "Employer",
    filterMode: "text",
    filterPlaceholder: "Search by employer",
  },
  position: {
    cellContent: (data) => data.position,
    header: "Position",
    filterMode: "multi",
    filterPlaceholder: "Any",
  },
  industry: {
    cellContent: (data) => data.industry,
    header: "Industry",
    filterMode: "multi",
    filterPlaceholder: "Any",
  },
  city: {
    cellContent: (data) => data.city,
    header: "City",
    filterMode: "multi",
    filterPlaceholder: "Any",
  },
  zip: {
    cellContent: (data) => data.zip,
    header: "Zip",
    filterMode: "text",
    filterPlaceholder: "Search by zip",
  },
  county: {
    cellContent: (data) => data.county,
    header: "County",
    filterMode: "multi",
    filterPlaceholder: "Any",
  },
  shift: {
    cellContent: (data) => data.shift,
    header: "Shift",
    filterMode: "single",
    filterOptions: ["Early", "Morning", "Afternoon", "Evening"],
    filterPlaceholder: "Any",
  },
  timeCommitment: {
    cellContent: (data) => data.timeCommitment,
    header: "Time Commitment",
    filterMode: "single",
    filterOptions: ["Full-Time", "Part-Time", "Any"],
    filterPlaceholder: "Any",
  },
  "contact.name": {
    cellContent: (data) => data.contact.name,
    header: "Contact Name",
    filterMode: "text",
    filterPlaceholder: "Search by name",
  },
  "contact.email": {
    cellContent: (data) => data.contact.email,
    header: "Contact Email",
    filterMode: "text",
    filterPlaceholder: "Search by email",
  },
  "contact.phone": {
    cellContent: (data) => data.contact.phone,
    header: "Contact Phone",
    filterMode: "text",
    filterPlaceholder: "Search by phone",
  },
});

//Custom hours filter to handle the 'Any' condition displaying
//both Full-Time and Part-Time
const hoursFilter = "hoursFilter";
FilterService.register(hoursFilter, (value, filter) => {
  if (filter === "Any" || filter === null) return true;
  if (filter === value) return true;
});

const filterDefaults = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  employer: { value: null, matchMode: FilterMatchMode.CONTAINS },
  position: { value: null, matchMode: FilterMatchMode.IN },
  industry: { value: null, matchMode: FilterMatchMode.IN },
  city: { value: null, matchMode: FilterMatchMode.IN },
  zip: { value: null, matchMode: FilterMatchMode.CONTAINS },
  county: { value: null, matchMode: FilterMatchMode.IN },
  shift: { value: null, matchMode: FilterMatchMode.IS },
  timeCommitment: { value: null, matchMode: hoursFilter },
  "contact.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "contact.phone": { value: null, matchMode: FilterMatchMode.CONTAINS },
  "contact.email": { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const filters = ref(structuredClone(filterDefaults));
const auth = useAuthenticationStore();
const jobs = ref([]);
const loading = ref(false);
const selectedJob = null;

//Sets all filters to default. Can be called to reset all filters.
function clearFilters() {
  filters.value = structuredClone(filterDefaults);
}

//Checks if filters are clear
function filtersAreClear() {
  return Object.entries(filters.value).every((e) => e[1].value == null);
}

//This dynamically populates the drop-down and multiselect filters used in the table.
function getFilters() {
  for (const [field] of Object.entries(toRaw(columns))) {
    if (columns[field].filterOptions == null) {
      // Extract field from all jobs
      const current = Array.from(jobs.value, (job) => toRaw(job)[field]);
      // Remove duplicates
      columns[field].filterOptions = Array.from(new Set(current));
    }
  }
}

//authorize action by validating the JWT and checking the isAdmin value after validation
function userCanChangeColumns() {
  return auth.validateJWT() && auth.isAuthAdmin;
}

async function removeJob(SelectedIndex) {
  let removedJob = jobs.value[SelectedIndex];
  if (SelectedIndex > -1) jobs.value.splice(SelectedIndex, 1);

  await fetch("http://localhost:3000/deleteJob", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(removedJob),
  })
    .then((response) => console.log(response))
    .catch((errors) => console.log(errors));
}

async function saveUpdate(updatedJob, SelectedIndex) {
  Object.assign(jobs.value[SelectedIndex], structuredClone(toRaw(updatedJob)));

  await fetch("http://localhost:3000/editJob", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(toRaw(jobs.value[SelectedIndex])),
  })
    .then((response) => console.log(response))
    .catch((errors) => console.log(errors));
}

async function loadJobs() {
  try {
    if (props.jobMatches.length < 1) {
      await fetch("http://localhost:3000/allJobs")
        .then((response) => response.json())
        .then((data) => {
          jobs.value = data;
          //console.log(data[0])
        })
        .then(() => {
          clearFilters();
          getFilters();
        });
    } else {
      for (let i in props.jobMatches) {
        jobs.value.push(props.jobMatches[i]);
      }
      clearFilters();
      getFilters();
    }
  } catch (error) {
    console.log(error);
  }
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

let requestFormOptions = async () => {
  await fetch("http://localhost:3000/GetJobOptions")
    .then((res) => res.json())
    .then((newOptions) => {
      for (const key in formOptions) {
        formOptions[key] = newOptions[key];
      }
    })
    .catch((err) => console.log(err));
};

onBeforeMount(async () => {
  loadJobs();
  requestFormOptions();
});
</script>
<template>
  <div class="card m-5 bg-light shadow-lg border">
    <DataTable
      :value="jobs"
      class="p-datatable-sm"
      stripedRows
      v-model:selection="selectedJob"
      selectionMode="single"
      v-model:filters="filters"
      filterDisplay="row"
      :loading="loading"
      :paginator="true"
      :rows="10"
      :globalFilterFields="displayedFields"
    >
      <template #header>
        <div
          class="flex flex-wrap-reverse flex-row-reverse justify-content-between"
        >
          <MultiSelect
            v-if="userCanChangeColumns()"
            class="grow-0 shrink-0"
            v-model="displayedFields"
            placeholder="Choose Columns"
            :options="Object.keys(columns)"
            :showClear="true"
          >
            <template #value="slotProps">
              {{ slotProps.placeholder }}
            </template>
          </MultiSelect>
          <div class="grow" />
          <span class="grow-0">
            <i class="pi pi-search pr-3" />
            <InputText
              v-model="filters.global.value"
              placeholder="Keyword Search"
            />
            <Button
              v-if="!filtersAreClear()"
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              class="p-button-text p-button-secondary"
              @click="clearFilters()"
            />
          </span>
        </div>
      </template>
      <template #empty>
        <h1>No records found</h1>
      </template>
      <template #loading> Loading records, please wait... </template>

      <Column
        v-for="field in displayedFields"
        :filterField="field"
        :header="columns[field].header"
        :showFilterMenu="columns[field].filterMode === 'text'"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ columns[field].cellContent(data) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Filter
            :mode="columns[field].filterMode"
            :placeholder="columns[field].filterPlaceholder"
            :options="columns[field].filterOptions"
            v-model="filterModel.value"
            @update:modelValue="filterCallback()"
          />
        </template>
      </Column>

      <Column field="jobDetails">
        <template #body="{ data, index }">
          <JobDetails
            :data="data"
            :index="index"
            :formOptions="formOptions"
            :removeJob="removeJob"
            :saveUpdate="saveUpdate"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style>
.p-multiselect {
  max-width: 16rem;
}
.p-filter-column {
  max-width: 12rem;
}
</style>
