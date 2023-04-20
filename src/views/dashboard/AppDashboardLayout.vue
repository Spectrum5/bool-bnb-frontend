<script>

// Components
import AppLogo from '../../components/AppLogo.vue';

// Utilities
import { store } from '../../store';
import { router } from '../../router';
import axios from 'axios';

export default {
    name: 'AppDashboardLayout',
    components: {
        AppLogo
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
                    label: 'sponsors',
                    icon: 'layer-group',
                    link: '/dashboard/sponsors'
                }
            ]
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

    <div class="content">

        <header>
            <button @click="handleLogout()">logout</button>
        </header>

        <main>
            <slot></slot>
        </main>

    </div>

</div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;
.wrapper {
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

aside {
    width: 260px;
    border: 1px solid red;
    height: 100vh;

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
    }

    ul {
        // background-color: red;
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

.content {
    flex-grow: 1;
    flex-shrink: 0;
    border: 2px solid blue;
    height: 100vh;

    header {
        height: 80px;
        background-color: gray;
    }
}


</style>