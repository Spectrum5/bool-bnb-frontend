<script>

// Utilities
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';

//Components
import AppSlider from './AppSlider.vue';

export default {
    name: 'AppCard',
    components: {
        AppSlider
    },
    data() {
        return {
            store,
            router,
            images: []
        }
    },
    props: {
        apartment: Object
    },
    methods: {
        getImages() {
            axios.get(`http://localhost:8000/api/images/${this.apartment.id}`)
                .then((response) => {
                    this.images = response.data.images;
                    console.log('Images', response.data);
                })
        },
        goShow() {
            // Cambia la rotta nella rotta relativa al singolo appartamento
            this.$router.push(`/apartments/${this.apartment.slug}`)
        },
        addToFavorites() {
            console.log(`${this.apartment.title} aggiunto ai preferiti!`);
            this.$refs.btn.classList.toggle('animate');
        }
    },
    computed: {
        calcLocation() {
            return this.apartment.address.replace(/[0-9-]/g, '');
        }
    },
    mounted() {
        this.getImages();
    }
}
</script>


<template>
    <div class="card" @click="goShow()">

        <button class="cardFavorites" @click.stop="addToFavorites()" ref="btn"></button>

        <div class="imageContainer">
            <AppSlider :images="this.images" v-if="this.images"/>
        </div>

        <div class="infoContainer">
            <div class="row inline">
                <div class="cardTitle">
                    <h3>{{ this.apartment.title }}</h3>
                </div>
                <div class="cardViews">
                    123
                </div>
            </div>
            <div class="row">
                <div class="cardLocation">
                    {{ calcLocation }}
                </div>
                <div class="cardPrice">
                    <span>{{ apartment.price }}</span> &euro; a notte
                </div>
            </div>
        </div>

    </div> <!-- /card-->
</template>


<style lang="scss">
// @use '../styles/partials/variables.scss' as *;

$cardWidth: 260px;

button {
    background: none;
    border: none;
}

.card {
    width: $cardWidth;
    // border: 1px solid #141414;
    position: relative;
    cursor: pointer;

    .imageContainer {
        height: $cardWidth;
        border: 2px solid lightpink;
        border-radius: 12px;
        margin-bottom: 0.75rem;
        background-color: rgb(181, 241, 181);
    }

    .row.inline {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }

    .cardTitle {
        max-width: calc($cardWidth - 40px);

        flex-grow: 1;
        flex-shrink: 0;
        font-weight: 500;
        font-size: 0.8rem;
        margin-bottom: 2px;

        h3 {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }

    .cardViews {
        flex-shrink: 0;
    }

    .cardLocation {
        color: gray;
        font-size: 0.7rem;
        margin-bottom: 0.5rem;
    }

    .cardPrice {
        font-weight: 400;
        span {
            font-weight: 600;
        }
    }
}

.cardFavorites {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 20;

    padding-top: 2em;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/66955/web_heart_animation.png');
    background-repeat: no-repeat;
    background-size: 2900%;
    background-position: left;
    height: 60px;
    width: 60px;
    margin: 0 auto;
    cursor: pointer;
}

.animate {
    animation: heartBurst .8s steps(28) forwards;
}

@keyframes heartBurst {
    0% {
        background-position: left
    }

    100% {
        background-position: right
    }
}
</style>