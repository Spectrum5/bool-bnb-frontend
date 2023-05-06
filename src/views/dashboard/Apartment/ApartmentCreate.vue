<script>

// Utilities
import { store } from '../../../store';
import { router } from '../../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppErrorForm from '../../../components/AppErrorForm.vue';
import AppButton from '../../../components/AppButton.vue';

export default {
    name: 'ApartmentCreate',
    components: {
        AppDashboardLayoutVue,
        AppErrorForm,
        AppButton
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
            apartmentCreated: false,
            previewUrls: [],
            url_api_tomtom: 'https://api.tomtom.com/search/2/geocode/',
            api_key_tomtom: import.meta.env.VITE_TOMTOM_API_KEY,
            services: [],
            ApartmentCreated: false,
        };
    },
    methods: {
        getFormData() {
            // Ottiene i dati necessari al form
            axios.get('http://localhost:8000/api/apartments/create')
                .then(response => {
                    this.services = response.data.services;
                })
        },
        handleCreateApartment() {
            this.validateData();
        },
        validateData() {
            // Front End Validation
            console.log('Validazione Dati Crea Appartamento...');

            // Reset Form Validation
            this.store.errors = [];

            this.store.titleValidation('title');
            this.store.priceValidation('price');
            this.store.sizeValidation('size');
            this.store.addressValidation('address');
            this.store.roomsNumberValidation('rooms_number');
            this.store.bedsNumberValidation('beds_number');
            this.store.bathroomsNumberValidation('bathrooms_number');
            this.store.descriptionValidation('description');
            // this.store.visibilityValidation('visibility');
            this.store.servicesValidation(this.form.services);
            this.store.imageValidation('images', this.previewUrls);

            this.store.shakeInputs();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.getCoordinates();
            else console.log('Hai inserito dati non corretti. Riprova!');
        },
        async getCoordinates() {
            // Ottiene le coordinate dall'indirizzo
            const coordinates = await fetch(`${this.url_api_tomtom}${this.form.address}.json?key=${this.api_key_tomtom}&typeahead=true&limit=1&radius=500`);
            // const data = await coordinates.blob();
            let json = await coordinates.json();
            console.log('COORDINATE', json.results[0].position);
            this.form.lat = json.results[0].position.lat;
            this.form.lng = json.results[0].position.lon;
            this.postData();
        },
        addFiles(fieldName, fileList) {
            // Gestisce la creazione degli URL per le previews e aggiunge le immagini al campo del form
            this.form.images = fileList;
            for (let i = 0; i < fileList.length; i++) {
                this.previewUrls.push(URL.createObjectURL(fileList[i]));
            }
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
                    this.postImages(response.data.apartment_id);
                    console.log('Appartamento Aggiunto', response.data);
                })
                .catch((response) => {
                    this.addError('Errore del server. Riprovare piú tardi', 'server_error');
                    console.log('Errore Invio dati Register:', response.response);
                })
            this.ApartmentCreated = true;
            setTimeout(() => {
                router.push('/dashboard/apartments');
            }, 1500);
        },
        postImages(id) {
            // Gestisce l'invio delle immagini al database
            const images = this.form.images;
            let config = {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const formData = new FormData();
            formData.append('apartment_id', id);
            for (let i = 0; i < images.length; i++) {
                formData.append(`image-${i}`, images[i]);
            }

            axios.post('http://localhost:8000/api/images', formData, config)
                .then((response) => {
                    console.log("Immagini Inviate Correttamente");
                })
        },
        deleteImage(index) {
            // Gestisce l'eliminazione delle immagini appena aggiunte
            this.previewUrls.splice(index, 1);

            const images = [...this.form.images]; // crea una copia dell'oggetto images
            images.splice(index, 1); // rimuove il secondo elemento dell'oggetto
            const dataTransfer = new DataTransfer();
            for (let i = 0; i < this.form.images.length; i++) {
                if (i !== 1) { // salta il secondo elemento
                    dataTransfer.items.add(this.form.images.item(i));
                }
            }
            this.form.images = dataTransfer.files;
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
        document.title = 'Dashboard | Crea Appartamento';
        this.getFormData();
        const self = this;
        this.store.setAutocomplete('address', self);
    }
}
</script>

<template>
    <AppDashboardLayoutVue :title="'aggiungi il tuo appartamento'" :button="{
        label: 'Torna alla dashboard',
        icon: 'arrow-left',
        action: goApartments
    }">

        <!-- FORM PER CREATE -->
        <form @submit.prevent="handleCreateApartment()">
            <!-- Titolo -->
            <div class="row">
                <div class="group large">
                    <label for="title">Inserisci nome appartamento: *</label>
                    <input v-model="form.title" type="text" name="title" id="title" max="255"
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
                    <label>Indica se il tuo appartamento non sarà subito disponibile</label>
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
                        <span class="service" v-for="service in services">
                            <input v-model="form.services" type="checkbox" :name="service.name" :id="service.name"
                                :value="service.id">
                            <label :for="service.name" class="text-capitalize">{{ service.name }}</label>
                        </span>
                    </div>
                    <p class="fieldError">{{ getFieldError('services') }}</p>
                </div>
            </div>

            <!-- Immagini -->
            <div class="row">
                <div class="group large">
                    <label class="mb-2" for="images">Aggiungi le immagini *</label>
                    <div class="container">
                        <label for="images" class="fakeInput" :class="previewUrls.length >= 3 ? 'disabled' : ''">
                            <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                            add images
                        </label>
                        <input name="images" id="images" type="file" accept="image/*" multiple
                            @change="addFiles($event.target.name, $event.target.files)" :disabled="previewUrls.length >= 3"
                            v-on:blur="store.imageValidation('images')">
                        <transition name="fade">
                            <div class="previews" v-if="previewUrls.length > 0">
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
            </div>

            <!-- Submit -->
            <div class="row">
                <AppButton :label="'appartamento aggiunto'" :icon="'check'" :type="'solid'" :palette="'success'"
                    :disabled="true" v-if="apartmentCreated" />
                <AppButton :label="'aggiungi appartamento'" :icon="'plus'" :type="'solid'" :palette="'primary'" v-else />
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
        width: 100%;
    }
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

.invalid {
    border: 1px solid $danger-color-dark !important;
}

#images {
    display: none;
}

.previews {
    @include flexRowCenter(5px);
    width: fit-content;
    margin-top: 10px;
    padding: 10px;
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