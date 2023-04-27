<script>
// Components
import AppLogo from '../../components/AppLogo.vue';
import AppHeader from '../../components/AppHeader.vue';
import AppSearch from '../../components/AppSearch.vue';
import AppCard from '../../components/AppCard.vue';

// Utilities
import axios from 'axios';
import { router } from '../../router';
import { store } from '../../store';

export default {
    name: 'HomeSearch',
    components: {
        AppLogo,
        AppHeader,
        AppSearch,
        AppCard
    },
    data() {
        return {
            router,
            store,
            currentPage: 1,
            apartments: [],
            apartmentsFound: false
        }
    },
    methods: {
        getApartments() {
            axios.get('http://localhost:8000/api/apartments', {
                params: {
                    address: this.store.searchForm.address != '' ? this.store.searchForm.address : null,
                    rooms_number: this.store.searchForm.rooms_number > 0 ? this.store.searchForm.rooms_number : null,
                    beds_number: this.store.searchForm.beds_number > 0 ? this.store.searchForm.beds_number : null,
                    bathrooms_number: this.store.searchForm.bathrooms_number > 0 ? this.store.searchForm.bathrooms_number : null,
                    services: this.store.searchForm.services.length > 0 ? this.store.searchForm.services : [],
                    page: this.currentPage
                }
            })
                .then((response) => {
                    console.log('Index Appartamenti con Filtri', response.data.apartments);
                    this.apartments = this.apartments.concat(response.data.apartments);
                    this.apartmentsFound = response.success;
                    console.log(response.success);
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti con Filtri');
                })
        },
        loadMore() {
            this.currentPage++;
            // this.getApartments();
        }
    },
    mounted() {
        document.title = 'Boolbnb | Search'
        console.log('store', this.store.searchForm);
        this.getApartments();
        // console.log('searchTitle', this.$route.params.title);
    },
    computed: {
    }
}
</script>

<template>
    <AppHeader />
    <AppSearch />

    <div class="container" v-if="apartments.length > 0">
        <AppCard v-for="apartment in apartments" :apartment="apartment" />
    </div>
    <div class="centered" v-else><p class="mainTitle">Nessun appartamento trovato</p></div>


    <div class="btn-container">
        <button @click="loadMore()">LOAD MORE</button>
    </div>
</template>

<style lang="scss" scoped>
h2 {
    font-size: 1rem;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;

    font-size: 0.8rem;
}

// .card {
//     width: 200px;
//     padding: 1rem;
//     border: 2px solid lightblue;
// }

.centered {
    text-align: center;
}
</style>