<script>
import { store } from './store';
import Card from './components/Card.vue';

export default {
    name: 'App',
    data() {
        return {
            store
        }
    },
    components: {
        Card,
    }
}
</script>

<template>
    <router-view></router-view>
</template>

<style lang="scss">
@import './styles/main';

</style>