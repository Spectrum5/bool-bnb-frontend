<template>
    <div class="app-loader">
      <div class="spinner-container">
        <spinner :animation-duration="1000" :lines="12" :length="12" :radius="24" :width="6" />
      </div>
    </div>
  </template>
  
  <script>
  import Spinner from 'vue-spinner/src/PulseLoader.vue';
  
  export default {
    name: 'AppLoader',
    components: {
      Spinner
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .app-loader {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.75);
  
    .spinner-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  </style>
  