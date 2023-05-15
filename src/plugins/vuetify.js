import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
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
        textGray: "#6F7787",
        gray3: "#939393",
      },
    },
  },
  iconfont: "fa",
});
