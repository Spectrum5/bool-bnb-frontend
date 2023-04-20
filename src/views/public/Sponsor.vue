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
        <div class="cards">
            <div class="card shadow">
                <ul>
                    <li class="pack">standard</li>
                    <li id="standard" class="price bottom-bar">&euro;2.99</li>
                    <li class="bottom-bar">Time: 24 ore</li>
                    <li class="bottom-bar">2 case</li>
                    <li class="bottom-bar">no support</li>
                    <li><button class="btn">Attiva</button></li>
                </ul>
            </div>
            <div class="card active">
                <ul>
                    <li class="pack">premium</li>
                    <li id="plus" class="price bottom-bar">&euro;5.99</li>
                    <li class="bottom-bar">Time: 72 ore</li>
                    <li class="bottom-bar">case infinite</li>
                    <li class="bottom-bar">Support 24/7 (non è vero)</li>
                    <li><button class="btn active-btn">Attiva</button></li>
                </ul>
            </div>
            <div class="card shadow">
                <ul>
                    <li class="pack">plus</li>
                    <li id="premium" class="price bottom-bar">&euro;9.99</li>
                    <li class="bottom-bar">Time: 48 ore</li>
                    <li class="bottom-bar">case non infinite</li>
                    <li class="bottom-bar">support 9-12</li>
                    <li><button class="btn">Attiva</button></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;

    .cards {
        display: flex;
        justify-content: center;
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
</style>