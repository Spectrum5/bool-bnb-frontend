<script>

// Utilities
import { register } from 'swiper/element/bundle';
register();

export default {
    name: 'AppSlider',
    components: {
    },
    props: {
        images: Array
    }
}
</script>

<template>
    <swiper-container id="slider" :navigation="true" :pagination="true">

        <swiper-slide class="slide" v-for="image in this.images">
            <img :src="`http://localhost:8000/storage/apartments/${image.url}`" @click.stop="$emit('goShowEvent')"
                loading="lazy">
        </swiper-slide>

    </swiper-container>
</template>

<style scoped lang="scss">
#slider {
    position: relative;
    width: 100%;
    border-radius: 12px;
    height: 100%;
    --swiper-navigation-color: #f39237;
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