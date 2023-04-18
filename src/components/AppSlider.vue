<script>

// Utilities
import { register } from 'swiper/element/bundle';
register();
// import axios from 'axios';
// import { store } from '../store';
// import { router } from '../router';

export default {
    name: 'AppSlider',
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
    },
    computed: {
    },
    mounted() {
    }
}
</script>


<template>
    <swiper-container id="slider" :navigation="true" :pagination="true">
        <swiper-slide class="slide" v-for="image in this.images">
            <img :src="`http://localhost:8000/storage/apartments/${image.url}`">
        </swiper-slide>
    </swiper-container>
</template>


<style lang="scss">
#slider {
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