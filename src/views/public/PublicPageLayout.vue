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

export default {
    name: 'HomeView',
    components: {
        AppLogo,
        AppHeader,
        AppSearch,
        AppCard,
        AppButton,
        AppOverlay
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

    <AppOverlay v-if="store.overlayOpen" />
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/variables.scss';
@import '../../styles/partials/grid.scss';
</style>