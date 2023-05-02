<script>

// Components
import AppLogo from './AppLogo.vue';
import AppButton from './AppButton.vue';

// Utilities
import { router } from '../router';

export default {
    name: 'AppSidebar',
    components: {
        AppLogo,
        AppButton
    },
    data() {
        return {
            router,
            pages: [
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
                },
                {
                    label: 'statistiche',
                    icon: 'chart-simple',
                    link: '/dashboard/statistics'
                }
            ]
        }
    }
}
</script>

<template>
    <aside>
        <div class="sidebar">
            <header>
                <AppLogo />
            </header>

            <ul>
                <li v-for="item in pages">
                    <AppButton :to="item.link" :label="item.label" :icon="item.icon" :type="'solid'" :palette="'primary'"
                        v-if="this.$route.path.includes(item.link)" />
                    <AppButton :to="item.link" :label="item.label" :icon="item.icon" :type="'line'" :palette="'primary'"
                        v-else />
                </li>
            </ul>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;

aside {
    width: 260px;
    height: 100vh;
    flex-shrink: 0;
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
        }
    }
}

li:deep a {
    width: 100%;
    padding: 24px 16px !important;
}
</style>