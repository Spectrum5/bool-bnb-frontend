<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import { store } from '../../../store';

export default {
    name: 'MessageIndex',
    components: {
        AppDashboardLayoutVue
    },
    data() {
        return {
            router,
            store,
            messages: null            // apartments: null
        }
    },
    methods: {
        getMessages() {
            // console.log('USER ID', store.user.id);
            axios.get('http://localhost:8000/api/messages',)
                .then((response) => {
                    console.log('Index Messaggi', response.data.messages[0].apartment.title);
                    this.messages = response.data.messages;
                })
                .catch((response) => {
                    console.log('Errore Index Messaggi', response);
                })
        },
        // deleteApartment(id) {
        //     axios.delete(`http://localhost:8000/api/apartments/${id}`)
        //         .then((response) => {
        //             console.log('Project Deleted');
        //             this.getApartments();
        //         })
        // },
        // gotoCreate() {
        //     console.log('GO TO');
        //     this.$router.push('/dashboard/apartments/create');
        // }
    },
    mounted() {
        document.title = 'Dashboard | My Messages'
        this.getMessages();
    }
}
</script>

<template>
    <AppDashboardLayoutVue 
        :title="'i miei messaggi'">

            <main>
                <div class="messages" v-if="messages">
                    <div class="message" v-for="message in messages">
                        <div class="email">{{ message.apartment.title }}</div>
                        <div class="email">{{ message.email }}</div>
                        <div class="text">{{ message.message }}</div>
                    </div>


                    <!-- <div class="email">
                        <p></p>
                    </div>
                    <div class="text">
                        <p class="message" v-for="message in messages">{{ message.message }}</p>
                    </div> -->
                </div>
            </main>

    </AppDashboardLayoutVue>
</template>

<style scoped lang="scss">
@use '../../../styles/partials/mixins.scss' as *;
@use '../../../styles/partials/variables.scss' as *;

.message {
    padding: 10px 0;
    border-bottom: 1px solid $dark-color-one;
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