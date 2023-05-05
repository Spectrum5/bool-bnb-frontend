<script>

// Utilities
import { store } from '../../store';

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppFooter from '../../components/AppFooter.vue';
import AppErrorForm from '../../components/AppErrorForm.vue';
import AppButton from '../../components/AppButton.vue';

import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppLogin',
    components: {
        AppLogo,
        AppFooter,
        AppErrorForm,
        AppButton
    },
    data() {
        return {
            store,
            form: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        handleLogin() {
            this.validateData();
        },
        validateData() {
            // Front End Validation
            console.log('Validazione dati login...');
            this.store.errors = [];
            this.store.loadingWidth = 20;

            this.store.emailValidation('email');
            this.store.passwordValidation('password');

            this.store.shakeInputs();

            this.store.loadingWidth = 50;

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.getCookie();
            else {
                console.log('Hai inserito dati non corretti. Riprova.');
                this.store.loadingWidth = 0;
            }
        },
        getCookie() {
            this.store.loadingWidth = 75;
            // Richiesta Cookie CSRF
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((response) => {
                    console.log('Cookie CSRF ottenuto', response);
                    this.store.loadingWidth = 85;
                    this.postLoginData()
                })
                .catch((response) => {
                    console.log('Errore ottenimento Cookie CSRF', response);
                    this.store.errors = response.data;
                    this.store.loadingWidth = 100;
                })
        },
        postLoginData() {
            axios.post('http://localhost:8000/login', {
                email: this.form.email,
                password: this.form.password
            })
                .then((response) => {
                    this.store.loadingWidth = 90;

                    // Emette ad App.vue l'evento per richiedere l'utente autenticato
                    this.$emit('getUserEvent', true);

                    console.log('Risposta Login', response);
                }
                )
                .catch((response) => {
                    console.log('Errore Invio Dati Login', response);
                    this.store.loadingWidth = 100;
                    this.addError('Errore del server. Riprovare piú tardi', 'server_error');
                })
        }
    },
    mounted() {
        document.title = 'Boolbnb | Login';
        this.$nextTick(this.store.clear());
    }
}
</script>

<template>
    <header>
        <div class="container">
            <AppLogo />
        </div>
    </header>

    <main>
        <div class="container">
            <div class="formContainer">
                <h1 class="mainTitle">login</h1>
                <form @submit.prevent="handleLogin()">
                    <div class="row">
                        <div class="group large">
                            <label for="email">email *</label>
                            <input type="text" id="email" name="email" placeholder="test@example.com" v-model="form.email"
                                v-on:blur="store.emailValidation('email')">
                        </div>
                    </div>

                    <div class="row">
                        <div class="group large">
                            <label for="password">password *</label>
                            <input type="password" id="password" name="password" placeholder="La tua password"
                                v-model="form.password" v-on:blur="store.passwordValidation('password')">
                        </div>
                    </div>

                    <div class="row">
                        <AppButton :label="'login'" :type="'solid'" :palette="'primary'" />
                    </div>
                </form>
                <AppErrorForm/>
                <router-link to="/register" class="customLink">Non hai un account? Creane uno.</router-link>
                <p class="campi-required">I campi contrassegnati con * sono obbligatori</p>
            </div>
        </div>
    </main>

    <AppFooter />
</template>

<style lang="scss" scoped>
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/form.scss' as *;

.container {
    @include largeContainer;
    @include flexRowCenter;
    padding: 0 1rem;
}

header {
    padding: 1rem 0;
}

main {
    height: 100vh;
}

.row:last-child:deep button {
    width: 100%;
}

.campi-required {
    font-size: 0.75rem;
    margin-top: 1rem;
    font-style: italic;
}
</style>