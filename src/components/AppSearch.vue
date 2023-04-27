<script>

// Components
// import AppLogo from './AppLogo.vue';
// import AppButton from './AppButton.vue';

// Utilities
import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppSearch',
    components: {
        // AppLogo,
        // AppButton
    },
    data() {
        return {
            store,
            router,
            servicesMenuOpen: false,
            form: {
                address: '',
                rooms_number: 0,
                beds_number: 0,
                bathrooms_number: 0,
                services: []
            }
        }
    },
    methods: {
        // numberInput(direction, value, min, max) {
        //     if (direction == 'minus') {
        //         if (value > min) {
        //             value--;
        //         }
        //     }
        //     else {
        //         if (value < max) {
        //             value++;
        //         }
        //     }
        //     console.log(value);
        // }
        roomsInput(direction) {
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
            const min = 0;
            const max = 8;

            if (direction == 'minus') {
                if (this.form.bathrooms_number > min) this.form.bathrooms_number--;
            }
            else if (direction == 'plus') {
                if (this.form.bathrooms_number < max) this.form.bathrooms_number++;
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="searchbar">
            <form>
                <div class="row">
                    <div class="group">
                        <label for="address">dove</label>
                        <input type="text" id="address" name="address" placeholder="Inserisci l'indirizzo">
                    </div>

                    <div class="group">
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

                    <div class="group">
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

                    <div class="group">
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

                    <div class="group">
                        <div @click="servicesMenuOpen = !servicesMenuOpen">
                            <label for="services">servizi necessari</label>
                            <div class="iconContainer">
                                <font-awesome-icon icon="fa-solid fa-chevron-down" />
                            </div>
                        </div>

                        <div class="servicesMenu" v-if="servicesMenuOpen"></div>
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

.container {
    @include largeContainer;
    padding: 0 2rem;
    // border: 2px solid red;
}

.searchbar {
    padding: 0.75rem;
    box-shadow: 0px 4px 16px 1px #00000060;
    border-radius: $small-border-radius;


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
        }
    }
}

.numberInput {
    display: flex;
    // background-color: blue;
    font-size: 0.95rem;
    border-radius: 10px;
    overflow: hidden;

    .value {
        flex-grow: 1;
        padding: 10px 0;
        background: $light-color-two;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 65px;
    }

    .button {
        display: flex;
        padding: 10px 0;
        // height: calc(20px + 0.95rem);
        width: 40px;
        justify-content: center;
        align-items: center;
        background-color: gray;
    }
}</style>