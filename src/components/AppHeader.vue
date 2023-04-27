<script>

// Components
import AppLogo from './AppLogo.vue';
import AppButton from './AppButton.vue';

// Utilities
import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppHeader',
    components: {
        AppLogo,
        AppButton
    },
    data() {
        return {
            store,
            router
        }
    }
}
</script>

<template>
    <header>
        <div class="container">
            <div class="group">
                <AppLogo />
            </div>

            <div class="group" v-if="store.user == null">
                <AppButton :to="'/login'" :label="'login'" :type="'line'" :palette="'primary'"/>
                <AppButton :to="'/register'" :label="'registrati'" :type="'solid'" :palette="'primary'"/>
            </div>

            <div class="group" v-else>
                <AppButton :to="'/dashboard/apartments'" :label="'dashboard'" :type="'line'" :palette="'primary'"/>

                <div class="user">
                    <p>{{ store.user.first_name }}</p>
                    <p>{{ store.user.last_name }}</p>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;

header {
    padding: 1rem 0;
    box-shadow: 0px 4px 16px 1px #00000060;
    margin-bottom: 3rem;

    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #ffffff;
}

.container {
    @include flexSpaceBtwn;
    @include largeContainer;
}

.group:not(:first-child) {
    @include flexRowCenter (1rem);
}

</style>