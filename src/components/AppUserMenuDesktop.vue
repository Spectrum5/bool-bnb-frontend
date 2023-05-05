<script>

// Utilities
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';

// Components
import AppButton from './AppButton.vue';
import AppMenu from './AppMenu.vue';

export default {
    name: 'AppUserMenuDesktop',
    components: {
        AppButton,
        AppMenu
    },
    data() {
        return {
            store,
            router
        }
    },
    props: {
        menuData: Array
    },
    methods: {
        handleDesktopMenu() {
            // Gestisce l'apertura/chiusura del menu
            this.store.menuDesktopOpen = !this.store.menuDesktopOpen;
            this.store.overlayOpen = this.store.menuDesktopOpen;
        },
        handleLogout() {
            // Invia una richiesta di Logout
            axios.post('http://localhost:8000/logout');
            this.store.user = null;
            this.store.overlayOpen = false;
            router.push('/');
            console.log('LogOut')
        },
    }
}
</script>

<template>
    <!-- Menu Tablet - Desktop -->
    <div class="menu">

        <!-- Pulsanti Autenticatione -->
        <div class="group" v-if="store.user == null">
            <AppButton :to="'/login'" :label="'login'" :type="'line'" :palette="'primary'" />
            <AppButton :to="'/register'" :label="'registrati'" :type="'solid'" :palette="'primary'" />
        </div>

        <!-- Pulsanti Utente Autenticato -->
        <div class="group" v-else>
            <AppButton :to="'/dashboard/apartments'" :label="'dashboard'" :type="'line'" :palette="'primary'" v-if="!$route.fullPath.includes('dashboard')"/>

            <div class="user" @click="handleDesktopMenu">
                <p>{{ store.user.first_name }} {{ store.user.last_name }}</p>
                <font-awesome-icon icon="fa-solid fa-chevron-down" class="icon"
                    :class="store.menuDesktopOpen ? 'rotated' : ''" />
            </div>

            <transition name="fade-slide-top">
                <AppMenu :menuData="this.menuData" :isLastDanger="true" v-if="store.menuDesktopOpen" />
            </transition>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/mixins.scss' as *;

.menu>.group {
    @include flexRowCenter (1rem);
    position: relative;
}

.user {
    @include flexRowCenter (0.5rem);
    text-transform: capitalize;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
}

@media screen and (max-width: 840px) {
    .menu {
        display: none;
    }
}
</style>