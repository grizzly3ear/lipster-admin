import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");


// new Vue({
//   el:"#test-vue",
//   data: {
//     name: "Bo",
//     job: "student",
//     age: 21,
//     status: false
//   }
// })
