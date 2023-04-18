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
        
    </div>

</template>

<style lang="scss" scoped></style>