import { createApp } from "vue";
import { createPinia } from "pinia";
import Button from './components/Button.vue';
import ErrorBanner from "./components/ErrorBanner.vue";
import DropDown from './components/DropDown.vue';
import Label from './components/Label.vue';
import PrimeVue from 'primevue/config';
import SuccessBanner from "./components/SuccessBanner.vue";
import TextBox from './components/Label.vue';

import 'primevue/resources/themes/saga-blue/theme.css';
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