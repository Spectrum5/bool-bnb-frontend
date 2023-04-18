<script>
import { store } from './store';

export default {
    name: 'App',
    data() {
        return {
            store
        }
    },
    components: {
    }
}
</script>

<template>
    <router-view></router-view>
</template>

<style lang="scss">
@import './styles/main';

</style>