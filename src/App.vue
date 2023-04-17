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
    <div class="container text-center">
        <h1>Test</h1>
        <button class="btn btn-primary">test</button>
        <div>{{ store.test }}</div>
    </div>
</template>

<style lang="scss">
@import './styles/main';

</style>