<script>

// Utilities
import axios from 'axios';
import { store } from '../../store';

// Components
import PublicPageLayout from './PublicPageLayout.vue';
import AppSearch from '../../components/AppSearch.vue';
import AppCard from '../../components/AppCard.vue';
import AppButton from '../../components/AppButton.vue';
import AppLoading from '../../components/AppLoading.vue';

export default {
    name: 'HomeView',
    components: {
        PublicPageLayout,
        AppSearch,
        AppCard,
        AppButton,
        AppLoading
    },
    data() {
        return {
            store,
            apartments: [],                     //Conterra' gli appartamenti scaricati
            sponsoredApartments: [],            //Conterra' gli appartamenti sponsorizzati scaricati
            currentPage: 1,                     //Pagina Attuale Appartamenti Esplora
            currentPageSponsored: 1,            //Pagina Attuale Appartamenti Sponsorizzati
            callOk: true,                       //Per gestire Infinite Scroll
            loading: false,                     //True quando viene inviata la richiesta e false appena torna la risposta
            notFound: false,                    //True se la ricerca non restituisce risultati
            searchCompleted: false,             //True quando le pagine finiscono
            searchCompletedSponsored: false     //True quando le pagine finiscono
        }
    },
    methods: {
        getApartments() {
            // Ottiene gli appartamenti
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

                        if (response.data.apartments.data.length == 0) this.notFound = true;
                        if (response.data.apartments.current_page == 1) {
                            this.apartments = response.data.apartments.data;
                        }
                        else if (response.data.apartments.current_page <= response.data.apartments.last_page) {
                            this.apartments = this.apartments.concat(response.data.apartments.data);
                        }
                        this.lastPage = response.data.apartments.last_page;
                        if (this.currentPage == this.lastPage) this.searchCompleted = true;

                        console.log('Index Appartamenti', response.data);
                    }
                })
                .catch((response) => {
                    this.loading = false;
                    this.notFound = true;
                    console.log('Errore Index Appartamenti', response.data);
                })
        },
        getSponsoredApartments() {
            // Ottiene gli appartamenti Sponsorizzati
            this.loading = true;
            axios.get('http://localhost:8000/api/apartments/indexSponsored', {
                params: {
                    page: this.currentPageSponsored
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        this.loading = false;

                        if (response.data.apartments.current_page == 1) {
                            this.sponsoredApartments = response.data.apartments.data;
                        }
                        else if (response.data.apartments.current_page <= response.data.apartments.last_page) {
                            this.sponsoredApartments = this.sponsoredApartments.concat(response.data.apartments.data);
                        }
                        this.lastPageSponsored = response.data.apartments.last_page;
                        if (this.currentPageSponsored == this.lastPageSponsored) this.searchCompletedSponsored = true;

                        console.log('Index Appartamenti Sponsorizzati', response.data);
                    }
                })
                .catch((response) => {
                    this.loading = false;
                    console.log('Errore Index Appartamenti Sponsorizzati', response.data);
                })
        },
        loadMore() {
            if (this.currentPage < this.lastPage) {
                this.currentPage++;
                this.getApartments();
                console.log('Richiesti Altri Appartamenti');
            }
        },
        loadMoreSponsored() {
            if (this.currentPageSponsored < this.lastPageSponsored) {
                this.currentPageSponsored++;
                this.getSponsoredApartments();
                console.log('Richiesti Altri Appartamenti Sponsorizzati');
            }
        },
        applyInfiniteScroll() {
            setTimeout(() => {
                const self = this;
                window.onscroll = function () {
                    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 1) {

                        // Permette di richiamare la funzione loadMore al massimo una volta ogni 1500ms
                        if (self.callOk) {
                            self.loadMore();
                            self.callOk = false;
                            setTimeout(() => {
                                self.callOk = true;
                            }, 1500)
                        }
                    }
                };
            }, 4000)
        }
    },
    mounted() {
        document.title = 'Boolbnb | Home'

        // Ottenimento Dati
        this.getSponsoredApartments();
        this.getApartments();

        this.$nextTick(this.store.clear());

        this.applyInfiniteScroll();
    }
}
</script>

<template>
    <PublicPageLayout>
        
        <!-- Hero Section -->
        <section class="hero-section"></section>

        <!-- Search Section -->
        <section class="search-section">
            <AppSearch :allFields="false" />
        </section>

        <!-- Sponsored Section -->
        <section v-if="sponsoredApartments.length > 0">
            <h2 class="mainTitle">appartamenti in evidenza</h2>
            <div class="cardsContainer">
                <AppCard v-for="apartment in sponsoredApartments" :apartment="apartment" />
            </div>
            <AppButton :action="loadMoreSponsored" :type="'line'" :palette="'primary'" :label="'carica altri'"
                v-if="!searchCompletedSponsored" />
        </section>

        <!-- Explore Section -->
        <section v-if="apartments.length > 0">
            <h2 class="mainTitle">esplora</h2>
            <div class="cardsContainer">
                <AppCard v-for="apartment in apartments" :apartment="apartment" />
            </div>
        </section>

        <!-- Not Found Section -->
        <section v-else-if="notFound">
            <div class="warningMessage">
                <p>Nessun appartamento trovato</p>
            </div>
        </section>

        <!-- No More Results Section -->
        <section v-if="searchCompleted == true && lastPage != null && currentPage == lastPage">
            <div class="warningMessage">
                <p>
                    Non ci sono altri risultati da mostrare.
                    <br>
                    Aggiungi dei filtri per una ricerca più dettagliata.
                </p>
            </div>
        </section>

        <AppLoading v-if="loading == true" />
    </PublicPageLayout>
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';

section {
    >.mainTitle {
        text-align: center;
        margin: 2.5rem 0;
    }

    >.cardsContainer {
        @include flexSpaceBtwn;
        flex-wrap: wrap;
        gap: 2.5rem 3rem;
        padding: 0 1rem;
        margin-bottom: 2.5rem;
    }

    &:deep>button {
        display: block !important;
        margin: 0 auto;
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

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.search-section {
    position: sticky;
    top: 100px;
    margin: 25vh auto;
    margin-bottom: 30vh;
    z-index: 14;

    &:deep .container {
        margin: 0 auto;
    }
}
</style>