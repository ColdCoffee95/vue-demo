import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import ViewUI from 'view-design';
import router from './router';
import './assets/css/basic.less';
import 'view-design/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
