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
    name: 'AppRegister',
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
        firstNameValidation() {
            let firstNameInput = document.getElementById('first_name');
            firstNameInput.classList.remove('invalid');

            // First Name Length
            if (firstNameInput.value.trim().length == 0) {
                this.addError('Il campo nome deve essere compilato', 'first_name');
                firstNameInput.classList.add('invalid');
            }
            else if (firstNameInput.value.trim().length < 3) {
                this.addError('Il campo nome deve essere almeno di 3 caratteri', 'first_name');
                firstNameInput.classList.add('invalid');
            }
            else if (firstNameInput.value.trim().length > 128) {
                this.addError('Il campo nome non deve superare i 128 caratteri', 'first_name');
                firstNameInput.classList.add('invalid');
            }
            else {
                const index = this.store.errors.findIndex(error => error.field === "first_name");
                this.store.errors.splice(index, 1);
            }
        },
        lastNameValidation() {
            let lastNameInput = document.getElementById('last_name');
            lastNameInput.classList.remove('invalid');

            // Last Name Length
            if (lastNameInput.value.trim().length == 0) {
                this.addError('Il campo cognome deve essere compilato', 'last_name');
                lastNameInput.classList.add('invalid');
            }
            else if (lastNameInput.value.trim().length < 3) {
                this.addError('Il campo cognome deve essere almeno di 3 caratteri', 'last_name');
                lastNameInput.classList.add('invalid');
            }
            else if (lastNameInput.value.trim().length > 128) {
                this.addError('Il campo cognome non deve superare i 128 caratteri', 'last_name');
                lastNameInput.classList.add('invalid');
            }
            else {
                const index = this.store.errors.findIndex(error => error.field === "last_name");
                this.store.errors.splice(index, 1);
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
            else {
                const index = this.store.errors.findIndex(error => error.field === "email");
                this.store.errors.splice(index, 1);
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
            else {
                const index = this.store.errors.findIndex(error => error.field === "password");
                this.store.errors.splice(index, 1);
            }
        },
        passwordConfirmationValidation() {
            let passwordConfirmationInput = document.getElementById('password_confirmation');
            let passwordInput = document.getElementById('password');
            passwordConfirmationInput.classList.remove('invalid');

            // Password Confirmation
            if (passwordConfirmationInput.value.length == 0) {
                this.addError('Il campo conferma password deve essere compilato', 'password_confirmation');
                passwordConfirmationInput.classList.add('invalid');
            }
            if (passwordInput.value != passwordConfirmationInput.value) {
                this.addError('Le password inserite non coincidono', 'password_confirmation');
                passwordConfirmationInput.classList.add('invalid');
            }
            else {
                const index = this.store.errors.findIndex(error => error.field === "password_confirmation");
                this.store.errors.splice(index, 1);
            }
        },
        dateOfBirthValidation() {
            let datOfBirthInput = document.getElementById('date_of_birth');
            datOfBirthInput.classList.remove('invalid');

            const [year, month, day] = datOfBirthInput.value.split('-');
            const now = new Date();

            if (datOfBirthInput.value == '' || datOfBirthInput.value == null) {
                this.addError('Devi impostare una data di nascita', 'date_of_birth');
                datOfBirthInput.classList.add('invalid');
            }
            else if (datOfBirthInput.value != null) {
                if ((now.getFullYear() - year) <= 9) {
                    this.addError('Devi avere almeno 9 anni per poterti registrare', 'date_of_birth');
                    datOfBirthInput.classList.add('invalid');
                }
                if (month < 1 || month > 12) {
                    this.addError('Il mese deve essere compreso tra 1 e 12', 'date_of_birth');
                    datOfBirthInput.classList.add('invalid');
                }
                if (day < 1 || day > 31) {
                    this.addError('Il giorno di nascita deve essere compreso tra 1 e 31', 'date_of_birth');
                    datOfBirthInput.classList.add('invalid');
                }
            }
            else {
                const index = this.store.errors.findIndex(error => error.field === "date_of_birth");
                this.store.errors.splice(index, 1);
            }
        },
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
        validateData() {
            // Front End Validation
            console.log('Validazione dati registrazione...');
            this.store.errors = [];

            this.firstNameValidation();
            this.lastNameValidation();
            this.emailValidation();
            this.passwordValidation();
            this.passwordConfirmationValidation();
            this.dateOfBirthValidation();

            this.shakeInputs();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.postRegisterData();
            else console.log('Hai inserito dati non corretti. Riprova.');
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
                    this.$emit('getUserEvent', true);
                }
                )
                .catch((response) => {
                    this.addError('Errore del server. Riprovare piú tardi', 'server_error');
                    console.log('Errore Invio dati Register:', response.response);
                })
        }
    },
    mounted() {
        document.title = 'Boolbnb | Register';
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
                <h1 class="mainTitle">register</h1>
                <form @submit.prevent="handleRegister()">

                    <!-- First Name & Last Name -->
                    <div class="row">
                        <div class="group small">
                            <label for="first_name">nome *</label>
                            <input type="text" id="first_name" name="first_name" placeholder="Il tuo nome"
                                v-model="form.first_name" v-on:blur="firstNameValidation()">
                        </div>

                        <div class="group small">
                            <label for="last_name">cognome *</label>
                            <input type="text" id="last_name" name="last_name" placeholder="Il tuo cognome"
                                v-model="form.last_name" v-on:blur="lastNameValidation()">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="row">
                        <div class="group large">
                            <label for="email">email *</label>
                            <input type="text" id="email" name="email" placeholder="test@example.com" v-model="form.email"
                                v-on:blur="emailValidation()">
                        </div>
                    </div>

                    <!-- Password & Password Confirmation -->
                    <div class="row">
                        <div class="group small">
                            <label for="password">password *</label>
                            <input type="password" id="password" name="password" placeholder="La tua password"
                                v-model="form.password" v-on:blur="passwordValidation()">
                        </div>

                        <div class="group small">
                            <label for="password_confirmation">conferma password *</label>
                            <input type="password" id="password_confirmation" name="password_confirmation"
                                placeholder="Conferma la tua password" v-model="form.password_confirmation"
                                v-on:blur="passwordConfirmationValidation()">
                        </div>
                    </div>

                    <!-- Date of Birth -->
                    <div class="row">
                        <div class="group large">
                            <label for="date_of_birth">data di nascita *</label>
                            <input type="date" id="date_of_birth" name="date_of_birth" v-model="form.date_of_birth"
                                v-on:blur="dateOfBirthValidation()">
                        </div>
                    </div>

                    <div class="row">
                        <AppButton :label="'register'" :type="'solid'" :palette="'primary'" />
                    </div>
                </form>
                <AppErrorForm v-if="store.errors.length > 0" />
                <router-link to="/login" class="customLink">Hai gia' un account? Accedi.</router-link>
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

.row {
    margin-bottom: 0;
}

.group {
    flex-grow: 1;
    margin-bottom: 0.8rem;
}


.campi-required {
    font-size: 0.75rem;
    margin-top: 1rem;
    font-style: italic;
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

form .row {
    margin-bottom: 0;
}

.row:last-child:deep button {
    width: 100%;
}

@media screen and (min-width: 500px) {
    .row {
        @include flexRowCenter(0.25rem);
        width: 100%;

        .group {
            flex-grow: 1;
        }
    }

    form .row {
        margin-bottom: 1rem;
    }
}
</style>