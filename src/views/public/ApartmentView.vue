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
import AppButton from '../../components/AppButton.vue';
import AppLoading from '../../components/AppLoading.vue';

export default {
    name: 'ApartmentView',
    components: {
        PublicPageLayout,
        AppErrorForm,
        AppGoBack,
        AppButton,
        AppLoading
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
            requestSent: false,
        }
    },
    methods: {
        handleMessage() {
            this.validateData();
        },
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
                })
                .catch((response) => {
                    console.log('Errore Richiesta Appartamento', response.data);
                })
        },
        async getMap() {
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

        // FUNZIONE PER VALIDAZIONI CONTATTI

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
            else {
                const index = this.store.errors.findIndex(error => error.field === "email");
                this.store.errors.splice(index, 1);
            }
        },
        messageValidation() {
            const messageInput = document.getElementById('message');
            messageInput.classList.remove('invalid');

            const messageValue = messageInput.value.trim();

            if (messageValue.length == 0) {
                this.addError('Non hai inserito un messaggio', 'message');
                messageInput.classList.add('invalid');
            }
            else if (messageValue.length < 10) {
                this.addError('Il messaggio deve essere di almeno 10 caratteri', 'message');
                messageInput.classList.add('invalid');
            } else if (messageValue.length > 4096) {
                this.addError('Il messaggio deve essere di massimo 4096 caratteri', 'message');
                messageInput.classList.add('invalid');
            } else {
                const index = this.store.errors.findIndex(error => error.field === "message");
                this.store.errors.splice(index, 1);
            }
        },
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
            // Front End Validation
            console.log('Validazione dati messaggio...');
            this.store.errors = [];

            this.emailValidation();
            this.messageValidation();

            this.shakeInputs();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.sendMessage();
            else console.log('Hai inserito dati non corretti. Riprova.');
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
                this.requestSent = true;
                setTimeout(() => {
                    this.requestSent = false;
                    this.message.text = '';
            }, 2000);
        }
    },
    mounted() {
        document.title = 'Boolbnb';
        this.getApartment();
    }
}
</script>

