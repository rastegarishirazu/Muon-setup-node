import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";

// Vue.config.productionTip = false;
new Vue({
  vuetify,
  router,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
