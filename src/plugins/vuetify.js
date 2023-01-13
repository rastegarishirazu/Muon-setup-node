import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#4A39BE",
        secondary: "#5158F6",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
      dark: {
        primary: "#FAC739",
        secondary: "#FB0D6A",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});
