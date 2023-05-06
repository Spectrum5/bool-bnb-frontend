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
    }
}
</script>

<template>
    <ul>
        <transition-group name="fade-fast">
            <li v-for="error in store.errors" :key="error.field">
                {{ error.message }}
            </li>
        </transition-group>
    </ul>
</template>

<style lang="scss" scoped>
@use '../styles/partials/transitions.scss' as *;
    ul {
        list-style-type: none;
        margin-bottom: 1rem;

        li{
            color: #dc3545;
            font-size: 0.8rem;
        }
    }
</style>