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
            },
        }
    },
    methods: {
        handleRegister() {
            this.postRegisterData();
        },
        postRegisterData() {
            const formData = new FormData();
            for (const item in this.form) {
                formData.append(`${item}`, this.form[item]);
            }

            console.log('Form Data', formData);
            axios.post('http://localhost:8000/register', formData)
                .then((response) => {
                    // console.log('Risposta Register', response);
                    this.$emit('getUserEvent');
                    // router.push('/dashboard');
                }
                )
                .catch((response) => {
                    console.log('Errore register:', response.response.data);
                    this.store.errors = response.response.data;
                })
        }
    },
    handleLogout() {
        axios.post('http://localhost:8000/logout');
        this.store.user = null;
        console.log('Logged Out');
        router.push('/');
    },

}
</script>

<template>
    <header>
        <div class="container">
            <AppLogo />
            <button @click="handleLogout()">logout</button>
        </div>
    </header>
    <main>
        <div class="container">
            <div class="formContainer">
                <h1 class="mainTitle">login</h1>
                <form @submit.prevent="handleRegister()">
                    <div class="row">
                        <div class="group small">
                            <label for="first_name">first name</label>
                            <input type="text" id="first_name" name="first_name" placeholder="Your first name" v-model="form.first_name">
                        </div>
                    </div>

                    <div class="row">
                        <div class="group small">
                            <label for="last_name">last name</label>
                            <input type="text" id="last_name" name="last_name" placeholder="Your last name"
                                v-model="form.last_name">
                        </div>
                    </div>

                    <div class="row">
                        <div class="group large">
                            <label for="email">email</label>
                            <input type="text" id="email" name="email" placeholder="test@example.com"
                                v-model="form.email">
                        </div>
                    </div>

                    <div class="row inline-spaced">
                        <div class="group small">
                            <label for="password">password</label>
                            <input type="password" id="password" name="password" placeholder="Your password"
                                v-model="form.password">
                        </div>

                        <div class="group small">
                            <label for="password_confirmation">confirm password</label>
                            <input type="password_confirmation" id="password_confirmation" name="password_confirmation" placeholder="Confirm your password"
                                v-model="form.password_confirmation">
                        </div>
                    </div>

                    <div class="row">
                        <div class="group large">
                            <label for="date_of_birth">date of birth</label>
                            <input type="date" id="date_of_birth" name="date_of_birth"
                                v-model="form.date_of_birth">
                        </div>
                    </div>

                    <button>register</button>
                </form>
                <a href="" class="customLink">Hai gia' un account? Accedi.</a>
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

.mainTitle {
    margin-bottom: 1rem;
    text-transform: capitalize
}

.customLink {
    color: $color-one-dark;
    font-size: 0.9rem
}

.container {
    @include largeContainer;
    @include flexRowCenter;
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