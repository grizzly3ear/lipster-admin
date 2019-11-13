import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/style.css";
import VueSweetalert2 from "vue-sweetalert2";
import Vuesax from "vuesax";

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(Vuesax);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    var token = window.localStorage.getItem("token");
    if (!token) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (token) {
      next({
        path: "/lipstickBrand"
      });
    } else {
      next();
    }
  }
});
