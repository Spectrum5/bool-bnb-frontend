<!--
    Per passare da Composition API a Options API dobbiamo:
    1. Rimuovere l'attributo setup da <script>
    2. Aggiungere l'export default {}
    3. Aggiungere la proprietà name nell'oggetto esportato che avrà come valore il nome del componente (opzionale, ma buona pratica)
-->
<script>
import { store } from './store';

// Passi per utilizzare sottocomponenti
// 1. Importazione

export default {
    name: "App",
    data() {
        return {
            store
        }
    },
    // 2. Registrazione
    components: {
        
    },
    methods: {
        
    }
};
</script>

<template>
    <!-- 3. Utilizzo (nuovo tag HTML self-closing) -->

</template>

<!-- Nel componente App.vue, rimuoviamo anche l'attributo scoped su <style> -->
<!-- E se voglio utilizzare sass, aggiungo l'attributo lang="scss" -->
<style lang="scss">
// Qui possiamo anche importare dei file .scss (attenzione al percorso)
@import './styles/main';

</style>
