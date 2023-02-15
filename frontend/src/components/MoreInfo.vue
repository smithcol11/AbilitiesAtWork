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
        }
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
        openBasic(item,index) {
            this.displayBasic = true;
            this.SelectedItem = item;
            this.SelectedIndex = index;
        },
        closeBasic() {
            this.displayBasic = false;
        },
        remove(){
            if (this.SelectedIndex > -1)
                this.removeJob(this.SelectedIndex);
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
        InputText,
  }
};
</script>

<template>
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
      <Button label="Yes" icon="pi pi-check" @click="remove()" class="p-button-text p-button-secondary"/>
      <Button label="No" icon="pi pi-times" @click="closeDel()" class="p-button-text p-button-secondary"/>
    </div>        
  </Dialog>
</template>
