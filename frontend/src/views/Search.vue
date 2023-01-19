<script>
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { ref } from 'vue';

export default {
  setup() {

    const loading = ref(false);
    const selectedJob = null;
    const filters1 = ref({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'company': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'city': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'zip': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'county': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'industry': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'hours': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const columns = ref([
      { field: 'company', header: 'Company' },
      { field: 'city', header: 'City' },
      { field: 'zip', header: 'Zip' },
      { field: 'county', header: 'County' },
      { field: 'industry', header: 'Industry' },
      { field: 'hours', header: 'Hours' },

    ]);
    const jobs = ref([
      { "id": 5, "company": "ABC Inc.", "city": "Portland", "zip": "97223", "county": "Washington", "industry": "Manufacturing", "hours": "Full Time" },
      { "company": "XYZ Co.", "city": "Beaverton", "zip": "97002", "county": "Multnomah", "industry": "Retail", "hours": "Part Time" },
      { "company": "Might Ent.", "city": "Dalles", "zip": "99696", "county": "Washington", "industry": "Buisness", "hours": "Part Time" },
      { "company": "GoodieMax", "city": "Dalles", "zip": "98868", "county": "Washington", "industry": "Manufacturing", "hours": "Full Time" },
      { "company": "TempCo", "city": "Portland", "zip": "97223", "county": "Washington", "industry": "Buisness", "hours": "Part Time" },
      { "company": "DiceCity", "city": "Portland", "zip": "97223", "county": "Washington", "industry": "Retail", "hours": "Part Time" },
      { "company": "BigMeyer", "city": "Portland", "zip": "97223", "county": "Washington", "industry": "Retail", "hours": "Full Time" },
      { "company": "WorstPlace", "city": "Eugene", "zip": "93556", "county": "Washington", "industry": "Buisness", "hours": "Full Time" },
    ]);

    function onRowSelect(event) {
      console.log(event.data.company)

    }
    function onRowUnselect(event) {

    }
    return {jobs , filters1, onRowSelect, onRowUnselect, columns, loading, selectedJob}
  }
}
</script>

<template>
  <div class="card">
    <DataTable :value="jobs" class="p-datatable-sm" stripedRows @rowSelect="onRowSelect" @rowUnselect="onRowUnselect"
      v-model:selection="this.selectedJob" selectionMode="single" v-model:filters="filters1" filterDisplay="row"
      :loading="loading" :paginator="true" :rows="5" :globalFilterFields="['company', 'city', 'industry', 'hours', 'zip', 'county']">
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
      <template #loading>
        Loading records, please wait...
      </template>
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field" :sortable="true">
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filters1[col.field].value" @keydown.enter="filterCallback()"
            class="p-column-filter" placeholder="Search by" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style>

</style>