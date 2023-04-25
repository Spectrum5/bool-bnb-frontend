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
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;

.logoContainer {
    width: 150px;
    height: 30px;

    >img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    }

   

    
}

</style>