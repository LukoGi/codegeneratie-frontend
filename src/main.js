import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
    position: POSITION.TOP_RIGHT,
});


app.mount('#app')

 if (localStorage.getItem('token')) {
     axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
 }