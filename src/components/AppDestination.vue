<script>

import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppDestination',
    data() {
        return {
            store,
            router,
            searchTerm: "",
            destinationsMenu: [ ],
            filteredDestinationsMenu: [],
        
           destinationsMenu: [
                { img: '/europa.jpg', label: 'Europa' },
                { img: '/statiUniti.jpg', label: 'Stati Uniti' },
                { img: '/europa.jpg', label: 'Asia' },
                { img: '/europa.jpg', label: 'Francia' },
                { img: '/europa.jpg', label: 'Oceania' },
                { img: '/europa.jpg', label: 'America del Nord' },      
            ],
            destinations: [
                { name: "Europa" },
                { name: "Asia" },
                { name: "Asia" },
                { name: "America del Sud" },
                { name: "Asia" },
                { name: "Oceania" }
        ],
        }
    },  
    props: {
         show: {
           type: Boolean,
           default: false,
          },
    },
     methods: {
        filterDestinations() {
        const filteredDestinations = this.destinations.filter(destination => {
            return destination.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
  
            this.filteredDestinationsMenu = filteredDestinations;
            }
  },
 
     
    mounted() {
         this.filteredDestinationsMenu = this.destinationsMenu;
    }
}
</script>

<template>
    <router-link to="/">
        <ul class="destinations" v-if="show == true">
            <li class="title">
                <h6>Cerca per regione</h6>
             </li>
             <li>
                <router-link to="/search">Ricerca avanzata</router-link>
            </li>
            <li class="search">
               <input type="text" v-model="searchTerm" placeholder="Cerca destinazione" @input="filterDestinations" />
            </li>
           <li class="item-maps" v-for="item in filteredDestinationsMenu" :key="item.id">
                <a :href="`#${item.label}`">
                    <img :src="`../../../../${item.img}`">
                </a>
            </li>
        </ul>
     
          <!-- <div class="container">
                <label for="searchTitle">Titolo</label>
                <input type="text" v-model="searchTitle" id="searchTitle" name="searchTitle" placeholder="Inserisci il titolo...">
                <button @click="handleSearch()">Cerca</button>
            </div>

            <div class="container">
                <div class="card" v-for="apartment in apartments" @click="$router.push(`/apartments/${apartment.slug}`)">
                    <h2>Titolo: {{ apartment.title }}</h2>
                    <p>Descrizione: {{ apartment.description }}</p>
                </div>

            </div> -->
    </router-link>
</template>

   
          
    

<style lang="scss" scoped>
@import '../styles/partials/mixins.scss';
@import '../styles/partials/variables.scss';

    .destinations {
        position: absolute;
        left: 0%;
        top: 100%;
        width: 70%;
        background-color: white;
        margin-top: 15px;
        padding: 0px 10px;
        border-radius: 20px;
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
