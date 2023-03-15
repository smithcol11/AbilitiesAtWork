import { createApp, reactive } from "vue";
import { createPinia } from "pinia";
import Button from './components/Button.vue';
import ErrorBanner from "./components/ErrorBanner.vue";
import DropDown from './components/DropDown.vue';
import Label from './components/Label.vue';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import Chips from 'primevue/chips';
// import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import {useDark} from '@vueuse/core';
import SuccessBanner from "./components/SuccessBanner.vue";
import TextBox from './components/Label.vue';

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
app.component('Button', Button);
app.component('DropDown', DropDown);
app.component('ErrorBanner', ErrorBanner);
app.component('Label', Label);
app.component('SuccessBanner', SuccessBanner);
app.component('TextBox', TextBox);

app.mount("#app");