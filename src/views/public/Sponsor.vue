<script>

// Utilities
import axios from 'axios';

export default {
    data() {
        return {
            sponsorData: [],
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:8000/api/sponsor');
            this.sponsorData = response.data;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<template>
    <div @click="$router.push('/')">torna alla home</div>

    <div class="container">
        <div class="card">
            <div class="sponsor">
                <div>
                    Name
                </div>
                <div class="price">
                    price
                </div>
                <div class="time">
                    tempo
                </div>
            </div>

            <div class="description">
                <div>
                    descrizione
                </div>
                <div>
                    <ul>
                        <li>
                            Lorem, ipsum dolor.
                        </li>
                        <li>
                            Lorem ipsum dolor sit.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <button>select plan</button>
            </div>

        </div>

        <div class="card">
            <div class="bg-card">
                <div class="sponsor">
                    <div>
                        Name
                    </div>
                    <div class="price">
                        price
                    </div>
                    <div class="time">
                        tempo
                    </div>
                </div>
            </div>


            <div class="description">
                <div>
                    descrizione
                </div>
                <div>
                    <ul>
                        <li>
                            Lorem, ipsum dolor.
                        </li>
                        <li>
                            Lorem ipsum dolor sit.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <button>select plan</button>
            </div>
        </div>

        <div class="card">
            <div class="sponsor">
                <div>
                    Name
                </div>
                <div class="price">
                    price
                </div>
                <div class="time">
                    tempo
                </div>
            </div>

            <div class="description">
                <div>
                    descrizione
            </div>
            <div>
                <ul>
                    <li>
                        Lorem, ipsum dolor.
                    </li>
                    <li>
                        Lorem ipsum dolor sit.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet.
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <button>select plan</button>
        </div>
    </div>
</div>

<!-- <div class="container">
        <div class="text-center">
            <h2 class="fw-bold fs-3">
                Sponsor
            </h2>
            <p class="text-center">
                Dai una spinta al tuo annuncio con uno dei nostri abbonamenti!
            </p>
        </div>
        <div class="mt-3 rounded-3 shadow">
            <div class="col-md-4 float-start">
                <div class="p-3">
                    <h3 class="fw-bold">
                        Title
                    </h3>
                    <p class="">
                        Descrizione molto bellissimissima della fregatura di questi abbonamenti!
                    </p>
                    <div class="d-flex align-items-center">
                        <h4 class="text-indigo">
                            What's included
                        </h4>
                        <div class="flex-grow-1 bg-secondary" style="height: 1px;"></div>
                    </div>
                    <ul class="list-unstyled mt-3">
                        <li>
                            prova 1
                        </li>
                        <li>
                            prova 2
                        </li>
                    </ul>
                </div>
                <div class="bg-gray-50 text-center p-3">
                    <p class="fw-bold text-center">
                        Durata:
                    </p>
                    <p class="mb-5 text-center">
                        <span class="fw-bold fs-1"> &euro; 2.99 </span>
                    </p>
                    <a href="#" class="btn btn-danger w-100">
                        Acquista
                    </a>
                    <p class="text-secondary mb-0 text-center">
                        <small>
                            Paga ora e non ne uscirai più
                        </small>
                    </p>
                </div>
            </div>
            <div class="col-md-4 float-start">
                <div class="p-3">
                    <h3 class="fw-bold">
                        Title
                    </h3>
                    <p class="">
                        Descrizione molto bellissimissima della fregatura di questi abbonamenti!
                    </p>
                    <div class="d-flex align-items-center">
                        <h4 class="text-indigo">
                            What's included
                        </h4>
                        <div class="flex-grow-1 bg-secondary" style="height: 1px;"></div>
                    </div>
                    <ul class="list-unstyled mt-3">
                        <li>
                            prova 1
                        </li>
                        <li>
                            prova 2
                        </li>
                    </ul>
                </div>
                <div class="bg-gray-50 text-center p-3">
                    <p class="fw-bold text-center">
                        Durata:
                    </p>
                    <p class="mb-5 text-center">
                        <span class="fw-bold fs-1"> &euro; 5.99 </span>
                    </p>
                    <a href="#" class="btn btn-danger w-100">
                        Acquista
                    </a>
                    <p class="text-secondary mb-0 text-center">
                        <small>
                            Paga ora e non ne uscirai più
                        </small>
                    </p>
                </div>
            </div>
            <div class="col-md-4 float-start">
                <div class="p-3">
                    <h3 class="fw-bold">
                        Title
                    </h3>
                    <p class="">
                        Descrizione molto bellissimissima della fregatura di questi abbonamenti!
                    </p>
                    <div class="d-flex align-items-center">
                        <h4 class="text-indigo">
                            What's included
                        </h4>
                        <div class="flex-grow-1 bg-secondary" style="height: 1px;"></div>
                    </div>
                    <ul class="list-unstyled mt-3">
                        <li>
                            prova 1
                        </li>
                        <li>
                            prova 2
                        </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div class="bg-gray-50 text-center p-3">
                                                                        <p class="fw-bold text-center">
                                                                            Durata:
                                                                        </p>
                                                                        <p class="mb-5 text-center">
                                                                            <span class="fw-bold fs-1"> &euro; 5.99 </span>
                                                                        </p>
                                                                        <a href="#" class="btn btn-danger w-100">
                                                                            Acquista
                                                                        </a>
                                                                        <p class="text-secondary mb-0 text-center">
                                                                            <small>
                                                                                Paga ora e non ne uscirai più
                                                                            </small>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
        
                                                        </div> -->
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .card {
        height: 500px;
        background-color: rgba(244, 244, 244, 0.541);
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 25px;
        box-shadow: 2px;
        margin: 10px 10px;

        .sponsor {

            // background-color: lightcoral;
            div {
                padding-bottom: 8px;
            }
        }
    }
}
</style>