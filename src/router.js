import { createRouter, createWebHistory } from 'vue-router';

// Public Pages
import HomeView from './views/public/HomeView.vue';
import ApartmentView from './views/public/ApartmentView.vue';
import HomeSearch from './views/public/HomeSearch.vue';
import Sponsor from './views/public/Sponsor.vue';

// Authentication Pages
import AppLogin from './views/auth/AppLogin.vue';
import AppApartment from './views/public/dashboard/apartment/AppApartment.vue';
import AppRegister from './views/auth/AppRegister.vue';
import AppCreateApartment from './views/public/dashboard/apartment/AppCreateApartment.vue';
import AppEditApartment from './views/public/dashboard/apartment/AppEditApartment.vue';

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
        {
            path: '/register',
            name: 'register',
            component: AppRegister
        },
        {
            path: '/sponsors',
            name: 'sponsor',
            component: Sponsor
        },
        {
            path: '/apartments/appapartment',
            name: 'app-apartment',
            component: AppApartment
        },
        {
            path: '/apartments/create',
            name: 'apartment-create',
            component: AppCreateApartment
        },
        {
            path: '/apartments/:slug/edit',
            name: 'apartment-edit',
            component: AppEditApartment
        },
    ]
});

export { router };