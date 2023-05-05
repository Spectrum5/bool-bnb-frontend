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
import AppBadge from '../../components/AppBadge.vue';

export default {
    name: 'ApartmentView',
    components: {
        PublicPageLayout,
        AppErrorForm,
        AppGoBack,
        AppButton,
        AppLoading,
        AppBadge
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
            rooms: [],
            messageSent: false,
            ip_address: null
        }
    },
    methods: {
        getApartment() {
            // Richiesta dell'appartamento corrispondente allo slug passato come parametro
            axios.get(`http://localhost:8000/api/apartments/${this.$route.params.slug}`)
                .then((response) => {
                    // console.log('Appartamento Show', response.data.apartment);
                    this.apartment = response.data.apartment;
                    document.title = `Boolbnb | ${this.apartment.title}`;

                    this.getMap();
                    this.getIp();
                    this.defineRoomsStructure();
                })
                .catch((response) => {
                    // console.log('Errore Richiesta Appartamento', response.data);
                })
        },
        async getMap() {
            const map = await fetch(`${this.url_api_tomtom}/1/staticimage?key=${this.api_key_tomtom}&zoom=15&center=${this.apartment.lng},${this.apartment.lat}&format=png&layer=basic&style=main&width=1305&height=748&view=Unified&language=it-IT`);
            const data = await map.blob();
            this.mapUrl = URL.createObjectURL(data);
        },
        async getIp() {
            const ip = await fetch('https://api.ipify.org?format=json');
            this.ip_address = await ip.json();
            await this.saveView();
        },
        async saveView() {
            axios.post(`http://localhost:8000/api/views`, {
                ip_address: this.ip_address.ip,
                apartment_id: this.apartment.id
            })
                .then(response => {
                    // console.log('Invio Informazioni View OK', response);
                })
                .catch(response => {
                    // console.log('Errore Invio Informazioni View', response);
                })
        },
        setContactEmail() {
            // Imposta l'email nel form messaggio se l'utente e' loggato
            if (store.user != null) {
                this.message.contactEmail = this.store.user.email;
                return true;
            }
        },
        handleMessage() {
            this.validateData();
        },
        validateData() {
            // Front End Validation
            // console.log('Validazione dati messaggio...');
            this.store.errors = [];

            this.store.emailValidation('email');
            this.store.messageValidation('message');

            this.store.shakeInputs();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.sendMessage();
            else console.log('Hai inserito dati non corretti. Riprova.');
        },
        sendMessage() {
            // console.log('Invio messaggio...');

            axios.post('http://localhost:8000/api/messages', {
                email: this.message.contactEmail,
                message: this.message.text,
                apartment_id: this.apartment.id
            })
                .then((response) => {
                    
                    // Cambio del button
                    this.messageSent = true;
                    
                    setTimeout(() => {
                        this.messageSent = false;
                        this.message.text = '';
                    }, 2000);

                    // console.log('Messaggio Inviato', response);
                })
                .catch((response) => {
                    // console.log('Errore Messaggio', response.data);
                })
        },
        defineRoomsStructure() {
            // Divide i letti disponibili nelle stanze disponibili (max 2 letti per stanza)
            let tot_beds = this.apartment.beds_number;

            for (let i = 0; i <= this.apartment.rooms_number; i++) {

                if (tot_beds > 1 && tot_beds % 2 == 0) {
                    this.rooms.push({
                        bed: 'large'
                    })
                    tot_beds = tot_beds - 2;
                }
                else if (tot_beds > 1 && tot_beds % 2 == 1) {
                    this.rooms.push({
                        bed: 'small'
                    })
                    tot_beds = tot_beds - 1;
                }
                else if (tot_beds == 1) {
                    this.rooms.push({
                        bed: 'small'
                    })
                    tot_beds = 0;
                }
            }
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
                        <div class="row">
                            <h1 class="mainTitle">{{ apartment.title }}</h1>
                            <AppBadge :label="`${apartment.sponsors[0].title}`" :palette="`${apartment.sponsors[0].title}`"
                                :icon="'award'" v-if="apartment.sponsors.length > 0" />
                        </div>
                        <div class="row">
                            <h4 class="address">Dove si trova:
                                <strong>
                                    <a href="#map">{{ apartment.address }}</a>
                                </strong>
                            </h4>
                        </div>
                    </section>

                    <!-- IMMAGINI APARTMENT -->
                    <section id="imagesSection">
                        <swiper-container id="slider" :navigation="true" :pagination="true" :centeredSlides="true"
                            :breakpoints="{
                                '700': {
                                    slidesPerView: 1,
                                    // spaceBetween: 20,
                                },
                                '1024': {
                                    slidesPerView: 3,
                                    // spaceBetween: 30,
                                },
                            }" :space-between="25">
                            <swiper-slide class="slide" v-for="image in apartment.images">
                                <img :src="`http://localhost:8000/storage/apartments/${image.url}`" :alt="apartment.title">
                            </swiper-slide>
                        </swiper-container>
                    </section>

                    <!-- INFO APARTMENT STANZE, LETTI, BAGNI -->
                    <section>
                        <h3 id="host-name" class="text-capitalize mb-1">Host: {{ apartment.user.first_name }} {{
                            apartment.user.last_name }}</h3>
                        <p class="amenities mb-3">
                            <span>{{ apartment.rooms_number }} camere da letto</span>
                            &#183;
                            <span>{{ apartment.beds_number }} posti letto</span>
                            &#183;
                            <span>{{ apartment.bathrooms_number }} bagni</span>
                            &#183;
                            <span>{{ apartment.size }} mq</span>
                        </p>
                    </section>

                    <!-- DESCRIZIONE APARTMENT -->
                    <section>
                        <div class="description">
                            <h3 class="mb-1">Descrizione</h3>
                            <p>
                                {{ apartment.description }}
                            </p>
                        </div>
                    </section>

                    <!-- SERVIZI APARTMENT -->
                    <section>
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

                    <section>
                        <h3 class="mb-1">Dove dormirai</h3>
                        <div class="cardsContainer" v-if="this.rooms">
                            <div class="card" v-for="room, index in rooms">
                                <div>
                                    <span class="title">Camera da letto {{ index + 1 }}</span>
                                </div>
                                <div>
                                    <div class="icons">
                                        <font-awesome-icon icon="fa-solid fa-bed" class="icon" />
                                        <font-awesome-icon icon="fa-solid fa-bed" class="icon" v-if="room.bed == 'large'" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- SEZIONE MAPPA -->
                    <section>
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
                                    <input type="text" id="email" name="email" placeholder="Inserisci la tua mail"
                                        v-model="message.contactEmail" :disabled="setContactEmail()"
                                        v-on:blur="store.emailValidation('email')">
                                        <!-- > -->
                                </div>
                            </div>

                            <div class="row">
                                <div class="group large">
                                    <label for="message" class="form-label mb-1">Scrivi il tuo messaggio</label>
                                    <textarea class="form-control" name="message" id="message" rows="6"
                                        placeholder="Scrivi il tuo messaggio" v-model="message.text" :disabled="messageSent"
                                        v-on:blur="store.messageValidation('message')"></textarea>
                                </div>
                            </div>

                            <div class="row">
                                <AppButton :label="'messaggio inviato'" :type="'solid'" :palette="'success'" :icon="'check'"
                                    :disabled="true" v-if="messageSent" />
                                <AppButton :label="'invia messaggio'" :type="'solid'" :palette="'primary'" v-else />
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
    padding: 1rem;
    // padding-top: 1rem;
}

