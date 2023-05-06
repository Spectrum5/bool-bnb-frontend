<script>

// Utilities
import axios from 'axios';
axios.defaults.withCredentials = true;
import { store } from './store';
import { router } from './router';

// Components
import AppLoadingBar from './components/AppLoadingBar.vue';
import AppOverlay from './components/AppOverlay.vue';

export default {
    name: 'App',
    components: {
        AppLoadingBar,
        AppOverlay
    },
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
                    this.store.loadingWidth = 100;
                    if (doRedirect != null && doRedirect == true) router.push('/dashboard/apartments');
                })
                .catch((response) => {
                    console.log('Ottenimento user fallito');
                })
        },
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
    <transition name="fade">
        <AppLoadingBar v-if="store.loadingWidth > 0" />
    </transition>

    <router-view @[calcEvent]="doRedirect => getUser(doRedirect)"></router-view>

    <transition name="fade">
        <AppOverlay v-if="store.overlayOpen" />
    </transition>
</template>

<style lang="scss">
@use './styles/partials/transitions.scss' as *;
@import './styles/main';
</style>