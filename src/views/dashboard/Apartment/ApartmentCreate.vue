<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';

// Utilities
import axios from 'axios';
import { router } from '../../../router';

export default {
    name: 'ApartmentCreate',
    components: {
        AppDashboardLayoutVue
    },
    data() {
        return {
            router,
            form: {
                title: '',
                lat: null,
                lng: null,
                address: '',
                image: '3.jpg',
                visibility: null,
                price: null,
                rooms_number: null,
                bathrooms_number: null,
                beds_number: null,
                description: '',
                size: null,
                user_id: 1,
                services: []
            },
            services: [],
        }
    },
    methods: {
        getFormData() {
            axios.get('http://localhost:8000/api/apartments/create')
                .then(response => {
                    console.log(response.data.services);
                    this.services = response.data.services;
                })
        },

        createApartment() {
            axios.post('http://localhost:8000/api/apartments', {
                title: this.form.title,
                lat: this.form.lat,
                lng: this.form.lng,
                address: this.form.address,
                image: this.form.image,
                visibility: this.form.visibility,
                price: this.form.price,
                rooms_number: this.form.rooms_number,
                bathrooms_number: this.form.bathrooms_number,
                beds_number: this.form.beds_number,
                description: this.form.description,
                size: this.form.size,
                user_id: this.form.user_id,
                visibility: 1
            })
                .then((response) => {
                    console.log('Appartamento nuovo', response);
                })
                .catch((response) => {
                    console.log('Errore creazione', response.data);
                })
        },

    },
    created() {
        this.getFormData();
    }
}
</script>

<template>
    <AppDashboardLayoutVue>
        <h2>Aggiungi il tuo appartmento</h2>

        <!-- FORM PER CREATE -->

        <form @submit.prevent="createApartment()" class="formContainer">
            <div class="row">
                <div>
                    <label for="title">Inserisci nome appartamento:</label>
                    <input v-model="form.title" type="text" name="title" id="title" required>
                </div>
                <div>
                    <label for="price">Inserisci prezzo:</label>
                    <input v-model="form.price" type="number" name="price" id="price" required>
                </div>
                <div>
                    <label for="address">Inserisci indirizzo:</label>
                    <input v-model="form.address" type="text" name="address" id="address" required>
                </div>
                <div>
                    <label for="lat">Latitudine (**da inserire?** o da mettere in automatico?**)</label>
                    <input v-model="form.lat" type="text" name="lat" id="lat" required>
                </div>
                <div>
                    <label for="lng">Longitudine (**da inserire?** o da mettere in automatico?**)</label>
                    <input v-model="form.lng" type="text" name="lng" id="lng" required>
                </div>
                <div>
                    <label for="rooms_number">Numero di stanze</label>
                    <input v-model="form.rooms_number" type="number" name="rooms_number" id="rooms_number" required>
                </div>
                <div>
                    <label for="beds_number">Numero di post letto / letti</label>
                    <input v-model="form.beds_number" type="number" name="beds_number" id="beds_number" required>
                </div>
                <div>
                    <label for="bathrooms_number">Numero di bagni</label>
                    <input v-model="form.bathrooms_number" type="number" name="bathrooms_number" id="bathrooms_number"
                        required>
                </div>
                <div>
                    <label for="description">Descrizione appartamento:</label>
                    <textarea v-model="form.description" name="description" id="description" rows="6" required></textarea>
                </div>
                <div>
                    <label for="size">MQ</label>
                    <input v-model="form.size" type="number" name="size" id="size" required>
                </div>
                <div>
                    <label for="user_id">user id prova</label>
                    <input v-model="form.user_id" type="number" name="user_id" id="user_id" required>
                </div>
                <div class="services">

                    <span class="service" v-for="service in services">
                        <input v-model="form.services" type="checkbox" :name="service.name" :id="service.name"
                        :value="service.id">
                        <label :for="service.name">{{ service.name }}</label>
                    </span>
                </div>
            </div>
            <button type="submit">Crea appartamento</button>
        </form>
    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/form.scss' as *;
@use '../../../styles/partials/variables.scss' as *;

.services {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    .service {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
}

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