<script>

// Utilities
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';

// Components
import AppLogo from './AppLogo.vue';
import AppButton from './AppButton.vue';
import AppMenu from './AppMenu.vue';
import AppHamburgerMenu from './AppHamburgerMenu.vue';
import AppUserMenuDesktop from './AppUserMenuDesktop.vue';

export default {
    name: 'AppHeader',
    components: {
        AppLogo,
        AppButton,
        AppMenu,
        AppHamburgerMenu,
        AppUserMenuDesktop
    },
    data() {
        return {
            store,
            router,
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
        handleMobileMenu(value) {
            this.store.menuMobileOpen = value;
            this.store.overlayOpen = value;
            if (value == true) document.body.style.overflow = 'hidden';
            else document.body.style.overflow = 'visible';
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

            <AppUserMenuDesktop :menuData="userMenu"/>

            <!-- Menu Mobile -->
            <div class="group menu">
                <AppHamburgerMenu :maxWidth="840" @menuOpenEvent="handleMobileMenu" />
                <transition name="fade-slide-right">

                    <div class="menu" v-if="store.menuMobileOpen">
                        <div class="auth" v-if="this.store.user != null">
                            <h3 class="maniTitle">
                                Ben tornato,
                                <br>
                                {{ store.user.first_name }} {{ store.user.last_name }}
                            </h3>
                            <AppButton :to="'/dashboard/apartments'" :label="'dashboard'" :type="'line'" :palette="'primary'" />
                            <AppButton :action="handleLogout" :label="'logout'" :type="'line'" :palette="'danger'" />
                        </div>
                        <div class="public" v-else>
                            <h3 class="maniTitle">
                                Benvenuto
                            </h3>
                            <AppButton :to="'/login'" :label="'login'" :type="'line'" :palette="'primary'" />
                            <AppButton :to="'/register'" :label="'registrati'" :type="'solid'" :palette="'primary'" />
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;
@use '../styles/partials/transitions.scss' as *;

// Local Variables
$header-height: 74px;

header {
    padding: 0 1rem;
    @include customShadow;
    // margin-bottom: 3rem;
    height: $header-height;

    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 17;
    background-color: #ffffff;

    >.container {
        @include flexSpaceBtwn;
        @include largeContainer;
        height: 100%;

        .group:last-child {
            @include flexRowCenter(1rem);
        }
    }
}



.group.menu {
    display: none !important;
    position: relative;

    .menu {
        width: 50vw;
        height: 50vh;
        padding: 1.5rem;

        position: fixed;
        top: 76px;
        right: 1rem;
        z-index: 18;

        border-radius: $small-border-radius;
        background-color: $light-color-one;

        @include customShadow;

        >h3 {
            margin-bottom: 2rem;
        }

        .public {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
        }

        .public,
        .auth {
            &:deep a {
                width: 100%;
                text-align: center;
                margin: 1rem 0;
            }
        }
    }
}

@media screen and (max-width: 840px) {
    .group.menu {
        display: block !important;
    }

    .group.user {
        display: none;
    }
}
</style>