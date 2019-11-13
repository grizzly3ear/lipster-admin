import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import LipstickBrand from "./views/LipstickBrand";
import LipstickDetail from "./views/LipstickDetail";
import TrendCollection from "./views/TrendCollection";
import Trend from "./views/Trends";
import Store from "./views/Store";
import LipstickColor from "./views/LipstickColor";
import StoreAddress from "./views/StoreAddress";
import LipstickOfStoreAddress from "./views/LipstickOfStoreAddress";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "home",
      component: Home,
      props: true,
      meta: {
        requiresVisitor: true,
        layout: "landing"
      }
    },
    {
      path: "/lipstickBrand",
      name: "LipstickBrand",
      component: LipstickBrand,
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },
    {
      path: "/trend/:id",
      name: "Trend",
      component: Trend,
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },
    {
      path: "/trendCollection",
      name: "TrendCollection",
      component: TrendCollection,
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },
    {
      path: "/lipstickDetail/:id",
      name: "LipstickDetail",
      component: LipstickDetail,
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },
    {
      path: "/store",
      name: "Store",
      component: Store,
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },
    {
      path: "/StoreAddress/:id",
      name: "StoreAddress",
      component: StoreAddress,
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },
    {
      path: "/lipstickColor/:id",
      name: "LipstickColor",
      component: LipstickColor,
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },
    {
      path: "/lipstickOfStoreAddress/:id",
      name: "LipstickOfStoreAddress",
      component: LipstickOfStoreAddress,
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    }
  ]
});
