<script>

import AppButton from '../../components/AppButton.vue';

export default {
    name: 'NotFoundView',
    components: {
        AppButton,
    },
}
</script>

<template>
    <div class="error_container">
        <div class="error_block">
            <h1>404</h1>
            <h2>Oops... Pagina non trovata!</h2>
            <AppButton :to="'/'" :label="'Torna alla Homepage'" :type="'solid'" :palette="'primary'" />
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '../../styles/partials/variables.scss';

.error_block {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h1 {
        font-size: 60px;
        color: $color-one-dark; 
    }
    h2 {
        font-size: 40px;
        color: $color-one-dark;
        margin-bottom: 10px;
    }
}
</style>