import { createApp, reactive } from "vue";
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import Chips from 'primevue/chips';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import {useDark} from '@vueuse/core';

const isDark = reactive(useDark());
console.log(isDark);
if(!isDark.value) {
    import('primevue/resources/themes/saga-blue/theme.css');
}
else {import('primevue/resources/themes/mdc-dark-deeppurple/theme.css')}

import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';  

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dropdown', Dropdown);
app.component('MultiSelect', MultiSelect)
app.component('Chips', Chips)
app.component('Button', Button)
app.component('InputText', InputText)


app.mount("#app");