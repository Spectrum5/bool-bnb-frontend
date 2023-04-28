<script>

export default {
    name: 'AppHamburgerMenu',
    data() {
        return {
            menuMobileOpen: false,
            windowHeight: window.innerWidth
        }
    },
    props: {
        maxWidth: Number
    },
    methods: {
        handleMenuOpening() {
            this.menuMobileOpen = !this.menuMobileOpen;
            this.$emit('menuOpenEvent', this.menuMobileOpen);
        }
    },
    mounted() {
        setInterval(() => {
            if ((window.innerWidth > this.maxWidth) && (this.menuMobileOpen == true)) {
                this.menuMobileOpen = false;
                this.$emit('menuOpenEvent', false);
            }
        }, 20000);
    }
}
</script>

<template>
    <div class="container" @click="handleMenuOpening">
        <div class="bar" :class="menuMobileOpen ? 'open' : ''"></div>
        <div class="bar" :class="menuMobileOpen ? 'open' : ''"></div>
        <div class="bar" :class="menuMobileOpen ? 'open' : ''"></div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;

.container {
    width: 24px;
    height: 24px;

    cursor: pointer;
    position: relative;
}

.bar {
    width: 100%;
    height: 4px;

    border-radius: 6px;
    background-color: $dark-color-one;
    transition: all 0.2s;

    position: absolute;
    left: 0;

    &:nth-child(1) {
        top: 0;

        &.open {
            top: 50%;
            transform: translateY(-50%) rotate(-45deg);
        }
    }

    &:nth-child(2) {
        top: 50%;
        transform: translateY(-50%);

        &.open {
            transform: translateY(-50%) scaleX(0);
            transform-origin: center;
        }
    }

    &:nth-child(3) {
        bottom: 0;

        &.open {
            bottom: 50%;
            transform: translateY(50%) rotate(45deg);
        }
    }
}
</style>