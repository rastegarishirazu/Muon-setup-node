import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Verification from "@/views/Verification.vue";
import WrongPage from "@/views/WrongPage.vue";
import ApiVerify from "@/views/ApiVerify.vue";
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
  },
  {
    path: "/error",
    name: "error",
    component: WrongPage,
  },
  {
    path: "/verification/:api/:staker",
    name: "apiVerify",
    component: ApiVerify,
  },
  {
    path: "/discordVerification/:state",
    name: "discordRedirect",
    component: DiscordRedirect,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

export default router;
