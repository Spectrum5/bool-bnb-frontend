<script>

import axios from 'axios';
import {router} from './../../../../router';

export default {
    name: 'AppApartment',
    data() {
        return {
            router,
            myApartment: null
        }
    },
    methods: {
        getApartments() {
            axios.get('http://localhost:8000/api/apartments/quo-aut-et-mollitia')
                .then((response) => {
                    console.log('Index Appartamenti', response.data.apartment);
                    this.myApartment = response.data.apartment;
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti', response.data);
                })
        },
    },
    created() {
        this.getApartments();
    }
}
</script>

<template>
    <h1>prova</h1>
    <div class="my-container">
        <!-- LATO SX DASHBOARD / ASIDE -->
        <section class="lato-sx">
            
        </section>

        <!-- LATO DESTRO A TUTTA PAGINA -->
        <section class="lato-dx">
            <div>
                <h2>I miei Appartamenti</h2>
                <div class="create">
                    <button class="btn btn-create">
                        <font-awesome-icon icon="fa-solid fa-house-chimney" />
                        Aggiungi un nuovo appartmento
                    </button>
                </div>
            </div>
            <div class="row-my-partm">
                <div>
                    <p>{{ myApartment.title }}</p>
                </div>
                <div>
                    <button class="btn btn-edit">
                        <font-awesome-icon icon="fa-solid fa-pencil" />
                        Modifica
                    </button>
                    <button class="btn btn-delete">
                        <font-awesome-icon icon="fa-solid fa-trash-can" />
                        Elimina
                    </button>
                    <button class="btn btn-stats">
                        <font-awesome-icon icon="fa-solid fa-chart-simple" />
                        Vedi Statistiche
                    </button>
                    <button class="btn btn-sponsor">
                        <font-awesome-icon style="transform: rotate(-120deg);" icon="fa-solid fa-shuttle-space" />
                        Sponsorizza
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">

    .my-container {
        @include flexSpaceBtwn ($gap: 0);

        .lato-sx {
            height: 100vh;
            width: 15vw;
            border: 1px solid;
        }.lato-dx {
            height: 100vh;
            width: 85vw;
            border: 1px solid;
            padding: 15px 30px;

            >div{
                @include flexSpaceBtwn ($gap: 0);
                margin-bottom: 40px;
            }

        }
    }

    .btn{
        padding: 7px 10px;
        border-radius: 10px;
        margin-right: 5px;
        cursor: pointer;
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

    .btn-stats, .btn-sponsor {
        background-color: #59DCC0;
        border: 2px solid #59DCC0;
    }
</style>