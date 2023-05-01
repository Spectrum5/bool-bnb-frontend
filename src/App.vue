<script>

// Utilities
import axios from 'axios';
axios.defaults.withCredentials = true;
import { store } from './store';
import { router } from './router';

export default {
    name: 'App',
    data() {
        return {
            store,
            router
        }
    },
    methods: {
        getUser(doRedirect) {
            axios.get('http://localhost:8000/api/user')
                .then((response) => {
                    console.log('User', response.data)
                    this.store.user = response.data;

                    console.log('DO REDIRECT', doRedirect);

                    if (doRedirect != null && doRedirect == true) router.push('/dashboard/apartments');
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
        this.getUser(false);
    }
}
</script>

<template>
    <router-view @[calcEvent]="doRedirect => getUser(doRedirect)"></router-view>
</template>

<style lang="scss">
@import './styles/main';
</style>