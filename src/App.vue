<script>
import { store } from './store';
import Card from './components/Card.vue';

export default {
    name: 'App',
    data() {
        return {
            store
        }
    },
    components: {
        Card,
    }
}
</script>

<template>
    <div class="container text-center">
        <h1>Prova h1</h1>
        <h2>Prova h2 <span class="title-bnb">testo evidenziato</span>
        </h2>
        <h3>prova testo 3</h3>
        <button class="button">
            Vedi tutti
        </button>
        <div>{{ store.test }}</div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ut quae voluptate nihil officiis incidunt iure
            neque inventore sequi omnis ipsum obcaecati totam, perspiciatis necessitatibus corrupti.
        </p>
        <Card/>
    </div>
</template>

<style lang="scss">
@import './styles/main';

</style>