<script>

// Utilities
import axios from 'axios';
import { store } from '../../store';
import { router } from '../../router';

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppButton from '../../components/AppButton.vue';
import AppSidebar from '../../components/AppSidebar.vue';
import AppMenu from '../../components/AppMenu.vue';

export default {
    name: 'AppDashboardLayout',
    components: {
        AppLogo,
        AppButton,
        AppSidebar,
        AppMenu
    },
    data() {
        return {
            store,
            router,
            menuDesktopOpen: false,
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
    props: {
        title: String,
        button: {
            type: Object,
            default: null
        }
    },
    methods: {
        handleLogout() {
            axios.post('http://localhost:8000/logout');
            this.store.user = null;
            // console.log('Logged Out');
            router.push('/');
        }
    },
    mounted() {
        this.$nextTick(this.store.clear());
    }
}
</script>

<template>
    <div class="wrapper">

        <AppSidebar />

        <div class="rightSide">

            <header>
                <!-- Searchbar -->
                <!-- Menu Utente -->
                <!-- <button @click="handleLogout()">logout</button> -->
                <!-- Pulsanti Utente Autenticato -->
                <div class="group">
                    <!-- <AppButton :to="'/dashboard/apartments'" :label="'dashboard'" :type="'line'" :palette="'primary'" /> -->

                    <div class="userMenu" @click="menuDesktopOpen = !menuDesktopOpen">
                        <p>{{ store.user.first_name }} {{ store.user.last_name }}</p>
                        <font-awesome-icon icon="fa-solid fa-chevron-down" class="icon"
                            :class="menuDesktopOpen ? 'rotated' : ''" />
                    </div>

                    <transition name="fade-slide-top">
                        <AppMenu :menuData="userMenu" :isLastDanger="true" v-if="menuDesktopOpen" />
                    </transition>
                </div>
            </header>

            <div class="content">
                <header>
                    <h2 class="mainTitle">{{ this.title }}</h2>
                    <AppButton v-if="button" :to="button.link ?? null" :action="button.action ?? null" :label="button.label"
                        :icon="button.icon ?? null" :type="'solid'" :palette="'primary'" />
                </header>

                <slot></slot>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/transitions.scss' as *;

.wrapper {
    height: 100vh;
    width: 100vw;
    @include flexRowCenter;
    overflow: hidden;
}

.mainTitle {
    margin-bottom: 0;
}

.rightSide {
    height: 100vh;
    flex-grow: 1;
    flex-shrink: 0;

    >header {
        height: 80px;
        padding: 0 1rem;
        border-bottom: 2px solid $dark-color-one;

        @include flexSpaceBtwn;
        justify-content: flex-end;

        .group {
            position: relative;
        }
    }

    .content {
        height: calc(100% - 80px);

        display: flex;
        flex-direction: column;

        header {
            width: 100%;
            @include flexSpaceBtwn;
            background: lightcyan;

            box-shadow: 0 4px 4px -2px white;
            isolation: isolate;
            z-index: 1;
            padding: 0.25rem 1rem;
        }
    }
}

.userMenu {
    @include flexRowCenter (0.5rem);
    text-transform: capitalize;
    font-weight: 600;
    cursor: pointer;
}
</style>