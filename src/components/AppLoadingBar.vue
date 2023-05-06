<script>

// Utilities
import { store } from '../store';

export default {
    name: 'AppLoadingBar',
    data() {
        return {
            store,
        }
    },
    computed: {
        setWidth() {
            if (this.store.loadingWidth == 100) {
                const self = this;
                setTimeout(function () {
                    self.store.loadingWidth = 0;
                }, 200)
            }
            return `--loadingWidth: ${this.store.loadingWidth}%`;
        }
    }
}
</script>

<template>
    <div class="loading" :style="setWidth"></div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;

.loading {
    position: fixed;
    top: 0;
    left: 0;
    height: 6px;
    width: var(--loadingWidth);
    background: linear-gradient(45deg, $color-one-dark, $color-two-dark);
    transition: width 0.15s;
}
</style>