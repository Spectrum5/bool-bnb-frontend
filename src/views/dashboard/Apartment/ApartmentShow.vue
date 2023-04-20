<script>

// Components
import AppDashboardLayout from '../AppDashboardLayout.vue';

// Utilities
import axios from 'axios';
import { router } from '../../../router';

export default {
    name: 'ApartmentShow',
    data() {
        return {
            router,
            apartment: null
            // form: {},
            // allServices: [],
            // selectedServices: []
        }
    },
    methods: {
        getApartment() {
            axios.get(`http://localhost:8000/api/apartments/${this.$route.params.slug}`)
                .then((response) => {
                    console.log('Dati Appartamento', response.data.apartment);
                    this.apartment = response.data.apartment;

                })
                .catch((response) => {
                    console.log('Errore Ottenimento Appartamento', response.data);
                })
        },
    
    },
    created() {
        this.getApartment();
    }
}
</script>

<template>
    <div v-if="apartment">
        <div>
            <h4>Titolo:</h4>
            <p>{{ apartment.title }}</p>
        </div>
        <div>
            <h4>Descrizione:</h4>
            <p>{{ apartment.description }}</p>
        </div>
        <div>
            <h4>Prezzo:</h4>
            <p>{{ apartment.price }}</p>
        </div>
        <div>
            <h4>Indirizzo:</h4>
            <p>{{ apartment.address }}</p>
        </div>
        <div v-if="apartment.services.length > 0">
            <h4>Servizi:</h4>
            <div v-for="service in apartment.services">
                <p>{{ apartment.services.name }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/form.scss' as *;
@use '../../../styles/partials/variables.scss' as *;

.row {
    div {
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid;

        input {
            line-height: 20px;
            margin-left: 7px;
        }
    }
}
</style>