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
                {icon: 'fa-solid fa-bars', url: '#', label: 'Dove'  },
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
    <router-link to="/">
        <div class="mycontainer" v-if="isOpen == true">
           <div class="navigation">
              <ul>
                <li class="list" v-for="(item, index) in menu" :key="index" @click="activeLink(index)" :class="{ 'active': activeIndex === index }">
                   <a href="#">
                     <span class="icon"  @click="show">
                         <font-awesome-icon :icon="item.icon" class="myicon" />
                     </span>
                     <span class="text">{{ item.label }}</span>
                   </a>
                 </li>
                 <div class="indicator"></div>
             </ul>
                <AppDestination :show="show" />
           </div>
        </div>
       
    </router-link>
</template>

<style lang="scss" scoped>
@import '../styles/partials/mixins.scss';
@import '../styles/partials/variables.scss';


.mycontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0px;
    width: 50%;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-55%, 30%);
    z-index: 2;
.navigation {
    position: relative;
    width: 800px;
    height: 90px;
    background-color: #d8d7d7;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 50px;
    border-color:$color-one-light ;
    -webkit-box-shadow: -1px 2px 21px -2px $color-one-light; 
    box-shadow: -1px 2px 21px -2px $color-one-light;
    

     ul {
        display: flex;
        width: 350px;
           
        li {
            list-style: none;
            position: relative;
            width: 70px;
            height: 60px;
            margin-right: 100px;
            z-index: 2;

            a {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 100%;
                text-align: center;
                font-weight: 500;
                font-size: 15px;

              

                .icon {
                    position: relative;
                    display: block;
                    line-height: 60px;
                    font-size: 1.5em;
                    transition: 0.5s;
                    color: #222327;
                 
                }

                .text {
                    position: absolute;
                    color:$color-one-dark;
                    font-weight: 400;
                    font-size: 1em;
                    letter-spacing: 0.5em;
                    transition: 0.5s;
                    opacity: 0;
                    transform: translate(15px);
                }
            }
        }
                 li:nth-child(5) {
                        background-image: linear-gradient(to right, $color-one-dark, $color-one-light);
                        border-radius: 50px;
                        transition: all 0.5s ease-in;
                        padding: 0px 50px;
                        

    
                        &:hover {
                             padding: 15px 10px;
                             padding-right: 50px;
                             background-image: linear-gradient(to left, $color-one-light, $color-two-dark);
                             
                        
                             
                        }
                
                        .myicon {
                            color: white;
                            font-size: 35px;
                            margin-bottom: 30px;
                            margin-left: 45px;

                            
                            
                        }
                     }
                  

        li.active a .icon {
            transform: translateY(-32px);
             color: #2196f3;
        }

          li.active a .text {
            transform: translateY(-4px);
            color: white;
            opacity: 1;
        
       }


    li:nth-child(1).active ~ .indicator {
            transform: translateX(calc(120px * 0));
        }

        li:nth-child(2).active ~ .indicator {
            transform: translateX(calc(120px * 1));
        }

        li:nth-child(3).active ~ .indicator {
            transform: translateX(calc(120px * 2));
        }

        li:nth-child(4).active ~ .indicator {
            transform: translateX(calc(120px * 3));
        }

        li:nth-child(5).active ~ .indicator {
            transform: translateX(calc(120px * 4));
        }


        .indicator {
            position: absolute;
            top: -38%;
            left: 5%;
            width: 120px;
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
