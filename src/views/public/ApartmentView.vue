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

        getIcon(name){

            if(name == 'wi-fi'){
                return `<i class="fa-solid fa-wifi"></i>`;
            }
            else if (name == 'piscina') {
                return `<i class="fa-solid fa-water-ladder"></i>`;
            }
            else if (name == 'parcheggio') {
                return `<i class="fa-solid fa-car-side"></i>`;
            }
            else if (name == 'asciuga capelli') {
                return '';
            }
            else if (name == 'cucina') {
                return `<i class="fa-solid fa-utensils"></i>`;
            }
            else if (name == 'tv') {
                return '<i class="fa-solid fa-tv"></i>';
            }
            else if (name == 'aria condizionata') {
                return `<i class="fa-solid fa-snowflake"></i>`;
            }
            else if (name == 'sauna') {
                return '';
            }
            else if (name == 'portineria') {
                return `<i class="fa-solid fa-user-lock"></i>`;
            }
            else if (name == 'servizio pulizie') {
                return `<i class="fa-solid fa-broom"></i>`;
            }
            else if (name == 'lavatrice') {
                return `<i class="fa-solid fa-soap"></i>`;
            }
            else if (name == 'amico degli animali') {
                return `<i class="fa-solid fa-paw"></i>`;
            }
            else if (name == 'cassaforte') {
                return `<i class="fa-solid fa-vault"></i>`;
            }
        
        },
    },
    created() {
        this.getApartments();
    }
}
</script>

<template>
    <div @click="$router.push('/')">torna alla home</div>

    <div class="container">
        <h2>{{ apartment.title }}</h2>
        <h6>Indirizzo: 
            <span class="text-decoration-underline">
                <a class="text-dark" href="maps">{{ apartment.address }}</a>
            </span>
        </h6>

        <div>
            <img src="https://thumbs.dreamstime.com/b/camera-classica-con-il-giardino-di-fiore-751996.jpg" alt="">
        </div>

        <div class="my-secondary-container">
            <div>
                <h3>Host: {{ apartment.user_id }} (nome dell'Host)</h3>
                <p class="amenities mb-3">
                    <span>{{ apartment.rooms_number }} camere da letto</span>
                    -
                    <span>{{ apartment.beds_number }} letti</span>
                    -
                    <span>{{ apartment.bathrooms_number }} bagni</span>
                </p>
                <hr>
                <div class="my-3">
                    <h4>Descrizione</h4>
                    <p>
                        {{ apartment.description }}
                    </p>
                </div>
                <hr>
                <div class="my-3">
                    <h4>Cosa troverai</h4>
                    <div class="services" v-for="service in apartment.services">
                        <span v-html="getIcon(service.name)"></span>
                        {{ service.name }}
                    </div>
                </div>
            </div>

            <div class="contact">
                <h3 class="text-center mb-3">Contatta l'host</h3>
                <h5 class="mb-3">€ {{ apartment.price }} / per notte</h5>
                    <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Scrivi il tuo messaggio</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn my-btn">Invia richiesta</button>
                    </form>
            </div>
        </div>

    </div>

</template>

<style lang="scss" scoped>

    *{
        font-family: 'Mukta', sans-serif;
    }
    .container {
        margin: auto;
        margin-top: 40px;
        max-width: 80%;
        // border: 1px dashed black;
    }

    .my-secondary-container {
        display: flex;
        gap: 40px;
        margin-top: 50px;
    }

    .contact{
        min-width: 40%;
        margin-left: auto;
        border: 1px solid;
        border-radius: 10px;
        padding: 1rem;
    }

    .services{
        border: 1px solid;
        border-radius: 5px;
        padding-inline: 7px;
        margin-right: 7px;
        display: inline-block;
        margin-bottom: 5px;
        // text-transform: capitalize;
    }

    .my-btn{
        padding: 4px 10px;
        background-color: #ff4a86;
    }
</style>

<!-- $color-one-dark: #d63a5c;
$color-one-light: #ff4a86; -->