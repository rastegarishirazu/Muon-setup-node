import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#5158F6",
        secondary: "#5158F6",
        accent: "#8c9eff",
        error: "#b71c1c",
        blackText: "#323245",
        primaryOrange: "#F59569",
        lightInfo: "#D3EAF6",
        info: "#23B5D3",
        lightPrimaryOrange: "#FCDCCE",
        gray: "#E9EFF6",
      },
      dark: {
        primary: "#FAC739",
        secondary: "#FB0D6A",
        accent: "#8c9eff",
        error: "#b71c1c",
        blackText: "#323245",
      },
    },
  },
});
