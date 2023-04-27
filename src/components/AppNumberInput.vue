<script>

// Components
// import AppLogo from './AppLogo.vue';
// import AppButton from './AppButton.vue';

// Utilities
import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppNumberInput',
    components: {
        // AppLogo,
        // AppButton
    },
    data() {
        return {
            store,
            router,
            // form: {
            //     address: '',
            //     rooms_number: null,
            //     beds_number: null,
            //     bathrooms_number: null,
            //     services: []
            // }
        }
    },
    props: {
        value: Number
    }
}
</script>

<template>
    <div class="numberInput">
        <div class="button"><font-awesome-icon icon="fa-solid fa-minus" /></div>
        <div class="value">
            0
        </div>
        <div class="button"><font-awesome-icon icon="fa-solid fa-plus" /></div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;
@use '../styles/partials/form.scss' as *;

.numberInput {
    display: flex;
    // background-color: blue;
    font-size: 0.95rem;
    border-radius: 10px;
    overflow: hidden;

    .value {
        flex-grow: 1;
        padding: 10px 0;
        background: $light-color-two;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .button {
        display: flex;
        padding: 10px 0;
        width: 40px;
        justify-content: center;
        align-items: center;
        background-color: gray;
    }
}
</style>