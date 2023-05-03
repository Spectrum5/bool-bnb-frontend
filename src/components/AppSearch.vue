<script>

// Utilities
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppSearch',
    components: {
    },
    data() {
        return {
            store,
            router,
            servicesMenuOpen: false,
            allServices: [],
            tomtomApiKey: import.meta.env.VITE_TOMTOM_API_KEY,
            form: {
                address: '',
                radius: 20,
                rooms_number: 0,
                beds_number: 0,
                bathrooms_number: 0,
                services: []
            }
        }
    },
    props: {
        allFields: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getServices() {
            // Ottiene i servizi da mostrare nei filtri
            axios.get('http://localhost:8000/api/services')
                .then(response => {
                    this.allServices = response.data.services;
                    // console.log('Servizi', this.allServices);
                })
        },
        setAutocomplete() {
            const address = document.querySelector('#address');
            const autocomplete = new google.maps.places.Autocomplete(address);
            const self = this;
            autocomplete.addListener('place_changed', function () {
                const place = autocomplete.getPlace();
                const address = place.formatted_address;
                self.form.address = address;
            });
        },
        radiusInput(direction) {
            // Incrementa l'input Raggio
            const min = 5;
            const max = 50;

            if (direction == 'minus') {
                if (this.form.radius > min) this.form.radius -= 5;
            }
            else if (direction == 'plus') {
                if (this.form.radius < max) this.form.radius += 5;
            }
        },
        roomsInput(direction) {
            // Incrementa l'input Camere
            const min = 0;
            const max = 8;

            if (direction == 'minus') {
                if (this.form.rooms_number > min) this.form.rooms_number--;
            }
            else if (direction == 'plus') {
                if (this.form.rooms_number < max) this.form.rooms_number++;
            }
        },
        bedsInput(direction) {
            // Incrementa l'input Letti
            const min = 0;
            const max = 16;

            if (direction == 'minus') {
                if (this.form.beds_number > min) this.form.beds_number--;
            }
            else if (direction == 'plus') {
                if (this.form.beds_number < max) this.form.beds_number++;
            }
        },
        bathroomsInput(direction) {
            // Incrementa l'input Letti
            const min = 0;
            const max = 8;

            if (direction == 'minus') {
                if (this.form.bathrooms_number > min) this.form.bathrooms_number--;
            }
            else if (direction == 'plus') {
                if (this.form.bathrooms_number < max) this.form.bathrooms_number++;
            }
        },
        calcUrl() {
            // Calcola l'url
            this.searchUrl = '/search?';

            let size = 0;
            // Calcolo numero campi compilati form
            for (const field in this.form) {
                if (Array.isArray(this.form[field])) {
                    if (this.form[field].length > 0) {
                        size++;
                    }
                }
                else {
                    if (this.form[field] != null) {
                        size++;
                    }
                }
            }

            let index = 1;
            // Generazione Url
            for (const field in this.form) {
                if (this.form[field] != null && this.form[field].length > 0) {
                    this.searchUrl += `${field}=${this.form[field]}`
                    if (index < size) {
                        this.searchUrl += '&'
                    }
                    index++;
                }
            }
        },
        async getCoordinates() {
            const coordinates = await fetch(`https://api.tomtom.com/search/2/geocode/${this.form.address}.json?key=${this.tomtomApiKey}&typeahead=true&limit=1&radius=500`)
                .then(response => response.json()
                )
                .then(data => {
                    this.store.searchForm.lat = data.results[0].position.lat;
                    this.store.searchForm.lng = data.results[0].position.lon;
                })
            this.$router.push(this.searchUrl);
            this.$emit('searchEvent');
        },
        handleSearch() {
            // Se dei parametri sono stati inseriti, rimanda alla pagina di ricerca
            if (this.form.address != '' || this.form.rooms_number > 0 || this.form.beds_number > 0 || this.form.bathrooms_number > 0 || this.form.services.length > 0) {
                this.calcUrl();

                if (this.form.address != '') {
                    this.getCoordinates();
                    this.store.searchForm.address = this.form.address;
                }

                if (this.form.radius > 0) this.store.searchForm.radius = this.form.radius;
                if (this.form.rooms_number > 0) this.store.searchForm.rooms_number = this.form.rooms_number;
                if (this.form.beds_number > 0) this.store.searchForm.beds_number = this.form.beds_number;
                if (this.form.bathrooms_number > 0) this.store.searchForm.bathrooms_number = this.form.bathrooms_number;
                if (this.form.services.length > 0) this.store.searchForm.services = this.form.services;
            }
        }
    },
    mounted() {
        if (this.store.searchForm.address) this.form.address = this.store.searchForm.address;
        this.getServices();
        this.setAutocomplete();
    }
}
</script>

