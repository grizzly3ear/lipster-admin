import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/style.css";
import VueSweetalert2 from 'vue-sweetalert2';


Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
 

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");



