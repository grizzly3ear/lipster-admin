import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './style/style.css';
import storeVuex from './vuex/store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  storeVuex,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");



