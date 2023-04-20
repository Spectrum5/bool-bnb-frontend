<script>

// Utilities
import { store } from './store';
import { router } from './router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'App',
    components: {
    },
    data() {
        return {
            store
        }
    },
    methods: {
        getUser() {
            axios.get('http://localhost:8000/api/user')
                .then((response) => {
                    console.log('User', response.data)
                    this.store.user = response.data;
                    router.push('/dashboard/apartments');
                })
                .catch((response) => {
                    console.log('Ottenimento user fallito');
                })
        }
    },
    computed: {
        calcEvent() {
            if (this.$route.name == 'login' || this.$route.name == 'register') return 'getUserEvent';
            else return null;
        }
    },
    mounted() {
        // Richiediamo lo User alla creazione della pagina per ripristinare la sessione precedente, se ancora valida
        this.getUser();
    }
}
</script>

<template>
    <router-view @[calcEvent]="getUser()"></router-view>
</template>

<style lang="scss">
@import './styles/main';
</style>