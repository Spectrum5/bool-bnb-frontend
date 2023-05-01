<script>

// Utilities
import axios from 'axios';
import { router } from '../../router';
import { store } from '../../store';
import { register } from 'swiper/element/bundle';
register();

// Components
import PublicPageLayout from './PublicPageLayout.vue';
import AppErrorForm from '../../components/AppErrorForm.vue';
import AppGoBack from '../../components/AppGoBack.vue';

export default {
    name: 'ApartmentView',
    components: {
        PublicPageLayout,
        AppErrorForm,
        AppGoBack
    },
    data() {
        return {
            router,
            store,
            apartment: null,
            url_api_tomtom: 'https://api.tomtom.com/map',
            api_key_tomtom: 'Vru3uP06eapOxpYMujwrRlVLMB5Vkqch',
            mapUrl: null,
            message: {
                contactEmail: null,
                text: ''
            },
            images: [],
        }
    },
    methods: {
        addError(message, field) {
            // Controlla se in store.errors sono presenti errori con lo stesso campo di quello passato
            // e se non ci sono aggiunge l'errore passato come argomento, altrimenti no
            if (this.store.errors.length == 0) {
                this.store.errors.push({
                    message: message,
                    field: field
                });
            }
            else {
                if (!this.store.errors.some(error => error.field == field)) {
                    this.store.errors.push({
                        message: message,
                        field: field
                    });
                }
            }
        },
        getApartment() {
            // Richiesta dell'appartamento corrispondente allo slug passato come parametro
            axios.get(`http://localhost:8000/api/apartments/${this.$route.params.slug}`)
                .then((response) => {
                    console.log('Appartamento Show', response.data.apartment);
                    this.apartment = response.data.apartment;
                    document.title = `Boolbnb | ${this.apartment.title}`;

                    // Richiede la mappa solo dopo aver ricevuto le coordinate dell'appartamento
                    this.getMap();

                    // Richiede le immagini dopo aver salvato i valori dell'appartamento in this.apartment
                    // this.getImages();
                })
                .catch((response) => {
                    console.log('Errore Richiesta Appartamento', response.data);
                })
        },

        getImages() {
            axios.get(`http://localhost:8000/api/images/${this.apartment.id}`)
                .then((response) => {
                    this.images = response.data.images;
                    console.log('Images', response.data);
                })
        },
        async getMap() {
            // const map = await fetch(`${this.url_api_tomtom}/1/staticimage?`, {
            //     key: this.api_key_tomtom,
            //     zoom: 15,
            //     center: `${this.apartment.lng},${this.apartment.lat}`,
            //     format: 'png',
            //     layer: 'basic',
            //     style: 'main',
            //     width: 1305,
            //     height: 748,
            //     view: 'Unified',
            //     language: 'it-IT'
            // });
            const map = await fetch(`${this.url_api_tomtom}/1/staticimage?key=${this.api_key_tomtom}&zoom=15&center=${this.apartment.lng},${this.apartment.lat}&format=png&layer=basic&style=main&width=1305&height=748&view=Unified&language=it-IT`);
            const data = await map.blob();
            this.mapUrl = URL.createObjectURL(data);
        },
        setContactEmail() {
            if (store.user != null) {
                this.message.contactEmail = this.store.user.email;
                return true;
            }
        },
        emailValidation() {
            let emailInput = document.getElementById('email');
            emailInput.classList.remove('invalid');

            // Email Validation
            if (emailInput.value.trim().length == 0) {
                this.addError('Il campo email deve essere compilato', 'email');
                emailInput.classList.add('invalid');
            }
            else if (emailInput.value.trim().length < 10) {
                this.addError('L\'email deve essere lunga almeno 10 caratteri', 'email');
                emailInput.classList.add('invalid');
            }
            else if (emailInput.value.trim().length > 64) {
                this.addError('L\'email non deve superare i 64 caratteri', 'email');
                emailInput.classList.add('invalid');
            }
            else if (!emailInput.value.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                this.addError('La tua email contiene caratteri non permessi', 'email');
                emailInput.classList.add('invalid');
            }
        },

        messageValidation() {
            const messageInput = document.getElementById('message');
            messageInput.classList.remove('invalid');

            const messageValue = messageInput.value.trim();

            if (messageValue.length < 10) {
                this.addError('Il messaggio deve essere di almeno 10 caratteri', 'message');
                messageInput.classList.add('invalid');
            } else if (messageValue.length > 4096) {
                this.addError('Il messaggio deve essere di massimo 4096 caratteri', 'message');
                messageInput.classList.add('invalid');
            }
        },
        sendMessage() {
            console.log('Invio messaggio...');

            axios.post('http://localhost:8000/api/messages', {
                email: this.message.contactEmail,
                message: this.message.text,
                apartment_id: this.apartment.id
            })
                .then((response) => {
                    console.log('Messaggio Inviato', response);
                })
                .catch((response) => {
                    console.log('Errore Messaggio', response.data);
                })
        }
    },
    mounted() {
        document.title = 'Boolbnb';
        this.getApartment();
        // this.getImages();
    }
}
</script>

