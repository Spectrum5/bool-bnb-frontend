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
                user_id: store.user.id,
                visibility: false,
                services: []
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
                visibility: !this.form.visibility,
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
    <AppDashboardLayoutVue
        :title= "'Aggiungi il tuo appartmento'">
        <div class="my-container">

            <!-- FORM PER CREATE -->
            <form @submit.prevent="handleCreateApartment()">
                <div class="my-row row">
                    <div class="group small">
                        <label class="d-block mb-2" for="title">Inserisci nome appartamento: *</label>
                        <input
                        v-model="form.title"
                        type="text"
                        name="title"
                        id="title"
                        max="255"
                    >
                    </div>
                    <div class="my-group">
                        <div class="group small d-inline-block">
                            <label class="d-block mb-2" for="price">Inserisci prezzo a notte: *</label>
                            <input v-model="form.price" type="number" name="price" id="price">
                            <!-- max="1500" -->
                        </div>
                        <div class="group small d-inline-block">
                            <label class="d-block mb-2" for="size">Inserisci i mq: *</label>
                            <input v-model="form.size" type="number" name="size" id="size">
                            <!-- min="50"
                                max="500" -->
                        </div>
                    </div>
                    <div class="group small">
                        <label class="d-block mb-2" for="address">Dove si trova il tuo alloggio? *</label>
                        <input v-model="form.address" type="text" name="address" id="address">
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

                    <!-- INFORMAZIONI DI BASE -->
                    <div class="my-group-info-base">
                        <div class="group small d-inline-block">
                            <label class="mb-2 d-block" for="rooms_number">Stanze: *</label>
                            <input v-model="form.rooms_number" type="number" name="rooms_number" id="rooms_number">
                            <!-- min="1"
                            max="8" -->
                        </div>
                        <div class="group small d-inline-block">
                            <label class="mb-2 d-block" for="beds_number">Posti letto: *</label>
                            <input v-model="form.beds_number" type="number" name="beds_number" id="beds_number">
                            <!-- min="1"
                                max="16" -->
                        </div>
                        <div class="group small d-inline-block">
                            <label class="mb-2 d-block" for="bathrooms_number">Bagni: *</label>
                            <input v-model="form.bathrooms_number" type="number" name="bathrooms_number" id="bathrooms_number">
                                <!-- min="1"
                                max="8" -->
                        </div>
                    </div>
                    <div class="group small">
                        <label class="mb-2 d-block" for="description">Descrizione appartamento: *</label>
                        <textarea v-model="form.description" name="description" id="description" rows="6"></textarea>
                        <!-- maxlength="4096"-->
                    </div>
                    <div>
                        <label class="mb-2 d-block">Indica se il tuo appartamento non sarà subito disponibile</label>
                        <input v-model="form.visibility" type="checkbox" name="visibility" id="visibility">
                        <label for="visibility">Al momento non disponibile</label>
                    </div>
                    <div>
                        <label class="mb-2 d-block">Fai conoscere agli utenti tutti i servizi del tuo alloggio</label>
                        <div class="services">
                            <span class="service" v-for="service in services">
                                <input
                                v-model="form.services"
                                type="checkbox"
                                :name="service.name"
                                :id="service.name"
                                :value="service.id">
                                <label :for="service.name" class="text-capitalize">{{ service.name }}</label>
                            </span>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn my-btn">Crea appartamento</button>
                <p class="campi-required">I campi contrassegnati con * sono obbligatori</p>
                <AppErrorForm/>
            </form>
        </div>

    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/form.scss' as *;
@use '../../../styles/partials/variables.scss' as *;
@use '../../../styles/partials/formcreateedit.scss' as *;

label{
    text-transform: none !important;
}

</style>