<script>

// Utilities
import axios from 'axios';
import { router } from '../../../router';
import { store } from '../../../store';

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppButton from '../../../components/AppButton.vue';

export default {
    name: 'SponsorIndex',
    components: {
        AppDashboardLayoutVue,
        AppButton
    },
    data() {
        return {
            store,
            router,
            sponsorsData: [],
            chooseApartment: false,
            apartments: [],
            sponsorPlan: null
        };
    },

    methods: {

        getSponsorsData() {
            axios.get('http://localhost:8000/api/sponsors')
                .then(response => {
                    console.log('index', response.data.sponsors);
                    this.sponsorsData = response.data.sponsors;
                })
        },
        getApartments() {
            axios.get('http://localhost:8000/api/apartments/indexUser')
                .then((response) => {
                    console.log('Index Appartamenti Personali', response.data);
                    this.apartments = response.data.apartments;
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti Personali', response.data);
                })
        },
        selectSponsor(sponsor_id, price) {
            this.sponsorPlan = sponsor_id;
            this.chooseApartment = true;
            this.store.sponsor_id = sponsor_id;
            this.store.sponsor_price = price;
            this.getApartments();
        },
        selectApartment(apartment_id, apartment_slug) {
            this.apartment_id = apartment_id;
            this.store.apartment_id = apartment_id;
            router.push(`/dashboard/sponsors/${this.sponsorPlan}/${apartment_slug}`)
        }
    },
    mounted() {
        document.title = 'Dashboard | Sponsor';
        this.getSponsorsData()
    }
};
</script>

<template>
    <AppDashboardLayoutVue :title="'Piani di Sponsor'">

        <main>
            <div class="container">
                <div class="cards" v-if="!chooseApartment">
                    <div class="card" v-for="sponsor in sponsorsData"
                        :class="sponsor.title == 'premium' ? 'active' : 'shadow'">
                        <ul>
                            <li class="pack">{{ sponsor.title }}</li>
                            <li id="standard" class="price bottom-bar">&euro;{{ sponsor.price }}</li>
                            <li class="bottom-bar">{{ sponsor.duration }} ore</li>
                            <li @click="selectSponsor(sponsor.id, sponsor.price)">
                                <AppButton :label="'Sponsorizza'" :type="'solid'" :palette="'secondary'" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="apartments" v-else>
                    <div class="apartment" v-for="apartment in apartments " :key="apartment.id" v-if="apartments != null"
                        @click="selectApartment(apartment.id, apartment.slug)">
                        <div>
                            <p> {{ apartment.title }}</p>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-chevron-right" />
                    </div>
                </div>
            </div>
        </main>

    </AppDashboardLayoutVue>
</template>

<style lang="scss" scoped>
@use '../../../styles/partials/variables.scss' as *;
@use '../../../styles/partials/mixins.scss' as *;

main {
    max-width: calc(100vw - 200px);
    height: 100%;
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    // background-color: red;
}

.apartment {
    @include flexSpaceBtwn ($gap: 0);
    // background-color: red;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.445);
    cursor: pointer;

    &:hover {
        background-color: $light-color-one;
    }

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

.container {
    // background-color: #a3a8f0;
    height: 100%;
    flex-grow: 1;
    // @include flexRowCenter;

    .cards {
        @include flexRowCenter;
        height: 100%;
        flex-wrap: wrap;

        .card {
            background: #fff;
            color: hsl(233, 13%, 49%);
            border-radius: 0.8rem;
            transition: all 0.05s;

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
                transform: scale(1.1);
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
                    #a3a8f0 0%,
                    #69d9dd 100%);
            color: #fff;
            border: none;
            font-weight: bold;
            cursor: pointer;

            &:hover {
                background: linear-gradient(135deg,
                        #69d9dd 0%,
                        #a3a8f0 100%);
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