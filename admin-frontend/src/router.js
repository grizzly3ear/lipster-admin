import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import LipstickBrand from "./views/LipstickBrand";
import LipstickDetail from "./views/LipstickDetail";
import Trend from "./views/Trends";
import Store from "./views/Store";
import LipstickColor from "./views/LipstickColor";




Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lipstick',
      name: 'LipstickBrand',
      component: LipstickBrand
    },
    {
      path: '/trend',
      name: 'Trend',
      component:Trend
    },
    {
      path: '/lipstickDetail/:id',
      name: 'LipstickDetail',
      component:LipstickDetail
    },
    {
      path: '/store',
      name: 'Store',
      component:Store
    },
    {
      path: '/lipstickColor',
      name: 'LipstickColor',
      component:LipstickColor
    }
  ]
});
