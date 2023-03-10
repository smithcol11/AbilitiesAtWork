<script setup>
import { FilterMatchMode } from "primevue/api";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import { onMounted, ref, reactive } from "vue";

const clients = ref([]);
const loading = ref(false);
const selectedClient = null;

const filters1 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  middleInitial: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lastInitial: { value: null, matchMode: FilterMatchMode.CONTAINS },
  industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
  hours: { value: null, matchMode: FilterMatchMode.EQUALS },
});

// const columns = ref([
//   { field: "firstName", header: "First Name" },
//   { field: "middleInitial", header: "Middle Initial" },
//   { field: "lastInitial", header: "Last Initial" },
//   { field: "industry", header: "Industry" },
//   { field: "hours", header: "Hours" },
// ]);

const filterData = reactive([
  {
    firstName: [],
    middleInitial: [],
    lastInitial: [],
    industry: [],
    hours: [],
  },
]);

// const selectedFilter = ref([
//   {
//     firstName: null,
//     middleInitial: null,
//     lastInitial: null,
//     industry: null,
//     hours: null,
//   },
// ]);

function onRowSelect(event) {
  console.log(event.data.firstName);
  console.log(event.data.middleInitial);
  console.log(event.data.lastInitial);
}

function onRowUnselect(event) {}

function clearFilter1() {
  initFilters1();
}

function initFilters1() {
  filters1.value.global.value = null;
  filters1.value.firstName.value = null;
  filters1.value.middleInitial.value = null;
  filters1.value.lastInitial.value = null;
  filters1.value.industry.value = null;
  filters1.value.hours.value = null;
}

function getFilters() {
  filterData.firstName = new Set();
  filterData.middleInitial = new Set();
  filterData.lastInitial = new Set();
  filterData.industry = new Set();

  clients.value.forEach((client) => {
    filterData.firstName.add(client.firstName);
    filterData.middleInitial.add(client.middleInitial);
    filterData.lastInitial.add(client.lastInitial);
    client.industry.forEach((i) => filterData.industry.add(i));
  });

  filterData.firstName = Array.from(filterData.firstName);
  filterData.middleInitial = Array.from(filterData.middleInitial);
  filterData.lastInitial = Array.from(filterData.lastInitial);
  filterData.industry = Array.from(filterData.industry);

  filterData.hours = new Array("Full-Time", "Part-Time", "Any");
}

async function requestClients() {
  try {
    let response = await fetch("http://localhost:3000/GetAllClients");
    clients.value = await response.json();
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  initFilters1();
  await requestClients();
  getFilters();
  FormatDisplayData();
});

function FormatDisplayData() {
  clients.value.forEach((client) => {
    client.firstName = client.firstName
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    client.middleInitial = client.middleInitial.toUpperCase();
    client.lastInitial = client.lastInitial.toUpperCase();
  });
}
function customFilterCallback() {
  console.log(filters1);
}
</script>

<template>
  <div class="card m-5 bg-light shadow-lg border">
    <DataTable
      :value="clients"
      class="p-datatable-sm"
      stripedRows
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnselect"
      v-model:selection="selectedClient"
      selectionMode="single"
      v-model:filters="filters1"
      filterDisplay="row"
      :loading="loading"
      :paginator="true"
      :rows="10"
      :globalFilterFields="[
        'firstName',
        'middleInitial',
        'lastInitial',
        'industry',
        'hours',
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

      <Column field="firstName" header="First Name" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.firstName }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="
              customFilterCallback();
              filterCallback();
            "
            class="p-column-filter"
            placeholder="Search by First Name"
          />
        </template>
      </Column>
      <Column
        field="middleInitial"
        header="Middle Initial"
        style="min-width: 5rem"
      >
        <template #body="{ data }">
          {{ data.middleInitial }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by Middle Initial"
          />
        </template>
      </Column>
      <Column field="lastInitial" header="Last Initial" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.lastInitial }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by Last Initial"
          />
        </template>
      </Column>
      <Column
        field="industry"
        header="Industry"
        :showFilterMenu="false"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.industry.join(", ") }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="filterData.industry"
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

      <Column
        field="hours"
        header="Hours"
        :showFilterMenu="false"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.hours }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="filterData.hours"
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
