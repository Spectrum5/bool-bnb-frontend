<script>

import { store } from '../store';
import { router } from '../router';
import AppDestination from '../components/AppDestination.vue';

export default {
    name: 'AppMenuSearch',
    data() {
        return {
            store,
            router,
            activeIndex: null,
            show: false,
        
           menu: [
                {icon: 'fa-solid fa-globe', url: '#', label: 'Dove'  },
                {icon: 'fa-solid fa-bars', url: '#', label: 'Check-in' },
                {icon: 'fa-solid fa-bars', url: '#', label: 'Check-out' },
                { icon: 'fa-solid fa-bars', url: '#', label: 'Chi' },
                {icon: 'fa-solid fa-magnifying-glass', url: '#', label: 'Cerca' },
            ]
        }
    },  
    components: {
        AppDestination,
    },
    props: {
       
           isOpen: {
           type: Boolean,
           default: false,
          },
    },
     methods: {
         activeLink(index) {
           this.show = true;
           this.activeIndex = index;
         },
      
    
  },
 
     
    mounted() {
        
    }
}
</script>

<template>
        <div class="mycontainer" v-if="isOpen == true">
           <div class="navigation">
              <ul class="list-group-icon">
                <li class="list" v-for="(item, index) in menu" :key="index" @click="activeLink(index)" :class="{ 'active': activeIndex === index }">
                   <a href="#">
                     <span class="icon"  @click="show">
                         <font-awesome-icon :icon="item.icon" class="myicon" />
                         <span class="text">{{ item.label }}</span>
                     </span>
                   </a>
                 </li>
                 <div class="indicator"></div>
             </ul>
                <AppDestination :show="show" />
           </div>
        </div>
</template>

<style lang="scss" scoped>
@import '../styles/partials/mixins.scss';
@import '../styles/partials/variables.scss';


.mycontainer {
    padding: 50px 0px;
    width: 50%;
    position: sticky;
    top: 0%;
    left: 50%;
    transform: translate(-55%, 30%);
    z-index: 2;
        
.navigation {
    position: relative;
    width: 800px;
    height: 80px;
    background-color: #d8d7d7;
    border-radius: 50px;
    border-color:$color-one-light ;
    -webkit-box-shadow: -1px 2px 21px -2px $color-one-light; 
    box-shadow: -1px 2px 21px -2px $color-one-light;
    display: flex;
    justify-content: center;
       @include for-tablet-up {
                display: none;
              }
     .list-group-icon {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

            @include for-tablet-up {
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-left: 50px;
              }
        li {
            display: inline-block;
            list-style: none;
            position: relative;
            margin-right: 70px;
            z-index: 2;

               @include for-tablet-up {
                 margin-right: 0px;
              }
               
            a {
                color: white;
                text-align: start;
                .icon {
                    position: relative;
                    display: block;
                    font-size: 1.5em;
                    transition: 0.5s;
                        @include for-tablet-up {
                            font-size: 0.5em;
                            bottom: 10px;
                        }
                  .text {
                    width: 100px;
                    position: absolute;
                    top:50px;
                    left: 45px;
                    color:$color-one-dark;
                    font-size: 18px;
                    transition: 0.5s;
                    opacity: 0;
                    transform: translate(15px);
                        @include for-tablet-up {
                            font-size: 1.6em;
                            bottom: -43px;
                            left: 5px;

                        
                        }
               
                }
                }
             
            }
        }
                         .myicon {
                            color: white;
                            font-size: 30px;
                            padding: 15px 5px;
                            padding-right: 50px;
                           
                            


                        }
                
                  

        li.active a .icon {
            transform: translateY(-32px);
             color: #2196f3;
        }

         li.active .myicon {
            transform: translateY(32px);
            
        
        
        }
        
        li.active:nth-child(5) .text {
                 margin-bottom: 40px;
                 z-index: 3;
        }

          li.active a .text {
            transform: translateY(-4px);
            color: white;
            opacity: 1;
        
       }


    li:nth-child(1).active ~ .indicator {
            transform: translateX(calc(130px * 0));
                    @include for-tablet-up {
                        transform: translateX(calc(100px * 0));
                   }
        }

        li:nth-child(2).active ~ .indicator {
            transform: translateX(calc(130px * 1));
              @include for-tablet-up {
                        transform: translateX(calc(55px * 1));
                   }
        }

        li:nth-child(3).active ~ .indicator {
            transform: translateX(calc(130px * 2));
              @include for-tablet-up {
                        transform: translateX(calc(68px * 2));
                   }
        }

        li:nth-child(4).active ~ .indicator {
            transform: translateX(calc(130px * 3));
              @include for-tablet-up {
                        transform: translateX(calc(70px * 3));
                   }
        }

        li:nth-child(5).active ~ .indicator {
            transform: translateX(calc(130px * 4));
              @include for-tablet-up {
                        transform: translateX(calc(70px * 4));
                   }
        }


        .indicator {
            position: absolute;
            top: -38%;
            left: 5%;
            width: 110px;
            height: 70px;
            background-color: #d8d7d7;
            border-radius: 50%;
            z-index: 1;
            transition: 0.5s;
           
        }

        .indicator::before {
                content: '';
                position: absolute;
                top: 5px;
                left: -28px;
                width: 30px;
                height: 30px;
                background:transparent ;
                border-radius: 50%;
                box-shadow: 15px 18px #d8d7d7;;
            }

            .indicator::after {
                content: '';
                position: absolute;
                top: 5px;
                right: -28px;
                width: 30px;
                height: 30px;
                background:transparent ;
                border-radius: 50%;
                box-shadow: -15px 18px #d8d7d7;;
            }
    
      }

   
}

}



</style>
