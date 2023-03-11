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

//Custom hours filter to handle the 'Any' condition displaying
//both Full-Time and Part-Time
const hoursFilter = "hoursFilter";
FilterService.register(hoursFilter, (value, filter) => {
  if (filter === "Any" || filter === null) return true;
  if (filter === value) return true;
});

const jobs = ref([]);
const loading = ref(false);
const selectedJob = null;

var filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  employer: { value: null, matchMode: FilterMatchMode.CONTAINS },
  city: { value: null, matchMode: FilterMatchMode.IN },
  zip: { value: null, matchMode: FilterMatchMode.CONTAINS },
  county: { value: null, matchMode: FilterMatchMode.IN },
  industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
  timeCommitment: { value: null, matchMode: hoursFilter },
});

const filterData = reactive([
  {
    county: [],
    employer: [],
    city: [],
    timeCommitment: [],
  },
]);

function onRowSelect(event) {
  console.log(event.data.employer);
}

function onRowUnselect(event) {}

function clearFilter() {
  initFilters();
}

//Sets all filters to default. Can be called to reset all filters.
function initFilters() {
  filters.value.global.value = null;
  filters.value.employer.value = null;
  filters.value.city.value = null;
  filters.value.zip.value = null;
  filters.value.county.value = null;
  filters.value.industry.value = null;
  filters.value.timeCommitment.value = null;
}

//This dynamically populates the drop-down and multiselect filters used in the table.
function getFilters() {
  filterData.county = new Array();
  filterData.employer = new Array();
  filterData.city = new Array();
  filterData.timeCommitment = new Array();
  filterData.timeCommitment.push("Full-Time", "Part-Time", "Any");

  jobs.value.forEach((job) => {
    if (!filterData.county.includes(job.county))
      filterData.county.push(job.county);
    if (!filterData.city.includes(job.city)) filterData.city.push(job.city);
    if (!filterData.employer.includes(job.employer))
      filterData.employer.push(job.employer);
  });
}



async function removeJob(selectedJob) {
  for(let i=0;i<jobs.value.length;i++){
    if(jobs.value[i] == selectedJob){
      jobs.value.splice(i, 1);
      await fetch("http://localhost:3000/deleteJob", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(toRaw(selectedJob)),
      })
      .then((response) => console.log(response))
      .catch((errors) => console.log(errors));
    }
  }
}

async function saveUpdate(updatedJob, selectedJob) {

  for(let i=0;i<jobs.value.length;i++){
    if(jobs.value[i] == selectedJob){
      jobs.value[i].employer = updatedJob.employer;
      jobs.value[i].contact.name = updatedJob.contact.name;
      jobs.value[i].contact.phone = updatedJob.contact.phone;
      jobs.value[i].contact.email = updatedJob.contact.email;
      jobs.value[i].address = updatedJob.address;
      jobs.value[i].city = updatedJob.city;
      jobs.value[i].zip = updatedJob.zip;
      jobs.value[i].county = updatedJob.county;
      jobs.value[i].shift = updatedJob.shift;
      jobs.value[i].industry = updatedJob.industry;
      jobs.value[i].position = updatedJob.position;
      jobs.value[i].timeCommitment = updatedJob.timeCommitment;
      jobs.value[i].openingDate = updatedJob.openingDate;
      jobs.value[i].hourlyWage = updatedJob.hourlyWage;
      jobs.value[i].notes = updatedJob.notes;
      
      //console.log(jobs.value[i]);

      await fetch("http://localhost:3000/editJob", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(toRaw(jobs.value[i])),
      })
      .then((response) => console.log(response))
      .catch((errors) => console.log(errors));
    }
  }
}

async function loadJobs() {
  if (props.jobMatches.length < 1) {
    await fetch("http://localhost:3000/allJobs")
      .then((response) => response.json())
      .then((data) => {
        jobs.value = data;
        //console.log(data[0])
      })
      .then(() => {
        initFilters();
        getFilters();
      });
  } else {
    for (let i in props.jobMatches) {
      jobs.value.push(props.jobMatches[i]);
    }
    initFilters();
    getFilters();
  }
}

loadJobs();

////////////

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
  //console.log(formOptions);
};

requestFormOptions();
</script>

<template>
  <div class="card m-5 bg-light shadow-lg border">
    <DataTable
      :value="jobs"
      class="p-datatable-sm"
      stripedRows
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnselect"
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
            @click="clearFilter()"
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

      <Column field="employer" header="Employer" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.employer }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by employer"
          />
        </template>
      </Column>

      <Column
        field="city"
        header="City"
        :showFilterMenu="false"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.city }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="filterData.city"
            :filter="true"
            :showClear="true"
            optionLabel="city"
            placeholder="Any"
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

      <Column field="zip" header="Zip" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.zip }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by zip"
          />
        </template>
      </Column>

      <Column
        header="County"
        filter-field="county"
        :showFilterMatchModes="false"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.county }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="filterData.county"
            :filter="false"
            optionLabel="county"
            label="county"
            placeholder="Any"
            display="chip"
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
              <span :class="'p-dropdown-option' + slotProps.option">{{
                slotProps.option
              }}</span>
            </template>
          </MultiSelect>
        </template>
      </Column>

      <Column
        field="timeCommitment"
        header="TimeCommitment"
        :showFilterMenu="false"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.timeCommitment }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="filterData.timeCommitment"
            placeholder="Any"
            :filter="false"
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
