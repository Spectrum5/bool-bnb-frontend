<script>

// Utilities
import axios from 'axios';
import { store } from '../../store';

// Components
import PublicPageLayout from './PublicPageLayout.vue';
import AppSearch from '../../components/AppSearch.vue';
import AppCard from '../../components/AppCard.vue';
import AppLoading from '../../components/AppLoading.vue';

export default {
    name: 'HomeSearch',
    components: {
        PublicPageLayout,
        AppSearch,
        AppCard,
        AppLoading
    },
    data() {
        return {
            store,
            apartments: [],             //Conterra' gli appartamenti scaricati
            currentPage: 1,             //Pagina Attuale Appartamenti Esplora
            callOk: true,               //Per gestire Infinite Scroll
            notFound: false,            //True se la ricerca non restituisce risultati
            lastPage: null,             //Ultima pagina dei risultati della ricerca
            loading: false,             //True quando viene inviata la richiesta e false appena torna la risposta
            notFound: false,            //True se la ricerca non restituisce risultati
            searchCompleted: false      //True quando le pagine finiscono
        }
    },
    methods: {
        getApartments() {
            // Chiamata API con Filtri
            this.loading = true;
            this.notFound = false;
            axios.get('http://localhost:8000/api/apartments/indexFilter', {
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
                    this.loading = false;
                    if (response.data.success) {
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
                    console.log('Index Appartamenti con Filtri', response.data);
                })
                .catch((response) => {
                    this.loading = false;
                    this.notFound = true;
                    this.apartments = [];
                    console.log('Errore Index Appartamenti con Filtri');
                })
        },
        loadMore() {
            if (this.currentPage < this.lastPage) {
                this.currentPage++;
                this.getApartments();
                console.log('Richiesti Altri Appartamenti');
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
        document.title = 'Boolbnb | Search'

        // Ottenimento Dati
        this.getApartments();

        this.$nextTick(this.store.clear());

        this.applyInfiniteScroll();
    }
}
</script>

<template>
    <PublicPageLayout>

        <!-- Hero Search Section -->
        <section class="hero-section">
            <AppSearch :allFields="true" @searchEvent="getApartments" />
        </section>

        <!-- Results Section -->
        <section v-if="apartments.length > 0">
            <h2 class="mainTitle">i tuoi risultati</h2>
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
        <section v-if="searchCompleted == true && lastPage != null && currentPage == lastPage && !notFound">
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

section:not(.hero-section) {
    >.mainTitle {
        text-align: center;
        margin: 2.5rem 0;
    }

    >.cardsContainer {
        @include cardsContainer (5, 280px, 3rem);
        gap: 2.5rem 3rem;
        margin: 0 auto;
        margin-bottom: 2.5rem;
    }
}

.hero-section+* {
    margin-top: 45vh;
}

.hero-section {
    height: 40vh;
    @include flexRowCenter;
    background: url('../../assets/images/hero-section.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    position: absolute;
    top: 70px;
    left: 0;
    right: 0;

    &:deep>* {
        margin-top: 1rem;
    }
}

@media screen and (max-width: 1200px) {
    .hero-section {
        height: unset;
        padding: 1.5rem 0;

        &+* {
            margin-top: 55vh;
        }
    }
}

@media screen and (max-width: 920px) {
    .hero-section {
        &+* {
            margin-top: 65vh;
        }
    }
}

@media screen and (max-width: 750px) {
    .hero-section {
        &+* {
            margin-top: 80vh;
        }
    }
}

@media screen and (max-width: 410px) {
    .hero-section {
        &+* {
            margin-top: 95vh;
        }
    }
}

@media screen and (max-width: 400px) {
    .hero-section {
        &+* {
            margin-top: 105vh;
        }
    }
}
</style>