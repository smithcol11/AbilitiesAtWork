<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import Dialog from 'primevue/dialog';
import SplitButton from 'primevue/splitbutton';
import InputText from 'primevue/inputtext';


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
            { field: "industry", header: "Industry" },
            { field: "hours", header: "Hours" },
        ]);
        const jobs = ref([
            {
                id: 5,
                company: "ABC Inc.",
                city: "Portland",
                zip: "97223",
                county: "Washington",
                industry: "Manufacturing",
                hours: "Full Time",
            },
            {
                company: "XYZ Co.",
                city: "Beaverton",
                zip: "97002",
                county: "Multnomah",
                industry: "Retail",
                hours: "Part Time",
            },
            {
                company: "Might Ent.",
                city: "Dalles",
                zip: "99696",
                county: "Washington",
                industry: "Buisness",
                hours: "Part Time",
            },
            {
                company: "GoodieMax",
                city: "Dalles",
                zip: "98868",
                county: "Washington",
                industry: "Manufacturing",
                hours: "Full Time",
            },
            {
                company: "TempCo",
                city: "Portland",
                zip: "97223",
                county: "Washington",
                industry: "Buisness",
                hours: "Part Time",
            },
            {
                company: "DiceCity",
                city: "Portland",
                zip: "97223",
                county: "Washington",
                industry: "Retail",
                hours: "Part Time",
            },
            {
                company: "BigMeyer",
                city: "Portland",
                zip: "97223",
                county: "Washington",
                industry: "Retail",
                hours: "Full Time",
            },
            {
                company: "WorstPlace",
                city: "Eugene",
                zip: "93556",
                county: "Washington",
                industry: "Buisness",
                hours: "Full Time",
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
        function onRowUnselect(event) { }

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
        return {
            displayBasic: false,
            displayDel: false,
            displayUpdate: false,
            SelectedJob: {},
            SelectedIndex: -1,
        };
    },
    created() {
        this.initFilters1();
        this.getFilters();
        //Get the data from the backend. Just a stub for now, does nothing!
        let response = this.getData();
    },
    mounted() { },
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
            }
            catch (error) {
                console.log(error);
            }
        },
        openDel() {
          this.displayBasic = false;
          this.displayDel = true;
          
        },
        closeDel() {
          this.displayDel = false;
        },
        openUpdate() {
          this.displayBasic = false;
          this.displayUpdate = true;
        },
        closeUpdate() {
          this.displayUpdate = false;
        },
        openBasic(item,index) {
            this.displayBasic = true;
            this.SelectedItem = item;
            this.SelectedIndex = index;
        },
        closeBasic() {
            this.displayBasic = false;
        },
        removeJob(){
          if (this.SelectedIndex > -1)
              this.jobs.splice(this.SelectedIndex, 1);
              this.displayBasic = false;
              this.displayDel = false;
        },
        saveUpdate(){
          
          this.displayUpdate = false;
        }
    },
    components: {
      Dialog,
      SplitButton,
      InputText
  }
};
</script>

<template>
  <div class="card">
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

      <Column field="moreInfo">
        <template #body="{ data,index }">
          <Button label="More Info" class="p-button-outlined p-button-secondary" @click="openBasic(data,index)" />
          <Dialog header="More Information:" v-model:visible="displayBasic" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}">
            <div class="mt-3 text-center">
              <div class="mt-2 px-7 py-3">
                <div class="bg-white text-left italic font-bold text-gray-700">
                    <p class="pt-2">Company: <span class="font-normal">{{SelectedItem.company}}</span></p>
                    <p class="">City: <span class="font-normal">{{SelectedItem.city}}</span></p>
                    <p class="">Zip: <span class="font-normal">{{SelectedItem.zip}}</span></p>
                    <p class="">County: <span class="font-normal">{{SelectedItem.county}}</span></p>
                    <p class="">Hours: <span class="font-normal">{{SelectedItem.hours}}</span></p>
                </div>
              </div>
            </div>
            <template #footer>
                <Button label="Update" icon="pi pi-refresh" @click="openUpdate()" class="p-button-text p-button-secondary"/>
                <Button label="Delete" icon="pi pi-times" @click="openDel()" class="p-button-text p-button-secondary"/>    
            </template>
        </Dialog>
        <Dialog header="Update" v-model:visible="displayUpdate" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}">
          <form action="">
          <div class="mt-3 text-center">
              <div class="mt-2 px-7 py-3">
                <div class="bg-white text-center italic font-bold text-gray-700">
                    <p class="pt-2">Company: </p><InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.company />
                    <p class="pt-2">City: </p><p><InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.city /></p>
                    <p class="pt-2">Zip: </p><p><InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.zip /></p>
                    <p class="pt-2">County: </p><p><InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.county /></p>
                    <p class="pt-2">Hours: </p><p><InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.hours /></p>
                </div>
              </div>
            </div>
          <div class="mt-3 text-right">
            <Button label="Confirm" icon="pi pi-check" @click="saveUpdate()" class="p-button-text p-button-secondary"/>
            <Button label="Cancel" icon="pi pi-times" @click="closeUpdate()" class="p-button-text p-button-secondary"/>
          </div>   
        </form>     
        </Dialog>
        <Dialog header="Do you want to delete this job?" v-model:visible="displayDel" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}">
          <div class="mt-3 text-right">
            <Button label="Yes" icon="pi pi-check" @click="removeJob()" class="p-button-text p-button-secondary"/>
            <Button label="No" icon="pi pi-times" @click="closeDel()" class="p-button-text p-button-secondary"/>
          </div>        
        </Dialog>
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
