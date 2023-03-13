<script setup>
import { FilterMatchMode } from "primevue/api";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { onMounted, ref, reactive, toRaw } from "vue";
import EditClient from "./EditClient.vue";
import { useAuthenticationStore } from "../stores/AuthenticationStore.js";

const auth = useAuthenticationStore();
const isAdmin = auth.isAuthAdmin;

const clients = ref([]);
const loading = ref(false);
const selectedClient = null;

const filters1 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  middleInitial: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lastInitial: { value: null, matchMode: FilterMatchMode.CONTAINS },
  fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
  hours: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const filterData = reactive([
  {
    industry: [],
    hours: [],
  },
]);

function onRowSelect() {}

function onRowUnselect() {}

function clearFilter1() {
  initFilters1();
}

function initFilters1() {
  filters1.value.global.value = null;
  filters1.value.firstName.value = null;
  filters1.value.middleInitial.value = null;
  filters1.value.lastInitial.value = null;
  filters1.value.fullName.value = null;
  filters1.value.industry.value = null;
  filters1.value.hours.value = null;
}

function getFilters() {
  filterData.industry = new Set();

  clients.value.forEach((client) => {
    client.industry.forEach((i) => filterData.industry.add(i));
  });

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

function getFullName(client) {
  return `${client.firstName} ${client.middleInitial}. ${client.lastInitial}.`;
}

onMounted(async () => {
  await requestClients();
  clients.value.forEach(client => {
    client.fullName = getFullName(client);
  });
  initFilters1();
  getFilters();
});

function removeClient(selectedClient) {
  for (let i = 0; i < clients.value.length; i++) {
    if (clients.value[i] == selectedClient) clients.value.splice(i, 1);
  }
}

function saveUpdate(updatedClient, selectedClient) {
  for (let i = 0; i < clients.value.length; i++) {
    if (clients.value[i] == selectedClient) {
      Object.assign(clients.value[i], updatedClient);
      clients.value[i].fullName = getFullName(updatedClient);
    }
  }
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

      <Column field="fullName" header="Name" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.fullName }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by Name"
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

      <Column field="EditClient" v-if="isAdmin == true">
        <template #body="slotProps">
          <EditClient
            :data="slotProps.data"
            :index="slotProps.index"
            :removeClient="removeClient"
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
