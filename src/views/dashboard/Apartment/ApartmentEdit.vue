<script>

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import { store } from '../../../store';

// Components
import AppErrorForm from '../../../components/AppErrorForm.vue';
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppButton from '../../../components/AppButton.vue';

export default {
    name: 'ApartmentEdit',
    components: {
        AppErrorForm,
        AppDashboardLayoutVue,
        AppButton
    },
    data() {
        return {
            router,
            store,
            form: {},
            errorsMessages: {
                title: '',
                price: '',
                size: '',
                address: '',
                rooms_number: '',
                beds_number: '',
                bathrooms_number: '',
                description: '',
                visibility: '',
                services: '',
                image: '',
            },
            allServices: [],
            selectedServices: [],
            imagesToAdd: [],

            apartmentUpdated: false,
            previewUrls: [],
            //TOM TOM API
            url_api_tomtom: 'https://api.tomtom.com/search/2/geocode/',
            api_key_tomtom: import.meta.env.VITE_TOMTOM_API_KEY,
        }
    },
    methods: {
        getApartment() {
            // Recupero dati dell'appartamento per la modifica
            axios.get(`http://localhost:8000/api/apartments/${this.$route.params.slug}/edit`)
                .then((response) => {
                    console.log('Dati Appartamento', response.data.apartment);
                    this.form = response.data.apartment;

                    this.getServices();
                    this.setVisibility();
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti', response.data);
                })
        },
        getServices() {
            axios.get('http://localhost:8000/api/services')
                .then(response => {
                    this.allServices = response.data.services;
                    this.setCheckboxes();
                })
        },
        setCheckboxes() {
            this.allServices.forEach(service => {
                if (this.form.services.some(e => e.id == service.id)) {
                    this.selectedServices.push(service.id);
                }
            });
        },
        setVisibility() {
            if (this.form.visibility == 0) {
                return this.form.visibility = true;
            }
            else {
                return this.form.visibility = false;
            }
        },
        imageValidation() {
            // Valida la presenza e il formato dei file
            const fileInput = document.getElementById('images');
            const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            fileInput.classList.remove('invalid');

            this.deleteError('images');
            this.errorsMessages.image = '';

            console.log('immagini da inviare', this.form.images);

            if ((this.imagesToAdd.length + this.form.images.length) == 0) {
                this.addError('images');
                this.errorsMessages.image = 'Devi selezionare almeno un\'immagine';
                fileInput.classList.add('invalid');
            }
            else if (this.imagesToAdd.length > 0) {
                if (!allowedExtensions.exec(fileInput.value)) {
                    this.addError('images');
                    this.errorsMessages.image = 'L\'immagine deve essere in formato JPG, JPEG o PNG';
                    fileInput.classList.add('invalid');
                }
            }
            else if ((this.previewUrls.length + this.imagesToAdd.length) > 3) {
                this.addError('images');
                this.errorsMessages.image = 'Puoi selezionare fino a un massimo di tre immagini';
                fileInput.classList.add('invalid');
            }
        },
        validateData() {
            this.store.errors = [];
            this.store.titleValidation('title');
            this.store.priceValidation('price');
            this.store.sizeValidation('size');
            this.store.addressValidation('address');
            this.store.roomsNumberValidation('rooms_number');
            this.store.bedsNumberValidation('beds_number');
            this.store.bathroomsNumberValidation('bathrooms_number');
            this.store.descriptionValidation('description');
            this.store.visibilityValidation('visibility');
            this.store.servicesValidation(this.form.services);
            this.imageValidation();

            this.store.shakeInputs();

            if (this.store.errors.length == 0) this.getCoordinates();
            else console.log('Hai inserito dati non corretti. Riprova!');
        },
        async getCoordinates() {
            // Ottiene le coordinate dell'appartamento dall'indirizzo
            const coordinates = await fetch(`${this.url_api_tomtom}${this.form.address}.json?key=${this.api_key_tomtom}&typeahead=true&limit=1&radius=500`);
            let json = await coordinates.json();
            console.log('COORDINATE', json.results[0].position);
            this.form.lat = json.results[0].position.lat;
            this.form.lng = json.results[0].position.lon;
            this.updateApartment();
        },
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
                    this.apartmentUpdated = true;
                    this.postImages(response.data.apartment_id);

                    setTimeout(() => {
                        router.push('/dashboard/apartments');
                    }, 1500)
                })
                .catch((response) => {
                    console.log('Errore aggiornamento', response.data);
                })


            // Redirect
            if (this.apartmentUpdated) {
                setTimeout(() => {
                    this.apartmentUpdated = false;
                    router.push('/dashboard/apartments');
                }, 1500);
            }
        },
        // sezione immagini
        addFiles(fieldName, fileList) {
            this.imagesToAdd = fileList;

            // Crea l'array di url per le previews
            for (let i = 0; i < fileList.length; i++) {
                this.previewUrls.push(URL.createObjectURL(fileList[i]));
            }
            // console.log('URL creati', this.previewUrls);
        },
        postImages(id) {
            // console.log('Images', this.form.images);
            const images = this.imagesToAdd;

            // Config della chiamata per accettare immagini
            let config = {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            // Crea un istanza di FormData e aggiunge tutte le immagini
            const formData = new FormData();
            formData.append('apartment_id', id);
            for (let i = 0; i < images.length; i++) {
                formData.append(`image-${i}`, images[i]);
            }

            // console.log('FormData', formData);
            axios.post('http://localhost:8000/api/images', formData, config)
                .then((response) => {
                    console.log("Immagini inviate correttamente");
                })
        },
        deleteImage(index) {
            // Elimina l'immagine dall'array delle previews
            this.previewUrls.splice(index, 1);
        },
        deleteOldImage(id, index) {
            // Permette l'eliminazione di una delle immagini gia' associate all'appartamento

            // Elimina l'immagine dall'array solo per fini grafici
            this.form.images.splice(index, 1);

            // Invia la richiesta di eliminazione del record dell'immagine dal DB
            axios.delete(`http://localhost:8000/api/images/${id}`)
                .then((response) => {
                    console.log(`Immagine #${id} cancellata`);
                });
        },
        goApartments() {
            this.$router.push('/dashboard/apartments');
        },
        getFieldError(fieldName) {
            const index = this.store.errors.findIndex(error => error.field === fieldName);
            if (index >= 0) {
                return this.store.errors[index].message;
            }
            else return;
        }
    },
    mounted() {
        document.title = 'Dashboard | Aggiorna Appartamento';
        this.getApartment();
        this.store.setAutocomplete('address');
    }
}
</script>

