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
            <img src="../assets/logo_full.png" alt="boolbnb" class="logoLarge">
            <img src="../assets/logo.png" alt="boolbnb" class="logoSmall">
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;

.logoContainer {
    height: 30px;
    
    >img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    }

    .logoSmall {
        display: none;
    }
}

@media screen and (max-width: 840px) {
    .logoContainer {
        .logoSmall {
            display: block;
        }
        .logoLarge {
            display: none;
        }
    }

}
</style>