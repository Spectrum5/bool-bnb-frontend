<script>

// Utilities
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';

// Components
import AppLogo from './AppLogo.vue';
import AppButton from './AppButton.vue';
import AppMenu from './AppMenu.vue';

export default {
    name: 'AppHeader',
    components: {
        AppLogo,
        AppButton,
        AppMenu
    },
    data() {
        return {
            store,
            router,
            menuOpen: false,
            userMenu: [
                {
                    label: 'impostazioni',
                    icon: 'gear',
                    onClick: ''
                },
                {
                    label: 'logout',
                    icon: 'right-from-bracket',
                    onClick: this.handleLogout
                }
            ]
        }
    },
    methods: {
        handleLogout() {
            axios.post('http://localhost:8000/logout');
            this.store.user = null;
            // console.log('LogOut')
            router.push('/');
        }
    }
}
</script>

<template>
    <header>
        <div class="container">
            <div class="group">
                <AppLogo />
            </div>

            <div class="group" v-if="store.user == null">
                <AppButton :to="'/login'" :label="'login'" :type="'line'" :palette="'primary'" />
                <AppButton :to="'/register'" :label="'registrati'" :type="'solid'" :palette="'primary'" />
            </div>

            <div class="group" v-else>
                <AppButton :to="'/dashboard/apartments'" :label="'dashboard'" :type="'line'" :palette="'primary'" />

                <div class="user" @click="menuOpen = !menuOpen">
                    <p>{{ store.user.first_name }} {{ store.user.last_name }}</p>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" class="icon" />
                </div>
                <transition name="fade-slide">
                    <AppMenu :menuData="userMenu" :isLastDanger="true" v-if="menuOpen" />
                </transition>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;
@use '../styles/partials/transitions.scss' as *;

header {
    padding: 1rem 0;
    @include customShadow;
    margin-bottom: 3rem;

    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #ffffff;
}

.container {
    @include flexSpaceBtwn;
    @include largeContainer;
}

.group:not(:first-child) {
    @include flexRowCenter (1rem);
    position: relative;
}

.user {
    @include flexRowCenter (0.5rem);
    font-weight: 600;
    cursor: pointer;
}
</style>