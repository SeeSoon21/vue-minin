import { createApp, VueElement } from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import messagePlugin from '@/utils/message.plugin'
import "materialize-css/dist/js/materialize.min";

import { initializeApp } from "firebase/app";



initializeApp({
    apiKey: "AIzaSyC3BdcZ0Zc_K08vH1kCw8UJfV8xdSRyUq8",
    authDomain: "vue-minin-ea9d0.firebaseapp.com",
    projectId: "vue-minin-ea9d0",
    storageBucket: "vue-minin-ea9d0.appspot.com",
    messagingSenderId: "584565082120",
    appId: "1:584565082120:web:5af6db8683fec7807129bd",
    measurementId: "G-RTYLEVGV7T"
})

/*getAuth().onAuthStateChanged(() => {
    new Vue({
        router, 
        store,
        render: h => h(App)
    }).$mount('#app')
})*/

const app = createApp(App).use(store).use(router).use(Vuelidate).use(messagePlugin).mount("#app");
