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

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/lipstickBrand",
      name: "LipstickBrand",
      component: LipstickBrand
    },
    {
      path: "/trend/:id",
      name: "Trend",
      component: Trend
    },
    {
      path: "/trendCollection",
      name: "TrendCollection",
      component: TrendCollection
    },
    {
      path: "/lipstickDetail/:id",
      name: "LipstickDetail",
      component: LipstickDetail
    },
    {
      path: "/store",
      name: "Store",
      component: Store
    },
    {
      path: "/StoreAddress/:id",
      name: "StoreAddress",
      component: StoreAddress
    },
    {
      path: "/lipstickColor/:id",
      name: "LipstickColor",
      component: LipstickColor
    }
  ]
});
