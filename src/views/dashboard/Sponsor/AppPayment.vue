<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import braintree from 'braintree-web';
// Utilities
import axios from 'axios';

export default {
    name: 'SponsorIndex',
    components: {
        AppDashboardLayoutVue
    },
    data() {
        return {
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            amount: '',
            nonce: '',
        };
    },
    methods: {
        getData() {
            axios.get('http://localhost:8000/api/sponsors')
                .then(response => {
                    console.log('Index Sponsor', response.data)
                })
        },
        getToken() {
            axios.get('http://localhost:8000/api/sponsors/token', {
                params: {
                    apartment_id: 1,
                    sponsor_id: 2,
                }
            })
                .then(response => {
                    console.log('Token Sponsor', response.data.token);
                    this.nonce = response.data.token;
                })
        },
        async createPaymentMethod() {
            const client = await braintree.client.create({
                // authorization: `${process.env.VUE_APP_BRAINTREE_PUBLIC_KEY}`
                // authorization: `${import.meta.env.VUE_APP_BRAINTREE_PUBLIC_KEY}`
                authorization: `8fnxpxwcb38jym5v`
            });
            console.log('CLIENT', client);

            const { nonce } = await client.request({
                endpoint: 'http://localhost:8000/api/sponsors/token',
                method: 'post',
                data: {
                    creditCard: {
                        number: this.cardNumber,
                        expirationDate: this.expirationDate,
                        cvv: this.cvv
                    },
                    apartment_id: 1,
                    sponsor_id: 2
                }
            });

            this.nonce = nonce;
        },
        async submitPayment() {
            const response = await fetch('http://localhost:8000/api/sponsors/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nonce: this.nonce,
                    amount: this.amount,
                    creditCard: {
                        number: this.cardNumber,
                        expirationDate: this.expirationDate,
                        cvv: this.cvv
                    },
                    apartment_id: 1,
                    sponsor_id: 2
                })
            });

            const result = await response.json();

            if (result.success) {
                alert('Payment processed successfully!');
            } else {
                alert('Payment processing failed. Please try again.');
            }

        }
    },

    mounted() {
        document.title = 'Dashboard | Sponsor Plans';

        this.getData();
        this.getToken();
        // try {
        //     const response = await axios.get('http://localhost:8000/api/sponsor');
        //     this.sponsorData = response.data;
        // } catch (error) {
        //     console.log(error);
        // }
    },
};
</script>

<template>
    <AppDashboardLayoutVue :title="'Sponsorizzazione'">
        <main>

            <div class="container">
                <div>
                    <form>
                        <label for="card-number">Card Number:</label>
                        <input id="card-number" v-model="cardNumber" type="text">
                        <label for="expiration-date">Expiration Date:</label>
                        <input id="expiration-date" v-model="expirationDate" type="text">
                        <label for="cvv">CVV:</label>
                        <input id="cvv" v-model="cvv" type="text">
                        <label for="amount">Amount:</label>
                        <input id="amount" v-model="amount" type="text">
                    </form>
                    <button @click="createPaymentMethod">Generate Payment Method</button>
                    <button @click="submitPayment">Submit Payment</button>
                </div>
            </div>
        </main>

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