.body {
    display: flex;
    width: 100%;
    // gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: space-between;

    .leftColumn {
        flex-basis: 40%;
    }

    .rightColumn {
        flex-basis: 25%;
    }
}

section {
    margin-bottom: 1rem;
}

section:not(#title-address, section:last-of-type) {
    border-bottom: 1px solid;
    padding: 15px 0;
}

#title-address .row {
    @include flexRowCenter (1rem);
    justify-content: flex-start;

    // background-color: green;
    .mainTitle {
        margin-bottom: 0;
    }
}

.address {
    margin-bottom: 1rem;

    a {
        color: gray;
    }
}

#imagesSection {
    max-width: 1100px;
    // background-color: red;

    #slider {
        width: 100%;
        padding: 1rem;
        --swiper-navigation-color: #f39237;
        --swiper-pagination-color: #ffffff;
    }

    .slide {
        @include customShadow;
        // width: calc(100% / 3);
        // width: 100%;
        // max-width: 400px;
        height: 400px;
        overflow: hidden;
        border-radius: 8px;
        opacity: 0.6;
        // border: 2px solid green;

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

.cardsContainer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.card {
    background-color: $light-color-one;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    width: 150px;

    .title {
        font-weight: 600;
        font-size: 0.85rem;
    }

    .icon {
        margin-right: 5px;
    }

    .text {
        font-size: 0.9rem;
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
    // width: 50%;
    // height: 450px;
    // max-width: 600px;
    width: 100%;
    background-color: bisque;
    // border: 1px dashed;
    // border: 1px solid $dark-color-one;

    >img {
        display: block;
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

@media screen and (max-width: 1560px) {
    .body {
        >* {
            flex-basis: 100% !important;
            max-width: 100%;
        }
    }

    #imagesSection {
        width: 100%;
        max-width: unset;
    }
}

@media screen and (max-width: 840px) {
    .cardsContainer {
        justify-content: space-between;

        .card {
            width: calc(50% - 0.5rem);
        }
    }

    #map {
        height: 450px;
    }
}
</style>