<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';

// Utilities
import axios from 'axios';

export default {
    name: 'SponsorIndex',
    components: {
        AppDashboardLayoutVue
    },
    data() {
        return {
            sponsorData: [],
            selectedApartment: null,
            selectedSponsor: null,
            paymentError: null,
            sponsors: []
        };
    },
    // async created() {
    //     document.title = 'Dashboard | Sponsor Plans';
    //     try {
    //         const response = await axios.get('http://localhost:8000/api/sponsors');
    //         console.log('index',response.data)
    //         this.sponsorData = response.data;
    //         this.sponsors = response.data.sponsors;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    methods: {
        sponsorizeApartment() {
            if (!this.selectedApartment || !this.selectedSponsor) {
                return;
            }

            axios.post('http://localhost:8000/api/sponsors', {
                apartment_id: 5,
                sponsor_id: 3
            })
                .then(response => {
                    // TODO: handle success
                })
                .catch(error => {
                    this.paymentError = error.response.data.message || 'Unknown error';
                });
        },
        getSponsors() {
            axios.get('http://localhost:8000/api/sponsors').then(response => {
                    console.log('index', response.data)
                })
        }
    },
    computed: {
        sponsorPrice() {
            if (!this.selectedSponsor) {
                return 0;
            }

            return this.selectedSponsor.price;
        }
    },
    mounted() {
        this.getSponsors()
    }

};
</script>

<template>
    <AppDashboardLayoutVue :title="'Piani di Sponsor'">

        <template>
            <div class="apartment-sponsorship">
                <h2>Sponsorizza appartamento</h2>

                <div v-if="!selectedApartment">
                    Seleziona un appartamento per continuare.
                </div>

                <div v-if="selectedApartment">
                    <h3>{{ selectedApartment.title }}</h3>

                    <div class="sponsors">
                        <div class="sponsor" v-for="pkg in sponsors" :key="pkg.id"
                            :class="{ 'selected': pkg === selectedSponsor }" @click="selectedSponsor = pkg">
                            <h4>{{ pkg.name }}</h4>
                            <p>{{ pkg.description }}</p>
                            <div class="price">{{ pkg.price }} €</div>
                        </div>
                    </div>

                    <div class="total" v-if="selectedSponsor">
                        <div class="label">Totale:</div>
                        <div class="price">{{ sponsorPrice }} €</div>
                    </div>

                    <button class="btn btn-primary" @click="sponsorizeApartment">Paga ora</button>

                    <div class="error" v-if="paymentError">{{ paymentError }}</div>
                </div>
            </div>
        </template>


        <!-- <main>

            <div class="container">
                <div class="cards">
                    <div class="card shadow">
                        <ul>
                            <li class="pack">standard</li>
                            <li id="standard" class="price bottom-bar">&euro;2<sup>99</sup></li>
                            <li class="bottom-bar">Time: 24 ore</li>
                            <li class="bottom-bar">2 case</li>
                            <li class="bottom-bar">no support</li>
                            <li><button class="btn">Attiva</button></li>
                        </ul>
                    </div>
                    <div class="card active">
                        <ul>
                            <li class="pack">premium</li>
                            <li id="plus" class="price bottom-bar">&euro;9<sup>99</sup></li>
                            <li class="bottom-bar">Time: 72 ore</li>
                            <li class="bottom-bar">case infinite</li>
                            <li class="bottom-bar">Support 24/7 (non è vero)</li>
                            <li><button class="btn active-btn">Attiva</button></li>
                        </ul>
                    </div>
                    <div class="card shadow">
                        <ul>
                            <li class="pack">plus</li>
                            <li id="premium" class="price bottom-bar">&euro;5<sup>99</sup></li>
                            <li class="bottom-bar">Time: 48 ore</li>
                            <li class="bottom-bar">case non infinite</li>
                            <li class="bottom-bar">support 9-12</li>
                            <li><button class="btn">Attiva</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main> -->

    </AppDashboardLayoutVue>
</template>

<style lang="scss" scoped>
@use '../../../styles/partials/mixins.scss' as *;

main {
    max-width: calc(100vw - 200px);
    height: 100%;
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;
    justify-content: center;
    align-items: center;
}

.container {

    .cards {
        @include flexRowCenter;
        flex-wrap: wrap;

        .card {
            background: #fff;
            color: hsl(233, 13%, 49%);
            border-radius: 0.8rem;

            ul {
                margin: 2.6rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;

                sup {
                    font-size: 30px;
                    vertical-align: top;
                }
            }

            &:hover {
                transform: scale(1.2);
            }
        }

        .shadow {
            box-shadow: -5px 5px 15px 1px rgba(0, 0, 0, 0.1);
        }
    }

    .cards .card.active {
        background: linear-gradient(135deg,
                rgb(163, 240, 218) 0%,
                rgba(105, 111, 221, 1) 100%);
        color: #fff;
    }

    ul li {
        list-style-type: none;
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 1rem 0;
        // line-height: 3rem;


        .btn {
            margin-top: 1rem;
            height: 2.6rem;
            width: 13.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            background: linear-gradient(135deg,
                    rgba(163, 168, 240, 1) 0%,
                    rgb(105, 217, 221) 100%);
            color: #fff;
            border: none;
            font-weight: bold;
            cursor: pointer;

            &:hover {
                background: linear-gradient(135deg,
                        rgba(105, 217, 221) 0%,
                        rgb(163, 168, 240, 1) 100%);
            }
        }
    }

    ul li.price {
        font-size: 3rem;
        padding-bottom: 2rem;
    }

    .card.active .price {
        color: #fff;
    }

    .bottom-bar {
        border-bottom: 2px solid hsla(240, 8%, 85%, 0.582);
    }

    .card.active .bottom-bar {
        border-bottom: 2px solid hsla(240, 8%, 85%, 0.253);
    }

    .pack {
        font-size: 1.3rem;
    }
}

// Media Query

@media (min-width: 320px) and (max-width: 768px) {
    main {
        max-width: 100vw;

    }

    .cards {
        display: flex;
        flex-direction: column;
    }

    .card {
        margin-bottom: 1rem;
    }

    .cards .card.active {
        transform: scale(1.1);
    }
}

@media (min-width: 768px) and (max-width: 1209px) {
    main {
        .card {
            margin: 5px;
        }

    }
}

@media (min-width: 1210px) {
    main {
        height: 100%;
        flex-grow: 1;
        overflow: auto;
        padding: 1rem;
        justify-content: center;
        align-items: center;
        display: flex;


        .card {
            margin: 5px;
        }
    }
}
</style>