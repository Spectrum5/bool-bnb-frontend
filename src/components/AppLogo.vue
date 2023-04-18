<script>

import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppLogo',
    data() {
        return {
            store,
            router
        }
    },
    mounted() {
    }
}
</script>

<template>
    <router-link to="/">
        <div class="logoContainer">
            <img src="../assets/logo_full.png" alt="boolbnb">
        </div>
    </router-link>
</template>

<style lang="scss">
@import '../styles/main.scss';
@import '../styles/partials/variables.scss';

.logoContainer {
    height: 48px;
    cursor: pointer;

    >img {
        height: 100%;
    }
}

</style>