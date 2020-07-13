import Vue from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import jwt from "./plugins/jwt";
import "./main.css";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  jwt,
  render: h => h(App)
}).$mount("#app");
