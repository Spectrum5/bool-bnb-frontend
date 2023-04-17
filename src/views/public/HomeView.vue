<script>

// Utilities
import axios from 'axios';
// import {router} from '../../router';



export default {
    name: 'HomeView',
    data() {
        return {
            // router,
            currentPage: 1,
            searchTitle: '',
            apartments: [],
            menuItems: [
                { label: 'Ovunque', link: '#' },
                { label: '01 giu - 31 ago', link: '#' },
                { label: '1 ospite', link: '#' },
                
            ],

            menuItems2: [
                 { label: 'Affitta con Airbnb', link: '#' },
                 { icon: 'fa-solid fa-globe', link: '#' },
            ],
               menuHamb: [
                   { icon: 'fa-solid fa-bars', link: '#' },
                   { icon: 'fa-solid fa-circle-user', link: '#' }
            ],

            
        }
    },
    methods: {
        getApartments() {
            axios.get('http://localhost:8000/api/apartments', {
                params: {
                    page: this.currentPage
                }
            })
                .then((response) => {
                    console.log('Index Appartamenti', response.data);
                    this.apartments = this.apartments.concat(response.data.apartments.data);
                })
                .catch((response) => {
                    console.log('Errore Index Appartamenti', response.data);
                })
        },
        loadMore() {
            this.currentPage++;
            this.getApartments();
        },
        handleSearch() {
            this.$router.push(`/apartments/search/${this.searchTitle}`);
        }
    },
    mounted() {
        this.getApartments();
    }
}
</script>

<template>

    <header>
        <nav class="navbar">
            <div class="container-fluid">
               <div class="logo-container">
                  <img src="../../assets/img/logo.png" alt="logo">
                  <h2>BollBnb</h2>
               </div>

               <div class="searchbar">
                  <ul class="group-list">
                     <li class="item" v-for="(item, index) in menuItems" :key="index">
                       <a :href="item.link">{{ item.label }}</a>
                       <i class="line"></i>
                     </li>
                     <li class="item icon">
                        <a href="#" >
                           <font-awesome-icon class="myicon" icon="fa-solid fa-magnifying-glass"/>
                        </a>
                     </li>
                  </ul>
               </div>

               <div class="right-menu">
                  <ul class="group-list">
                    <li class="item" v-for="item in menuItems2" :key="item.label">
                        <a :href="item.link">{{ item.label }}</a>
                    </li>
                    <li class="item">
                        <font-awesome-icon :icon="menuItems2[1].icon" class="globe"/>
                    </li>
                  </ul>
                  <ul class="group-list">
                    <li class="item d-inline-block">
                       <font-awesome-icon :icon="menuHamb[0].icon" class="bars"/>
                    </li>
                    <li class="item d-inline-block">
                       <font-awesome-icon :icon="menuHamb[1].icon" class="user"/>
                    </li>
                  </ul>
               </div>

            </div>
           
            
        </nav>
    </header>
<!-- 
    <div class="container">
        <label for="searchTitle">Titolo</label>
        <input type="text" v-model="searchTitle" id="searchTitle" name="searchTitle" placeholder="Inserisci il titolo...">
        <button @click="handleSearch()">Cerca</button>
    </div>

    <div class="container">
        <div class="card" v-for="apartment in apartments" @click="$router.push(`/apartments/${apartment.slug}`)">
            <h2>Titolo: {{ apartment.title }}</h2>
            <p>Descrizione: {{ apartment.description }}</p>
        </div>

    </div>
    <button @click="loadMore()">LOAD MORE</button> -->
</template>

<style lang="scss" scoped>

header {
    background-color: white;
    padding: 18px 50px;
    border-bottom: 1px solid #e2dbdb;

    .navbar {
      
        .container-fluid {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .searchbar {
                .group-list, .group-list:last-child {
                    border: 1px solid  #B8B8B8;
                    padding: 12px 25px;
                    border-radius: 50px;
                    text-align: center;
                    -webkit-box-shadow: 1px 2px 9px -1px #B8B8B8; 
                    box-shadow: 1px 2px 9px -1px #B8B8B8;

                    .item {
                        margin-right: 2px;
                    }
                     .line {
                        display: inline-block;
                        color: black;
                        background-color: black;
                        width: 20px;
                        height: 1px;
                        transform: rotate(90deg);
                        vertical-align: middle;
                   }

                   .icon {
                      border: 1px solid none;
                      padding: 6px 9px;
                      border-radius: 50px;
                      background-color: #ff4a86;

                      .myicon {
                        color: white;
                      }
                   }
                    
                }
            }
 
            .right-menu {
                width: calc(100% / 4);
                display: flex;
                justify-content: center;
                align-items: baseline;

                .globe {
                    color: white;
                    background-color: black;
                    border-radius: 50px;
                    font-size: 16px;
                    vertical-align: middle;
                 
                }
                .group-list:last-child {
                    border: 1px solid  #e0dcdc;
                    border-radius: 50px;
                    padding: 6px 4px;
                    margin-left: 18px;

                    .user {
                        font-size: 28px;
                        color: #6d6a6a;
                    }

                    .bars {
                        font-size: 15px;
                        padding-left: 10px;
                    }
                }
            }
            .item {
                display: inline-block;
                margin-right: 10px;
                font-size: 14px;
                font-weight: lighter, bolder;
                color: black;
                vertical-align: middle;

                a {
                    color: black;
                }
            }
        }
    }
}

// h2 {
//     font-size: 1rem;
// }

// .container {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-wrap: wrap;
//     gap: 1.5rem;

//     font-size: 0.8rem;
// }

// .card {
//     width: 200px;
//     padding: 1rem;
//     border: 2px solid lightblue;
// }
</style>