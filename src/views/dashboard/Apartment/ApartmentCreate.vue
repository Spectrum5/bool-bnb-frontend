<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppErrorForm from '../../../components/AppErrorForm.vue';

// Utilities
import { store } from '../../../store';
import { router } from '../../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'ApartmentCreate',
    components: {
        AppDashboardLayoutVue,
        AppErrorForm,
    },
    data() {
        return {
            router,
            store,
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
                services: [],
            },
            services: [],
        };
    },
    methods: {
        getFormData() {
            axios.get('http://localhost:8000/api/apartments/create')
                .then(response => {
                    // console.log(response.data.services);
                    this.services = response.data.services;
                })
        },
        handleCreateApartment() {
            this.validateData();
        },
        addError(message, field) {
            // Check if there are already errors in store.errors with the same field, and if not, add the error
            if (this.store.errors.length === 0) {
                this.store.errors.push({
                    message: message,
                    field: field,
                });
            } 
            else {
                if (!this.store.errors.some((error) => error.field === field)) {
                    this.store.errors.push({
                        message: message,
                        field: field,
                    });
                }
            }
        },

        titleValidation() {
            // Title Length
            const titleInput = document.getElementById('title');
            titleInput.classList.remove('invalid');

            if (titleInput.value.trim().length === 0) {
                this.addError('Il campo nome deve essere compilato', 'title');
                titleInput.classList.add('invalid');
            } else if (titleInput.value.trim().length < 3) {
                this.addError('Il campo nome deve essere almeno di 3 caratteri', 'first_name');
                titleInput.classList.add('invalid');
            } else if (titleInput.value.trim().length > 50) {
                this.addError('Il campo nome non deve superare i 128 caratteri', 'first_name');
                titleInput.classList.add('invalid');
            }
        },

        // latValidation() {
        //     // Latitude Validation
        //     const latInput = document.getElementById('lat');
        //     latInput.classList.remove('invalid');

        //     if (latInput.value.trim().length === 0) {
        //         this.addError('Il campo latitudine deve essere compilato', 'lat');
        //         latInput.classList.add('invalid');
        //     } else if (isNaN(latInput.value)) {
        //         this.addError('Il campo latitudine deve essere un numero valido', 'lat');
        //         latInput.classList.add('invalid');
        //     } else if (latInput.value < -90 || latInput.value > 90) {
        //         this.addError('Il campo latitudine deve essere compreso tra -90 e 90', 'lat');
        //         latInput.classList.add('invalid');
        //     }
        // },

        // lngValidation() {
        //     // Longitude Validation
        //     const lngInput = document.getElementById('lng');
        //     lngInput.classList.remove('invalid');

        //     if (lngInput.value.trim().length === 0) {
        //         this.addError('Il campo longitudine deve essere compilato', 'lng');
        //         lngInput.classList.add('invalid');
        //     }
        // },

        validateData() {
            // Front End Validation
            // console.log('Validating Create apartment data...');
            // Reset Form Validation
            this.store.errors = [];
            this.titleValidation();
            // this.latValidation();
            // this.lngValidation();
            // this.addressValidation();
            // this.imageValidation();
            // this.visibilityValidation();
            // this.priceValidation();
            // this.roomsNumberValidation();
            // this.bathroomsNumberValidation();
            // this.descriptionValidation();
            // this.sizeValidation();
            // this.servicesValidation();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.postData();
            else {
                console.log('Hai inserito dati non corretti. Riprova!');
            }
        },
        postData() {
            axios.post('http://localhost:8000/api/apartments', {
                title: this.form.title,
                lat: 37.9312320,
                lng: -103.6998280,
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
                visibility: 1,
                services: this.form.services
            })
                .then((response) => {
                    console.log('Added Apartment', response.data);
                })
                .catch((response) => {
                    this.addError('Errore del server. Riprovare piú tardi', 'server_error');
                    console.log('Errore Invio dati Register:', response.response);
                })
        },
    },
    mounted() {
        document.title = 'Apartment | Create';
        this.getFormData();
    }
}
</script>

<template>
    <AppDashboardLayoutVue>
        <h2>Aggiungi il tuo appartmento</h2>

        <!-- FORM PER CREATE -->

        <form @submit.prevent="handleCreateApartment()" class="formContainer">
            <div class="row">
                <div>
                    <label for="title">Inserisci nome appartamento:</label>
                    <input v-model="form.title" type="text" name="title" id="title" max="255"
                        required v-on:blur="titleValidation()">
                </div>
                <div>
                    <label for="price">Inserisci prezzo a notte:</label>
                    <input v-model="form.price" type="number" name="price" id="price" required>
                    <!-- max="1500" -->
                </div>
                <div>
                    <label for="address">Inserisci indirizzo:</label>
                    <input v-model="form.address" type="text" name="address" id="address" required>
                    <!-- maxlength="512" -->
                </div>
                <!-- <div>
                    <label for="lat">Latitudine (**da inserire?** o da mettere in automatico?**)</label>
                    <input v-model="form.lat" type="text" name="lat" id="lat" required>
                </div>
                <div>
                    <label for="lng">Longitudine (**da inserire?** o da mettere in automatico?**)</label>
                    <input v-model="form.lng" type="text" name="lng" id="lng" required>
                </div> -->
                <div>
                    <label for="rooms_number">Numero di stanze</label>
                    <input v-model="form.rooms_number" type="number" name="rooms_number" id="rooms_number" required>
                    <!-- min="1"
                    max="8" -->
                </div>
                <div>
                    <label for="beds_number">Numero di post letto / letti</label>
                    <input v-model="form.beds_number" type="number" name="beds_number" id="beds_number" required>
                    <!-- min="1"
                        max="16" -->
                </div>
                <div>
                    <label for="bathrooms_number">Numero di bagni</label>
                    <input v-model="form.bathrooms_number" type="number" name="bathrooms_number" id="bathrooms_number"
                        required>
                    <!-- min="1"
                        max="8" -->
                </div>
                <div>
                    <label for="description">Descrizione appartamento:</label>
                    <textarea v-model="form.description" name="description" id="description" rows="6" required></textarea>
                    <!-- maxlength="4096"-->
                </div>
                <div>
                    <label for="size">MQ</label>
                    <input v-model="form.size" type="number" name="size" id="size" required>
                    <!-- min="50"
                        max="500" -->
                </div>
                <div>
                    <label for="user_id">user id prova</label>
                    <input v-model="form.user_id" type="number" name="user_id" id="user_id" required>
                    <!-- da eliminare questo campo -->
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
            <AppErrorForm />
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