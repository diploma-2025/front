import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import {loadFonts} from "./plugins/webfontloader";

loadFonts();

const app = createApp(App);

app.config.globalProperties.$serverUrl = "http://192.168.0.104:8000";

app
    .use(router)
    .use(store)
    .use(vuetify)
    .mount("#app");
