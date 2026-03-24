import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import router from "./router";
import { definePreset } from "@primeuix/themes";
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

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{slate.50}",
      100: "{slate.100}",
      200: "{slate.200}",
      300: "{slate.300}",
      400: "{slate.400}",
      500: "{slate.500}",
      600: "{slate.600}",
      700: "{slate.700}",
      800: "{slate.800}",
      900: "{slate.900}",
      950: "{slate.950}",
    },
  },
});
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
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