<template>
    <div class="container" :class="!allFields ? 'small' : ''">
        <div class="searchbar">
            <form @submit.prevent="handleSearch()">
                <div class="row">
                    <div class="group">
                        <label for="address" v-if="allFields">dove vuoi andare?</label>
                        <input type="text" id="address" name="address" placeholder="Dove vuoi andare?"
                            v-model="form.address">
                    </div>

                    <div class="group" v-if="allFields">
                        <label for="radius">raggio (km)</label>
                        <div class="numberInput">
                            <div class="button" @click="radiusInput('minus')"><font-awesome-icon icon="fa-solid fa-minus" />
                            </div>
                            <div class="value">
                                {{ form.radius }}
                            </div>
                            <div class="button" @click="radiusInput('plus')"><font-awesome-icon icon="fa-solid fa-plus" />
                            </div>
                        </div>
                    </div>

                    <div class="group" v-if="allFields">
                        <label for="rooms_number">camere minime</label>
                        <div class="numberInput">
                            <div class="button" @click="roomsInput('minus')"><font-awesome-icon icon="fa-solid fa-minus" />
                            </div>
                            <div class="value">
                                {{ form.rooms_number }}
                            </div>
                            <div class="button" @click="roomsInput('plus')"><font-awesome-icon icon="fa-solid fa-plus" />
                            </div>
                        </div>
                    </div>

                    <div class="group" v-if="allFields">
                        <label for="beds_number">letti minimi</label>
                        <div class="numberInput">
                            <div class="button" @click="bedsInput('minus')"><font-awesome-icon icon="fa-solid fa-minus" />
                            </div>
                            <div class="value">
                                {{ form.beds_number }}
                            </div>
                            <div class="button" @click="bedsInput('plus')"><font-awesome-icon icon="fa-solid fa-plus" />
                            </div>
                        </div>
                    </div>

                    <div class="group" v-if="allFields">
                        <label for="bathrooms_number">bagni minimi</label>
                        <div class="numberInput">
                            <div class="button" @click="bathroomsInput('minus')"><font-awesome-icon
                                    icon="fa-solid fa-minus" /></div>
                            <div class="value">
                                {{ form.bathrooms_number }}
                            </div>
                            <div class="button" @click="bathroomsInput('plus')"><font-awesome-icon
                                    icon="fa-solid fa-plus" /></div>
                        </div>
                    </div>

                    <div class="group servicesGroup" v-if="allFields">
                        <div @click="servicesMenuOpen = !servicesMenuOpen">
                            <label for="services">servizi necessari</label>
                            <div class="iconContainer">
                                <font-awesome-icon icon="fa-solid fa-chevron-down" />
                            </div>
                        </div>

                        <transition name="fade-slide-top">
                            <div class="servicesMenu" v-if="servicesMenuOpen">
                                <h3>Servizi</h3>
                                <div class="service" v-for="service in allServices">
                                    <input v-model="form.services" type="checkbox" :name="service.name" :id="service.name"
                                        :value="service.id">
                                    <label :for="service.name">
                                        <font-awesome-icon :icon='`fa-solid fa-${service.icon}`' />
                                        {{ service.name }}
                                    </label>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <div class="group">
                        <button class="solid">cerca</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;
@use '../styles/partials/form.scss' as *;
@use '../styles/partials/transitions.scss' as *;

.container {
    width: 100%;
    padding: 0 2rem;
    margin-bottom: 3rem !important;
    max-width: 1360px;

    &.small {
        max-width: 960px !important;

        .group:first-child {
            max-width: unset;
        }
    }
}

.searchbar {
    width: 100%;
    padding: 1rem;
    box-shadow: 0px 4px 16px 1px #00000060;
    border-radius: $big-border-radius;
    background-color: #ffffff;

    form {
        .row {
            @include flexSpaceBtwn;
            gap: 1.5rem;
            margin-bottom: 0;
        }

        label {
            text-transform: capitalize;
            display: block;
            font-weight: 500;
            font-size: 0.9rem;
        }

        .group {
            button {
                @include customButton;
                outline: none;
                padding: 20px 20px;
            }

            .iconContainer {
                padding: 10px 0;
            }

            &:first-child {
                flex-grow: 1;
                max-width: 450px;
            }

            &.servicesGroup {
                cursor: pointer;
                position: relative;

                .servicesMenu {
                    display: flex;
                    flex-wrap: wrap;
                    width: 420px;

                    h3 {
                        flex-basis: 100%;
                        margin-bottom: 4px;
                    }

                    .service {
                        flex-basis: 50%;
                    }

                    input {
                        width: fit-content;
                        margin-right: 5px;
                    }

                    label {
                        display: inline-block;
                    }
                }
            }
        }
    }
}

.numberInput {
    display: flex;
    font-size: 0.95rem;
    border-radius: 10px;
    overflow: hidden;

    .value {
        min-width: 65px;
        padding: 10px 0;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: $light-color-two;
    }

    .button {
        width: 40px;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: gray;
    }
}

.servicesMenu {
    position: absolute;
    top: calc(100% + 25px);
    right: 0;
    z-index: 5;
    padding: 6px;
    border: 1px solid $dark-color-one;
    background-color: $light-color-one;
}

@media screen and (max-width: 1200px) {
    .container {
        margin-bottom: 0 !important;
    }

    .searchbar {
        form {
            .row {
                flex-wrap: wrap;

                .group {
                    &:first-child {
                        flex-grow: 1;
                        flex-basis: 100%;
                        max-width: unset;
                    }

                    &:last-child {
                        flex-grow: 1;
                        flex-basis: 100%;
                        max-width: unset;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 916px) {
    .servicesGroup {
        flex-basis: 100%;

        .servicesMenu {
            top: calc(100% + 15px);
            right: unset;
            left: 0;
        }
    }
}

@media screen and (max-width: 750px) {

    .group:not(:first-child),
    .group:not(:last-child),
    .group:not(.servicesGroup) {
        flex-basis: calc(50% - 1rem);
    }
}</style>