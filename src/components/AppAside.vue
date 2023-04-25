<script>
import AppIconsBar from './AppIconsBar.vue';
export default {
    name: 'AppAside',
    data() {
        return {
         
        }
    },
    components: {
       AppIconsBar
    }
}
</script>

<template>
  <aside>
    <div class="icon-bar">
        <AppIconsBar />
    </div>
  </aside>
</template>

<style scoped lang="scss">
@import '../styles/partials/mixins.scss';
@import '../styles/partials/variables.scss';

aside {
    @include largeContainer;
    padding: 20px 10px;
    position: sticky;
    top: 0%;
    left: 0;
    z-index: 1;
    background-color: white;

     @include for-tablet-up {
            top: 12%;
            left: 0;
             
                   }

    .icon-bar {
        max-width: 1860px;
        @include for-tablet-up {
       
             
                   }
        
    

}
   
}

</style>