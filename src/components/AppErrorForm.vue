<script>

// store
import { store } from '../store';

export default {
    name: 'AppErrorForm',
    components: {
    },
    data(){
        return {
            store,
        }
    },

    methods: {
        
    },
}
</script>

<template>

    <ul>
        <li v-for="error in store.errors">
            {{ error.message }}
        </li>
    </ul>

</template>

<style lang="scss" scoped>
    ul {
        list-style-type: none;
        margin-bottom: 1rem;

        li{
            color: #dc3545;
            font-size: 0.8rem;
        }
    }
</style>