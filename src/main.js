import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import LottieVuePlayer from "@lottiefiles/vue-lottie-player";

Vue.use(LottieVuePlayer); // add lottie-animation to your global scope
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
