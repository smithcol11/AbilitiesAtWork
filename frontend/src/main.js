import { createApp } from "vue";
import { createPinia } from "pinia";
import { useJobDataStore } from "./stores/JobData";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

//This call is needed somewhere in the beginning of the application
//to populate the jobstore values if this will be used outside of the
//createJob view (i.e. in the match and search)
const jobStore = useJobDataStore();
jobStore.FetchJobOptions();
