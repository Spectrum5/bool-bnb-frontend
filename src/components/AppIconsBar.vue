<script>

import { store } from '../store';
import { router } from '../router';
import AppModale from '../components/AppModale.vue';

export default {
    name: 'AppIconsBar',
    data() {
        return {
            store,
            router,
            openFilter:false,
            icons: [
                { icon: 'fa-solid fa-house-flood-water', label: "Sull'acqua" },
                { icon: 'fa-solid fa-layer-group', label: "Baite" },
                { icon: 'fa-solid fa-igloo', label: "Vista mozzafiato" },
                { icon: 'fa-solid fa-shuttle-space', label: "Lago" },
                { icon: 'fa-solid fa-globe', label: "Campagna" },
                { icon: 'fa-solid fa-globe', label: "Ville" },
                { icon: 'fa-solid fa-globe', label: "Fronte lago" },
                { icon: 'fa-solid fa-globe', label: "Wow" },
                { icon: 'fa-solid fa-globe', label: "Piscine incredibili" },
                { icon: 'fa-solid fa-globe', label: "Luxe" },
                { icon: 'fa-solid fa-globe', label: "Stanze private" },
                { icon: 'fa-solid fa-layer-group' },
           
                                    
            ]
        }
    },  
    components: {
        AppModale
    },
    props: {
       
    },
     methods: {
        getFilteredSearch() {
            // if (this.openFilter) {
            //     this.openFilter = false;
            //     } else {
            //     this.openFilter = true;
            //     }
             this.store.filterModalOpen = true;
        },
  },
 
     
    mounted() {
        
    }
}
</script>

<template>
       <div class="container">
          <ul class="list-icons-bar">
            <li class="item-icons" v-for="(item, index) in icons" :key="index">
                <a class="link-icon" href="#">
                    <div class="content-icons">
                         <font-awesome-icon :icon="item.icon" class="iconBar"  />
                    </div>
                    <div class="name-icons">
                        <p class="text">
                          {{ item.label }}
                        </p>
                    </div>
                </a>
            </li>
            <li class="item-icons"  @click="getFilteredSearch">
               <font-awesome-icon class="filter-icon" icon="fa-solid fa-check"/>
            </li>
          </ul>
       </div>
           <!-- MODALE DI RICERCA AVANZATA -->
           <div class="container-modale">
              <AppModale :openFilter='openFilter' />
           </div>
</template>

   
          
    

<style lang="scss" scoped>
@import '../styles/partials/mixins.scss';
@import '../styles/partials/variables.scss';
 .container {
     
        
         .list-icons-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
          
            

    .item-icons {
        list-style: none;
             @include for-tablet-up {
               margin-right: 50px;
                   }

        a {
            display: block;
            text-align: center;
            text-decoration: none;
            color:$dark-color-two;

            .content-icons {

              
                 .iconBar {
                    font-size: 20px;
                    color:$dark-color-two;
                  }

                 
            }
                
            .name-icons {
               padding: 10px 0px;

            .text {
                font-size: 13px;
                    @include for-tablet-up {
                        font-size: 10px
                   }
            }
            }
           
        }
    }
 }
 }





</style>
