<script>

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import { store } from '../../../store';

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppButton from '../../../components/AppButton.vue';
import AppModaleDelete from '../../../components/AppModaleDelete.vue';
import AppLoading from '../../../components/AppLoading.vue';

export default {
    name: 'ApartmentIndex',
    components: {
        AppDashboardLayoutVue,
        AppButton,
        AppModaleDelete,
        AppLoading
    },
    data() {
        return {
            router,
            store,
            apartments: null,
            selectedApartmentId: null,
            loading: false,
            notFound: false,
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
        showDeleteModal(id) {
            store.showModal = true;
            this.selectedApartmentId = id;
            console.log('Appartamento selezionato da eliminare: ', this.selectedApartmentId);
        },
        deleteApartment() {
            axios.delete(`http://localhost:8000/api/apartments/${this.selectedApartmentId}`)
                .then((response) => {
                    console.log('Apartment Deleted con id', this.selectedApartmentId);
                    this.getApartments();
                });
            this.store.showModal = false;
        }
    },
    mounted() {
        document.title = 'Dashboard | I miei Appartamenti';
        this.$nextTick(this.store.clear());
        this.getApartments();
    },
    created() { }
}
</script>

<template>
    <AppDashboardLayoutVue :title="'i miei appartamenti'" :button="{
            label: 'Aggiungi',
            icon: 'plus',
            link: '/dashboard/apartments/create'
        }">

        <AppLoading v-if="loading == true" />

        <div class="container itemsContainer" v-if="apartments != null">
            <div class="item" v-for="apartment in apartments" :key="apartment.id"
                @click="$router.push(`/dashboard/apartments/${apartment.slug}`)">
                <span class="itemTitle">{{ apartment.title }}</span>
                <font-awesome-icon icon="fa-solid fa-chevron-right" />
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
@use '../../../styles/partials/variables.scss' as *;
@use '../../../styles/partials/mixins.scss' as *;

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