<script>

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppButton from '../../components/AppButton.vue';

// Utilities
import { store } from '../../store';
import { router } from '../../router';
import axios from 'axios';

export default {
    name: 'AppDashboardLayout',
    components: {
        AppLogo,
        AppButton
    },
    data() {
        return {
            store,
            router,
            asideLinks: [
                {
                    label: 'apartments',
                    icon: 'house-chimney',
                    link: '/dashboard/apartments'
                },
                {
                    label: 'messages',
                    icon: 'envelope',
                    link: '/dashboard/messages'
                },
                {
                    label: 'sponsors',
                    icon: 'layer-group',
                    link: '/dashboard/sponsors'
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
            console.log('Logged Out');
            router.push('/');
        },
    },
    mounted() {
    }
}
</script>

<template>
    <div class="wrapper">

        <aside>
            <div class="sidebar">
                <header>
                    <AppLogo />
                </header>

                <ul>
                    <li v-for="item in asideLinks">
                        <router-link :to="item.link">
                            <font-awesome-icon class="icon" :icon="`fa-solid fa-${item.icon}`" />
                            <span class="label">{{ item.label }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </aside>

        <div class="rightSide">

            <header>
                <!-- Searchbar -->
                <!-- Menu Utente -->
                <button @click="handleLogout()">logout</button>
            </header>

            <div class="content">
                <header>
                    <h2 class="mainTitle">{{ this.title }}</h2>

                    <!-- <div class="create" @click="this.button.action" v-if="this.button">
                        <button class="btn btn-create">
                            <font-awesome-icon :icon="`fa-solid fa-${this.button.icon}`" />
                            {{ this.button.label }}
                        </button>
                    </div> -->
                    <AppButton v-if="button" :to="button.link ?? null" :action="button.action ?? null" :label="button.label" :icon="button.icon ?? null" :type="'solid'" :palette="'primary'"/>
                </header>

                <slot></slot>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;

.wrapper {
    height: 100vh;
    @include flexRowCenter;
    overflow: hidden;
}

aside {
    width: 260px;
    height: 100vh;
    border-right: 2px solid $dark-color-one;

    header {
        @include flexRowCenter;
        height: 80px;
    }

    ul {
        padding: 1rem;
        list-style: none;

        li {
            margin-bottom: 0.5rem;

            a {
                @include flexRowCenter (0.75rem);
                justify-content: flex-start;

                width: 100%;
                padding: 0.75rem 1rem;
                text-transform: capitalize;
                text-decoration: none;
                background-color: gray;

                border-radius: $small-border-radius;

                .icon {
                    font-size: 1.25rem;
                }
            }
        }
    }
}

.rightSide {
    height: 100vh;
    flex-grow: 1;
    flex-shrink: 0;

    >header {
        height: 80px;
        border-bottom: 2px solid $dark-color-one;
    }

    .content {
        height: calc(100% - 80px);

        display: flex;
        flex-direction: column;
        // justify-content: center;
        // align-items: center;

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

.btn {
    padding: 7px 10px;
    border-radius: 10px;
    margin-right: 5px;
    cursor: pointer;
}

.btn-show {
    background-color: #f5f5f5;
    border: 2px solid #141414;
}

.btn-create {
    background-color: #59DCC0;
    border: 2px solid #59DCC0;
    color: white;
    font-weight: 600;
}

.btn-edit {
    background-color: #f5d679;
    border: 2px solid #f5d679;
}

.btn-delete {
    background-color: #f56372;
    border: 2px solid #f56372;
}
</style>