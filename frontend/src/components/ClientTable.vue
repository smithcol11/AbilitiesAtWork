<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Dropdown from "primevue/dropdown";
import Chips from "primevue/chips";
import { ref } from "vue";

export default {
  setup() {
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
    const columns = ref([
      { field: "firstName", header: "First Name" },
      { field: "middleInitial", header: "Middle Initial" },
      { field: "lastInitial", header: "Last Initial" },
      { field: "industry", header: "Industry" },
      { field: "hours", header: "Hours" },
    ]);

    const filterData = ref([
      {
        firstName: [],
        middleInitial: [],
        lastInitial: [],
        industry: [],
        hours: [],
      },
    ]);
    const selectedFilter = ref([
      {
        firstName: null,
        middleInitial: null,
        lastInitial: null,
        industry: null,
        hours: null,
      },
    ]);
    function onRowSelect(event) {
      console.log(event.data.firstName);
      console.log(event.data.middleInitial);
      console.log(event.data.lastInitial);
    }
   

    function onRowUnselect(event) { }
    return {
      filters1,
      onRowSelect,
      onRowUnselect,
      columns,
      loading,
      selectedClient,
      filterData,
      selectedFilter,
    };
  },
  data() {
    return {
      clients: [],
    };

  },

  created() {
    this.initFilters1();
    this.getFilters();
    //Get the data from the backend
    let response = this.getData();


  },
  mounted() { },
  methods: {
    clearFilter1() {
      this.initFilters1();
    },
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        middleInitial: { value: null, matchMode: FilterMatchMode.CONTAINS },
        lastInitial: { value: null, matchMode: FilterMatchMode.CONTAINS },
        industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
        hours: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    },
    getFilters() {
      this.filterData.firstName = new Array();
      this.filterData.middleInitial = new Array();
      this.filterData.lastInitial = new Array();
      this.filterData.hours = new Array();
      this.filterData.industry = new Array();

      this.filterData.hours.push("Full Time", "Part Time", "Any");

      for (var i = 0, row; (row = this.clients[i]); ++i) {
        if (!this.filterData.firstName.includes(row.firstName)) {
          this.filterData.firstName.push(row.firstName);
        }
        if (!this.filterData.middleInitial.includes(row.middleInitial)) {
          this.filterData.middleInitial.push(row.middleInitial);
        }
        if (!this.filterData.lastInitial.includes(row.lastInitial)) {
          this.filterData.lastInitial.push(row.firstName);
        }
        if (!this.filterData.industry.includes(row.industry)) {
          this.filterData.industry.push(row.industry);
        }
      }
    },
    async getData() {
      try {
        let response = await fetch("http://localhost:3000/GetAllClients");
        this.clients = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="card">
    <DataTable :value="clients" class="p-datatable-sm" stripedRows @rowSelect="onRowSelect" @rowUnselect="onRowUnselect"
      v-model:selection="this.selectedClient" selectionMode="single" v-model:filters="filters1" filterDisplay="row"
      :loading="loading" :paginator="true" :rows="10" :globalFilterFields="[
        'firstName',
        'middleInitial',
        'lastInitial',
        'industry',
        'hours',
      ]">
      <template #header>
        <div class="flex justify-content-between">
          <button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined"
            @click="clearFilter1()" />
          <span class="">
            <i class="pi pi-search pr-3" />
            <InputText v-model="filters1['global'].value" placeholder="Keyword Search" />
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
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
            placeholder="Search by First Name" />
        </template>
      </Column>
      <Column field="middleInitial" header="Middle Initial" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.middleInitial }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
            placeholder="Search by Middle Initial" />
        </template>
      </Column>
      <Column field="lastInitial" header="Last Initial" style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.lastInitial }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
            placeholder="Search by Last Initial" />
        </template>
      </Column>
      <Column field="industry" header="Industry" :showFilterMenu="false" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.industry.join(", ") }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="filterData.industry"
            placeholder="Any" :filter="false" class="p-dropdown-filter" :showClear="true">
            <template #value="slotProps">
              <span :class="'p-dropdown-value' + slotProps.value" v-if="slotProps.value">{{ slotProps.value }}</span>
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

      <Column field="hours" header="Hours" :showFilterMenu="false" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.hours }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="filterData.hours" placeholder="Any"
            :filter="false" class="p-dropdown-filter" :showClear="true">
            <template #value="slotProps">
              <span :class="'p-dropdown-value' + slotProps.value" v-if="slotProps.value">{{ slotProps.value }}</span>
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