<script>

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppFooter from '../../components/AppFooter.vue';
import AppErrorForm from '../../components/AppErrorForm.vue';

// Utilities
import { store } from '../../store';
import { router } from '../../router';

import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppLogin',
    components: {
        AppLogo,
        AppFooter,
        AppErrorForm
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
        emailValidation() {
            let emailInput = document.getElementById('email');
            emailInput.classList.remove('invalid');

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
        shakeInputs() {
            // V1
            // const emailInput = document.querySelector('#email');
            // const passwordInput = document.querySelector('#password');

            // if (emailInput.classList.contains('invalid')) emailInput.classList.add('shake');
            // if (passwordInput.classList.contains('invalid')) passwordInput.classList.add('shake');

            // setTimeout(() => {
            //     emailInput.classList.remove('shake');
            //     passwordInput.classList.remove('shake');
            // }, 200)

            // V2
            if (this.store.errors.length > 0) {
                this.store.errors.forEach(error => {
                    document.querySelector(`#${error.field}`).classList.add('shake');
                    setTimeout(() => {
                        document.querySelector(`#${error.field}`).classList.remove('shake');
                    }, 300)
                });
            }
        },
        validateData() {
            // Front End Validation
            console.log('Validazione dati login...');
            this.store.errors = [];

            this.emailValidation();
            this.passwordValidation();

            this.shakeInputs();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.getCookie();
            else console.log('Hai inserito dati non corretti. Riprova.');
        },
        getCookie() {
            // Richiesta Cookie CSRF
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((response) => {
                    console.log('Cookie CSRF ottenuto', response);
                    this.postLoginData()
                })
                .catch((response) => {
                    console.log('Errore ottenimento Cookie CSRF', response);
                    this.store.errors = response.data;
                })
        },
        postLoginData() {
            axios.post('http://localhost:8000/login', {
                email: this.form.email,
                password: this.form.password
            })
                .then((response) => {
                    console.log('Risposta Login', response);

                    // Emette ad App.vue l'evento per richiedere l'utente autenticato
                    this.$emit('getUserEvent');
                }
                )
                .catch((response) => {
                    console.log('Errore Login', response);
                    this.store.errors = response;
                })
        }
    },
    mounted() {
        document.title = 'Boolbnb | Login';
        this.store.errors = [];
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
                        <button class="btn">login</button>
                    </div>
                    <AppErrorForm v-if="store.errors.length > 0" />
                </form>
                <router-link to="/register" class="customLink">Non hai un account? Creane uno.</router-link>
                <p class="campi-required">I campi contrassegnati con * sono obbligatori</p>
            </div>
        </div>
    </main>

    <AppFooter />
</template>

<style lang="scss" scoped>
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/form.scss' as *;

.btn {
    text-transform: capitalize;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    padding: 0.5rem;
    // border: none;
    // background: none;
}

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

.campi-required {
    font-size: 0.75rem;
    margin-top: 1rem;
    font-style: italic;
}
</style>