<template>
    <AppDashboardLayoutVue :title="`Aggiorna ${form.title ?? ''}`" :button="{
        label: 'Torna alla dashboard',
        icon: 'arrow-left',
        action: goApartments
    }">

        <form @submit.prevent="validateData()" v-if="form">
            <!-- Titolo -->
            <div class="row">
                <div class="group large">
                    <label for="title">Inserisci nome appartamento: *</label>
                    <input v-model="form.title" type="text" name="title" id="title"
                        v-on:blur="store.titleValidation('title')">
                    <p class="fieldError">{{ getFieldError('title') }}</p>
                </div>
            </div>

            <!-- Prezzo | Metri Quadri -->
            <div class="row inline-center">
                <div class="group small">
                    <label for="price">Inserisci prezzo a notte: *</label>
                    <input v-model="form.price" type="number" name="price" id="price"
                        v-on:blur="store.priceValidation('price')">
                    <p class="fieldError">{{ getFieldError('price') }}</p>
                </div>

                <div class="group small">
                    <label for="size">Inserisci i mq: *</label>
                    <input v-model="form.size" type="number" name="size" id="size" v-on:blur="store.sizeValidation('size')">
                    <p class="fieldError">{{ getFieldError('size') }}</p>
                </div>
            </div>

            <!-- Indirizzo -->
            <div class="row">
                <div class="group large">
                    <label for="address">Dove si trova il tuo alloggio? *</label>
                    <input v-model="form.address" type="text" name="address" id="address"
                        v-on:blur="store.addressValidation('address')">
                    <p class="fieldError">{{ getFieldError('address') }}</p>
                </div>
            </div>

            <!-- Stanze | Letti | Bagni -->
            <div class="row inline-center">
                <div class="group small">
                    <label for="rooms_number">Stanze: *</label>
                    <input v-model="form.rooms_number" type="number" name="rooms_number" id="rooms_number"
                        v-on:blur="store.roomsNumberValidation('rooms_number')">
                    <p class="fieldError">{{ getFieldError('rooms_number') }}</p>
                </div>
                <div class="group small">
                    <label for="beds_number">Posti letto: *</label>
                    <input v-model="form.beds_number" type="number" name="beds_number" id="beds_number"
                        v-on:blur="store.bedsNumberValidation('beds_number')">
                    <p class="fieldError">{{ getFieldError('beds_number') }}</p>
                </div>
                <div class="group small">
                    <label for="bathrooms_number">Bagni: *</label>
                    <input v-model="form.bathrooms_number" type="number" name="bathrooms_number" id="bathrooms_number"
                        v-on:blur="store.bathroomsNumberValidation('bathrooms_number')">
                    <p class="fieldError">{{ getFieldError('bathrooms_number') }}</p>
                </div>
            </div>

            <!-- Descrizione -->
            <div class="row">
                <div class="group large">
                    <label for="description">Descrizione appartamento: *</label>
                    <textarea v-model="form.description" name="description" id="description" rows="6"
                        v-on:blur="store.descriptionValidation('description')"></textarea>
                    <p class="fieldError">{{ getFieldError('description') }}</p>
                </div>
            </div>

            <!-- Visibilita' -->
            <div class="row visibility">
                <div class="group large">
                    <input v-model="form.visibility" type="checkbox" name="visibility" id="visibility">
                    <label for="visibility">Al momento non disponibile</label>
                    <p class="fieldError">{{ getFieldError('visibility') }}</p>
                </div>
            </div>

            <!-- Servizi -->
            <div class="row">
                <div class="group large">
                    <label>Fai conoscere agli utenti tutti i servizi del tuo alloggio *</label>
                    <div class="services">
                        <span class="service" v-for="service in allServices">
                            <input v-model="selectedServices" type="checkbox" :name="service.name" :id="service.name"
                                :value="service.id">
                            <label :for="service.name">{{ service.name }}</label>
                        </span>
                    </div>
                    <p class="fieldError">{{ getFieldError('services') }}</p>
                </div>
            </div>

            <!-- Immagini -->
            <div class="row" v-if="form.images">
                <div class="group large">
                    <label for="images"><strong>Immagini</strong></label>

                    <label for="images" class="fakeInput"
                        :class="(previewUrls.length + form.images.length) >= 4 ? 'disabled' : ''">
                        <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                        add images
                    </label>

                    <input name="images" id="images" type="file" accept="image/*" multiple
                        @change="addFiles($event.target.name, $event.target.files)"
                        v-on:blur="store.imageValidation('images')"
                        :disabled="(previewUrls.length + form.images.length) >= 4">

                    <transition name="fade">
                        <div class="previews" v-if="form.images.length > 0 || previewUrls.length > 0">
                            <div class="preview" v-for="element, index in form.images">
                                <img :src="`http://localhost:8000/storage/apartments/${element.url}`" alt="img">
                                <button @click.prevent="deleteOldImage(element.id, index)">
                                    <font-awesome-icon icon="fa-solid fa-xmark" class="icon" />
                                </button>
                            </div>

                            <div class="preview" v-for="url, index in previewUrls">
                                <img :src="url" alt="Preview">
                                <button @click.prevent="deleteImage(index)">
                                    <font-awesome-icon icon="fa-solid fa-xmark" class="icon" />
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>
                <p class="fieldError">{{ getFieldError('images') }}</p>

            </div>

            <!-- Submit -->
            <div class="row">
                <AppButton :label="'appartamento aggiornato'" :icon="'check'" :type="'solid'" :palette="'success'"
                    :disabled="true" v-if="apartmentUpdated" />
                <AppButton :label="'aggiorna appartamento'" :type="'solid'" :palette="'primary'" v-else />
            </div>
            <p class="campi-required">I campi contrassegnati con * sono obbligatori</p>
        </form>
    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/form.scss' as *;
@use '../../../styles/partials/variables.scss' as *;

form {
    margin: 0 auto;
    max-width: 1100px;
    width: 100%;

    .group {
        position: relative;
    }
}

.row.visibility .group {
    @include flexRowCenter (0.5rem);
    justify-content: flex-start;

    input {
        width: unset !important;
    }
}

.row.inline-center {
    gap: 1rem;
}

.group.small {
    flex-grow: 1;
}

label {
    font-weight: 500;
}

.row:last-child {
    &:deep button {
        width: 100% !important;
    }
}

#images {
    display: none;
}

.services {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    max-height: 280px;
    flex-wrap: wrap;

    input {
        width: unset !important;
    }

    .service {
        flex-basis: calc((100% - 3rem) / 4);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
    }
}

.fakeInput {
    margin-bottom: 0.5rem
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
            cursor: pointer;

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