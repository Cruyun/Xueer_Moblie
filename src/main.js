import Vue from "vue";
import "whatwg-fetch";
import App from "./App";
import store from "./store";
import router from "./route/router";

// Global hook, sync current route to store
router.beforeEach((to, from, next) => {
  store.dispatch("changeCurrentRoute", to.name);
  next();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
