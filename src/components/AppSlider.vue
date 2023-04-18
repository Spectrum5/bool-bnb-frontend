<script>

// Utilities
import { register } from 'swiper/element/bundle';
register();

// import SwiperCore, { Navigation } from 'swiper'
// import 'swiper/swiper.min.css'
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import axios from 'axios';
// import { store } from '../store';
// import { router } from '../router';

export default {
    name: 'AppSlider',
    components: {
    },
    data() {
        return {
            // store,
            // router
        }
    },
    props: {
        images: Array
    },
    methods: {
        setAll() {
            const swiperEl = document.querySelector('swiper-container');
            const btnPrev = this.$refs.btnPrev;
            const btnNext = this.$refs.btnNext;
            // const btnPrev = document.querySelector('#btnPrev');
            // const btnNext = document.querySelector('#btnNext');

            btnPrev.addEventListener('click', () => {
                swiperEl.swiper.slidePrev();
                console.log('PREV');
            });

            btnNext.addEventListener('click', () => {
                swiperEl.swiper.slideNext();
            });
        }
    },
    computed: {
    },
    mounted() {
        this.setAll();
    },
}
</script>


<template>
    <swiper-container id="slider" :pagination="true">
        <swiper-slide class="slide" v-for="image in this.images">
            <img :src="`http://localhost:8000/storage/apartments/${image.url}`" @click.stop="$emit('goShowEvent')"
                loading="lazy">
        </swiper-slide>

        <button id="btnPrev" ref="btnPrev">prev</button>
        <button id="btnNext" ref="btnNext">next</button>
    </swiper-container>
</template>


<style scoped lang="scss">
button {
    position: absolute;
    top: 0;
    isolation: isolate;
    z-index: 100;
    background-color: red;

    &#btnPrev {
        left: 0;
    }

    &#btnNext {
        right: 0;
    }
}

#slider {
    // position: relative;
    width: 100%;
    border-radius: 12px;
    height: 100%;
    --swiper-navigation-color: #d63a5c;
    --swiper-pagination-color: #ffffff;
}

.slide {
    background-color: #141414;
    overflow: hidden;

    >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}
</style>