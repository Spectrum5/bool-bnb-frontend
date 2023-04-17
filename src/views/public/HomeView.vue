<script>

// Utilities
import axios from 'axios';
// import {router} from '../../router';

export default {
    name: 'HomeView',
    data() {
        return {
            // router,
            currentPage: 1,
            searchTitle: '',
            apartments: []
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
                    console.log('Index Appartamenti', response.data);
                    this.apartments = this.apartments.concat(response.data.apartments.data);
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti', response.data);
                })
        },
        loadMore() {
            this.currentPage++;
            this.getApartments();
        },
        handleSearch() {
            this.$router.push(`/apartments/search/${this.searchTitle}`);
        }
    },
    mounted() {
        this.getApartments();
    }
}
</script>

<template>

    <div class="container">
        <label for="searchTitle">Titolo</label>
        <input type="text" v-model="searchTitle" id="searchTitle" name="searchTitle" placeholder="Inserisci il titolo...">
        <button @click="handleSearch()">Cerca</button>
    </div>

    <div class="container">

        <div class="card" v-for="apartment in apartments" @click="$router.push(`/apartments/${apartment.slug}`)">
            <h2>Titolo: {{ apartment.title }}</h2>
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