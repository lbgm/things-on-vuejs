import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import OtpInput from "@/components/otp-input.vue";
import OtpInputV2 from "@/components/otp-input-vue2.vue";

const app = createApp(App);
app.use(store);
app.use(router);

app.component("OtpInput", OtpInput);
app.component("OtpInputV2", OtpInputV2);

app.mount("#app");
