import { createRouter, createWebHistory } from 'vue-router';
// import views
import HomeView from './views/public/HomeView.vue';
import ApartmentView from './views/public/ApartmentView.vue';
import HomeSearch from './views/public/HomeSearch.vue';
import AppApartment from './views/public/dashboard/apartment/AppApartment.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },{
            path: '/apartments/:slug',
            name: 'apartment',
            component: ApartmentView
        },
        {
            path: '/apartments/search/:title',
            name: 'apartment-search',
            component: HomeSearch
        },
        {
            path: '/apartments/appapartment',
            name: 'app-apartment',
            component: AppApartment
        },
    ]
});

export { router };