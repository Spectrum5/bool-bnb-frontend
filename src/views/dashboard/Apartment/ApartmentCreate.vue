<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppErrorForm from '../../../components/AppErrorForm.vue';

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import { store } from '../../../store';

export default {
    name: 'ApartmentCreate',
    components: {
        AppDashboardLayoutVue,
        AppErrorForm
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
                user_id: store.user.id,
                visibility: false,
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
    <AppDashboardLayoutVue
        :title= "'Aggiungi il tuo appartmento'">
        <div class="my-container">

            <!-- FORM PER CREATE -->
            <form @submit.prevent="createApartment()">
                <div class="my-row row">
                    <div class="group small">
                        <label class="d-block mb-2" for="title">Inserisci nome appartamento: *</label>
                        <input
                        v-model="form.title"
                        type="text"
                        name="title"
                        id="title"
                        max="255"
                        required>
                    </div>
                    <div class="my-group">
                        <div class="group small d-inline-block">
                            <label class="d-block mb-2" for="price">Inserisci prezzo a notte: *</label>
                            <input v-model="form.price" type="number" name="price" id="price" required>
                            <!-- max="1500" -->
                        </div>
                        <div class="group small d-inline-block">
                            <label class="d-block mb-2" for="size">Inserisci i mq: *</label>
                            <input v-model="form.size" type="number" name="size" id="size" required>
                            <!-- min="50"
                                max="500" -->
                        </div>
                    </div>
                    <div class="group small">
                        <label class="d-block mb-2" for="address">Dove si trova il tuo alloggio? *</label>
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
                                required>
                                <!-- min="1"
                                max="8" -->
                        </div>
                    </div>
                    <div class="group small">
                        <label class="mb-2 d-block" for="description">Descrizione appartamento: *</label>
                        <textarea v-model="form.description" name="description" id="description" rows="6" cols="8" required></textarea>
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
                                class="text-capitalize"
                                v-model="form.services"
                                type="checkbox"
                                :name="service.name"
                                :id="service.name"
                                :value="service.id">
                                <label :for="service.name">{{ service.name }}</label>
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


.my-container {
    padding: 10px;
    overflow-y: scroll;
    max-width: 80%;
    margin: 40px auto;
    // margin-inline: auto;

    .my-group{
        @include flexSpaceBtwn($gap: 100px);
        div{
            flex-grow: 1 !important;
        }
    }
    .my-group-info-base{
        @include flexSpaceBtwn($gap: 50px);
        div{
            flex-grow: 1!important;
        }
    }
}
.services {
    display: flex;
    // justify-content: center;
    align-items: center;
    gap: 10px;
    max-width: 80vw;
    flex-wrap: wrap;

    .service {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
}

.my-row {
    div {
        margin-bottom: 15px;
        padding-bottom: 15px;
        // border-bottom: 1px solid;

    }
    input, textarea {
        line-height: 20px;
        border: 1px solid black !important;
    }
    label.mb-2{
        font-weight: 600;
    }
}

.btn{
    border: 1.5px solid #000;
    border-radius: 10px;
    // padding: 7px;
    margin: 5px;
}
.my-btn{
    display: block;
    width: 50%;
    color: white;
    font-weight: 700;
    padding: 10px 0px;
    border-radius: 10px;
    background-color: #ff4a86;
    border: #ff4a86 !important;
}
</style>