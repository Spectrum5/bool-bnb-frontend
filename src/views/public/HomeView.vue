<script>

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppHeader from '../../components/AppHeader.vue';
import AppSearch from '../../components/AppSearch.vue';

export default {
    name: 'HomeView',
    components: {
        AppLogo,
        AppHeader,
        AppSearch
    },
    data() {
        return {
        }
    },
    methods: {
    },
}
</script>

<template>
    <AppHeader />
    <AppSearch />



    <div class="container">
        <!-- <label for="searchTitle">Titolo</label>
        <input type="text" v-model="searchTitle" id="searchTitle" name="searchTitle" placeholder="Inserisci il titolo...">
        <button @click="handleSearch()">Cerca</button> -->
    </div>

    <div class="container">
        <div class="card" v-for="apartment in apartments" @click="$router.push(`/apartments/${apartment.slug}`)">
            <h2>Titolo: {{ apartment.title }}</h2>
            <p>Descrizione: {{ apartment.description }}</p>
        </div>

    </div>

    <div class="btn-container">
        <button @click="loadMore()">LOAD MORE</button>
    </div>
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/variables.scss';

</style>