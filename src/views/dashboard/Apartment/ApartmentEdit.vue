<script>

// Utilities
import axios from 'axios';
import { router } from '../../../router';

// Components
import AppErrorForm from '../../../components/AppErrorForm.vue';
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';

export default {
    name: 'ApartmentEdit',
    components: { 
        AppErrorForm,
        AppDashboardLayoutVue
    },
    data() {
        return {
            router,
            form: {},
            allServices: [],
            selectedServices: [],
            editedApartment: false,
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
                this.editedApartment = true;
                setInterval(() => {
                    router.push('/dashboard/apartments');
                }, 1000);
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
    <AppDashboardLayoutVue
        :title= "'Aggiorna il tuo appartmento'">

        <div class="my-container">
             <!-- FORM PER EDIT -->

        <form @submit.prevent="updateApartment()">
            <div class="my-row row">
                <div class="group small">
                    <label class="d-block mb-2" for="title">Inserisci nome appartamento: *</label>
                    <input
                    v-model="form.title"
                    type="text"
                    name="title"
                    id="title"
                    max="255">
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
                    <input v-model="form.lat" type="text" name="lat" id="lat">
                </div>
                <div>
                    <label for="lng">Longitudine (**da inserire?** o da mettere in automatico?**)</label>
                    <input v-model="form.lng" type="text" name="lng" id="lng">
                </div> -->
                <!-- INFORMAZIONI DI BASE -->
                <div class="my-group-info-base">
                    <div class="group small d-inline-block">
                        <label class="mb-2 d-block" for="rooms_number">Stanze: *</label>
                        <input v-model="form.rooms_number" type="number" name="rooms_number" id="rooms_number" required>
                        <!-- min="1"
                        max="8" -->
                    </div>
                    <div class="group small d-inline-block">
                        <label class="mb-2 d-block" for="beds_number">Posti letto: *</label>
                        <input v-model="form.beds_number" type="number" name="beds_number" id="beds_number" required>
                        <!-- min="1"
                            max="16" -->
                    </div>
                    <div class="group small d-inline-block">
                        <label class="mb-2 d-block" for="bathrooms_number">Bagni: *</label>
                        <input v-model="form.bathrooms_number" type="number" name="bathrooms_number" id="bathrooms_number"
                        >
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
                    <input v-model="form.visibility" type="checkbox" name="visibility" id="visibility" >
                    <label for="visibility">Al momento non disponibile</label>
                </div>

                <div>
                    <label class="mb-2 d-block">Fai conoscere agli utenti tutti i servizi del tuo alloggio</label>
                    <div class="services">
                     <span class="service" v-for="service in allServices">
                        <input
                        v-model="selectedServices"
                        type="checkbox"
                        :name="service.name"
                        :id="service.name"
                        :value="service.id">
                        <label :for="service.name">{{ service.name }}</label>
                    </span>
                   </div>
                </div>
            </div>
            <button v-if="!this.editedApartment" type="submit" class="btn my-btn">Aggiorna appartamento</button>
            <button v-if="this.editedApartment" class="btn my-btn-created">Appartamento aggiornato 
                <font-awesome-icon icon="fa-solid fa-check" />
            </button>
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