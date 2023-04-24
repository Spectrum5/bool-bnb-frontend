<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppButton from '../../../components/AppButton.vue';
import AppModaleDelete from '../../../components/AppModaleDelete.vue';

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import { store } from '../../../store';

export default {
    name: 'ApartmentIndex',
    components: {
        AppDashboardLayoutVue,
        AppButton,
        AppModaleDelete
    },
    data() {
        return {
            router,
            store,
            apartments: null,
            // functionDelete: false,
            selectedApartmentId: null
        }
    },
    methods: {
        testFunction() {
            // FUNZIONE PROVA
            console.log('TEST FUNCTION');
        },

        getApartments() {
            console.log('USER ID', store.user.id);
            axios.get('http://localhost:8000/api/apartments',
                {
                    params: {
                        user_id: this.store.user.id,
                    }
                })
                .then((response) => {
                    console.log('Index Appartamenti', response.data);
                    this.apartments = response.data.apartments;
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti', response.data);
                })
        },

        showDeleteModal(id) {
            store.showModal = true;
            // this.functionDelete = true;
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
        },

    },
    mounted() {
        this.store.editedApartment = false;
        document.title = 'Dashboard | My Apartments';
        this.getApartments();
    },
    created(){}
}
</script>

<template>
    <AppDashboardLayoutVue 
        :title="'i miei appartamenti'" 
        :button="
        {
            label: 'Aggiungi',
            icon: 'plus',
            link: '/dashboard/apartments/create'
        }">

            <main>
                <div class="row-my-partm my-container" v-for="apartment in apartments " :key="apartment.id" v-if="apartments != null">
                    <AppModaleDelete
                    :action="deleteApartment"
                    :id="selectedApartmentId">
                    </AppModaleDelete>
                    <div>
                        <p> {{ apartment.title }}</p>
                    </div>
                    <div>
                        <button class="btn btn-show" @click.self="$router.push(`/dashboard/apartments/${apartment.slug}`)">
                            <font-awesome-icon icon="fa-solid fa-eye" />
                            Vedi dettagli
                        </button>
                        <button class="btn btn-edit" @click="$router.push(`/dashboard/apartments/${apartment.slug}/edit`)">
                            <font-awesome-icon icon="fa-solid fa-pencil" />
                            Modifica
                        </button>
                        <!-- <AppButton :label="'elimina'" :icon="'trash-can'" :type="'solid'" :palette="'danger'" :action="testFunction"/> -->
                        <!-- @click="deleteApartment(apartment.id)" -->
                        <button id="myBtn" class="btn btn-delete" @click="showDeleteModal(apartment.id)">
                            <font-awesome-icon icon="fa-solid fa-trash-can" />
                            Elimina
                        </button>
                        <button class="btn btn-stats">
                            <font-awesome-icon icon="fa-solid fa-chart-simple" />
                            Vedi Statistiche
                        </button>
                        <button class="btn btn-sponsor hover-effect">
                            <font-awesome-icon icon="fa-solid fa-rocket" />
                            Sponsorizza
                        </button>
                    </div>
                </div>
            </main>

    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;


main {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;
}
.my-container {
    @include flexSpaceBtwn ($gap: 0);
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.445);

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