<template>
    <PublicPageLayout>

        <!-- CONTAINER PRINCIPALE -->
        <div class="container" v-if="this.apartment">
            <AppGoBack :label="'torna alla home'" />

            <div class="body">
                <div class="leftColumn">
                    <!-- TITOLO E INDIRIZZO -->
                    <section id="title-address">
                        <h1 class="mainTitle">{{ apartment.title }}</h1>
                        <h4 class="address">Dove si trova:
                            <strong>
                                <a href="#map">{{ apartment.address }}</a>
                            </strong>
                        </h4>
                    </section>

                    <!-- IMMAGINI APARTMENT -->
                    <section id="imagesSection">
                        <swiper-container id="slider" :navigation="true" :pagination="true" :centered-slides="true"
                            :slides-per-view="2" :space-between="25">
                            <swiper-slide class="slide" v-for="image in apartment.images">
                                <img :src="`http://localhost:8000/storage/apartments/${image.url}`" :alt="apartment.title">
                            </swiper-slide>
                        </swiper-container>
                    </section>

                    <!-- INFO APARTMENT STANZE, LETTI, BAGNI -->
                    <section class="my-3">
                        <h3 id="host-name" class="text-capitalize mb-1">Host: {{ apartment.user.first_name }} {{
                            apartment.user.last_name }}</h3>
                        <p class="amenities mb-3">
                            <span>{{ apartment.rooms_number }} camere da letto</span>
                            &#183;
                            <span>{{ apartment.beds_number }} posti letto</span>
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
                                <div class="service" v-for="service in apartment.services">
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
                                    <i class="fa-solid fa-bed"></i>
                                    <font-awesome-icon icon="fa-solid fa-bed" />
                                </span>
                                <p>1 letto matrimoniale a due piazze</p>
                            </div>
                            <!-- Se il numero di letti diviso il numero delle stanze è pari avrò anche qui letti matrimoniali in ogni stanza-->
                            <div v-else-if="(apartment.beds_number / apartment.rooms_number) % 2 == 0">
                                <span v-for="i in (apartment.beds_number / apartment.rooms_number)">
                                    <font-awesome-icon icon="fa-solid fa-bed" />
                                </span>
                                <p>1 letto matrimoniale a due piazze</p>
                                <!--  -->
                            </div>
                            <div v-else>
                                <div>
                                    <span v-for=" i in (Math.floor(apartment.beds_number / apartment.rooms_number))">
                                        <i class="fa-solid fa-bed"></i>
                                        <font-awesome-icon icon="fa-solid fa-bed" />
                                    </span>
                                    <p v-if="i == apartment.rooms_number">
                                        {{ Math.floor(apartment.beds_number / apartment.rooms_number)}} letto
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
                        <div id="map">
                            <img :src="this.mapUrl" alt="" v-if="this.mapUrl">
                        </div>
                    </section>
                </div>

                <div class="rightColumn">
                    <!-- SEZIONE CONTATTA L'HOST -->
                    <div class="contact formContainer">
                        <h3 class="text-center mb-3">Contatta l'host</h3>
                        <h4 class="mb-3">
                            <strong>
                                € {{ apartment.price }}
                            </strong>
                            / per notte
                        </h4>
                        <form @submit.prevent="handleMessage()">
                            <div class="row">
                                <div class="group large">
                                    <label for="email">Indirizzo email</label>
                                    <input type="email" id="email" name="email" placeholder="Inserisci la tua mail"
                                        v-model="message.contactEmail" :disabled="setContactEmail()"
                                        v-on:blur="emailValidation()">
                                </div>
                            </div>

                            <div class="row">
                                <div class="group large">
                                    <label for="message" class="form-label mb-1">Scrivi il tuo messaggio</label>
                                    <textarea class="form-control" name="message" id="message" rows="6"
                                        placeholder="Scrivi il tuo messaggio" v-model="message.text"
                                        v-on:blur="messageValidation()"></textarea>
                                </div>
                            </div>

                            <div class="row">
                                <AppButton v-if="!this.requestSent" :label="'Invia messaggio'" :type="'solid'" :palette="'primary'" />
                                <AppButton v-if="this.requestSent" :label="'Messaggio inviato!'" :type="'solid'" :palette="'success'" />
                            </div>
                        </form>
                        <AppErrorForm />
                    </div>
                </div>
            </div>
        </div>

        <AppLoading v-else />

    </PublicPageLayout>
</template>

<style lang="scss" scoped>
@use '../../styles/partials/form.scss' as *;
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;

.container {
    @include largeContainer;
    padding-top: 1rem;
}

.body {
    display: flex;
    width: 100%;
    gap: 1.5rem;

    .leftColumn {
        flex-basis: 75%;
    }

    .rightColumn {
        flex-basis: 25%;
    }
}

.my-btn-created{
    background: linear-gradient(90deg, rgba(86, 219, 117, 1) 25%, rgba(40, 167, 69, 1) 75%);
    border: rgb(40, 167, 69)!important;
}

section:not(#title-address, section:last-of-type) {
    border-bottom: 1px solid;
    padding: 15px 0;
}

.address {
    margin-bottom: 1rem;

    a {
        color: gray;
    }
}

#imagesSection {
    max-width: 1100px;

    #slider {
        width: 100%;
        padding: 1rem;
        --swiper-navigation-color: #f39237;
        --swiper-pagination-color: #ffffff;
    }

    .slide {
        @include customShadow;
        width: calc(100% / 3);
        height: 400px;
        overflow: hidden;
        border-radius: 8px;
        opacity: 0.6;

        &.swiper-slide-active {
            opacity: 1;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    }
}

#host-name {
    font-weight: 700;
}

.description {
    text-align: justify;
    text-justify: inter-word;
}

.service {
    background-color: $light-color-one;
    border: 1px solid;
    border-radius: 5px;
    padding-inline: 7px;
    margin-right: 7px;
    display: inline-block;
    margin-bottom: 7px;
    vertical-align: middle;
    line-height: 25px;
    text-transform: capitalize;

    span {
        vertical-align: middle;
        line-height: 25px;
        font-size: 0.8rem;
    }
}

.room-desc {
    background-color: $light-color-one;
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

#map {
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
    margin-left: auto;
    border: 1px solid;
    align-self: flex-start;
    position: sticky;
    top: 100px;
    z-index: 1;
}

.row:last-child:deep button {
    width: 100%;
}
</style>