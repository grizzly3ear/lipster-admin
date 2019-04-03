import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Lipsticks from "./views/Lipsticks";
import Trends from "./views/Trends";




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
      path: '/Lipsticks',
      name: 'Lipsticks',
      component: Lipsticks
    },
    {
      path: '/Trends',
      name: 'Trends',
      component:Trends
    }
  
  ]
});
