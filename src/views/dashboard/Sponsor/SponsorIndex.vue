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
        };
    },
    async created() {
        document.title = 'Dashboard | Sponsor Plans';
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

    <AppDashboardLayoutVue :title="'Piani di Sponsor'">
        <main>

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
        </main>

    </AppDashboardLayoutVue>
</template>

<style lang="scss" scoped>
@use '../../../styles/partials/mixins.scss' as *;

main {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    // display: flex;
    // justify-content: flex-start;
    // align-items: center;
    // min-height: 100vh;
    // margin-top: 5rem;
    // background-color: red;

    .cards {
        @include flexRowCenter;
        align-items: center;
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
        display: flex;
        align-items: center;
        transform: scale(1.1);
        z-index: 1;
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


@media (min-width: 320px) and (max-width: 768px) {
    .cards {
        display: flex;
        flex-direction: column;
    }

    .card {
        margin-bottom: 1rem;
    }

    .cards .card.active {
        transform: scale(1);
    }
}

@media (min-width: 600px) and (max-width: 700px) {
    .card {
        margin-bottom: 1rem;
        margin-right: 1rem;
    }

    .cards .card.active {
        transform: scale(1);
    }
}

@media (min-width: 768px) and (max-width: 900px) {
    .cards {
        display: flex;
        height: fit-content;
    }

    .card {
        margin-bottom: 2rem;
        margin-right: 1rem;
    }

    .cards .card.active {
        transform: scale(1);
    }
}
</style>