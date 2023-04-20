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
            // form: {},
            // allServices: [],
            // selectedServices: []
        }
    },
    methods: {
        getApartment() {
            axios.get(`http://localhost:8000/api/apartments/${this.$route.params.slug}/edit`)
                .then((response) => {
                    console.log('Dati Appartamento', response.data.apartment);

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
    <!-- <h2>Modifica il tuo appartmento</h2>

    <form @submit.prevent="updateApartment()" class="formContainer">
        <div class="row">
            <div>
                <label for="title">Inserisci nome appartamento:</label>
                <input v-model="form.title" type="text" name="title" id="title">
            </div>
            <div>
                <label for="price">Inserisci prezzo:</label>
                <input v-model="form.price" type="number" name="price" id="price">
            </div>
            <div>
                <label for="address">Inserisci indirizzo:</label>
                <input v-model="form.address" type="text" name="address" id="address">
            </div>
            <div>
                <label for="lat">Latitudine (**da inserire?** o da mettere in automatico?**)</label>
                <input v-model="form.lat" type="text" name="lat" id="lat">
            </div>
            <div>
                <label for="lng">Longitudine (**da inserire?** o da mettere in automatico?**)</label>
                <input v-model="form.lng" type="text" name="lng" id="lng">
            </div>
            <div>
                <label for="rooms_number">Numero di stanze</label>
                <input v-model="form.rooms_number" type="number" name="rooms_number" id="rooms_number">
            </div>
            <div>
                <label for="beds_number">Numero di post letto / letti</label>
                <input v-model="form.beds_number" type="number" name="beds_number" id="beds_number">
            </div>
            <div>
                <label for="bathrooms_number">Numero di bagni</label>
                <input v-model="form.bathrooms_number" type="number" name="bathrooms_number" id="bathrooms_number">
            </div>
            <div>
                <label for="description">Descrizione appartamento:</label>
                <textarea v-model="form.description" name="description" id="description" rows="6"></textarea>
            </div>
            <div>
                <label for="size">MQ</label>
                <input v-model="form.size" type="number" name="size" id="size">
            </div>
            <div>
                <label for="user_id">user id prova</label>
                <input v-model="form.user_id" type="number" name="user_id" id="user_id">
            </div>
            <div v-for="(service, index) in allServices">
                <label :for="service.name">{{ service.name }}</label>
                <input v-model="selectedServices" type="checkbox" :name="service.name" :id="service.name"
                    :value="service.id">
            </div>
        </div>
    </form> -->
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