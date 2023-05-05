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
import AppUserMenuDesktop from '../../components/AppUserMenuDesktop.vue';

export default {
    name: 'AppDashboardLayout',
    components: {
        AppLogo,
        AppButton,
        AppSidebar,
        AppMenu,
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
            this.store.overlayOpen = false;
            router.push('/');
            // console.log('Logged Out');
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
                <AppUserMenuDesktop :menuData="userMenu"/>
            </header>

            <div class="content">
                <header>
                    <h2 class="mainTitle">{{ this.title }}</h2>
                    <AppButton v-if="button" :to="button.link ?? null" :action="button.action ?? null" :label="button.label"
                        :icon="button.icon ?? null" :type="'solid'" :palette="'primary'" />
                </header>

                <main>
                    <div class="card">
                        <slot></slot>
                    </div>
                </main>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/transitions.scss' as *;

// Local Variables
$header-height: 80px;



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
    // flex-shrink: 0;

    >header {
        height: $header-height;
        padding: 0 1rem;
        border-bottom: 2px solid $dark-color-one;
        // isolation: isolate;
        // z-index: 30;

        @include flexSpaceBtwn;
        justify-content: flex-end; // Temp

        .group {
            position: relative;
        }
    }

    .content {
        height: calc(100% - $header-height);
        // background-color: green;

        display: flex;
        flex-direction: column;

        header {
            width: 100%;
            @include flexSpaceBtwn;
            flex-wrap: wrap;

            box-shadow: 0 4px 4px -2px white;
            isolation: isolate;
            z-index: 1;
            padding: 0.25rem 1rem;
        }

        main {
            background-color: $light-color-two;
            padding: 1rem;
            height: 100%;
            overflow-y: auto;

            .card {
                padding: 0.5rem;
                background-color: #fcfcfc;
                // border: 2px solid black;
                border-radius: $small-border-radius;
                @include customShadow;
            }
        }
    }
}

.userMenu {
    @include flexRowCenter (0.5rem);
    text-transform: capitalize;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
}
</style>