import { createRouter, createWebHistory } from 'vue-router';

import ApartmentsIndex from './pages/ApartmentsIndex.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/apartments-index',
            name: 'apartments-index',
            component: ApartmentsIndex
        }
    ]
});

export { router };