<template>
    <PublicPageLayout>
        <AppGoBack :label="'torna alla home'"/>
        <!-- <button class="btn" @click="$router.push('/')">torna alla home</button> -->

        <!-- CONTAINER PRINCIPALE -->
        <div class="container" v-if="this.apartment">
            <!-- TITOLO E INDIRIZZO -->
            <section id="title-address">
                <h2 class="mb-2">{{ apartment.title }}</h2>
                <h4 class="mb-4">Dove si trova:
                    <strong>
                        <span class="text-decoration-underline">
                            <a class="text-dark" href="#maps">{{ apartment.address }}</a>
                        </span>
                    </strong>
                </h4>
            </section>
            <!-- SEZIONE IMMAGINI APARTMENT -->
            <div>
                <swiper-container id="slider" :navigation="true" :pagination="true" :slides-per-view="3">
                    <swiper-slide class="slide" v-for="image in apartment.images">
                        <img :src="`http://localhost:8000/storage/apartments/${image.url}`" :alt="apartment.title">
                    </swiper-slide>
                </swiper-container>
            </div>
            <!-- CONTAINER PER INFO APARTMENT + MESSAGGIO -->
            <div class="my-secondary-container my-4">
                <div>
                    <!-- INFO APARTMENT STANZE, LETTI, BAGNI -->
                    <section class="my-3">
                        <h3 id="host-name" class="text-capitalize mb-1">Host: {{ apartment.user.first_name }} {{
                            apartment.user.last_name }}</h3>
                        <p class="amenities mb-3">
                            <span>{{ apartment.rooms_number }} camere da letto</span>
                            &#183;
                            <span>{{ apartment.beds_number }} letti</span>
                            &#183;
                            <span>{{ apartment.bathrooms_number }} bagni</span>
                        </p>
                    </section>
                    <!-- DESCRIZIONE APARTMENT -->
                    <section class="my-3">
                        <div class="description">
                            <h3 class="mb-1">Descrizione</h3>
                            <p>
                                {{ apartment.description }}
                            </p>
                        </div>
                    </section>
                    <!-- SERVIZI APARTMENT -->
                    <section class="my-3">
                        <div>
                            <h3 class="mb-1">Cosa troverai</h3>
                            <div>
                                <div class="services" v-for="service in apartment.services">
                                    <span>
                                        <font-awesome-icon :icon="`fa-solid fa-${service.icon}`" />
                                    </span>
                                    {{ service.name }}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="my-3">
                        <h3 class="mb-1">Dove dormirai</h3>
                        <div class="room-desc d-inline-block mb-1" v-for="i in apartment.rooms_number">
                            <h6 class="mb-1">Camera da letto {{ i }}</h6>
                            <!-- Se il numero di camere e il numero di letti è pari, avrò un letto matrimoniale per ogni stanza -->
                            <div v-if="apartment.beds_number % 2 == 0 && apartment.rooms_number % 2 == 0">
                                <span v-for="i in (apartment.beds_number / apartment.rooms_number)">
                                    <!-- <i class="fa-solid fa-bed"></i> -->
                                    <font-awesome-icon icon="fa-solid fa-bed" />
                                </span>
                                <p>1 letto matrimoniale a due piazze</p>
                            </div>
                            <div v-else>
                                <div>
                                    <span v-for=" i in (Math.floor(apartment.beds_number / apartment.rooms_number))">
                                        <!-- <i class="fa-solid fa-bed"></i> -->
                                        <font-awesome-icon icon="fa-solid fa-bed" />
                                    </span>
                                    <p v-if="i == apartment.rooms_number">
                                        {{ Math.floor(apartment.beds_number / apartment.rooms_number) - 1 }} letto
                                        matrimoniale
                                        + 1 letto singolo
                                    </p>
                                    <p v-else>{{ Math.floor(apartment.beds_number / apartment.rooms_number) }} letti singoli
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- SEZIONE MAPPA -->
                    <section class="my-3">
                        <h3 class="mb-1">Dove ti troverai</h3>
                        <div id="maps">
                            <img :src="this.mapUrl" alt="" v-if="this.mapUrl">
                        </div>
                    </section>
                </div>

                <!-- SEZIONE CONTATTA L'HOST -->
                <div class="contact">
                    <h3 class="text-center mb-3">Contatta l'host</h3>
                    <h4 class="mb-3">
                        <strong>
                            € {{ apartment.price }}
                        </strong>
                        / per notte
                    </h4>
                    <form @submit.prevent="sendMessage()">
                        <div class="row">
                            <div class="group large">
                                <label for="email">Indirizzo email</label>
                                <input type="email" id="email" name="email" placeholder="Inserisci la tua mail"
                                    v-model="message.contactEmail" :disabled="setContactEmail()">
                            </div>
                            <div class="row">
                                <div class="group large">
                                    <label for="message" class="form-label mb-1">Scrivi il tuo messaggio</label>
                                    <textarea class="form-control" name="message" id="message" rows="6"
                                        placeholder="Scrivi il tuo messaggio" v-model="message.text"></textarea>
                                </div>
                            </div>
                            <button type="submit" class="btn my-btn">Invia richiesta</button>
                            <AppErrorForm />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </PublicPageLayout>
