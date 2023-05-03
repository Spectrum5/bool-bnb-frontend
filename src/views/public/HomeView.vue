<script>

// Utilities
import axios from 'axios';
import { store } from '../../store';

// Components
import PublicPageLayout from './PublicPageLayout.vue';
import AppSearch from '../../components/AppSearch.vue';
import AppCard from '../../components/AppCard.vue';
// import AppButton from '../../components/AppButton.vue';
import AppLoading from '../../components/AppLoading.vue';

export default {
    name: 'HomeView',
    components: {
        PublicPageLayout,
        AppSearch,
        AppCard,
        // AppButton,
        AppLoading
    },
    data() {
        return {
            store,
            apartments: [],
            sponsoredApartments: [],
            currentPage: 1,
            lastPage: null,
            callOk: true,
            loading: false,             //True quando viene inviata la richiesta e false appena torna la risposta
            notFound: false,            //True se la ricerca non restituisce risultati
            searchCompleted: false      //True quando le pagine finiscono
        }
    },
    methods: {
        getApartments() {
            this.loading = true;
            this.notFound = false;
            axios.get('http://localhost:8000/api/apartments', {
                params: {
                    page: this.currentPage
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        this.loading = false;

                        console.log('Index Appartamenti', response.data);

                        if (response.data.apartments.data.length == 0) this.notFound = true;
                        if (response.data.apartments.current_page == 1) {
                            this.apartments = response.data.apartments.data;
                        }
                        else if (response.data.apartments.current_page <= response.data.apartments.last_page) {
                            this.apartments = this.apartments.concat(response.data.apartments.data);
                        }
                        this.lastPage = response.data.apartments.last_page;
                        if (this.currentPage == this.lastPage) this.searchCompleted = true;
                    }
                })
                .catch((response) => {
                    this.loading = false;
                    this.notFound = true;
                    console.log('Errore Index Appartamenti', response.data);
                })
        },
        getSponsoredApartments() {
            axios.get('http://localhost:8000/api/apartments/indexSponsored')
                .then((response) => {
                    // if (response.data.success) {
                    console.log('Index Appartamenti Sponsorizzati', response.data);

                    // if (response.data.apartments.data.length == 0) this.notFound = true;
                    // if (response.data.apartments.current_page == 1) {
                    this.sponsoredApartments = response.data.apartments.data;
                    // }
                    // else if (response.data.apartments.current_page <= response.data.apartments.last_page) {
                    //     this.apartments = this.apartments.concat(response.data.apartments.data);
                    // }
                    // this.lastPage = response.data.apartments.last_page;
                    // }
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti Sponsorizzati', response.data);
                    // this.notFound = true;
                })
        },
        loadMore() {
            if (this.currentPage < this.lastPage) {
                this.currentPage++;
                console.log('LOAD MORE');
                this.getApartments();
            }
        },
        applyInfiniteScroll() {
            const self = this;
            window.onscroll = function () {
                if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 1) {

                    if (self.callOk) {
                        self.loadMore();
                        self.callOk = false;
                        setTimeout(() => {
                            self.callOk = true;
                        }, 1500)
                    }
                }
            };
        }
    },
    mounted() {
        document.title = 'Boolbnb | Home'
        this.getSponsoredApartments();
        this.getApartments();
        this.$nextTick(this.store.clear());

        setTimeout(() => {
            this.applyInfiniteScroll();
        }, 4500)
    }
}
</script>

<template>
    <PublicPageLayout>
        <template v-slot:hero-section>
            <div class="hero-section">
                <AppSearch :allFields="false" />
            </div>
        </template>

        <div class="container cards" id="cardsContainer" v-if="sponsoredApartments.length > 0">
            <h2 class="mainTitle">appartamenti in evidenza</h2>
            <AppCard v-for="apartment in sponsoredApartments" :apartment="apartment" />
        </div>

        <div class="container cards" id="cardsContainer" v-if="apartments.length > 0">
            <h2 class="mainTitle">esplora</h2>
            <AppCard v-for="apartment in apartments" :apartment="apartment" />
        </div>

        <div class="container" v-else-if="notFound">
            <div class="warningMessage">
                <p class="mainTitle">Nessun appartamento trovato</p>
            </div>
        </div>

        <div class="container" v-if="searchCompleted == true && lastPage != null && currentPage == lastPage">
            <p class="warningMessage">
                Non ci sono altri risultati da mostrare.
                <br>
                Aggiungi dei filtri per una ricerca più dettagliata.
            </p>
        </div>

        <AppLoading v-if="loading == true" />

        <!-- <div class="btn-container">
            <AppButton :action="loadMore" :type="'line'" :palette="'primary'" :label="'load more'" />
        </div> -->
    </PublicPageLayout>
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/grid.scss';

.container {
    padding: 0 1rem;
}

.container.cards {
    @include flexRowCenter;
    @include largeContainer;
    gap: 2.5rem 3rem;
    flex-wrap: wrap;

    min-height: 40vh;

    margin-bottom: 3rem;

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