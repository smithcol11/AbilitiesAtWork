<script setup>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Dropdown from "primevue/dropdown";
import Chips from "primevue/chips";
import { reactive, ref, computed, onBeforeMount, onMounted } from "vue";

var jobs = ref([]);
var rawJobs = [];


//Gets the raw data from getAllJobs. The raw data is used to create the filters.
let getJobs = async () => {
  rawJobs = await fetch("http://localhost:3000/GetAllJobs")
  .then((response) => {
    console.log(response)
    let data = response.json();
    return data;
  }
  );

  return rawJobs;
};

const loading = ref(false);
const selectedJob = null;
var filters1 = ref({/*
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  company: { value: null, matchMode: FilterMatchMode.CONTAINS },
  city: { value: null, matchMode: FilterMatchMode.IN },
  zip: { value: null, matchMode: FilterMatchMode.CONTAINS },
  county: { value: null, matchMode: FilterMatchMode.IN },
  industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
  hours: { value: null, matchMode: FilterMatchMode.EQUALS },
  */
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  employer: { value: null, matchMode: FilterMatchMode.CONTAINS },
  city: { value: null, matchMode: FilterMatchMode.IN },
  zip: { value: null, matchMode: FilterMatchMode.CONTAINS },
  county: { value: null, matchMode: FilterMatchMode.IN },
  industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
  timeCommitment: { value: null, matchMode: FilterMatchMode.EQUALS },
});
const columns = ref([
  { field: "employer", header: "Employer" },
  { field: "city", header: "City" },
  { field: "zip", header: "Zip" },
  { field: "county", header: "County" },
  { field: "industry", header: "Industry" },
  { field: "TimeCommitment", header: "TimeCommitment" },
]);



const jobs2 = ref([
  {
    id: 5,
    company: "ABC Inc.",
    city: "Portland",
    zip: "97223",
    county: "Washington",
    industry: "Manufacturing",
    hours: "Full Time",
  },
]);

var filterData = ref([
  {
    county: [],
    employer: [],
    city: [],
    timeCommitment: [],
  },
]);
const selectedFilter = ref([
  {
    county: null,
    city: null,
  },
]);

function onRowSelect(event) {
  console.log(event.data.employer);
};

function onRowUnselect(event) {};


function clearFilter1() {
  initFilters1();
};

//Sets all filters to default. Can be called to reset all filters.
function initFilters1() {
  //console.log("In initFilters), jobs is ", jobs)
  filters1 = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    employer: { value: null, matchMode: FilterMatchMode.CONTAINS },
    city: { value: null, matchMode: FilterMatchMode.IN },
    zip: { value: null, matchMode: FilterMatchMode.CONTAINS },
    county: { value: null, matchMode: FilterMatchMode.IN },
    industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
    timeCommitment: { value: null, matchMode: FilterMatchMode.EQUALS },
  };
};

//This dynamically populates the drop-down and multiselect filters used in the table.
function getFilters() {
  filterData.county = new Array();
  filterData.city = new Array();
  filterData.employer = new Array();
  filterData.timeCommitment = new Array();

  filterData.timeCommitment.push("Full Time", "Part Time");

  for (var i = 0, row; (row = rawJobs[i]); ++i) {
    if (!filterData.county.includes(row.county)) {
      filterData.county.push(row.county);
    }
    if (!filterData.city.includes(row.city)) {
      filterData.city.push(row.city);
    }
    if (!filterData.employer.includes(row.employer)) {
      filterData.employer.push(row.employer);
    }
  }
};

onBeforeMount(async () => {
  // await getJobs().then((data) => {
  //   for (var i=0; (data[i]); ++i)
  //   {
  //     jobs.value.push(data[i]);
  //   }
  // }).then(() => {
  //   initFilters1();
  //   getFilters();
  // });
  console.log(message)
  await message.then(() => {
    initFilters1();
    getFilters();
  });
  });

  onMounted(async () => {

    //console.log("OnMounted, jobs: ", jobs);
    //console.log("OnMounted, filterData: ", filterData);



  });

</script>

<script>
</script>

<template>
  <div class="card m-5  bg-light shadow-lg border">
    <DataTable
      :value="jobs"
      class="p-datatable-sm"
      stripedRows
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnselect"
      v-model:selection="selectedJob"
      selectionMode="single"
      v-model:filters="filters1"
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
            @click="clearFilter1()"
          />
          <span class="">
            <i class="pi pi-search pr-3" />
            <InputText
              v-model="filters1['global'].value"
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
            :filter="false"
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
            v-model="selectedFilter.county"
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
                :class="p - chip"
                display="chip"
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