</template>

<style lang="scss" scoped>
@use '../../styles/partials/form.scss' as *;

.btn {
    border: 1.5px solid #000;
    border-radius: 10px;
    padding: 7px;
    margin: 5px;
}

section:not(#title-address, section:last-of-type) {
    border-bottom: 1px solid;
    padding: 15px 0;
}

a {
    color: black;
}

img {
    display: inline-block;
    height: 450px;
    width: 650px;
    border-radius: 8px;
    object-position: center;
}

h3,
h4 {
    font-weight: 600;
}

.container {
    margin: auto;
    margin-top: 40px;
    max-width: 75%;
    // border: 1px dashed black;
}

.my-secondary-container {
    display: flex;
    gap: 40px;
    justify-content: space-between;
    // margin-top: 40px;

    #host-name {
        font-weight: 700;
    }

    .description {
        text-align: justify;
        text-justify: inter-word;
    }

    .room-desc {
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
        margin-right: 10px;

        h6 {
            font-weight: 700;
            font-size: 1rem;
        }

        span {
            margin-right: 5px;
        }

        p {
            font-size: 0.8rem;
        }
    }

    .maps {
        border: 1px solid;
        height: 450px;
        width: 600px;
        background-color: antiquewhite;
    }
}

.services {
    border: 1px solid;
    border-radius: 5px;
    padding-inline: 7px;
    margin-right: 7px;
    display: inline-block;
    margin-bottom: 7px;
    vertical-align: middle;
    line-height: 25px;

    // text-transform: capitalize;
    span {
        vertical-align: middle;
        line-height: 25px;
        font-size: 0.8rem;
    }
}

#maps {
    height: 450px;
    width: 600px;
    background-color: bisque;
    border: 1px dashed;

    >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.contact {
    margin-top: 27px;
    min-width: 40%;
    margin-left: auto;
    border: 1px solid;
    border-radius: 10px;
    padding: 1rem;
    align-self: flex-start;
    position: sticky;
    top: 70px;
    z-index: 1;

    input,
    textarea {
        width: 100%;
        border: 1px solid black;
        line-height: 30px;
        border-radius: 10px;
        padding: 3px 0 3px 7px;
    }

    // textarea{
    //     width: 100%;
    //     border: 1px solid black;
    //     border-radius: 10px;
    //     padding: 3px 0 3px 7px;
    // }
    .my-btn {
        display: block;
        width: 100%;
        color: white;
        font-weight: 700;
        padding: 10px 0px;
        border-radius: 10px;
        background-color: #ff4a86;
        border: #ff4a86 !important;
    }

    // textarea::placeholder,
    // input::placeholder {
    //     font-size: 0.8rem;
    // }
}
</style>

<!-- $color-one-dark: #d63a5c;
$color-one-light: #ff4a86; -->