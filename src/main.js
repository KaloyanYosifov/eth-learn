/**
 * External dependencies.
 */
import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css';

/**
 * Internal dependencies.
 */
import App from './App.vue';
import BankForm from '@/components/bank-form/bank-form';
import ImageForm from '@/components/image-form/image-form';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: BankForm,
        },

        {
            path: '/image-manager',
            component: ImageForm,
        },
    ],
});

createApp(App).use(router).mount('#app');
