<script>

// Utilities
import axios from 'axios';
import { router } from '../../router';
import { store } from '../../store';

// Components
import PublicPageLayout from './PublicPageLayout.vue';
import AppSearch from '../../components/AppSearch.vue';
import AppCard from '../../components/AppCard.vue';
import AppButton from '../../components/AppButton.vue';

export default {
    name: 'HomeSearch',
    components: {
        PublicPageLayout,
        AppSearch,
        AppCard,
        AppButton
    },
    data() {
        return {
            router,
            store,
            currentPage: 1,
            apartments: [],
        }
    },
    methods: {
        getApartments() {
            // Chiamata API con Filtri
            axios.get('http://localhost:8000/api/apartments', {
                params: {
                    lat: this.store.searchForm.lat,
                    lng: this.store.searchForm.lng,
                    radius: this.store.searchForm.radius,
                    rooms_number: this.store.searchForm.rooms_number > 0 ? this.store.searchForm.rooms_number : null,
                    beds_number: this.store.searchForm.beds_number > 0 ? this.store.searchForm.beds_number : null,
                    bathrooms_number: this.store.searchForm.bathrooms_number > 0 ? this.store.searchForm.bathrooms_number : null,
                    services: this.store.searchForm.services.length > 0 ? this.store.searchForm.services : [],
                    page: this.currentPage
                }
            })
                .then((response) => {
                    console.log('Risposta Appartamenti con Filtri', response);
                    console.log('Index Appartamenti con Filtri', response.data.apartments.data);
                    if (response.data.success) {
                        if (response.data.apartments.current_page == 1) {
                            this.apartments = response.data.apartments.data;
                        }
                        else {
                            this.apartments = this.apartments.concat(response.data.apartments.data);
                        }
                    }
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti con Filtri');
                })
        },
        loadMore() {
            this.currentPage++;
            this.getApartments();
        }
    },
    mounted() {
        document.title = 'Boolbnb | Search'
        this.getApartments();
    }
}
</script>

<template>
    <PublicPageLayout>
        <template v-slot:hero-section>
            <div class="hero-section">
                <AppSearch :allFields="true" @searchEvent="getApartments" />
            </div>
        </template>

        <div class="container cards" v-if="apartments.length > 0">
            <h2 class="mainTitle">i tuoi risultati</h2>
            <AppCard v-for="apartment in apartments" :apartment="apartment" />
        </div>

        <div class="message" v-else>
            <p class="mainTitle">Nessun appartamento trovato</p>
        </div>

        <div class="btn-container">
            <AppButton :action="loadmore" :type="'line'" :palette="'primary'" :label="'load more'" />
        </div>
    </PublicPageLayout>
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/grid.scss';

.container.cards {
    @include flexRowCenter;
    @include largeContainer;
    gap: 2.5rem 3rem;
    flex-wrap: wrap;

    padding: 0 1rem;

    >h2 {
        flex-basis: 100%;
        text-align: center;
    }
}

.message {
    text-align: center;
}

.hero-section {
    height: 35vh;
    @include flexRowCenter;
    margin-bottom: 3rem;
    background: url('../../assets/images/hero-section.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
</style>