import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";
import NotFound from "./views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    title: "Teilelager",
  },
  {
    path: "/items",
    component: ItemList,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  history: true,
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
