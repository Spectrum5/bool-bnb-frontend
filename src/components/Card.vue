<script>
import { store } from '../store';
export default {
    name: 'Card',
    data() {
        return {
            store
        }
    },
    mounted() {
        //console.log(store.images[0].img);
        const slidesElement = document.querySelector(".card")
        //console.log(slidesElement);
        let immagineAttiva = 0 // setto il valore di img active a 0 
        for (let index = 0; index < store.images.length; index++) { // ciclo dentro l'array di oggetti 
            const element = store.images[index];
            const slideHtml = `<img class="${index === immagineAttiva ? 'active' : ''} rounded" src="${element.img}" alt="">`
            slidesElement.insertAdjacentHTML("afterbegin", slideHtml)
            //console.log(element);
        }

    }
}
</script>

<template>
    <h1>Funziono</h1>
    <div class="card" style="width: 18rem;">
        <i class="fa-solid fa-circle-chevron-left arrow_left"></i>
        <i class="fa-solid fa-circle-chevron-right arrow_right"></i>

        <!-- <img :src="store.images[0].img" class="card-img-top active" alt=""> -->
        <div class="card-body text-start bg-gray">
            <div class="test">Villa - Viareggio, Italia</div>
            <h5>Casa vacanze "La Villa di Sergio"</h5>
            <div>3 letti</div>
            <div class="d-flex justify-content-between">
                <div>stelle</div>
                <div>2500 € /notte</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../styles/partials/variables.scss';
.test {
    color: $secondary-color;
}
.bg-gray {
    background-color: rgb(255, 208, 132);
}
.active {
    display: block;
}
img {
    max-width: 100%;
    display: none;
    box-shadow: 0 0 10px gray;
}

</style>