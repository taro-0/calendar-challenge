import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import '@livelybone/vue-datepicker/lib/css/index.css'
import 'vue-swatches/dist/vue-swatches.css'


import { Timepicker } from '@livelybone/vue-datepicker'
import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from 'vee-validate';
import { max, required } from 'vee-validate/dist/rules';
import VSwatches from 'vue-swatches'

extend('max', {
  ...max,
  message: 'The {_field_} field must have less than {length} characters'
});
extend('required', {
  ...required,
  message: 'The {_field_} is required'
});
setInteractionMode('eager');

Vue.component('VSwatches', VSwatches);
Vue.component('TimePicker', Timepicker);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
