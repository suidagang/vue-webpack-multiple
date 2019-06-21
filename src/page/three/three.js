import Vue from "vue";
import App from "./three.vue";
import axios from 'axios';

new Vue({
  el: "#app",
  render: h => h(App)
});
axios.get("bbb")
