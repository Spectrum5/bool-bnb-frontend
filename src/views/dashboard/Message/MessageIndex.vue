<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppButton from '../../../components/AppButton.vue';
import AppLoading from '../../../components/AppLoading.vue';

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import { store } from '../../../store';

export default {
    name: 'MessageIndex',
    components: {
        AppDashboardLayoutVue,
        AppButton,
        AppLoading
    },
    data() {
        return {
            router,
            store,
            messages: null,
            loading: false,
            notFound: false,
        }
    },
    methods: {
        getMessages() {
            this.loading = true;
            this.notFound = false;
            axios.get('http://localhost:8000/api/messages',)
                .then((response) => {
                    if (response.data.messages.length == 0) this.notFound = true;
                    this.loading = false;
                    this.messages = response.data.messages;
                    console.log('Index Messaggi', response.data.messages);
                })
                .catch((response) => {
                    console.log('Errore Index Messaggi', response);
                    this.loading = false;
                    this.notFound = true;
                })
        },
        formatDate(date) {
            // return new Date(date).toLocaleDateString('it')
            const dateToFormat = new Date(date);
            const day = dateToFormat.getDate().toString().padStart(2, '0');
            const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
            const year = dateToFormat.getFullYear();
            return `${day}-${month}-${year}`;
        },
    },
    mounted() {
        document.title = 'Dashboard | I miei Messaggi'
        this.getMessages();
    }
}
</script>

<template>
    <AppDashboardLayoutVue :title="'i miei messaggi'">

        <main>
            <AppLoading v-if="loading == true" />
            <div class="messages" v-if="messages">
                <div class="message" v-for="message in messages">
                    <div>
                        <div class="title mb-1">
                            <strong>
                                {{ message.apartment.title }}
                            </strong>
                        </div>
                        <div class="info-message">
                            <p class="email">Ricevuto il: {{ formatDate(message.created_at) }}</p>
                            <p class="email">Mittente: {{ message.email }}</p>
                            <p class="text">{{ message.message }}</p>
                        </div>
                    </div>
                    <AppButton :label="'Rispondi'" :icon="'share'" :palette="'secondary'" />
                </div>
                <div>
                </div>
            </div>
            <div class="no-message" v-else-if="notFound">
                <h2>Non sono presenti messaggi</h2>
            </div>
        </main>

    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/variables.scss' as *;

.message {
    @include flexSpaceBtwn;
    padding: 10px 0;
    border-bottom: 1px solid $dark-color-one;

    &:hover{
        background-color: #f5f5f5;
    }
}

.title{
    text-transform: uppercase;
}

.no-message{
    text-align: center;
    margin-top: 35px;
}

.info-message{
    font-size: 0.8rem;
    color: rgb(51, 51, 51);
}

.email {
    font-weight: 600;
}

main {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;
}
.my-container {
    @include flexSpaceBtwn ($gap: 0);
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.445);

    .lato-sx {
        height: 100vh;
        width: 15vw;
        border: 1px solid;
    }

    .lato-dx {
        height: 100vh;
        width: 85vw;
        border: 1px solid;
        padding: 15px 30px;

        >div {
            @include flexSpaceBtwn ($gap: 0);
            margin-bottom: 40px;
        }
    }
}

.btn {
    padding: 7px 10px;
    border-radius: 10px;
    margin-right: 5px;
    cursor: pointer;
}

.btn-show {
    background-color: #f5f5f5;
    border: 2px solid #141414;
}

.btn-create {
    background-color: #59DCC0;
    border: 2px solid #59DCC0;
    color: white;
    font-weight: 600;
}

.btn-edit {
    background-color: #f5d679;
    border: 2px solid #f5d679;
}

.btn-delete {
    background-color: #f56372;
    border: 2px solid #f56372;
}

.btn-stats,
.btn-sponsor {
    background-color: #59DCC0;
    border: 2px solid #59DCC0;
}
</style>