import Vue from "vue";
import App from "./App.vue";
import "./assets/css/index.pcss";
import router from "./router";

window.instanciaVue = new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
