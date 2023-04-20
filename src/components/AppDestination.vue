<script>

import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppDestination',
    data() {
        return {
            store,
            router,
        
           destinationsMenu: [
                { img: '/europa.jpg', label: 'Europa' },
                { img: '/statiUniti.jpg', label: 'Stati Uniti' },
                { img: '/europa.jpg', label: 'Europa' },
                { img: '/europa.jpg', label: 'Europa' },
                { img: '/europa.jpg', label: 'Europa' },
                { img: '/europa.jpg', label: 'Europa' },
                     
            ]
        }
    },  
    props: {
         show: {
           type: Boolean,
           default: false,
          },
    },
 
     
    mounted() {
        
    }
}
</script>

<template>
    <router-link to="/">
        <ul class="destinations" v-if="show == true">
            <li class="title">
                <h6>Cerca per regione</h6>
            </li>
            <li class="item-maps" v-for="item in destinationsMenu" :key="item.id">
                <a :href="`#${item.label}`">
                    <img :src="`../../../${item.img}`">
                </a>
            </li>
        </ul>
    </router-link>
</template>

<style lang="scss" scoped>
@import '../styles/partials/mixins.scss';
@import '../styles/partials/variables.scss';

    .destinations {
        position: absolute;
        left: 30%;
        top: 87%;
        width: 45%;
        background-color: white;
        margin-top: 15px;
        padding: 20px 20px;
        border-radius: 25px;
        border: 1px solid #B8B8B8;
        z-index: 3;
     

          .title {
            display: block;
            color: $dark-color-one;
            padding: 10px 20px;
            margin-top: 15px;
            
                   h6 {
                    font-size: 14px;
                    font-weight: bold;
                   }
          }

            .item-maps {
               width: calc((100% / 3) - 20px); 
               height: 130px;
               list-style: none;
               margin: 20px 10px ;
               display: inline-block;
             
              
            
                a {
                    color: $dark-color-one;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    border: 1px solid #B8B8B8;
                    overflow: hidden;
                    position: relative;
                    transition: all 0.3s ease;

                    &:hover {
                        border-color:$color-one-light ;
                        transform: scale(1.1);
                        z-index: 1;
                    }


                     &::before {
                        content: '';
                        position: absolute;
                        top: -1px;
                        left: -1px;
                        right: -1px;
                        bottom: -1px;
                        border: 1px solid transparent;
                        border-radius: 10px;
                        transition: border-color 0.3s ease-in-out;
                        
                    }

                    &:hover::before {
                        border-color: $dark-color-one;
                        
                    }
                   
                   

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                      
                    }
                }
            }

        }



</style>
