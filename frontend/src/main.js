import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import Chips from 'primevue/chips';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
//import ConfirmationService from 'primevue/confirmationservice';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';  

import { useJobDataStore } from "./stores/JobData";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
//app.use(ConfirmationService);

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dropdown', Dropdown);
app.component('MultiSelect', MultiSelect)
app.component('Chips', Chips)
app.component('Button', Button)
app.component('InputText', InputText)


app.mount("#app");

//This call is needed somewhere in the beginning of the application
//to populate the jobstore values if this will be used outside of the
//createJob view (i.e. in the match and search)
const jobStore = useJobDataStore();
jobStore.FetchJobOptions();
