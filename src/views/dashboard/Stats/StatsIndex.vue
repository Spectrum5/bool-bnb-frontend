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
            viewsData: [],
            loading: false
        }
    },
    methods: {
        getViews() {
            this.loading = true;
            this.notFound = false;
            axios.get('http://localhost:8000/api/views/apartmentViewsMonths')
                .then((response) => {
                    console.log('Statistiche Appartamenti Personali', response.data.viewsData);
                    // if (response.data.viewsData.length == 0) this.notFound = true;
                    // else this.viewsData = response.data.viewsData;
                    this.viewsData = response.data.viewsData;
                    this.loading = false;
                    // this.calcViews();
                })
                .catch((response) => {
                    console.log('Errore Statistiche Appartamenti Personali', response.data);
                    this.loading = false;
                    this.notFound = true;
                })
        },
        // calcViews() {
        //     this.viewsData.forEach(apartment => {

        //         apartment.months.forEach(singleMonth => {
        //             console.log('MESE', singleMonth.month);
        //             console.log('VIEWS', singleMonth.views);
        //             for (let i = 0; i <= 12; i++) {

        //             }
        //         });

        //     });
        // },
        getMonthName(n) {
            const months = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
            return months[n - 1];
        },
        calcBarHeight(month) {
            const monthValue = month != null ? month.views : '0';
            const height = monthValue * 15;
            return `height: ${height}px`;

        }
    },
    mounted() {
        document.title = 'Dashboard | Statistiche'
        this.getViews();
    }
}
</script>

<template>
    <AppDashboardLayoutVue :title="'le mie statistiche'">

        <AppLoading v-if="loading == true" />

        <div class="container itemsContainer" v-if="viewsData.length > 0">

            <div class="item" v-for="apartment in viewsData" :key="apartment.apartment_id">
                <!-- @click="$router.push(`/dashboard/apartments/${apartment.slug}`)"> -->
                <span class="itemTitle">appartamento #{{ apartment.apartment_id }}</span>

                <div class="months">
                    <div class="month" v-for="n in 12">
                        <div class="bar" :style="calcBarHeight(apartment.months[n - 1])"></div>
                        <!-- mese {{ n }} {{ apartment.months[n-1] != null ? apartment.months[n-1].views : '0' }} -->
                        <span class="name">{{ getMonthName(n) }}</span>
                    </div>
                </div>

            </div>
        </div>

        <!-- <div class="container" v-else-if="notFound">
            <div class="warningMessage">
                <p class="mainTitle">Non sono presenti appartamenti</p>
            </div>
        </div> -->

    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/variables.scss' as *;

.itemsContainer {
    display: flex;
    justify-content: flex-start;
    // justify-content: space-evenly;
    align-items: center;
    gap: 2.5rem;
    flex-wrap: wrap;

    .item {
        // border: 1px solid lightblue;
        padding: 10px;
        height: 250px;
        border-radius: $small-border-radius;
        display: flex;
        flex-direction: column;
        @include customShadow;

        .itemTitle {
            text-transform: capitalize;
            font-weight: 600;
        }

        .months {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            gap: 10px;
            flex-grow: 1;

            .month {

                // display: flex;
                // justify-content: center;
                // align-items: flex-end;

                .bar {
                    background-color: green;
                    background: linear-gradient(45deg, $color-three-dark, $color-three-light);
                    border-radius: 4px;
                    // width: 15px;
                    width: 100%;
                    margin: 0 auto;
                }

                .name {
                    text-transform: capitalize;
                }
            }
        }
    }
}

// .itemsContainer {
//     .item {
//         @include flexSpaceBtwn;
//         padding: 1rem;
//         cursor: pointer;
//         text-transform: capitalize;

//         &:not(:last-child) {
//             border-bottom: 1px solid rgba(0, 0, 0, 0.445);
//         }

//         &:first-child {
//             border-top-left-radius: 8px;
//             border-top-right-radius: 8px;
//         }

//         &:last-child {
//             border-bottom-left-radius: 8px;
//             border-bottom-right-radius: 8px;
//         }

//         &:hover {
//             background-color: $light-color-two;
//         }
//     }
// }
</style>