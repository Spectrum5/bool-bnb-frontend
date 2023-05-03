<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import { register } from 'swiper/element/bundle';
register();

export default {
    name: 'ApartmentShow',
    components: {
        AppDashboardLayoutVue
    },
    data() {
        return {
            router,
            apartment: null,
        }
    },
    methods: {
        getApartment() {
            axios.get(`http://localhost:8000/api/apartments/${this.$route.params.slug}`)
                .then((response) => {
                    console.log('Dati Appartamento', response.data.apartment);
                    this.apartment = response.data.apartment;
                })
                .catch((response) => {
                    console.log('Errore Ottenimento Appartamento', response.data);
                })
        },

        goBackToDashboard() {
            console.log('GO TO DASHBOARD');
            this.$router.push('/dashboard/apartments');
        },

    },
    computed() {
        return this.apartment.title;
    },
    created() {
        this.getApartment();
    }
}
</script>

<template>
    <AppDashboardLayoutVue :title="apartment.title" :button="{
            label: 'Torna alla dashboard',
            // icon: 'plus',
            action: goBackToDashboard
        }">

<div class="my-container">
    <div v-if="apartment">
        <!-- SEZIONE IMMAGINI APARTMENT -->
        <section id="imagesSection" class="mb">
            <swiper-container id="slider"
            :navigation="true"
            :pagination="true"
            :space-between="25"
            :breakpoints="{
                    '700': {
                        slidesPerView: 1,
                        // spaceBetween: 20,
                    },
                    '1400': {
                        slidesPerView: 2,
                        // spaceBetween: 30,
                    },
                }">
                <swiper-slide class="slide" v-for="image in apartment.images">
                    <img :src="`http://localhost:8000/storage/apartments/${image.url}`" :alt="apartment.title">
                </swiper-slide>
            </swiper-container>
        </section>
        <div class="mb descr">
            <h4>Descrizione:</h4>
            <p>{{ apartment.description }}</p>
        </div>
        <section class="info">
            <!-- SEZIONE INFO GENERALI APPARTAMENTO -->
            <div>
                <div class="mb">
                    <h4>Indirizzo:</h4>
                    <p>{{ apartment.address }}</p>
                </div>
            </div>
            <div>
                <div class="mb">
                    <h4>Prezzo a notte:</h4>
                    <p>€ {{ apartment.price }}</p>
                </div>
                <div class="mb" v-if="apartment.services.length > 0">
                    <h4>Servizi inclusi:</h4>
                    <div class="services" v-for="service in apartment.services">
                        <span>
                            <font-awesome-icon :icon="`fa-solid fa-${service.icon}`" />
                        </span>
                        <!-- {{ service.name }} {{ price.products_count }} -->
                    </div>
                </div>
            </div>
            <!-- SEZIONE CARATTERISTICHE APPARTAMENTO -->
            <div>
                <div class="mb">
                    <h4>Numero posti letto:</h4>
                    <p>{{ apartment.beds_number }} posti letto</p>
                </div>
                <div class="mb">
                    <h4>Numero bagni:</h4>
                    <p>{{ apartment.bathrooms_number }} bagni</p>
                </div>
            </div>
            <div>
                <div class="mb">
                    <h4>Numero stanze:</h4>
                    <p>{{ apartment.rooms_number }} camere</p>
                </div>
                <div class="mb">
                    <h4>Dimensioni</h4>
                    <p>{{ apartment.size }} mq</p>
                </div>
            </div>
        </section>
        <section class="info-2">
            <!-- SPONSOR -->
            <div class="my-3">
                <h3 class="mb">Sponsorizzazioni</h3>
                <!-- <div class="mb" v-if="apartment.sponsors.length > 0">
                    <h4>Servizi:</h4>
                    <div class="sponsors" v-for="sponsor in apartment.sponsors">
                        <p>{{ sponsor.title }}</p>
                    </div>
                </div>
                <div v-else> -->
                <div>
                    <p class="mb-2">Al momento non hai nessuna sponsorizzazione!</p>
                    <p>Vuoi sponsorizzare il tuo appartamento? Clicca sul bottone in basso</p>
                    <button class="btn btn-sponsor">
                        <font-awesome-icon icon="fa-solid fa-rocket" />
                        Sponsorizza
                    </button>
                </div>
            </div>
            <!-- FINE SPONSOR -->
            <!-- MESSAGGI -->
            <div class="my-3">
                <h3 class="mb">I tuoi messaggi</h3>
                <div class="mb-2" v-if="apartment.messages.length > 0">
                    <span>Hai {{ apartment.messages.length }} messaggi ricevuti</span>
                    <div class="row" v-for="message in apartment.messages">
                        <p class="mb-1">Mittente: {{ message.email }}</p>
                        <p class="mb-2">{{ message.message }}</p>
                    </div>
                </div>
                <div v-else>
                    <div>
                        <p class="mb-1">Al momento non hai nessun messaggio!</p>
                        <p class="mb-2">Sponsorizza il tuo appartamento per avere maggiore visibilità! Clicca il bottone in basso</p>
                        <button class="btn btn-sponsor">
                            <font-awesome-icon icon="fa-solid fa-rocket" />
                            Sponsorizza
                        </button>
                    </div>
                </div>
            </div>
            <!--FINE MESSAGGI -->
        </section>
    </div>
</div>
    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/form.scss' as *;
@use '../../../styles/partials/variables.scss' as *;


.my-container {
    padding: 10px 20px;
    overflow-y: scroll;
}

.mb {
    margin-bottom: 15px;
}

#imagesSection {
    max-width: 1100px;
    margin-inline: auto;

    #slider {
        width: 70vw;
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
            object-fit: fill;
            display: block;
        }
    }
}

.descr{
    width: 100%;
    border: 1px solid $light-color-two;
    padding: 10px;
    border-radius: 10px;
    background: $light-color-one;
    flex-grow: 1;
}

.info,
.info-2{
    display: flex;
    margin: 30px 0;
    justify-content: space-between;
    flex-wrap: wrap;
    >div{
        width: calc((100% - 90px) / 4);
        border: 1px solid $light-color-two;
        padding: 10px;
        border-radius: 10px;
        background: $light-color-one;
    }
    h3{
        text-align: center;
    }
}
.info-2{
    >div{
        width: calc((100% - 60px) / 2);
        // flex-grow: 1;
    }
}

.row {
    div {
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid;

        input {
            line-height: 20px;
            margin-left: 7px;
        }
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
    text-align: center;
    line-height: 40px;
    width: 40px;
    height: 40px;

    // text-transform: capitalize;
    span {
        vertical-align: middle;
        line-height: 25px;
        font-size: 1.2rem;
    }
}

.btn {
    padding: 7px 10px;
    border-radius: 10px;
    margin-right: 5px;
    cursor: pointer;
}

.btn-sponsor {
    background-color: #59DCC0;
    border: 2px solid #59DCC0;
}

@media screen and (max-width: 992px) {
    // colonne con width 50% due due due
    section.info{
        >div{
        width: calc((100% - 60px) / 2);
        margin-bottom: 15px;
        }
    }
}

@media screen and (max-width: 768px) {
    // colonne al 100%
    section.info,
    section.info-2{
            >div{
            width: calc(100% - 30px);
        }
    }
}

</style>