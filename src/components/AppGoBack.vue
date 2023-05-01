<script>

// import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppGoBack',
    data() {
        return {
            // store,
            router
        }
    },
    props: {
        label: String
    },
    mounted() {
    }
}
</script>

<template>
    <router-link to="/" class="customLink">
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
        <span class="label">{{ label }}</span>
    </router-link>
</template>

<style lang="scss" scoped>
// @use '../styles/partials/variables.scss' as *;
// @use '../styles/partials/mixins.scss' as *;

</style>