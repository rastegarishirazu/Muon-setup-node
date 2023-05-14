import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import LottieVuePlayer from "@lottiefiles/vue-lottie-player";
import { createPinia, PiniaVuePlugin } from "pinia";
import router from "./router";
import { markRaw } from "vue";
import { useDashboardStore } from "@/stores/dashboardStore";


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

router.beforeEach((to, from, next) => {
  const isConnected = useDashboardStore().isConnected
  const haveNode = useDashboardStore().haveNode === true
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!(isConnected && haveNode)) {
      next({
        path: '/',
      })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})
