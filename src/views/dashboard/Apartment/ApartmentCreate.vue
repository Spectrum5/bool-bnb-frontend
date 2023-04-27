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
                address: null,
                images: [],
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
            previewUrls: [],
            url_api_tomtom: 'https://api.tomtom.com/search/2/geocode/',
            api_key_tomtom: 'Vru3uP06eapOxpYMujwrRlVLMB5Vkqch',
            services: [],
            ApartmentCreated: false,
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
                this.addError('Il campo nome deve essere almeno di 3 caratteri', 'title');
                titleInput.classList.add('invalid');
            } else if (titleInput.value.trim().length > 50) {
                this.addError('Il campo nome non deve superare i 128 caratteri', 'title');
                titleInput.classList.add('invalid');
            }
        },

        addressValidation() {
            const addressInput = document.getElementById('address');
            addressInput.classList.remove('invalid');

            if (addressInput.value.trim().length === 0) {
                this.addError('Il campo indirizzo deve essere compilato', 'address');
                addressInput.classList.add('invalid');
            } else if (addressInput.value.trim().length < 3) {
                this.addError('Il campo indirizzo deve essere almeno di 3 caratteri', 'address');
                addressInput.classList.add('invalid');
            } else if (addressInput.value.trim().length > 512) {
                this.addError('Il campo indirizzo non deve superare i 512 caratteri', 'address');
                addressInput.classList.add('invalid');
            }
        },

        // imageValidation() {
        //     const fileInput = document.getElementById('image');
        //     const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        //     fileInput.classList.remove('invalid');

        //     if (!fileInput.value) {
        //         this.addError('Devi selezionare un\'immagine', 'image');
        //         fileInput.classList.add('invalid');
        //     } else if (!allowedExtensions.exec(fileInput.value)) {
        //         this.addError('L\'immagine deve essere in formato JPG, JPEG o PNG', 'image');
        //         fileInput.classList.add('invalid');
        //     }
        // },

        priceValidation() {
            const priceInput = document.getElementById('price');
            priceInput.classList.remove('invalid');

            if (priceInput.value.trim().length === 0) {
                this.addError('Il campo prezzo deve essere compilato', 'price');
                priceInput.classList.add('invalid');
            } else if (isNaN(priceInput.value.trim())) {
                this.addError('Il campo prezzo deve contenere solo numeri', 'price');
                priceInput.classList.add('invalid');
            } else if (priceInput.value.trim() <= 99 || priceInput.value.trim() > 1500) {
                this.addError('Il campo prezzo deve essere compreso tra 100 e 1500', 'price');
                priceInput.classList.add('invalid');
            }
        },

        roomsNumberValidation() {
            const roomsNumberInput = document.getElementById('rooms_number');
            roomsNumberInput.classList.remove('invalid');

            if (roomsNumberInput.value.trim().length === 0) {
                this.addError('Il campo stanze deve essere compilato', 'rooms_number');
                roomsNumberInput.classList.add('invalid');
            } else if (isNaN(roomsNumberInput.value.trim())) {
                this.addError('Il campo stanze deve contenere solo numeri', 'rooms_number');
                roomsNumberInput.classList.add('invalid');
            } else if (roomsNumberInput.value.trim() <= 0 || roomsNumberInput.value.trim() > 8) {
                this.addError('Il campo stanze deve essere compreso tra 1 e 8', 'rooms_number');
                roomsNumberInput.classList.add('invalid');
            }
        },

        bathroomsNumberValidation() {
            const bathroomsNumberInput = document.getElementById('bathrooms_number');
            bathroomsNumberInput.classList.remove('invalid');

            if (bathroomsNumberInput.value.trim().length === 0) {
                this.addError('Il campo numero di bagni deve essere compilato', 'bathrooms_number');
                bathroomsNumberInput.classList.add('invalid');
            } else if (isNaN(bathroomsNumberInput.value.trim())) {
                this.addError('Il campo numero di bagni deve contenere solo numeri', 'bathrooms_number');
                bathroomsNumberInput.classList.add('invalid');
            } else if (bathroomsNumberInput.value.trim() <= 0 || bathroomsNumberInput.value.trim() > 8) {
                this.addError('Il campo numero di bagni deve essere compreso tra 1 e 8', 'bathrooms_number');
                bathroomsNumberInput.classList.add('invalid');
            }
        },

        descriptionValidation() {
            const descriptionInput = document.getElementById('description');
            descriptionInput.classList.remove('invalid');

            const descriptionValue = descriptionInput.value.trim();

            if (descriptionValue.length < 10) {
                this.addError('La descrizione deve essere di almeno 10 caratteri', 'description');
                descriptionInput.classList.add('invalid');
            } else if (descriptionValue.length > 4096) {
                this.addError('La descrizione deve essere di massimo 4096 caratteri', 'description');
                descriptionInput.classList.add('invalid');
            }
        },

        sizeValidation() {
            const sizeInput = document.getElementById('size');
            sizeInput.classList.remove('invalid');

            if (sizeInput.value.trim().length === 0) {
                this.addError('Il campo Inserisci i mq deve essere compilato', 'size');
                sizeInput.classList.add('invalid');
            } else if (isNaN(sizeInput.value.trim())) {
                this.addError('Il campo Inserisci i mq deve essere un numero', 'size');
                sizeInput.classList.add('invalid');
            } else if (sizeInput.value.trim() < 50) {
                this.addError('Il campo Inserisci i mq deve essere maggiore di 50', 'size');
                sizeInput.classList.add('invalid');
            } else if (sizeInput.value.trim() > 500) {
                this.addError('Il campo Inserisci i mq non deve superare i 500 mq', 'size');
                sizeInput.classList.add('invalid');
            }
        },

        visibilityValidation() {
            const visibilityInput = document.getElementById('visibility');
            visibilityInput.classList.remove('invalid');

            if (this.form.visibility !== true && this.form.visibility !== false) {
                this.addError('Il campo visibilità non è valido', 'visibility');
                visibilityInput.classList.add('invalid');
            }
        },

        // latValidation() {
        //     // Latitude Validation
        //     const latInput = document.getElementById('lat');
        //     latInput.classList.remove('invalid');

        //     if (isNaN(latInput.value) || latInput.value < -90 || latInput.value > 90) {
        //         this.addError('Inserisci una latitudine valida', 'lat');
        //         latInput.classList.add('invalid');
        //     }
        // },

        // lngValidation() {
        //     // Longitude Validation
        //     const lngInput = document.getElementById('lng');
        //     lngInput.classList.remove('invalid');

        //     if (isNaN(lngInput.value) || lngInput.value < -180 || lngInput.value > 180) {
        //         this.addError('Inserisci una longitudine valida', 'lng');
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
            this.addressValidation();
            // this.imageValidation();
            this.visibilityValidation();
            this.priceValidation();
            this.roomsNumberValidation();
            this.bathroomsNumberValidation();
            this.descriptionValidation();
            this.sizeValidation();
            // this.servicesValidation();

            // https://api.tomtom.com/search/2/geocode/Piazza del Colosseo, 1, 00184 Roma RM.json?key=Vru3uP06eapOxpYMujwrRlVLMB5Vkqch&typeahead=true&limit=1&radius=500
            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) {
                // async getMap() {
                // }
                this.getCoordinates();

                // axios.get(`https://api.tomtom.com/search/2/geocode/${'Piazza del Colosseo, 1, 00184 Roma RM'}.json`, {
                //     key: 'Vru3uP06eapOxpYMujwrRlVLMB5Vkqch',
                //     // address: 'Piazza del Colosseo, 1, 00184 Roma RM',
                //     // ext: 'json',
                //     typeahead: true,
                //     limit: 1,
                //     radius: 500
                // })
                // .then((response) => {
                //     // this.postData();
                //     console.log('Risposta TOMTOM', response);
                // })
                // .catch((response) => {
                //     console.log('Calcolo coordinate fallito', response);
                //     this.store.errors = response;
                // })
            }
            else {
                console.log('Hai inserito dati non corretti. Riprova!');
            }
        },
        async getCoordinates() {
            const coordinates = await fetch(`${this.url_api_tomtom}${this.form.address}.json?key=${this.api_key_tomtom}&typeahead=true&limit=1&radius=500`);
            // const data = await coordinates.blob();
            let json = await coordinates.json();
            console.log('COORDINATE', json.results[0].position);
            this.form.lat = json.results[0].position.lat;
            this.form.lng = json.results[0].position.lon;
            this.postData();
        },
        async postData() {
            axios.post('http://localhost:8000/api/apartments', {
                title: this.form.title,
                lat: this.form.lat,
                lng: this.form.lng,
                address: this.form.address,
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
                    this.postImages(response.data.apartment_id);
                })
                .catch((response) => {
                    this.addError('Errore del server. Riprovare piú tardi', 'server_error');
                    console.log('Errore Invio dati Register:', response.response);
                })
            this.ApartmentCreated = true;
            setTimeout(() => {
                this.ApartmentCreated = false;
                router.push('/dashboard/apartments');
            }, 1000);
        },
        addFiles(fieldName, fileList) {
            this.form.images = fileList;
            for (let i = 0; i < fileList.length; i++) {
                this.previewUrls.push(URL.createObjectURL(fileList[i]));
            }
            // console.log('Files Aggiunti');
            // console.log('URL creati', this.previewUrls);
        },
        postImages(id) {
            // console.log('Images', this.form.images);
            const images = this.form.images;
            let config = {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const formData = new FormData();
            formData.append('apartment_id', id);
            // console.log('FormData', formData);
            for (let i = 0; i < images.length; i++) {
                // console.log('Appending', images[i]);
                formData.append(`image-${i}`, images[i]);
            }
            axios.post('http://localhost:8000/api/images', formData, config)
                .then((response) => {
                    // console.log("Images sent correctly");
                })
        },
        deleteImage(index) {
            this.previewUrls.splice(index, 1);
        }
    },
    mounted() {
        document.title = 'Apartment | Create';
        this.getFormData();
        const address = document.querySelector('#address');
        let autocomplete = new google.maps.places.Autocomplete(address);
        const self = this;
        autocomplete.addListener('place_changed', function () {
            let place = autocomplete.getPlace();
            let address = place.formatted_address;
            self.form.address = address;
            // let city = place.address_components.find(component => component.types.includes('locality')).long_name;
            // aggiorna i campi dell'indirizzo e della città con i dati trovati
        });
    }
}
</script>

