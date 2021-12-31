import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

//import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import VueLazyLoad from "vue3-lazyload";
import Tooltip from "primevue/tooltip";

const app = createApp(App);

app.use(PrimeVue, { ripple: true });

app.use(ToastService);
app.use(ConfirmationService);
app.directive("tooltip", Tooltip);

app.use(router);

app.use(VueLazyLoad);

app.mount("#app");
