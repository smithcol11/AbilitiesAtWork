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

function formatDate(dateObj) {
  if (dateObj instanceof Date) {
    return dateObj.toLocaleDateString();
  } else {
    return null;
  }
}

const columns = ref([
  {
    title: "Date Posted",
    field: "openingDate",
    cellContent: (data) => formatDate(data.openingDate),
    filterMode: "date",
    filterPlaceholder: "Search by date",
  },
  {
    title: "Employer",
    field: "employer",
    cellContent: (data) => data.employer,
    filterMode: "text",
    filterPlaceholder: "Search by employer",
  },
  {
    title: "Position",
    field: "position",
    cellContent: (data) => data.position,
    filterMode: "multi",
    filterPlaceholder: "Any",
  },
  {
    title: "Industry",
    field: "industry",
    cellContent: (data) => data.industry,
    filterMode: "multi",
    filterPlaceholder: "Any",
  },
  {
    title: "City",
    field: "city",
    cellContent: (data) => data.city,
    filterMode: "multi",
    filterPlaceholder: "Any",
  },
  {
    title: "Zip",
    field: "zip",
    cellContent: (data) => data.zip,
    filterMode: "text",
    filterPlaceholder: "Search by zip",
  },
  {
    title: "County",
    field: "county",
    cellContent: (data) => data.county,
    filterMode: "multi",
    filterPlaceholder: "Any",
  },
  {
    title: "Shift",
    field: "shift",
    cellContent: (data) => data.shift,
    filterMode: "single",
    filterOptions: ["Early", "Morning", "Afternoon", "Evening"],
    filterPlaceholder: "Any",
  },
  {
    title: "Time Commitment",
    field: "timeCommitment",
    cellContent: (data) => data.timeCommitment,
    filterMode: "single",
    filterOptions: ["Full-Time", "Part-Time", "Any"],
    filterPlaceholder: "Any",
  },
  {
    title: "Contact Name",
    field: "contact.name",
    cellContent: (data) => data.contact.name,
    filterMode: "text",
    filterPlaceholder: "Search by name",
  },
  {
    title: "Contact Email",
    field: "contact.email",
    cellContent: (data) => data.contact.email,
    filterMode: "text",
    filterPlaceholder: "Search by email",
  },
  {
    title: "Contact Phone",
    field: "contact.phone",
    cellContent: (data) => data.contact.phone,
    filterMode: "text",
    filterPlaceholder: "Search by phone",
  },
]);

// Select table columns. Columns listed here are displayed by default.
const displayedColumns = ref(
  columns.value.filter((col) =>
    ["city", "employer", "industry", "position", "timeCommitment"].includes(
      toRaw(col).field
    )
  )
);

//Custom hours filter to handle the 'Any' condition displaying
//both Full-Time and Part-Time
const hoursFilter = "hoursFilter";
FilterService.register(hoursFilter, (value, filter) => {
  if (filter === "Any" || filter === null) return true;
  if (filter === value) return true;
});

const filterDefaults = {
  openingDate: { value: null, matchMode: FilterMatchMode.DATE_AFTER },
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
  columns.value.forEach((column) => {
    if (column.filterOptions == null) {
      // Extract field from all jobs
      const current = Array.from(jobs.value, j => toRaw(j)[column.field]);

      // Remove duplicates
      column.filterOptions = Array.from(new Set(current));
    }
  });
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
  await loadJobs();
  await requestFormOptions();

  jobs.value.forEach((job) => {
    job.openingDate = new Date(job.openingDate);
  });
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
      :globalFilterFields="Array.from(displayedColumns, )"
    >
      <template #header>
        <div
          class="flex flex-wrap-reverse flex-row-reverse justify-content-between"
        >
          <MultiSelect
            v-if="userCanChangeColumns()"
            class="grow-0 shrink-0"
            v-model="displayedColumns"
            placeholder="Choose Columns"
            :options="columns"
            :showClear="true"
          >
            <template #value="slotProps">
              {{ slotProps.placeholder }}
            </template>
            <template #option="slotProps">
              {{ slotProps.option.title }}
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

      <!-- <Column
        v-for="field in displayedFields"
        sortable
        :field="field"
        :filterField="field"
        :header="columns[field].title"
        :dataType="columns[field].filterMode == 'date' ? 'date' : 'text'"
        :showFilterMenu="['text', 'date'].includes(columns[field].filterMode)"
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
      </Column> -->

      <Column
        v-for="column in displayedColumns"
        sortable
        :field="column.field"
        :filterField="column.field"
        :header="column.title"
        :dataType="column.filterMode == 'date' ? 'date' : 'text'"
        :showFilterMenu="['text', 'date'].includes(column.filterMode)"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ column.cellContent(data) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Filter
            :mode="column.filterMode"
            :placeholder="column.filterPlaceholder"
            :options="column.filterOptions"
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
