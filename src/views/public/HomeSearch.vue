<script>

// Utilities
import axios from 'axios';
import { router } from '../../router';
import { store } from '../../store';

export default {
    name: 'HomeSearch',
    data() {
        return {
            router,
            store,
            currentPage: 1,
            apartments: []
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
                    console.log('Index Appartamenti Cercati', response.data);
                    this.apartments = this.apartments.concat(response.data.apartments);
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti Cercati', response.data);
                })
        },
        loadMore() {
            this.currentPage++;
            this.getApartments();
        }
    },
    mounted() {
        this.getApartments();
        // console.log('searchTitle', this.$route.params.title);
    },
    computed: {
    }
}
</script>

<template>

    <div class="container">
        <label for="searchTitle">Titolo</label>
        <input type="text" id="searchTitle" name="searchTitle" placeholder="Inserisci il titolo...">
        <button @click="handleSearch()">Cerca</button>
    </div>

    <div class="container">

        <div class="card" v-for="apartment in apartments" @click="$router.push(`/apartments/${apartment.slug}`)">
            <h2>Titolo: {{ apartment.title }}</H2>
            <p>Descrizione: {{ apartment.description }}</p>
        </div>

    </div>
    <button @click="loadMore()">LOAD MORE</button>
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

.card {
    width: 200px;
    padding: 1rem;
    border: 2px solid lightblue;
}
</style>