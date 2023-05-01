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
        <section id="imagesSection">
            <swiper-container id="slider" :navigation="true" :pagination="true" :centered-slides="true"
                :slides-per-view="2" :space-between="25">
                <swiper-slide class="slide" v-for="image in apartment.images">
                    <img :src="`http://localhost:8000/storage/apartments/${image.url}`" :alt="apartment.title">
                </swiper-slide>
            </swiper-container>
        </section>
        <div class="mb">
            <h4>Indirizzo:</h4>
            <p>{{ apartment.address }}</p>
        </div>
        <div class="mb">
            <h4>Descrizione:</h4>
            <p style="max-width: 60vw;">{{ apartment.description }}</p>
        </div>
        <div class="mb">
            <h4>Prezzo a notte:</h4>
            <p>€ {{ apartment.price }}</p>
        </div>
        <div class="mb" style="max-width: 60vw;" v-if="apartment.services.length > 0">
            <h4>Servizi inclusi:</h4>
            <div class="services" v-for="service in apartment.services">
                <span>
                    <font-awesome-icon :icon="`fa-solid fa-${service.icon}`" />
                </span>
                <!-- {{ service.name }} {{ price.products_count }} -->
            </div>
        </div>
    </div>
    <hr>
    <!-- SPONSOR -->
    <div class="my-3">
        <h2 class="mb">Sponsorizzazioni</h2>
        <!-- <div class="mb" v-if="apartment.sponsors.length > 0">
            <h4>Servizi:</h4>
            <div class="sponsors" v-for="sponsor in apartment.sponsors">
                <p>{{ sponsor.title }}</p>
            </div>
        </div>
        <div v-else> -->
        <div>
            <p class="mb">Al momento non hai nessuna sponsorizzazione! Vuoi sponsorizzare il tuo appartamento? Clicca sul bottone in basso</p>
            <button class="btn btn-sponsor">
                <font-awesome-icon icon="fa-solid fa-rocket" />
                Sponsorizza
            </button>
        </div>
    </div>
    <!-- FINE SPONSOR -->
    <hr>
    <!-- MESSAGGI -->
    <!-- message, email, -->
    <div class="my-3">
        <h2 class="mb">I tuoi messaggi</h2>
        <div class="mb" v-if="apartment.messages.length > 0">
            <span>Hai {{ apartment.messages.length }} messaggi ricevuti</span>
            <div class="row" v-for="message in apartment.messages">
                <p>Mittente: {{ message.email }}</p>
                <p>{{ message.message }}</p>
            </div>
        </div>
        <div v-else>
            <div>
                <p>Al momento non hai nessun messaggio!</p>
                <p>Sponsorizza il tuo appartamento per avere maggiore visibilità! Clicca il bottone in basso</p>
                <button class="btn btn-sponsor">
                    <font-awesome-icon icon="fa-solid fa-rocket" />
                    Sponsorizza
                </button>
            </div>
        </div>
    </div>
    <!--FINE MESSAGGI -->
</div>
    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/form.scss' as *;
@use '../../../styles/partials/variables.scss' as *;


.my-container {
    padding: 10px;
    overflow: scroll;
}

.mb {
    margin-bottom: 15px;
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
    line-height: 25px;

    // text-transform: capitalize;
    span {
        vertical-align: middle;
        line-height: 25px;
        font-size: 0.8rem;
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
}</style>