import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Verification from "@/views/Verification.vue";
import WrongPage from "@/views/WrongPage.vue";
import Presale from "@/views/Presale.vue";
import DiscordRedirect from "@/views/DiscordRedirect.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
  },
  {
    path: "/verification",
    name: "verification",
    component: Verification,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/error",
    name: "error",
    component: WrongPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/verification/presale/:staker",
    name: "apiVerify",
    component: Presale,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/discordVerification/:state",
    name: "discordRedirect",
    component: DiscordRedirect,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

export default router;
