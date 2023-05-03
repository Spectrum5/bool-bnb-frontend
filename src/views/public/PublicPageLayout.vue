<script>

// Utilities
import axios from 'axios';
import { store } from '../../store';

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppHeader from '../../components/AppHeader.vue';
import AppSearch from '../../components/AppSearch.vue';
import AppCard from '../../components/AppCard.vue';
import AppButton from '../../components/AppButton.vue';
import AppOverlay from '../../components/AppOverlay.vue';
import AppFooter from '../../components/AppFooter.vue';

export default {
    name: 'HomeView',
    components: {
        AppLogo,
        AppHeader,
        AppSearch,
        AppCard,
        AppButton,
        AppOverlay,
        AppFooter
    },
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <AppHeader />

    <slot name="hero-section"></slot>

    <main>
        <slot></slot>
    </main>

    <AppFooter />

    <AppOverlay v-if="store.overlayOpen" />
</template>

<style lang="scss" scoped>
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/grid.scss' as *;

main {
    min-height: 60vh;
}
</style>