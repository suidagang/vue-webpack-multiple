import Vue from "vue";
import App from "./one.vue";
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  el: "#app",
  render: h => h(App)
});
axios.get("aaa")
