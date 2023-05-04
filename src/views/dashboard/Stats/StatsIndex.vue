<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppLoading from '../../../components/AppLoading.vue';
// import AppButton from '../../../components/AppButton.vue';

// Utilities
import axios from 'axios';
// import { router } from '../../../router';
// import { store } from '../../../store';

export default {
    name: 'StatsIndex',
    components: {
        AppDashboardLayoutVue,
        AppLoading
        // AppButton
    },
    data() {
        return {
            // router,
            // store,
            // messages: null
            apartments: [],
            loading: false
        }
    },
    methods: {
        getApartments() {
            this.loading = true;
            this.notFound = false;
            axios.get('http://localhost:8000/api/apartments/indexUser')
                .then((response) => {
                    console.log('Index Appartamenti Personali', response.data);
                    if (response.data.apartments.length == 0) this.notFound = true;
                    this.loading = false;
                    this.apartments = response.data.apartments;
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti Personali', response.data);
                    this.loading = false;
                    this.notFound = true;
                })
        },
        calcStats() {

            // this.apartments.forEach(apartment => {

            //     // apartment.forEach(month => {

            //     // });



            //     // for (let i=1; i<=12; i++) {
            //     //     if (apartment[i].month != null) {
            //     //         const apartment = {
            //     //             apartment[i].month: 
            //     //         }
            //     //     }
            //     // }

            // });
        }
    },
    mounted() {
        document.title = 'Dashboard | Statistiche'
        this.getApartments();
    }
}
</script>

<template>
    <AppDashboardLayoutVue :title="'le mie statistiche'">

        <AppLoading v-if="loading == true" />

        <div class="container itemsContainer" v-if="apartments != null">
            <div class="item" v-for="apartment in apartments" :key="apartment.id"
                @click="$router.push(`/dashboard/apartments/${apartment.slug}`)">
                <span class="itemTitle">{{ apartment.title }}</span>
                <div>
                    {{ apartment.views_count }}
                    <font-awesome-icon icon="fa-solid fa-eye" class="icon" />
                </div>
            </div>
        </div>

        <div class="container" v-else-if="notFound">
            <div class="warningMessage">
                <p class="mainTitle">Non sono presenti appartamenti</p>
            </div>
        </div>

    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/variables.scss' as *;

.itemsContainer {
    .item {
        @include flexSpaceBtwn;
        padding: 1rem;
        cursor: pointer;
        text-transform: capitalize;

        &:not(:last-child) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.445);
        }

        &:first-child {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        &:last-child {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }

        &:hover {
            background-color: $light-color-two;
        }
    }
}
</style>