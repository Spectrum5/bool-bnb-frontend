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
            apartments: [],
            currentPage: 1,
            callOk: true,
            notFound: false
        }
    },
    methods: {
        getApartments() {
            this.notFound = false;
            axios.get('http://localhost:8000/api/apartments', {
                params: {
                    page: this.currentPage
                }
            })
                .then((response) => {
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
                    console.log('Errore Index Appartamenti', response.data);
                    this.notFound = true;
                })
        },
        loadMore() {
            this.currentPage++;
            console.log('LOAD MORE');
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
        document.title = 'Boolbnb | Home'
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
                <AppSearch :allFields="false" />
            </div>
        </template>

        <div class="container cards" id="cardsContainer" v-if="apartments.length > 0">
            <h2 class="mainTitle">esplora</h2>
            <AppCard v-for="apartment in apartments" :apartment="apartment" />
        </div>

        <div class="message" v-else-if="notFound">
            <p class="mainTitle">Nessun appartamento trovato</p>
        </div>

        <AppLoading v-else/>

        <!-- <div class="btn-container">
            <AppButton :action="loadMore" :type="'line'" :palette="'primary'" :label="'load more'" />
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
    height: 70vh;
    @include flexRowCenter;
    margin-bottom: 3rem;
    background: url('../../assets/images/hero-section.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
}
</style>