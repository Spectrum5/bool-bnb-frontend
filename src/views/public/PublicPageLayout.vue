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

    <slot></slot>

    <AppFooter />

    <AppOverlay v-if="store.overlayOpen" />
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/variables.scss';
@import '../../styles/partials/grid.scss';
</style>