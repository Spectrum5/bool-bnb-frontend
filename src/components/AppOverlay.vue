<script>

export default {
    name: 'AppOverlay',
}
</script>

<template>
    <div class="overlay"></div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;

.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #00000030;
    z-index: 16;
}

</style>