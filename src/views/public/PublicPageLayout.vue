<script>

// Utilities
import { store } from '../../store';

// Components
import AppHeader from '../../components/AppHeader.vue';
import AppFooter from '../../components/AppFooter.vue';
import AppOverlay from '../../components/AppOverlay.vue';

export default {
    name: 'HomeView',
    components: {
        AppHeader,
        AppFooter,
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

    <main>
        <div class="container">
            <slot></slot>
        </div>
    </main>

    <AppFooter />
</template>

<style lang="scss" scoped>
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/transitions.scss' as *;

main {
    min-height: 60vh;
    >.container {
        @include largeContainer;
    }
}

</style>