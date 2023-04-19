<script>

// Components
import AppLogo from '../../components/AppLogo.vue';

// Utilities
import { store } from '../../store';
import { router } from '../../router';

import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppRegister',
    components: {
        AppLogo
    },
    data() {
        return {
            store,
            form: {
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                password_confirmation: null
            }
        }
    },
    methods: {
        handleRegister() {
            this.validateData();
        },
        validateData() {
            // Front End Validation
            console.log('Validazione dati registrazione...');

            let firstNameInput = document.getElementById('first_name');
            let lastNameInput = document.getElementById('last_name');
            let emailInput = document.getElementById('email');
            let passwordInput = document.getElementById('password');
            let passwordConfirmationInput = document.getElementById('password_confirmation');

            // Reset Form Validation
            this.store.errors = [];
            firstNameInput.classList.remove('invalid');
            lastNameInput.classList.remove('invalid');
            emailInput.classList.remove('invalid');
            passwordInput.classList.remove('invalid');
            passwordConfirmationInput.classList.remove('invalid');

            // First Name Length
            if (firstNameInput.value.length == 0) {
                this.store.errors.push({
                    message: 'il campo nome deve essere compilato'
                });
                firstNameInput.classList.add('invalid');
            }
            else if (firstNameInput.value.length < 3) {
                this.store.errors.push({
                    message: 'il campo nome deve essere almeno di 3 caratteri'
                });
                firstNameInput.classList.add('invalid');
            }
            else if (firstNameInput.value.length > 128) {
                this.store.errors.push({
                    message: 'il campo nome non deve superare i 128 caratteri'
                });
                firstNameInput.classList.add('invalid');
            }
            // Last Name Length
            if (lastNameInput.value.length == 0) {
                this.store.errors.push({
                    message: 'il campo cognome deve essere compilato'
                });
                lastNameInput.classList.add('invalid');
            }
            else if (lastNameInput.value.length < 3) {
                this.store.errors.push({
                    message: 'il campo cognome deve essere almeno di 3 caratteri'
                });
                lastNameInput.classList.add('invalid');
            }
            else if (lastNameInput.value.length > 128) {
                this.store.errors.push({
                    message: 'il campo cognome non deve superare i 128 caratteri'
                });
                lastNameInput.classList.add('invalid');
            }
            // Email Validation
            if (!emailInput.value.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                this.store.errors.push({
                    message: 'la tua email contiene caratteri non permessi'
                });
                emailInput.classList.add('invalid');
            }
            // Email Lenght
            if (emailInput.value.length == 0) {
                this.store.errors.push({
                    message: 'il campo email deve essere compilato'
                });
                emailInput.classList.add('invalid');
            }
            else if (emailInput.value.length < 10) {
                this.store.errors.push({
                    message: 'l\'email deve essere lunga almeno 10 caratteri'
                });
                emailInput.classList.add('invalid');
            }
            else if (emailInput.value.length > 64) {
                this.store.errors.push({
                    message: 'l\'email non deve superare i 64 caratteri'
                });
                emailInput.classList.add('invalid');
            }
            // Password Lenght
            if (passwordInput.value.length == 0) {
                this.store.errors.push({
                    message: 'il campo password deve essere compilato'
                });
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length < 10) {
                this.store.errors.push({
                    message: 'la password deve essere lunga almeno 10 caratteri'
                });
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length > 64) {
                this.store.errors.push({
                    message: 'la password non deve superare i 64 caratteri'
                });
                passwordInput.classList.add('invalid');
            }
            // Password Confirmation
            if (passwordConfirmationInput.value.length == 0) {
                this.store.errors.push({
                    message: 'il campo conferma password deve essere compilato'
                });
                passwordConfirmationInput.classList.add('invalid');
            }
            if (passwordInput.value != passwordConfirmationInput.value) {
                this.store.errors.push({
                    message: 'le password inserite non coincidono'
                });
                passwordConfirmationInput.classList.add('invalid');
            }

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.postRegisterData();
            else console.log('Registrazione fallita');
        },
        postRegisterData() {
            // Crea un istanza di FormData e ci inserisce delle coppie chiave: valore
            // corrispondenti alle coppie dell'oggetto form
            const formData = new FormData();
            for (const item in this.form) {
                formData.append(`${item}`, this.form[item]);
            }
            console.log('Form Data compilato', formData);

            // Richiesta in post
            axios.post('http://localhost:8000/register', formData)
                .then((response) => {
                    console.log('Risposta Register', response);

                    // Emette ad App.vue l'evento per richiedere l'utente autenticato
                    this.$emit('getUserEvent');
                    // router.push('/dashboard');
                }
                )
                .catch((response) => {
                    console.log('Errore Register:', response);
                    this.store.errors = response;
                })
        }
    },
    mounted() {
        document.title = 'Boolbnb | Register';
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
                <h1 class="mainTitle">register</h1>
                <form @submit.prevent="handleRegister()">

                    <!-- First Name & Last Name -->
                    <div class="row inline-center">
                        <div class="group small">
                            <label for="first_name">first name</label>
                            <input type="text" id="first_name" name="first_name" placeholder="Your first name"
                                v-model="form.first_name">
                        </div>

                        <div class="group small">
                            <label for="last_name">last name</label>
                            <input type="text" id="last_name" name="last_name" placeholder="Your last name"
                                v-model="form.last_name">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="row">
                        <div class="group large">
                            <label for="email">email</label>
                            <input type="text" id="email" name="email" placeholder="test@example.com" v-model="form.email">
                        </div>
                    </div>

                    <!-- Password & Password Confirmation -->
                    <div class="row inline-center">
                        <div class="group small">
                            <label for="password">password</label>
                            <input type="password" id="password" name="password" placeholder="Your password"
                                v-model="form.password">
                        </div>

                        <div class="group small">
                            <label for="password_confirmation">confirm password</label>
                            <input type="password" id="password_confirmation" name="password_confirmation"
                                placeholder="Confirm your password" v-model="form.password_confirmation">
                        </div>
                    </div>

                    <!-- Date of Birth -->
                    <div class="row">
                        <div class="group large">
                            <label for="date_of_birth">date of birth</label>
                            <input type="date" id="date_of_birth" name="date_of_birth" v-model="form.date_of_birth">
                        </div>
                    </div>

                    <div class="row">
                        <button class="btn">register</button>
                    </div>
                </form>
                <router-link to="/login" class="customLink">Hai gia' un account? Accedi.</router-link>
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            FOOTER
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/form.scss' as *;

.row.inline-center {
    .group {
        flex-grow: 1;
    }
}

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

footer {
    padding: 1.5rem;
    background-color: darkgrey;
    text-align: center;
}
</style>