import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store';

// Public Pages
import HomeView from './views/public/HomeView.vue';
import ApartmentView from './views/public/ApartmentView.vue';
import HomeSearch from './views/public/HomeSearch.vue';
import Sponsor from './views/public/Sponsor.vue';

// Authentication Pages
import AppLogin from './views/auth/AppLogin.vue';
import AppRegister from './views/auth/AppRegister.vue';

// Dashboard - Apartment
import ApartmentIndex from './views/dashboard/Apartment/ApartmentIndex.vue';
import ApartmentCreate from './views/dashboard/Apartment/ApartmentCreate.vue';
import ApartmentEdit from './views/dashboard/Apartment/ApartmentEdit.vue';
import ApartmentShow from './views/dashboard/Apartment/ApartmentShow.vue';

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
            path: '/search',
            name: 'search',
            component: HomeSearch
        },


        // Authentication Pages
        {
            path: '/login',
            name: 'login',
            component: AppLogin,
            beforeEnter: (to, from) => {
                if (store.user != null) return { name: 'home' }
            },
        },
        {
            path: '/register',
            name: 'register',
            component: AppRegister,
            beforeEnter: (to, from) => {
                if (store.user != null) return { name: 'home' }
            },
        },
        // Dashboard - Apartment
        {
            path: '/dashboard/apartments',
            name: 'apartment-index',
            component: ApartmentIndex,
            beforeEnter: (to, from) => {
                if (store.user == null) return { name: 'login' }
            },
        },
        {
            path: '/dashboard/apartments/create',
            name: 'apartment-create',
            component: ApartmentCreate,
            beforeEnter: (to, from) => {
                if (store.user == null) return { name: 'login' }
            },
        },
        {
            path: '/dashboard/apartments/:slug/edit',
            name: 'apartment-edit',
            component: ApartmentEdit,
            beforeEnter: (to, from) => {
                if (store.user == null) return { name: 'login' }
            },
        },
        {
            path: '/dashboard/apartments/:slug',
            name: 'apartment-show',
            component: ApartmentShow,
            beforeEnter: (to, from) => {
                if (store.user == null) return { name: 'login' }
            },
        },



        


        {
            path: '/apartments/search/:title',
            name: 'apartment-search',
            component: HomeSearch
        },

        {
            path: '/dashboard/sponsors',
            name: 'sponsor',
            component: Sponsor
        },

        

    ]
});

// Protezione Rotte Frontend
// router.beforeEach(async (to, from) => {
//     if (to.path.includes('/dashboard') && !store.user && to.name !== 'login') {
//         console.log('ROUTER', store.user);
//         return { name: 'login' }
//     }
// })

export { router };