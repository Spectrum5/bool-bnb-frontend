import { createRouter, createWebHistory } from 'vue-router';
// import views
import HomeView from './views/public/HomeView.vue';
import ApartmentView from './views/ApartmentView.vue';

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
    ]
});

export { router };