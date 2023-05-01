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
import AppLoading from '../../components/AppLoading.vue';

export default {
    name: 'HomeSearch',
    components: {
        PublicPageLayout,
        AppSearch,
        AppCard,
        AppButton,
        AppLoading
    },
    data() {
        return {
            router,
            store,
            apartments: [],
            currentPage: 1,
            callOk: true,
            notFound: false
        }
    },
    methods: {
        getApartments() {
            // Chiamata API con Filtri
            this.notFound = false;
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
                    console.log('Index Appartamenti con Filtri', response.data.apartments.data);
                    if (response.data.success) {
                        if (response.data.apartments.data.length == 0) this.notFound = true;
                        if (response.data.apartments.current_page == 1) {
                            this.apartments = response.data.apartments.data;
                        }
                        else if (response.data.apartments.current_page <= response.data.apartments.last_page) {
                            this.apartments = this.apartments.concat(response.data.apartments.data);
                        }
                    }
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti con Filtri');
                    this.notFound = true;
                })
        },
        loadMore() {
            this.currentPage++;
            this.getApartments();
        },
        applyInfiniteScroll() {
            const self = this;
            window.onscroll = function () {
                if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 1) {
                    // sei arrivato alla fine della pagina
                    // console.log('SCROLL',window.innerHeight + window.pageYOffset)

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
        document.title = 'Boolbnb | Search'
        this.getApartments();

        this.$nextTick(this.store.clear());

        setTimeout(() => {
            this.applyInfiniteScroll();
        }, 3500)
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

        <div class="message" v-else-if="notFound">
            <p class="mainTitle">Nessun appartamento trovato</p>
        </div>

        <AppLoading v-else />

        <!-- <div class="btn-container">
            <AppButton :action="loadmore" :type="'line'" :palette="'primary'" :label="'load more'" />
        </div> -->
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

@media screen and (max-width: 1200px) {
    .hero-section {
        // height: 40vh;
        height: unset;
        padding: 1.5rem 0;
    }
}

// @media screen and (max-width: 920px) {
//     .hero-section {
//         height: 50vh;
//     }
// }

// @media screen and (max-width: 750px) {
//     .hero-section {
//         height: 60vh;
//     }
// }
</style>