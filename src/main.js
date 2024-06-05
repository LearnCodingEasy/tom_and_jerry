import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// VueSweetalert2 استيراد
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Add SVG Cor
import { library } from "@fortawesome/fontawesome-svg-core";
// Free Icons Styles
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
// Add Free Icons Styles To SVG Core
library.add(fas, far, fab);
// Bootstrap
// npm install bootstrap jquery popper.js
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// My Style Scss
import "./assets/css/style.scss"; 
// axios استيراد
import axios from "axios"; 
// URL افتراضية لجميع طلبات axios تعيين قاعدة
// Backend للاتصال مع ال 
axios.defaults.baseURL = "http://127.0.0.1:8000";
const app = createApp(App)
// مع روابط الصفحات Axios استخدم  
app.use(router, axios);
// مع الموقع كلة VueSweetalert2 استخدم  
app.use(VueSweetalert2)
// eslint-disable-next-line vue/multi-word-component-names
app.component("fa", FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')
