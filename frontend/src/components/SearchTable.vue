<script setup>
import { ref, reactive, toRaw } from "vue";
import { FilterMatchMode, FilterService } from "primevue/api";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import JobDetails from "./JobDetails.vue";

const props = defineProps({
  jobMatches: {
    type: Array,
    default() {
      return [];
    },
  },
});

// Select table columns. Only fields listed here will have columns.
const displayedFields = ["employer", "contact.email", "city", "shift", "timeCommitment"];

const columns = reactive({
  "employer" : {
    cellContent: data => data.employer,
    header: "Employer",
    filterMode: "text",
    filterPlaceholder: "Search by employer"
  },
  "position" : {
    cellContent: data => data.position,
    header: "Position",
    filterMode: "multiselect",
    filterPlaceholder: "Any"
  },
  "shift" : {
    cellContent: data => data.shift,
    header: "Shift",
    filterMode: "dropdown",
    filterOptions: ["Early", "Morning", "Afternoon", "Evening"],
    filterPlaceholder: "Any"
  },
  "timeCommitment" : {
    cellContent: data => data.timeCommitment,
    header: "Time Commitment",
    filterMode: "dropdown",
    filterOptions: ["Full-Time", "Part-Time", "Any"],
    filterPlaceholder: "Any"
  },
  "city" : {
    cellContent: data => data.city,
    header: "City",
    filterMode: "multiselect",
    filterPlaceholder: "Any"
  },
  "zip" : {
    cellContent: data => data.zip,
    header: "Zip",
    filterMode: "text",
    filterPlaceholder: "Search by zip"
  },
  "county" : {
    cellContent: data => data.county,
    header: "County",
    filterMode: "multiselect",
    filterPlaceholder: "Any"
  },
  "industry" : {
    cellContent: data => data.industry,
    header: "Industry",
    filterMode: "multiselect",
    filterPlaceholder: "Any"
  },
  "contact.name" : {
    cellContent: data => data.contact.name,
    header: "Contact Name",
    filterMode: "text",
    filterPlaceholder: "Search by name"
  },
  "contact.phone" : {
    cellContent: data => data.contact.phone,
    header: "Contact Phone",
    filterMode: "text",
    filterPlaceholder: "Search by phone"
  },
  "contact.email" : {
    cellContent: data => data.contact.email,
    header: "Contact Email",
    filterMode: "text",
    filterPlaceholder: "Search by email"
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
  city: { value: null, matchMode: FilterMatchMode.IN },
  zip: { value: null, matchMode: FilterMatchMode.CONTAINS },
  county: { value: null, matchMode: FilterMatchMode.IN },
  industry: { value: null, matchMode: FilterMatchMode.IN },
  position: { value: null, matchMode: FilterMatchMode.IN },
  shift: { value: null, matchMode: FilterMatchMode.IS },
  timeCommitment: { value: null, matchMode: hoursFilter },
  'contact.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'contact.phone': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'contact.email': { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const filters = ref(structuredClone(filterDefaults));
const jobs = ref([]);
const loading = ref(false);
const selectedJob = null;

//Sets all filters to default. Can be called to reset all filters.
function clearFilters() {
  filters.value = structuredClone(filterDefaults);
}

//This dynamically populates the drop-down and multiselect filters used in the table.
function getFilters() {
  for (const [field] of Object.entries(toRaw(columns))) {
    if (columns[field].filterOptions == null) {
        // Extract field from all jobs
        const current = Array.from(jobs.value, job => toRaw(job)[field]);
        // Remove duplicates
        columns[field].filterOptions = Array.from(new Set(current));
    }
  }
}

function removeJob(SelectedIndex) {
  if (SelectedIndex > -1) jobs.splice(SelectedIndex, 1);
}

function saveUpdate(updatedJob, SelectedIndex) {
  jobs.value[SelectedIndex] = structuredClone(toRaw(updatedJob));
}

async function loadJobs() {
  try {
    if (props.jobMatches.length < 1) {
      await fetch("http://localhost:3000/allJobs")
        .then((response) => response.json())
        .then((data) => {jobs.value = data})
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

loadJobs();
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
      :globalFilterFields="[
        'employer',
        'city',
        'industry',
        'timeCommitment',
        'zip',
        'county',
      ]"
    >
      <template #header>
        <div class="flex justify-content-between">
          <button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined"
            @click="clearFilters()"
          />
          <span class="">
            <i class="pi pi-search pr-3" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
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
          <InputText
            v-if="columns[field].filterMode === 'text'"
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            :placeholder="columns[field].filterPlaceholder"
          />
          <Dropdown
            v-if="columns[field].filterMode === 'dropdown'"
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="columns[field].filterOptions"
            :placeholder="columns[field].filterPlaceholder"
            class="p-dropdown-filter"
            :showClear="true"
          >
            <template #value="slotProps">
              <span
                :class="'p-dropdown-value' + slotProps.value"
                v-if="slotProps.value"
                >{{ slotProps.value }}</span
              >
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <span :class="'p-dropdown-option' + slotProps.option">{{
                slotProps.option
              }}</span>
            </template>
          </Dropdown>
          <MultiSelect
            v-if="columns[field].filterMode === 'multiselect'"
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="columns[field].filterOptions"
            :showClear="true"
            :placeholder="columns[field].filterPlaceholder"
            optionLabel="city"
            class="p-column-filter"
          >
            <template #value="slotProps">
              <span
                :class="'p-dropdown' + slotProps.value"
                v-if="slotProps.value && slotProps.value.length > 0"
                >{{ slotProps.value.join(", ") }}</span
              >
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <span :class="'p-dropdown' + slotProps.option">{{
                slotProps.option
              }}</span>
            </template>
          </MultiSelect>
        </template>
      </Column>

      <Column field="jobDetails">
        <template #body="{ data, index }">
          <JobDetails
            :data="data"
            :index="index"
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
