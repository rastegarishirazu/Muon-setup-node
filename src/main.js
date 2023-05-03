import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import LottieVuePlayer from "@lottiefiles/vue-lottie-player";
import { createPinia, PiniaVuePlugin } from "pinia";
import router from "./router";
import { markRaw } from "vue";

Vue.use(LottieVuePlayer); // add lottie-animation to your global scope
Vue.use(PiniaVuePlugin);
const pinia = createPinia();
Vue.config.productionTip = false;

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

new Vue({
  vuetify,
  pinia,
  router,

  render: function (h) {
    return h(App);
  },
}).$mount("#app");
