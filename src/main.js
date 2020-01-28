import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//Custom Addons
import * as BABYLON from "babylonjs";
//Use GUI
import * as GUI from "babylonjs-gui";
//Loader to use glTF Files
import "babylonjs-loaders";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
