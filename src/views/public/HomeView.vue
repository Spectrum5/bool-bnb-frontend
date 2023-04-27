<script>

import axios from 'axios';

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppHeader from '../../components/AppHeader.vue';
import AppSearch from '../../components/AppSearch.vue';
import AppCard from '../../components/AppCard.vue';

export default {
    name: 'HomeView',
    components: {
        AppLogo,
        AppHeader,
        AppSearch,
        AppCard
    },
    data() {
        return {
            apartments: [],
            notFound: false
        }
    },
    methods: {
        getApartments() {
            axios.get('http://localhost:8000/api/apartments', {
                params: {
                    page: this.currentPage
                }
            })
                .then((response) => {
                    console.log('Index Appartamenti', response.data.apartments.data);
                    this.apartments = this.apartments.concat(response.data.apartments.data);
                    if(this.apartments.length == 0) {
                        this.notFound = true;
                    }
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti', response.data);
                })
        },
        loadMore() {
            this.currentPage++;
            this.getApartments();
        }
    },
    mounted() {
        this.getApartments();
    }
}
</script>

<template>
    <AppHeader />
    <AppSearch />

    <div class="container" v-if="apartments.length > 0">
        <AppCard v-for="apartment in apartments" :apartment="apartment"/>
    </div>

    <div class="centered" v-if="this.notFound"><p class="mainTitle">Nessun appartamento trovato</p></div>

    <div class="btn-container">
        <button @click="loadMore()">LOAD MORE</button>
    </div>
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/variables.scss';

.container {
    @include flexRowCenter;
    @include largeContainer;
    gap: 2.5rem 1.5rem;
    flex-wrap: wrap;
}
</style>