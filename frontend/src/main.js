import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';



import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.component('DataTable', DataTable);



app.mount("#app");
