<script>

// Utilities
import { store } from '../store';

export default {
  name: 'AppLoading',
  data() {
    return {
      store
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;
.container {
  height: 150px;
  @include flexRowCenter(0);
}
.loading {
  @include flexRowCenter(0.5rem);
}
.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: $dark-color-one;
  &:nth-last-child(1) {
    animation: pulse 0.6s 0.1s ease-in infinite;
  }
  &:nth-last-child(2) {
    animation: pulse 0.6s 0.2s ease-in infinite;
  }
  &:nth-last-child(3) {
    animation: pulse 0.6s 0.3s ease-in infinite;
  }
}
@keyframes pulse {
  from, to {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(15px);
  }
}
</style>