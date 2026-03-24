import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import router from "./router";
import "./assets/main.css";

import ProgressSpinner from "primevue/progressspinner";
import Divider from "primevue/divider";
import Button from "primevue/button";
import Tag from "primevue/tag";
import Rating from "primevue/rating";
import Avatar from "primevue/avatar";
import Card from "primevue/card";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
});

app.component("ProgressSpinner", ProgressSpinner);
app.component("Divider", Divider);
app.component("Button", Button);
app.component("Tag", Tag);
app.component("Rating", Rating);
app.component("Avatar", Avatar);
app.component("Card", Card);

app.mount("#app");
