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
                password_confirmation: null,
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
            this.store.errors = [];
            this.store.loadingWidth = 20;

            this.store.firstNameValidation('first_name');
            this.store.lastNameValidation('last_name');
            this.store.emailValidation('email');
            this.store.passwordValidation('password');
            this.store.passwordConfirmationValidation('password_confirmation', 'password');
            this.store.dateOfBirthValidation('date_of_birth');

            this.store.loadingWidth = 60;

            this.store.shakeInputs();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.postRegisterData();
            else {
                this.store.loadingWidth = 100;
                console.log('Hai inserito dati non corretti. Riprova.');
            }
        },
        postRegisterData() {
            this.store.loadingWidth = 75;
            // Crea un istanza di FormData e ci inserisce delle coppie chiave: valore
            // corrispondenti alle coppie dell'oggetto form
            const formData = new FormData();
            for (const item in this.form) {
                formData.append(`${item}`, this.form[item]);
            }
            // console.log('Form Data compilato', formData);

            // Richiesta in post
            axios.post('http://localhost:8000/register', formData)
                .then((response) => {
                    // Emette ad App.vue l'evento per richiedere l'utente autenticato
                    this.$emit('getUserEvent', true);

                    console.log('Risposta Register', response);
                }
                )
                .catch((response) => {
                    this.store.loadingWidth = 100;
                    this.store.addError('Errore del server. Riprovare piú tardi', 'server_error');
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
                                v-model="form.first_name" v-on:blur="store.firstNameValidation('first_name')">
                        </div>

                        <div class="group small">
                            <label for="last_name">cognome *</label>
                            <input type="text" id="last_name" name="last_name" placeholder="Il tuo cognome"
                                v-model="form.last_name" v-on:blur="store.lastNameValidation('last_name')">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="row">
                        <div class="group large">
                            <label for="email">email *</label>
                            <input type="text" id="email" name="email" placeholder="test@example.com" v-model="form.email"
                                v-on:blur="store.emailValidation('email')">
                        </div>
                    </div>

                    <!-- Password & Password Confirmation -->
                    <div class="row">
                        <div class="group small">
                            <label for="password">password *</label>
                            <input type="password" id="password" name="password" placeholder="La tua password"
                                v-model="form.password" v-on:blur="store.passwordValidation('password')">
                        </div>

                        <div class="group small">
                            <label for="password_confirmation">conferma password *</label>
                            <input type="password" id="password_confirmation" name="password_confirmation"
                                placeholder="Conferma la tua password" v-model="form.password_confirmation"
                                v-on:blur="store.passwordConfirmationValidation('password_confirmation', 'password')">
                        </div>
                    </div>

                    <!-- Date of Birth -->
                    <div class="row">
                        <div class="group large">
                            <label for="date_of_birth">data di nascita *</label>
                            <input type="date" id="date_of_birth" name="date_of_birth" v-model="form.date_of_birth"
                                v-on:blur="store.dateOfBirthValidation('date_of_birth')">
                        </div>
                    </div>

                    <div class="row">
                        <AppButton :label="'register'" :type="'solid'" :palette="'primary'" />
                    </div>
                </form>
                <AppErrorForm/>
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