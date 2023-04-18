import { createRouter, createWebHistory } from 'vue-router';

// Public Pages
import HomeView from './views/public/HomeView.vue';
import ApartmentView from './views/public/ApartmentView.vue';
import HomeSearch from './views/public/HomeSearch.vue';

// Authentication Pages
import AppLogin from './views/auth/AppLogin.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Public Pages
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/apartments/:slug',
            name: 'apartment',
            component: ApartmentView
        },
        {
            path: '/apartments/search/:title',
            name: 'apartment-search',
            component: HomeSearch
        },
        // Authentication Pages
        {
            path: '/login',
            name: 'login',
            component: AppLogin
        },
    ]
});

export { router };