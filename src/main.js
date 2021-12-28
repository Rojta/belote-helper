import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });

app.use(ToastService);

app.use(router);

app.mount("#app");