<template>
    <AppDashboardLayoutVue :title="'Aggiungi il tuo appartmento'">
        <div class="my-container">

            <!-- FORM PER CREATE -->
            <form @submit.prevent="handleCreateApartment()">
                <div class="my-row row">
                    <div class="group small">
                        <label class="d-block mb-2" for="title">Inserisci nome appartamento: *</label>
                        <input v-model="form.title" type="text" name="title" id="title" max="255"
                            v-on:blur="titleValidation()">
                    </div>
                    <div class="my-group">
                        <div class="group small d-inline-block">
                            <label class="d-block mb-2" for="price">Inserisci prezzo a notte: *</label>
                            <input v-model="form.price" type="number" name="price" id="price" v-on:blur="priceValidation()">
                            <!-- max="1500" -->
                        </div>
                        <div class="group small d-inline-block">
                            <label class="d-block mb-2" for="size">Inserisci i mq: *</label>
                            <input v-model="form.size" type="number" name="size" id="size" v-on:blur="sizeValidation()">
                            <!-- min="50"
                                max="500" -->
                        </div>
                    </div>
                    <div class="group small">
                        <label class="d-block mb-2" for="address">Dove si trova il tuo alloggio? *</label>
                        <input v-model="form.address" type="text" name="address" id="address"
                            v-on:blur="addressValidation()">
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
                            <input v-model="form.rooms_number" type="number" name="rooms_number" id="rooms_number"
                                v-on:blur="roomsNumberValidation()">
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
                            <input v-model="form.bathrooms_number" type="number" name="bathrooms_number"
                                id="bathrooms_number" v-on:blur="bathroomsNumberValidation()">
                            <!-- min="1"
                                max="8" -->
                        </div>
                    </div>
                    <div class="group small">
                        <label class="mb-2 d-block" for="description">Descrizione appartamento: *</label>
                        <textarea v-model="form.description" name="description" id="description" rows="6"
                            v-on:blur="descriptionValidation()"></textarea>
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
                                <input v-model="form.services" type="checkbox" :name="service.name" :id="service.name"
                                    :value="service.id">
                                <label :for="service.name" class="text-capitalize">{{ service.name }}</label>
                            </span>
                        </div>
                    </div>

                    <div class="group small">
                        <label for="images">images</label>
                        <div class="container">
                            <label for="images" class="fakeInput" :class="previewUrls.length >= 3 ? 'disabled' : ''">
                                <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                                add images
                            </label>
                            <input name="images" id="images" type="file" accept="image/*" multiple
                                @change="addFiles($event.target.name, $event.target.files)"
                                :disabled="previewUrls.length >= 3">
                            <!-- <transition name="fade"> -->
                            <div class="previews" v-if="previewUrls.length > 0">
                                <div class="preview" v-for="url, index in previewUrls">
                                    <img :src="url" alt="Preview">
                                    <button @click.prevent="deleteImage(index)">
                                        <font-awesome-icon icon="fa-solid fa-xmark" class="icon" />
                                    </button>
                                </div>
                            </div>
                            <!-- </transition> -->
                        </div>
                    </div>
                </div>
                <button v-if="!this.ApartmentCreated" type="submit" class="btn my-btn">Crea appartamento</button>
                <button v-if="this.ApartmentCreated" class="btn my-btn-created">Appartamento creato
                    <font-awesome-icon icon="fa-solid fa-check" />
                </button>
                <p class="campi-required">I campi contrassegnati con * sono obbligatori</p>
                <AppErrorForm />
            </form>
        </div>
    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/form.scss' as *;
@use '../../../styles/partials/variables.scss' as *;
@use '../../../styles/partials/formcreateedit.scss' as *;

label {
    text-transform: none !important;
}

.invalid {
    border: 1px solid $danger-color-dark !important;
}

#images {
    display: none;
}

.previews {
    @include flexRowCenter(5px);
    width: fit-content;
    padding: 5px;
    border-radius: $small-border-radius;
    background-color: $light-color-three;
    transition: all 0.1s;

    .preview {
        width: 36px;
        height: 36px;
        border-radius: 4px;
        border: 1px solid $dark-color-one;
        position: relative;
        padding: 0;

        >img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
        }

        >button {
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            z-index: 10;
            background-color: #dc354580;
            border-radius: 0;
            opacity: 0;
            transition: all 0.1s 0.05s;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;

            .icon {
                margin: 0;
            }
        }

        &:hover {
            >button {
                opacity: 1;
            }
        }
    }
}
</style>