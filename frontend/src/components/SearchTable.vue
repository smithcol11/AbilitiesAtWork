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
                notes: "Routes average 50 hours per week. Overtime shifts available as there are a need." + 
                " We run routes 6 days a week, drivers will be assigned a 5 day work week, Saturdays will be required."+
                " Routes ranging from 50 -80+ stops per day depending on area." +
                " Routes ranging from 50 - 300+ miles per day depending on area." +
                " Home every night. Employee will keep the delivery van at their home in Grand Marais or the surrounding area." + 
                " They will meet with another driver late in the morning to receive their delivery packages for the day. Hours vary as the amount of packages varies day to day."
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
                notes: "Nothing"
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
                notes: "Nothing"
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
                notes: "Nothing"
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
                notes: "Nothing"
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
                notes: "Nothing"
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
                notes: "Nothing"
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
                notes: "Nothing"
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
            companyName: '',
            dialogs: {}
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
          //Not implemented yet
          console.log(this.companyName)
          console.log(this.SelectedJob.company)
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
          <Dialog header="More Information:" v-model:visible="displayBasic" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '30vw'}" v-if="SelectedIndex == index">
            <div class="mt-3 text-center">
              <div class="mt-2 px-7 py-3">
                <div class="bg-white text-left italic font-bold text-gray-700">
                    <p class="pt-2">Company: <span class="font-normal">{{SelectedItem.company}}</span></p>
                    <p class="pt-2">Contact Name: <span class="font-normal">{{SelectedItem.contactName}}</span></p>
                    <p class="pt-2">Contact Phone Number: <span class="font-normal">{{SelectedItem.contactPhoneNumber}}</span></p>
                    <p class="pt-2">Contact Email: <span class="font-normal">{{SelectedItem.contactEmail}}</span></p>
                    <p class="pt-2">Address: <span class="font-normal">{{SelectedItem.address}}</span></p>
                    <p class="pt-2">City: <span class="font-normal">{{SelectedItem.city}}</span></p>
                    <p class="pt-2">Zip: <span class="font-normal">{{SelectedItem.zip}}</span></p>
                    <p class="pt-2">County: <span class="font-normal">{{SelectedItem.county}}</span></p>
                    <p class="pt-2">Industry: <span class="font-normal">{{SelectedItem.industry}}</span></p>
                    <p class="pt-2">Position: <span class="font-normal">{{SelectedItem.position}}</span></p>
                    <p class="pt-2">Shift: <span class="font-normal">{{SelectedItem.shift}}</span></p>
                    <p class="pt-2">Hours: <span class="font-normal">{{SelectedItem.hours}}</span></p>
                    <p class="pt-2">Date Posted: <span class="font-normal">{{SelectedItem.datePosted}}</span></p>
                    <p class="pt-2">Notes: <span class="font-normal">{{SelectedItem.notes}}</span></p>
                </div>
              </div>
            </div>
            <template #footer>
                <Button label="Update" icon="pi pi-refresh" @click="openUpdate()" class="p-button-text p-button-secondary"/>
                <Button label="Delete" icon="pi pi-times" @click="openDel()" class="p-button-text p-button-secondary"/>    
            </template>
        </Dialog>
        <Dialog header="Update" v-model:visible="displayUpdate" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '30vw'}" v-if="SelectedIndex == index">
          <form action="">
          <div class="mt-3 text-center">
              <div class="mt-2 px-7 py-3">
                <div class="bg-white italic font-bold text-gray-700 grid grid-cols-2 gap-4 p-6">
                    <div class="pt-2">Company: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.company /></div>
                    <div class="pt-2">Contact Name: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.contactName /></div>
                    <div class="pt-2">Contact Phone Number: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.contactPhoneNumber /></div>
                    <div class="pt-2">Contact Email: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.contactEmail /></div>
                    <div class="pt-2">Address: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.address /></div>
                    <div class="pt-2">City: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.city /></div>
                    <div class="pt-2">Zip: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.zip /></div>
                    <div class="pt-2">County: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.county /></div>
                    <div class="pt-2">Shift: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.shift /></div>
                    <div class="pt-2">Industry: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.industry /></div>
                    <div class="pt-2">Position: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.position /></div>
                    <div class="pt-2">Hours: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.hours /></div>
                    <div class="pt-2">Date Posted: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.datePosted /></div>
                    <div class="pt-2">Notes: <InputText type="text" class="p-inputtext-sm" :placeholder=SelectedItem.notes /></div>

                </div>
              </div>
            </div>
          <div class="mt-3 text-right">
            <Button label="Confirm" icon="pi pi-check" @click="saveUpdate()" class="p-button-text p-button-secondary"/>
            <Button label="Cancel" icon="pi pi-times" @click="closeUpdate()" class="p-button-text p-button-secondary"/>
          </div>   
        </form>   
        </Dialog>
        <Dialog header="Do you want to delete this job?" v-model:visible="displayDel" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}" v-if="SelectedIndex == index">
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
