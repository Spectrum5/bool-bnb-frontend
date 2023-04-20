<script>

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import AppErrorForm from '../../../components/AppErrorForm.vue';

export default {
    name: 'ApartmentEdit',
    components: { 
        AppErrorForm
    },
    data() {
        return {
            router,
            form: {},
            allServices: [],
            selectedServices: []
        }
    },
    methods: {
        // Recupero dati dell'appartamento per la modifica
        getApartment() {
            axios.get(`http://localhost:8000/api/apartments/${this.$route.params.slug}/edit`)
                .then((response) => {
                    console.log('Dati Appartamento', response.data.apartment);
                    this.form = response.data.apartment;
                    this.allServices = response.data.services;
                    this.setCheckboxes();
                    this.setVisibility();
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti', response.data);
                })
        },
        updateApartment() {
            axios.put(`http://localhost:8000/api/apartments/${this.form.id}`, {
                title: this.form.title,
                lat: 37.9312320,
                lng: -103.6998280,
                address: this.form.address,
                image: 'img.1',
                visibility: !this.form.visibility,
                price: this.form.price,
                rooms_number: this.form.rooms_number,
                bathrooms_number: this.form.bathrooms_number,
                beds_number: this.form.beds_number,
                description: this.form.description,
                size: this.form.size,
                user_id: this.form.user_id
            })
                .then((response) => {
                    console.log('Appartamento aggiornato', response);
                })
                .catch((response) => {
                    console.log('Errore aggiornamento', response.data);
                })
        },
        setCheckboxes() {
            this.allServices.forEach(service => {
                if (this.form.services.some(e => e.id == service.id)) {
                    this.selectedServices.push(service.id);
                }
            });
        },
        setVisibility(){
            if (this.form.visibility == 0) {
                return this.form.visibility = true;
            }
            else{
                return this.form.visibility = false;
            }
        }
    },
    created() {
        this.getApartment();
    }
}
</script>

<template>
    <h2>Modifica il tuo appartmento</h2>

    <!-- FORM PER CREATE -->

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
            <!-- <div>
                <label for="lat">Latitudine (**da inserire?** o da mettere in automatico?**)</label>
                <input v-model="form.lat" type="text" name="lat" id="lat">
            </div>
            <div>
                <label for="lng">Longitudine (**da inserire?** o da mettere in automatico?**)</label>
                <input v-model="form.lng" type="text" name="lng" id="lng">
            </div> -->
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
                <label class="d-block">Indica se il tuo appartamento non sarà subito disponibile</label>
                <input v-model="form.visibility" type="checkbox" name="visibility" id="visibility" >
                <label for="visibility">Al momento non disponibile</label>
            </div>
            <div v-for="(service, index) in allServices">
                <label :for="service.name">{{ service.name }}</label>
                <input v-model="selectedServices" type="checkbox" :name="service.name" :id="service.name"
                    :value="service.id">
            </div>
        </div>
        <button>Aggiorna appartamento</button>
        <AppErrorForm/>
    </form>
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