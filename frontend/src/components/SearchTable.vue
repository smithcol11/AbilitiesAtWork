<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import InputText from "primevue/inputtext";
import JobDetails from "./JobDetails.vue";

export default {
  setup() {
    const loading = ref(false);
    const selectedJob = null;
    const filters1 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      company: { value: null, matchMode: FilterMatchMode.CONTAINS },
      city: { value: null, matchMode: FilterMatchMode.IN },
      zip: { value: null, matchMode: FilterMatchMode.CONTAINS },
      county: { value: null, matchMode: FilterMatchMode.IN },
      industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
      hours: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const columns = ref([
      { field: "company", header: "Company" },
      { field: "city", header: "City" },
      { field: "zip", header: "Zip" },
      { field: "county", header: "County" },
      { field: "hours", header: "Hours" },
    ]);
    const jobs = ref([
      {
        id: 5,
        company: "ABC Inc.",
        contactName: "Wilfred Ramsey",
        contactPhoneNumber: "(671) 486-2663",
        contactEmail: "wilfred@gmail.com",
        address: "644 Stonybrook Drive",
        city: "Portland",
        zip: "97223",
        county: "Washington",
        shift: "Early",
        industry: "Manufacturing",
        position: "Package Delivery Driver",
        hours: "Full Time",
        datePosted: "12/07/2022",
        notes:
          "Routes average 50 hours per week. Overtime shifts available as there are a need." +
          " We run routes 6 days a week, drivers will be assigned a 5 day work week, Saturdays will be required." +
          " Routes ranging from 50 -80+ stops per day depending on area." +
          " Routes ranging from 50 - 300+ miles per day depending on area." +
          " Home every night. Employee will keep the delivery van at their home in Grand Marais or the surrounding area." +
          " They will meet with another driver late in the morning to receive their delivery packages for the day. Hours vary as the amount of packages varies day to day.",
      },
      {
        company: "XYZ Co.",
        contactName: "Regina Hunt",
        contactPhoneNumber: "(629) 796-1398",
        contactEmail: "regina@gmail.com",
        address: "9110 Wentworth St",
        city: "Beaverton",
        zip: "97002",
        county: "Multnomah",
        shift: "Morning",
        industry: "Retail",
        position: "Personal assistant",
        hours: "Part Time",
        datePosted: "12/25/2022",
        notes: "Nothing",
      },
      {
        company: "Might Ent.",
        contactName: "Dorothy Rice",
        contactPhoneNumber: "(227) 932-8104",
        contactEmail: "dorothy@gmail.com",
        address: "683 SE. Grandrose Drive",
        city: "Dalles",
        zip: "99696",
        county: "Washington",
        shift: "Afternoon",
        industry: "Buisness",
        position: "Accounting",
        hours: "Part Time",
        datePosted: "02/07/2022",
        notes: "Nothing",
      },
      {
        company: "GoodieMax",
        contactName: "Travis Vasquez",
        contactPhoneNumber: "(372) 501-1055",
        contactEmail: "travis@gmail.com",
        address: "23 South Fulton Dr.",
        city: "Dalles",
        zip: "98868",
        county: "Washington",
        shift: "Early",
        industry: "Manufacturing",
        position: "Guest Experience",
        hours: "Full Time",
        datePosted: "09/17/2022",
        notes: "Nothing",
      },
      {
        company: "TempCo",
        contactName: "Gilbert Ortiz",
        contactPhoneNumber: "(439) 282-1448",
        contactEmail: "gilbert@gmail.com",
        address: "62 Livingston Court",
        city: "Portland",
        zip: "97223",
        county: "Washington",
        shift: "Early",
        industry: "Buisness",
        position: "Accounting",
        hours: "Part Time",
        datePosted: "01/08/2022",
        notes: "Nothing",
      },
      {
        company: "DiceCity",
        contactName: "Marjorie Watson",
        contactPhoneNumber: "(269) 390-9930",
        contactEmail: "marjorie@gmail.com",
        address: "771 Studebaker St.",
        city: "Portland",
        zip: "97223",
        county: "Washington",
        shift: "Evening",
        industry: "Retail",
        position: "Retail",
        hours: "Part Time",
        datePosted: "06/06/2022",
        notes: "Nothing",
      },
      {
        company: "BigMeyer",
        contactName: "Fred Ballard",
        contactPhoneNumber: "(892) 949-2754",
        contactEmail: "fred@gmail.com",
        address: "7491 SW. Plumb Branch Dr.",
        city: "Portland",
        zip: "97223",
        county: "Washington",
        shift: "Early",
        industry: "Retail",
        position: "Cafe",
        hours: "Full Time",
        datePosted: "03/03/2022",
        notes: "Nothing",
      },
      {
        company: "WorstPlace",
        contactName: "Blanca Pope",
        contactPhoneNumber: "(507) 690-0787",
        contactEmail: "blanca@gmail.com",
        address: "55 Lake Forest Lane",
        city: "Eugene",
        zip: "93556",
        county: "Washington",
        shift: "Morning",
        industry: "Buisness",
        position: "Food",
        hours: "Full Time",
        datePosted: "12/07/2022",
        notes: "Nothing",
      },
    ]);
    const filterData = ref([
      {
        county: [],
        company: [],
        city: [],
        hours: [],
      },
    ]);
    const selectedFilter = ref([
      {
        county: null,
        city: null,
      },
    ]);
    function onRowSelect(event) {
      console.log(event.data.company);
    }
    function onRowUnselect(event) {}
    return {
      jobs,
      filters1,
      onRowSelect,
      onRowUnselect,
      columns,
      loading,
      selectedJob,
      filterData,
      selectedFilter,
    };
  },
  data() {
    return {};
  },
  created() {
    this.initFilters1();
    this.getFilters();
    //Get the data from the backend. Just a stub for now, does nothing!
    let response = this.getData();
  },
  mounted() {},
  methods: {
    clearFilter1() {
      this.initFilters1();
    },
    //Sets all filters to default. Can be called to reset all filters.
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        city: { value: null, matchMode: FilterMatchMode.IN },
        zip: { value: null, matchMode: FilterMatchMode.CONTAINS },
        county: { value: null, matchMode: FilterMatchMode.IN },
        industry: { value: null, matchMode: FilterMatchMode.CONTAINS },
        hours: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    },
    //This dynamically populates the drop-down and multiselect filters used in the table.
    getFilters() {
      this.filterData.county = new Array();
      this.filterData.city = new Array();
      this.filterData.company = new Array();
      this.filterData.hours = new Array();
      this.filterData.hours.push("Full Time", "Part Time");
      for (var i = 0, row; (row = this.jobs[i]); ++i) {
        if (!this.filterData.county.includes(row.county)) {
          this.filterData.county.push(row.county);
        }
        if (!this.filterData.city.includes(row.city)) {
          this.filterData.city.push(row.city);
        }
        if (!this.filterData.company.includes(row.company)) {
          this.filterData.company.push(row.company);
        }
      }
    },
    async getData() {
      try {
        return this.jobs;
      } catch (error) {
        console.log(error);
      }
    },
    removeJob(SelectedIndex) {
      if (SelectedIndex > -1) this.jobs.splice(SelectedIndex, 1);
    },
    saveUpdate(updatedJob, SelectedIndex) {
      console.log(updatedJob.company);
      this.jobs[SelectedIndex].company = updatedJob.company;
      this.jobs[SelectedIndex].contactName = updatedJob.contactName;
      this.jobs[SelectedIndex].compcontactPhoneNumberany =
        updatedJob.contactPhoneNumber;
      this.jobs[SelectedIndex].contactEmail = updatedJob.contactEmail;
      this.jobs[SelectedIndex].address = updatedJob.address;
      this.jobs[SelectedIndex].city = updatedJob.city;
      this.jobs[SelectedIndex].zip = updatedJob.zip;
      this.jobs[SelectedIndex].county = updatedJob.county;
      this.jobs[SelectedIndex].shift = updatedJob.shift;
      this.jobs[SelectedIndex].industry = updatedJob.industry;
      this.jobs[SelectedIndex].position = updatedJob.position;
      this.jobs[SelectedIndex].hours = updatedJob.hours;
      this.jobs[SelectedIndex].datePosted = updatedJob.datePosted;
      this.jobs[SelectedIndex].notes = updatedJob.notes;
    },
  },
  components: {
    JobDetails,
},
};
</script>

<template>
  <div class="card m-5 bg-light shadow-lg border">
    <DataTable
      :value="jobs"
      class="p-datatable-sm"
      stripedRows
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnselect"
      v-model:selection="this.selectedJob"
      selectionMode="single"
      v-model:filters="filters1"
      filterDisplay="row"
      :loading="loading"
      :paginator="true"
      :rows="10"
      :globalFilterFields="[
        'company',
        'city',
        'industry',
        'hours',
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

      <Column field="company" header="Company" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.company }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by company"
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
