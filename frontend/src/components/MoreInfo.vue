<script>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

export default {
    props: {
        data: {
            type: Array, 
            required: true 
        },
        index: {
            type: Number, 
            required: true 
        },
        removeJob: {            //from parent(SearchTable.vue)
            type: Function,
            default: null
        },
        saveUpdate: {            //from parent(SearchTable.vue)
            type: Function,
            default: null
        }
    },
    data() {
        return {
            displayBasic: false,
            displayDel: false,
            displayUpdate: false,

            updatedJob: {
                company: "",
                contactName: "",
                contactPhoneNumber: "",
                contactEmail: "",
                address: "",
                city: "",
                zip: "",
                county: "",
                shift: "",
                industry: "",
                position: "",
                hours: "",
                datePosted: "",
                notes: "",
            }
        };
    },
    mounted() { },
    methods: {
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
        openBasic() {
            this.displayBasic = true;
        },
        closeBasic() {
            this.displayBasic = false;
        },
        remove(){
            if (this.index > -1)
                this.removeJob(this.index);
            this.displayBasic = false;
            this.displayDel = false;
        },
        save(){
            if (this.index > -1) {
                if(this.updatedJob.company == '')           //remain the same data if no new input
                    this.updatedJob.company = this.data.company;
                if(this.updatedJob.contactName == '')
                    this.updatedJob.contactName = this.data.contactName;
                if(this.updatedJob.contactPhoneNumber == '')
                    this.updatedJob.contactPhoneNumber = this.data.contactPhoneNumber;
                if(this.updatedJob.contactEmail == '')
                    this.updatedJob.contactEmail = this.data.contactEmail;
                if(this.updatedJob.address == '')
                    this.updatedJob.address = this.data.address;
                if(this.updatedJob.city == '')
                    this.updatedJob.city = this.data.city;
                if(this.updatedJob.zip == '')
                    this.updatedJob.zip = this.data.zip;
                if(this.updatedJob.county == '')
                    this.updatedJob.county = this.data.county;
                if(this.updatedJob.shift == '')
                    this.updatedJob.shift = this.data.shift;
                if(this.updatedJob.industry == '')
                    this.updatedJob.industry = this.data.industry;
                if(this.updatedJob.position == '')
                    this.updatedJob.position = this.data.position;
                if(this.updatedJob.hours == '')
                    this.updatedJob.hours = this.data.hours;
                if(this.updatedJob.datePosted == '')
                    this.updatedJob.datePosted = this.data.datePosted;
                if(this.updatedJob.notes == '')
                    this.updatedJob.notes = this.data.notes;
                this.saveUpdate(this.updatedJob,this.index);
            }
            this.updatedJob.company = ''        //reset data
            this.updatedJob.contactName = ''
            this.updatedJob.contactPhoneNumber = ''
            this.updatedJob.contactEmail = ''
            this.updatedJob.address = ''
            this.updatedJob.city = ''
            this.updatedJob.zip = ''
            this.updatedJob.county = ''
            this.updatedJob.shift = ''
            this.updatedJob.industry = ''
            this.updatedJob.position = ''
            this.updatedJob.hours = ''
            this.updatedJob.datePosted = ''
            this.updatedJob.notes = ''

            this.displayUpdate = false;
        }
    },
    components: {
        Dialog,
        InputText,
  }
};
</script>

<template>
    <Button label="More Info" class="p-button-outlined p-button-secondary" @click="openBasic()" />
    <Dialog header="More Information:" v-model:visible="displayBasic"  :style="{width: '550px'}">
      <div class="mt-3 text-center">
        <div class="mt-2 px-7 py-3">
          <div class="bg-white text-left italic font-bold text-gray-700">
              <p class="pt-2">Company: <span class="font-normal">{{data.company}}</span></p>
              <p class="pt-2">Contact Name: <span class="font-normal">{{data.contactName}}</span></p>
              <p class="pt-2">Contact Phone Number: <span class="font-normal">{{data.contactPhoneNumber}}</span></p>
              <p class="pt-2">Contact Email: <span class="font-normal">{{data.contactEmail}}</span></p>
              <p class="pt-2">Address: <span class="font-normal">{{data.address}}</span></p>
              <p class="pt-2">City: <span class="font-normal">{{data.city}}</span></p>
              <p class="pt-2">Zip: <span class="font-normal">{{data.zip}}</span></p>
              <p class="pt-2">County: <span class="font-normal">{{data.county}}</span></p>
              <p class="pt-2">Industry: <span class="font-normal">{{data.industry}}</span></p>
              <p class="pt-2">Position: <span class="font-normal">{{data.position}}</span></p>
              <p class="pt-2">Shift: <span class="font-normal">{{data.shift}}</span></p>
              <p class="pt-2">Hours: <span class="font-normal">{{data.hours}}</span></p>
              <p class="pt-2">Date Posted: <span class="font-normal">{{data.datePosted}}</span></p>
              <p class="pt-2">Notes: <span class="font-normal">{{data.notes}}</span></p>
          </div>
        </div>
      </div>
      <template #footer>
          <Button label="Update" icon="pi pi-refresh" @click="openUpdate()" class="p-button-text p-button-secondary"/>
          <Button label="Delete" icon="pi pi-times" @click="openDel()" class="p-button-text p-button-secondary"/>    
      </template>
  </Dialog>
  <Dialog header="Update" v-model:visible="displayUpdate"  :style="{width: '550px'}">
    <form action="">
        <div class="mt-3 text-center">
            <div class="mt-2 px-7 py-3">
            <div class="bg-white italic font-bold text-gray-700 grid grid-cols-2 gap-4 p-6">
                <div class="pt-2 basis-1/5">
                    Company: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.company v-model="updatedJob.company"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Contact Name: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.contactName v-model="updatedJob.contactName"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Contact Phone Number: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.contactPhoneNumber v-model="updatedJob.contactPhoneNumber"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Contact Email: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.contactEmail v-model="updatedJob.contactEmail"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Address: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.address v-model="updatedJob.address"/>
                </div>
                <div class="pt-2 basis-1/5">
                    City: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.city v-model="updatedJob.city"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Zip: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.zip v-model="updatedJob.zip"/>
                </div>
                <div class="pt-2 basis-1/5">
                    County: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.county v-model="updatedJob.county"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Shift: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.shift v-model="updatedJob.shift"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Industry: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.industry v-model="updatedJob.industry"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Position: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.position v-model="updatedJob.position"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Hours: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.hours v-model="updatedJob.hours"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Date Posted: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.datePosted v-model="updatedJob.datePosted"/>
                </div>
                <div class="pt-2 basis-1/5">
                    Notes: 
                    <InputText type="text" class="p-inputtext-sm" :placeholder=data.notes v-model="updatedJob.notes"/>
                </div>
            </div>
            </div>
        </div>
        <div class="mt-3 text-right">
            <Button label="Confirm" icon="pi pi-check" @click="save()" class="p-button-text p-button-secondary"/>
            <Button label="Cancel" icon="pi pi-times" @click="closeUpdate()" class="p-button-text p-button-secondary"/>
        </div>   
    </form>   
  </Dialog>
  <Dialog header="Do you want to delete this job?" v-model:visible="displayDel" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}">
    <div class="mt-3 text-right">
      <Button label="Yes" icon="pi pi-check" @click="remove()" class="p-button-text p-button-secondary"/>
      <Button label="No" icon="pi pi-times" @click="closeDel()" class="p-button-text p-button-secondary"/>
    </div>        
  </Dialog>
</template>
