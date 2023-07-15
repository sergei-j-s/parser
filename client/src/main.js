import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'remixicon/fonts/remixicon.css';
import './assets/css/tailwind.css';
import './assets/css/style.css';

function bootstrap() {
    const app = createApp(App);

    app.use(ElementPlus);
    app.use(router);
    app.mount('#app');
};

bootstrap();