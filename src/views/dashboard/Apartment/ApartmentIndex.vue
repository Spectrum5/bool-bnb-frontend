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

        <main>
        <AppLoading v-if="loading == true" />
            <div class="row-my-partm my-container" v-for="apartment in apartments " :key="apartment.id"
                v-if="apartments != null" @click="$router.push(`/dashboard/apartments/${apartment.slug}`)">
                <AppModaleDelete :action="deleteApartment" :id="selectedApartmentId">
                </AppModaleDelete>
                <div>
                    <p> {{ apartment.title }}</p>
                </div>
                <div>
                    <!-- <button class="btn btn-show" @click.self="$router.push(`/dashboard/apartments/${apartment.slug}`)">
                        <font-awesome-icon icon="fa-solid fa-eye" />
                        Vedi dettagli
                    </button>
                    <button class="btn btn-edit" @click="$router.push(`/dashboard/apartments/${apartment.slug}/edit`)">
                        <font-awesome-icon icon="fa-solid fa-pencil" />
                        Modifica
                    </button> -->
                    <!-- <AppButton :label="'elimina'" :icon="'trash-can'" :type="'solid'" :palette="'danger'" :action="testFunction"/> -->
                    <!-- @click="deleteApartment(apartment.id)" -->
                    <!-- <button id="myBtn" class="btn btn-delete" @click="showDeleteModal(apartment.id)">
                        <font-awesome-icon icon="fa-solid fa-trash-can" />
                        Elimina
                    </button> -->
                    <!-- <button class="btn btn-stats">
                        <font-awesome-icon icon="fa-solid fa-chart-simple" />
                        Vedi Statistiche
                    </button> -->
                    
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </div>
            </div>
            <div class="no-apartment" v-else-if="notFound">
                <h2>Non sono presenti appartamenti</h2>
            </div>
        </main>
    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/variables.scss' as *;
@use '../../../styles/partials/mixins.scss' as *;


main {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;
}

.no-apartment{
    text-align: center;
    margin-top: 35px;
}

.my-container {
    @include flexSpaceBtwn ($gap: 0);
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.445);
    cursor: pointer;

    .lato-sx {
        height: 100vh;
        width: 15vw;
        border: 1px solid;
    }

    .lato-dx {
        height: 100vh;
        width: 85vw;
        border: 1px solid;
        padding: 15px 30px;

        >div {
            @include flexSpaceBtwn ($gap: 0);
            margin-bottom: 40px;
        }
    }

    &:hover {
        background-color: $light-color-one;
    }
}

.btn {
    padding: 7px 10px;
    border-radius: 10px;
    margin-right: 5px;
    cursor: pointer;
}

.btn-show {
    background-color: #f5f5f5;
    border: 2px solid #141414;
}

.btn-create {
    background-color: #59DCC0;
    border: 2px solid #59DCC0;
    color: white;
    font-weight: 600;
}

.btn-edit {
    background-color: #f5d679;
    border: 2px solid #f5d679;
}

.btn-delete {
    background-color: #f56372;
    border: 2px solid #f56372;
}

.btn-stats,
.btn-sponsor {
    background-color: #59DCC0;
    border: 2px solid #59DCC0;
}

.hover-effect {
    background-size: 200% 100%;
    transition: background-position 0.5s ease;
}

.hover-effect:hover {
    background: linear-gradient(45deg, #4294F2, #59DCC0);
    background-size: 200% 100%;
    transition: background-position 0.5s ease;
    background-position: -100% 0;
}
</style>