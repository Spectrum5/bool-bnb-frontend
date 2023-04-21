<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import { store } from '../../../store';

export default {
    name: 'ApartmentIndex',
    components: {
        AppDashboardLayoutVue
    },
    data() {
        return {
            router,
            store,
            apartments: null
        }
    },
    methods: {
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
        deleteApartment(id) {
            axios.delete(`http://localhost:8000/api/apartments/${id}`)
                .then((response) => {
                    console.log('Project Deleted');
                    this.getApartments();
                })
        },
        gotoCreate() {
            console.log('GO TO');
            this.$router.push('/dashboard/apartments/create');
        }
    },
    mounted() {
        document.title = 'Dashboard | My Apartments'
        this.getApartments();
    }
}
</script>

<template>
    <AppDashboardLayoutVue 
        :title="'i miei appartamenti'" 
        :button="
        {
            label: 'Aggiungi nuovo appartamento',
            icon: 'plus',
            action: gotoCreate
        }">

            <main>
                <div class="row-my-partm my-container" v-for="apartment in apartments">
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
                        <button class="btn btn-delete" @click="deleteApartment(apartment.id)">
                            <font-awesome-icon icon="fa-solid fa-trash-can" />
                            Elimina
                        </button>
                        <button class="btn btn-stats">
                            <font-awesome-icon icon="fa-solid fa-chart-simple" />
                            Vedi Statistiche
                        </button>
                        <button class="btn btn-sponsor">
                            <font-awesome-icon style="transform: rotate(-120deg);" icon="fa-solid fa-shuttle-space" />
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
</style>