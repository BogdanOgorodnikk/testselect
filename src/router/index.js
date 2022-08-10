import Vue from "vue";
import Router from "vue-router";
import Home from "../views/index";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.VUE_APP_BASE_PATH,
  routes,
});

export default router;
