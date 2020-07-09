import Vue from "vue";
import VueRouter from "vue-router";
import ViewWarehouses from "./views/ViewWarehouses";
import ViewWarehouseItems from "./views/ViewWarehouseItems";
import ViewWarehouseItem from "./views/ViewWarehouseItems";
import NotFound from "./views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: ViewWarehouses,
  },
  {
    path: "/warehouses",
    component: ViewWarehouses,
  },
  {
    path: "/warehouses/:warehouseId",
    component: ViewWarehouseItems,
  },
  {
    path: "/warehouses/:warehouseId/items/:itemId",
    component: ViewWarehouseItem,
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
