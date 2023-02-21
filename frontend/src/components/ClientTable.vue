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
      initials: { value: null, matchMode: FilterMatchMode.CONTAINS },
      industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
      hours: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const columns = ref([
      { field: "initials", header: "Initials" },
      { field: "industry", header: "Industry" },
      { field: "hours", header: "Hours" },
    ]);
    const clients = ref([
      {
        id: 5,
        initials: "R.M.K",
        industry: "Manufacturing",
        hours: "Full Time",
      },
      {
        initials: "S.T.P",
        industry: "Retail",
        hours: "Part Time",
      },
      {
        initials: "O.P.R",
        industry: "Buisness",
        hours: "Part Time",
      },
      {
        initials: "P.B.G",
        industry: "Manufacturing",
        hours: "Full Time",
      },
    ]);
    const filterData = ref([
      {
        initials: [],
        industry: [],
        hours: [],
      },
    ]);
    const selectedFilter = ref([
      {
        initials: null,
        industry: null,
        hours: null,
      },
    ]);
    function onRowSelect(event) {
      console.log(event.data.initials);
    }

    function onRowUnselect(event) {}
    return {
      clients,
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
created() {
    this.initFilters1();
    this.getFilters();
    //Get the data from the backend.
    let response = this.getData();
  },
  mounted() {},
  methods: {
    clearFilter1() {
      this.initFilters1();
    },
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        initials: { value: null, matchMode: FilterMatchMode.CONTAINS },
        industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
        hours: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    },
    getFilters() {
      this.filterData.initials = new Array();
      this.filterData.hours = new Array();
      this.filterData.industry = new Array();

      this.filterData.hours.push("Full Time", "Part Time", "Any");

      for (var i = 0, row; (row = this.clients[i]); ++i) {
        if (!this.filterData.initials.includes(row.initials)) {
          this.filterData.initials.push(row.initials);
        }
        if (!this.filterData.industry.includes(row.industry)) {
          this.filterData.industry.push(row.industry);
        }
      }
    },
    async getData() {
      try {
        return this.clients;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
    <div class="card">
      <DataTable
        :value="clients"
        class="p-datatable-sm"
        stripedRows
        @rowSelect="onRowSelect"
        @rowUnselect="onRowUnselect"
        v-model:selection="this.selectedClient"
        selectionMode="single"
        v-model:filters="filters1"
        filterDisplay="row"
        :loading="loading"
        :paginator="true"
        :rows="10"
        :globalFilterFields="[
          'initials',
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
      <Column field="initials" header="Initials" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.initials }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by initials"
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
          {{ data.industry }}
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