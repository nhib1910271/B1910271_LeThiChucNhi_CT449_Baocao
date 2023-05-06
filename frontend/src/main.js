import { createApp } from 'vue'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

//font awesome
import "@fortawesome/fontawesome-free/css/all.min.css";

//toaster
import Toaster from '@meforma/vue-toaster';

//pinia
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router';

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Toaster)
app.mount('#app')
