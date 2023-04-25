<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';

// Utilities
import axios from 'axios';
import { router } from '../../../router';

export default {
    name: 'ApartmentShow',
    components: { 
        AppDashboardLayoutVue
    },
    data() {
        return {
            router,
            apartment: null
            // form: {},
            // allServices: [],
            // selectedServices: []
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
        }
    
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
     <AppDashboardLayoutVue 
            :title=" apartment.title "
            :button="
                {
                    label: 'Torna alla dashboard',
                    // icon: 'plus',
                    action: goBackToDashboard
                        }">

<div class="my-container">
    <div v-if="apartment">
        <div class="img-container">
            <img src="https://montenapodaily.com/wp-content/uploads/2021/07/Rihanna-villa-a-Beverly-hills-scaled-e1626095351453.jpeg" alt="">
        </div>
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
    <div class="mb">
        <h2>Sponsorizzazioni</h2>
        <!-- <div class="mb" v-if="apartment.sponsors.length > 0">
            <h4>Servizi:</h4>
            <div class="sponsors" v-for="sponsor in apartment.sponsors">
                <p>{{ sponsor.title }}</p>
            </div>
        </div>
        <div v-else> -->
        <div>
            <p>Al momento non hai nessuna sponsorizzazione! Vuoi sponsorizzare il tuo appartamento? Clicca sul bottone in basso</p>
            <button class="btn btn-sponsor">
                <font-awesome-icon icon="fa-solid fa-rocket" />
                Sponsorizza
            </button>
        </div>
    </div>
    <!-- FINE SPONSOR -->
    <hr>
    <!-- MESSAGGI -->
    <!-- message, email, first_name, last_name -->
    <div class="mb">
        <h2>I tuoi messaggi</h2>
        <!-- <div class="mb" v-if="apartment.messages.length > 0">
            <span>Hai {{ apartment.messages.length }} messaggi ricevuti</span>
            <div class="row" v-for="message in apartment.messages">
                <p>Mittente: {{ message.first_name }} {{ message.last_name }}</p>
                <p>{{ message.title }}</p>
            </div>
        </div>
        <div v-else> -->
        <div>
            <p>Al momento non hai nessun messaggio!</p>
            <p>Sponsorizza il tuo appartamento per avere maggiore visibilità! Clicca il bottone in basso</p>
            <button class="btn btn-sponsor">
                <font-awesome-icon icon="fa-solid fa-rocket" />
                Sponsorizza
            </button>
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

.img-container {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        max-width: 700px;
        border-radius: 10px;
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

</style>