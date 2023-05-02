<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';

// Utilities
import axios from 'axios';

export default {
    name: 'SponsorPayment',
    components: {
        AppDashboardLayoutVue
    },
    data() {
        return {

        };
    },
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
        // this.getSponsors()
    }

};
</script>

<template>
    <AppDashboardLayoutVue :title="'Piani di Sponsor'">

        <template>
            
        </template>
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