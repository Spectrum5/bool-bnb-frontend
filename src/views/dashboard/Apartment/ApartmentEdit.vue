<script>

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import {store} from '../../../store';

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
            store,
            form: {},
            allServices: [],
            selectedServices: [],
            images: [],
            previewUrls: [],
            //TOM TOM API
            url_api_tomtom: 'https://api.tomtom.com/search/2/geocode/',
            api_key_tomtom: 'Vru3uP06eapOxpYMujwrRlVLMB5Vkqch',

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

                    this.getImages();
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti', response.data);
                })
        },
        // RECUPERO IMMAGINI DEL SINGOLO APPARTAMENTO
        getImages() {
            axios.get(`http://localhost:8000/api/images/${this.form.id}`)
                .then((response) => {
                    this.images = response.data.images;
                    console.log('Images', response.data);
                })
                .catch((response) => {
                    console.log('Errore caricamento img dell\'appartamento', response.data);
                })
        },

        // FUNZIONI PER ERRORI COMPILAZIONE
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

        functionDeleteError(fieldName) {
            // toglie l'errore in store.error così da poter fare ogni volta un nuovo controllo da capo
            const index = this.store.errors.findIndex(error => error.field === fieldName);
            if (index >= 0) {
                this.store.errors.splice(index, 1);
            }
        },

        titleValidation() {
            // Title Length
            const titleInput = document.getElementById('title');
            titleInput.classList.remove('invalid');

            this.functionDeleteError('title');

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

            this.functionDeleteError('address');

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

        imageValidation() {
            const fileInput = document.getElementById('images');
            const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            fileInput.classList.remove('invalid');

            this.functionDeleteError('address');

            if (!fileInput.value) {
                this.addError('Devi selezionare almeno un\'immagine', 'images');
                fileInput.classList.add('invalid');
            } else if (!allowedExtensions.exec(fileInput.value)) {
                this.addError('L\'immagine deve essere in formato JPG, JPEG o PNG', 'images');
                fileInput.classList.add('invalid');
            }
        },

        priceValidation() {
            const priceInput = document.getElementById('price');
            priceInput.classList.remove('invalid');

            this.functionDeleteError('price');

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

            this.functionDeleteError('rooms_number');

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

        bedsNumberValidation() {
            const bedsNumberInput = document.getElementById('beds_number');
            bedsNumberInput.classList.remove('invalid');

            this.functionDeleteError('beds_number');

            if (bedsNumberInput.value.trim().length === 0) {
                this.addError('Il campo posti letto deve essere compilato', 'beds_number');
                bedsNumberInput.classList.add('invalid');
            } else if (isNaN(bedsNumberInput.value.trim())) {
                this.addError('Il campo posti letto deve contenere solo numeri', 'beds_number');
                bedsNumberInput.classList.add('invalid');
            } else if (bedsNumberInput.value.trim() <= 0 || bedsNumberInput.value.trim() > 16) {
                this.addError('Il campo posti letto deve essere compreso tra 1 e 16', 'beds_number');
                bedsNumberInput.classList.add('invalid');
            }
        },

        bathroomsNumberValidation() {
            const bathroomsNumberInput = document.getElementById('bathrooms_number');
            bathroomsNumberInput.classList.remove('invalid');

            this.functionDeleteError('bathrooms_number');

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

            this.functionDeleteError('description');

            const descriptionValue = descriptionInput.value.trim();

            if (descriptionValue.trim().length === 0) {
                this.addError('La descrizione deve essere compilata', 'description');
                descriptionInput.classList.add('invalid');
            }
            else if (descriptionValue.trim() < 10) {
                this.addError('La descrizione deve essere di almeno 10 caratteri', 'description');
                descriptionInput.classList.add('invalid');
            } else if (descriptionValue.trim() > 4096) {
                this.addError('La descrizione deve essere di massimo 4096 caratteri', 'description');
                descriptionInput.classList.add('invalid');
            }
        },

        sizeValidation() {
            const sizeInput = document.getElementById('size');
            sizeInput.classList.remove('invalid');

            this.functionDeleteError('size');

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

            this.functionDeleteError('visibility');

            if (this.form.visibility !== true && this.form.visibility !== false) {
                this.addError('Il campo visibilità non è valido', 'visibility');
                visibilityInput.classList.add('invalid');
            }
        },

        servicesValidation() {
            if (this.form.services.length == 0) {
                this.addError('Devi selezionare almeno un servizio', 'services');
            }
        },

        // FUNZIONE PER SHAKE ERROR
        shakeInputs() {
            if (this.store.errors.length > 0) {
                this.store.errors.forEach(error => {
                    document.querySelector(`#${error.field}`).classList.add('shake');
                    setTimeout(() => {
                        document.querySelector(`#${error.field}`).classList.remove('shake');
                    }, 300)
                });
            }
        },

        validateData() {
            this.store.errors = [];
            this.titleValidation();
            this.priceValidation();
            this.sizeValidation();
            this.addressValidation();
            this.roomsNumberValidation();
            this.bedsNumberValidation();
            this.bathroomsNumberValidation();
            this.descriptionValidation();
            this.visibilityValidation();
            this.servicesValidation();
            this.imageValidation();

            this.shakeInputs();

            if (this.store.errors.length == 0) {
                this.getCoordinates();
            }
            else {
                console.log('Hai inserito dati non corretti. Riprova!');
            }
        },

        // PRENDO COORDINATE APPARTAMENTO
        async getCoordinates() {
            const coordinates = await fetch(`${this.url_api_tomtom}${this.form.address}.json?key=${this.api_key_tomtom}&typeahead=true&limit=1&radius=500`);
            // const data = await coordinates.blob();
            let json = await coordinates.json();
            console.log('COORDINATE', json.results[0].position);
            this.form.lat = json.results[0].position.lat;
            this.form.lng = json.results[0].position.lon;
            this.updateApartment();
        },
        // AGGIORNAMENTO APPARTAMENTO
        async updateApartment() {
            axios.put(`http://localhost:8000/api/apartments/${this.form.id}`, {
                title: this.form.title,
                lat: this.form.lat,
                lng: this.form.lng,
                address: this.form.address,
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
                    this.postImages(response.data.apartment_id);
                })
                .catch((response) => {
                    console.log('Errore aggiornamento', response.data);
                })
                this.store.editedApartment = true;
                
                // redirect
                if (this.store.editedApartment) {
                    setTimeout(() => {
                        this.editedApartment = false;
                        router.push('/dashboard/apartments');
                    }, 1000);
                }
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
        },

        // sezione immagini
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
            console.log(id);
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
        },
        // deleteOldImage(index) {
        //     this.images.splice(index, 1);
        // },
        deleteOldImage(index, i) {
            this.images.splice(i, 1);
            axios.delete(`http://localhost:8000/api/images/${index}`)
                .then((response) => {
                    console.log('Immagine cancellata con id', index);
                    // this.getApartments();
                });
        },
    },
    created() {
        this.getApartment();
    },
    mounted(){
        document.title = 'Apartment | Edit';
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
    <AppDashboardLayoutVue
        :title= "'Aggiorna il tuo appartmento'">

        <div class="my-container">
             <!-- FORM PER EDIT -->

        <form @submit.prevent="validateData()">
            <div class="my-row row">
                <div class="group small">
                    <label class="d-block mb-2" for="title">Inserisci nome appartamento: *</label>
                    <input
                    v-model="form.title"
                    type="text"
                    name="title"
                    id="title"
                    v-on:blur="titleValidation()">
                </div>
                <div class="my-group">
                    <div class="group small d-inline-block">
                        <label class="d-block mb-2" for="price">Inserisci prezzo a notte: *</label>
                        <input
                        v-model="form.price"
                        type="number"
                        name="price"
                        id="price"
                        v-on:blur="priceValidation()">
                    </div>
                    <div class="group small d-inline-block">
                        <label class="d-block mb-2" for="size">Inserisci i mq: *</label>
                        <input
                        v-model="form.size"
                        type="number"
                        name="size"
                        id="size"
                        v-on:blur="sizeValidation()">
                    </div>
                </div>
                <div class="group small">
                    <label class="d-block mb-2" for="address">Dove si trova il tuo alloggio? *</label>
                    <input
                    v-model="form.address"
                    type="text"
                    name="address"
                    id="address"
                    v-on:blur="addressValidation()">
                </div>
                <!-- INFORMAZIONI DI BASE -->
                <div class="my-group-info-base">
                    <div class="group small d-inline-block">
                        <label class="mb-2 d-block" for="rooms_number">Stanze: *</label>
                        <input
                        v-model="form.rooms_number"
                        type="number"
                        name="rooms_number"
                        id="rooms_number"
                        v-on:blur="roomsNumberValidation()">
                    </div>
                    <div class="group small d-inline-block">
                        <label class="mb-2 d-block" for="beds_number">Posti letto: *</label>
                        <input
                        v-model="form.beds_number"
                        type="number"
                        name="beds_number"
                        id="beds_number" 
                        v-on:blur="bedsNumberValidation()">
                    </div>
                    <div class="group small d-inline-block">
                        <label class="mb-2 d-block" for="bathrooms_number">Bagni: *</label>
                        <input
                        v-model="form.bathrooms_number"
                        type="number"
                        name="bathrooms_number"
                        id="bathrooms_number"
                        v-on:blur="bathroomsNumberValidation()">
                    </div>
                </div>
                <div class="group small">
                    <label class="mb-2 d-block" for="description">Descrizione appartamento: *</label>
                    <textarea
                    v-model="form.description"
                    name="description"
                    id="description"
                    rows="6"
                    v-on:blur="descriptionValidation()"></textarea>
                </div>
                <div>
                    <label class="mb-2 d-block">Indica se il tuo appartamento non sarà subito disponibile</label>
                    <input v-model="form.visibility" type="checkbox" name="visibility" id="visibility" >
                    <label for="visibility">Al momento non disponibile</label>
                </div>

                <div>
                    <label class="mb-2 d-block">Fai conoscere agli utenti tutti i servizi del tuo alloggio *</label>
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
                <div class="group small">
                    <label for="images">
                        <strong>Immagini</strong>
                        <!-- 
                            
                         -->
                    </label>
                    <div class="container">
                        <label for="images" class="fakeInput" :class="(previewUrls.length + images.length) >= 3 ? 'disabled' : ''">
                            <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                            add images
                        </label>
                        <input name="images" id="images" type="file" accept="image/*" multiple
                            @change="addFiles($event.target.name, $event.target.files)"
                            :disabled="(previewUrls.length + images.length) >= 3">
                        <!-- <transition name="fade"> -->
                            <div class="previews" v-if="images.length > 0">
                                <div class="preview" v-for="element, index in images">
                                    <img :src="`http://localhost:8000/storage/apartments/${element.url}`" alt="img">
                                    <button @click.prevent="deleteOldImage(element.id, index)">
                                        <font-awesome-icon icon="fa-solid fa-xmark" class="icon" />
                                    </button>
                                </div>
                            </div>
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
            <button v-if="!this.store.editedApartment" type="submit" class="btn my-btn">Aggiorna appartamento</button>
            <button v-if="this.store.editedApartment" class="btn my-btn-created">Appartamento aggiornato 
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
label.fakeinput,
input#images{
    margin-bottom: 10px;
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
        width: 150px;
        height: 150px;
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