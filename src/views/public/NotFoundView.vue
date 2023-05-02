<template>
    <section class="page_404">
        <div class="four_zero_four_bg">
            <h1 class="text-center">404</h1>
        </div>
        <div class="contant_box_404">
            <h3>
                Oops..
            </h3>
            <p> Pagina non trovata!</p>
        </div>
        <AppButton :to="'/'" :label="'Torna alla Homepage'" :type="'solid'" :palette="'primary'" />
    </section>
</template>
  
<script>
import AppButton from '../../components/AppButton.vue';

export default {
    name: 'NotFoundView',
    components: {
        AppButton,
    },
};
</script>
  
<style lang="scss" scoped>
@import '../../styles/partials/variables.scss';

.page_404 {
    padding: 30px 0;
    height: 100vh;
    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;

    h1 {
        font-size: 80px;
    }

    h3 {
        font-size: 2rem;
    }

    p {
        font-size: 2rem;
    }
}
</style>