import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import DataForm from '@/components/DataForm.vue'
import TableList from '@/components/TableList.vue'
// Плагины и настройки
import axios from "axios";

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

 // Регистрируем компоненты
Vue.component('DataForm', DataForm);
Vue.component('TableList', TableList);
// eslint-disable-next-line vue/multi-word-component-names

Vue.config.productionTip = false

new Vue({
  router, // Подключаем маршруты
  store,
  vuetify,

  render: h => h(App),
  components: {

  },
}).$mount('#app')
