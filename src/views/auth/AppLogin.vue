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
            this.store.loadingWidth = 10;
        },
        deleteError(fieldName) {
            // Toglie l'errore in store.error così da poter fare ogni volta un nuovo controllo da capo
            const index = this.store.errors.findIndex(error => error.field === fieldName);
            if (index >= 0) {
                this.store.errors.splice(index, 1);
            }
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
        // FUNZIONI PER VALIDAZIONI SINGOLI INPUT
        emailValidation() {
            let emailInput = document.getElementById('email');
            emailInput.classList.remove('invalid');

            this.deleteError('email');

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
        },
        passwordValidation() {
            let passwordInput = document.getElementById('password');
            passwordInput.classList.remove('invalid');

            this.deleteError('password');

            // Password Lenght
            if (passwordInput.value.length == 0) {
                this.addError('Il campo password deve essere compilato', 'password');
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length < 10) {
                this.addError('La password deve essere lunga almeno 10 caratteri', 'password');
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length > 64) {
                this.addError('La password non deve superare i 64 caratteri', 'password');
                passwordInput.classList.add('invalid');
            }
        },
        // FUNZIONE PER SHAKE ERROR
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
        // VALIDAZIONE DEI DATI
        validateData() {
            // Front End Validation
            console.log('Validazione dati login...');
            this.store.errors = [];
            this.store.loadingWidth = 20;

            this.emailValidation();
            this.passwordValidation();

            this.store.loadingWidth = 50;

            this.shakeInputs();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.getCookie();
            else {
                console.log('Hai inserito dati non corretti. Riprova.');
                this.store.loadingWidth = 100;
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
                    console.log('Risposta Login', response);
                    this.store.loadingWidth = 90;


                    // Emette ad App.vue l'evento per richiedere l'utente autenticato
                    this.$emit('getUserEvent', true);
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
                                v-on:blur="emailValidation()">
                        </div>
                    </div>

                    <div class="row">
                        <div class="group large">
                            <label for="password">password *</label>
                            <input type="password" id="password" name="password" placeholder="La tua password"
                                v-model="form.password" v-on:blur="passwordValidation()">
                        </div>
                    </div>

                    <div class="row">
                        <AppButton :label="'login'" :type="'solid'" :palette="'primary'" />
                    </div>
                </form>
                <AppErrorForm v-if="store.errors.length > 0" />
                <router-link to="/register" class="customLink">Non hai un account? Creane uno.</router-link>
                <p class="campi-required">I campi contrassegnati con * sono obbligatori</p>
            </div>
            <!-- <img src="../../assets/logo_per_auth.png" alt=""> -->
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