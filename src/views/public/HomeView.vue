<script>

// Utilities
import axios from 'axios';
import { store } from '../../store';

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppHeader from '../../components/AppHeader.vue';
import AppSearch from '../../components/AppSearch.vue';
import AppCard from '../../components/AppCard.vue';
import AppButton from '../../components/AppButton.vue';
import AppOverlay from '../../components/AppOverlay.vue';

export default {
    name: 'HomeView',
    components: {
        AppLogo,
        AppHeader,
        AppSearch,
        AppCard,
        AppButton,
        AppOverlay
    },
    data() {
        return {
            store,
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
                    if (this.apartments.length == 0) {
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

    <div class="hero-section">
        <AppSearch :allFields="false" />
    </div>

    <div class="container cards" v-if="apartments.length > 0">
        <h2 class="mainTitle">esplora</h2>
        <AppCard v-for="apartment in apartments" :apartment="apartment" />
    </div>

    <div class="centered" v-if="this.notFound">
        <p class="mainTitle">Nessun appartamento trovato</p>
    </div>

    <div class="btn-container">
        <AppButton :action="loadmore" :type="'line'" :palette="'primary'" :label="'load more'" />
    </div>

    <AppOverlay v-if="store.overlayOpen" />
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/variables.scss';
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

.hero-section {
    height: 70vh;
    @include flexRowCenter;
    margin-bottom: 3rem;
    background: url('../../assets/images/hero-section.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
}
</style>