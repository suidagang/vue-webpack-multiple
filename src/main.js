import Vue from 'vue';
import App from './App';
import router from './router'
import './asset/css/index.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import store from './store'
Vue.use(ElementUI);
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
});



// axios.get('aaa')