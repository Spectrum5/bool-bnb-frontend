<script>

import axios from 'axios';    
import { router } from '../../router';

export default {
    name: 'ApartmentView',
    data() {
        return {
            router,
            apartment: null,
        }
    },
    methods: {
        getApartments() {
            // console.log('Slug mio apartment' + this.$route.params.slug);
            axios.get(`http://localhost:8000/api/apartments/${this.$route.params.slug}`)
                .then((response) => {
                    console.log('Index Appartamenti', response.data.apartment);
                    this.apartment = response.data.apartment;
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti', response.data);
                })
        },    
    },
    created() {
        this.getApartments();
    }
}
</script>

<template>
    <div @click="$router.push('/')">torna alla home</div>

    <!-- CONTAINER PRINCIPALE -->
    <div class="container">
        <!-- TITOLO E INDIRIZZO -->
        <section>
            <h3 class="mb-2">{{ apartment.title }}</h3>
            <h6 class="mb-4">Dove si trova: 
                <strong>
                    <span class="text-decoration-underline">
                        <a class="text-dark" href="#maps">{{ apartment.address }}</a>
                    </span>
                </strong>
            </h6>
        </section>
        <!-- SEZIONE IMMAGINI APARTMENT -->
        <div>
            <img src="https://thumbs.dreamstime.com/b/camera-classica-con-il-giardino-di-fiore-751996.jpg" alt="">
        </div>
        <!-- CONTAINER PER INFO APARTMENT + MESSAGGIO -->
        <div class="my-secondary-container mt-4">
            <div>
                <!-- INFO APARTMENT STANZE, LETTI, BAGNI -->
                <section class="my-3">
                    <h4 id="host-name" class="text-capitalize mb-1">Host: {{ apartment.user.first_name }} {{ apartment.user.last_name }}</h4>
                    <p class="amenities mb-3">
                        <span>{{ apartment.rooms_number }} camere da letto</span>
                        &#183;
                        <span>{{ apartment.beds_number }} letti</span>
                        &#183;
                        <span>{{ apartment.bathrooms_number }} bagni</span>
                    </p>
                </section>
                <hr>
                <!-- DESCRIZIONE APARTMENT -->
                <section class="my-3">
                    <div class="description">
                        <h4 class="mb-1">Descrizione</h4>
                        <p>
                            {{ apartment.description }}
                        </p>
                    </div>
                </section>
                <hr>
                <!-- SERVIZI APARTMENT -->
                <section class="my-3">
                    <div>
                        <h4 class="mb-1">Cosa troverai</h4>
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
                <hr>
                <section class="my-3">
                    <h4 class="mb-1">Dove dormirai</h4>
                    <div class="room-desc d-inline-block mb-1" v-for="i in apartment.rooms_number">
                        <h6 class="mb-1">Camera da letto {{ i }}</h6>
                        <!-- Se il numero di camere e il numero di letti è pari, avrò un letto matrimoniale per ogni stanza -->
                        <div v-if="apartment.beds_number % 2 == 0 && apartment.rooms_number % 2 == 0">
                            <span v-for="i in (apartment.beds_number / 2)">
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
                                    {{ Math.floor(apartment.beds_number / apartment.rooms_number) - 1 }} letto matrimoniale + 1 letto singolo
                                </p>
                                <p v-else>{{ Math.floor(apartment.beds_number / apartment.rooms_number) }} letti singoli</p>
                            </div>
                        </div>
                    </div>                
                </section>
                <hr>
                <!-- SEZIONE MAPPA -->
                <section class="my-3">
                    <h4 class="mb-1">Dove ti troverai</h4>
                    <div id="maps">
                        <h1>MAPPA</h1>
                    </div>
                </section>
            </div>

            <!-- SEZIONE CONTATTA L'HOST -->
            <div class="contact">
                <h3 class="text-center mb-3">Contatta l'host</h3>
                <h5 class="mb-3">
                    <strong>
                        € {{ apartment.price }}
                    </strong>
                     / per notte
                </h5>
                <form>
                    <div class="mb-3">
                        <label for="email" class="form-label mb-1">Indirizzo email</label>
                        <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        placeholder="Inserisci la tua mail">
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label mb-1">Scrivi il tuo messaggio</label>
                        <textarea
                        class="form-control"
                        name="message"
                        id="message" 
                        rows="6"
                        placeholder="Scrivi il tuo messaggio"></textarea>
                    </div>
                    <button type="submit" class="btn my-btn">Invia richiesta</button>
                </form>
            </div>
        </div>

    </div>

</template>

<style lang="scss" scoped>

    a{
        color: black;
    }

    img{
        display: inline-block;
        height: 450px;
        width: 650px;
        border-radius: 8px;
        object-position: center;
    }

    h3, h4{
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

        #host-name{
            font-weight: 700;
        }

        .description{
            text-align: justify;
            text-justify: inter-word;
        }

        .room-desc{
            border: 1px solid black;
            border-radius: 10px;
            padding: 10px;
            margin-right: 10px;

            h6{
                font-weight: 700;
                font-size: 1rem;
            }

            span{
                margin-right: 5px;
            }
            p{
                font-size: 0.8rem;
            }
        }

        .maps{
            border: 1px solid;
            height: 450px;
            width: 600px;
            background-color: antiquewhite;
        }
    }

    .services{
        border: 1px solid;
        border-radius: 5px;
        padding-inline: 7px;
        margin-right: 7px;
        display: inline-block;
        margin-bottom: 7px;
        vertical-align: middle;
        line-height: 25px;
        // text-transform: capitalize;
        span{
            vertical-align: middle;
            line-height: 25px;
            font-size: 0.8rem;
        }
    }

    #maps{
        height: 450px;
        width: 600px;
        background-color: bisque;
        border: 1px dashed;
    }
    .contact{
        min-width: 40%;
        margin-left: auto;
        border: 1px solid;
        border-radius: 10px;
        padding: 1rem;
        align-self: flex-start;
        position: sticky;
        top: 70px;
        z-index: 1;

        input{
            border: 1px solid black;
            line-height: 30px;
            border-radius: 10px;
            padding: 3px 0 3px 7px;
        }

        textarea{
            border: 1px solid black;
            border-radius: 10px;
            padding: 3px 0 3px 7px;
        }
        .my-btn{
            display: block;
            width: 100%;
            color: white;
            font-weight: 700;
            padding: 7px 0px;
            border-radius: 10px;
            background-color: #ff4a86;
        }

        textarea::placeholder,
        input::placeholder{
            font-size: 0.8rem;
        }
    }
</style>

<!-- $color-one-dark: #d63a5c;
$color-one-light: #ff4a86; -->