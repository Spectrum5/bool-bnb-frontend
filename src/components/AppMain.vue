<script>
import AppCard from '../components/AppCard.vue';
// Utilities
import axios from 'axios';
import { router } from '../router';
export default {
    name: 'AppMain',
    data() {
        return {

            router,
            currentPage: 1,
            searchTitle: '',
            apartments: [],
        }
    },
    components: {
        AppCard
    },
    methods: {
        getApartments() {
            console.log('GET APARTMENTS');
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
        },
    },

    mounted() {
        this.getApartments();
    }
}

</script>

<template>
    <main>
        <div class="cardsContainer">
            <AppCard v-for="apartment in apartments" :apartment="apartment" />
        </div>
        <button @click="loadMore()">LOAD MORE</button>
    </main>
</template>

<style scoped lang="scss">
@import '../styles/partials/mixins.scss';
@import '../styles/partials/variables.scss';

main {
    position: relative;
    padding: 30px 0px;
    background-color: white;
    z-index: 0;



    .cardsContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem 1rem;
        flex-wrap: wrap;




    }


}
</style>