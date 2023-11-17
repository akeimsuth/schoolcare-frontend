import { createVuetify } from "vuetify";
import { VOtpInput } from 'vuetify/labs/VOtpInput'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VOtpInput,
      VDataTableServer,
    },
    ssr: false,
    defaults,
    // add theme
    theme: {
      defaultTheme: LIGHT_THEME,
      themes: {
        light,
        dark,
      },
      // add color variations
      //   variations: {
      //     colors: ["primary", "secondary"],
      //     lighten: 3,
      //     darken: 3,
      //   },
    },
    // Add the custom iconset
    icons: {
      defaultSet: "custom",
      aliases,
      sets: {
        custom,
      },
    },
  });

  app.vueApp.use(vuetify);
});
