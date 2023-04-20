<script>

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppDestination from '../../components/AppDestination.vue';
import AppCard from '../../components/AppCard.vue';
import AppLoginModal from '../../components/AppLoginModal.vue'

// Utilities
import axios from 'axios';
import { router } from '../../router';


export default {
    name: 'HomeView',
    components: {
        AppLogo,
        AppDestination,
        AppCard,
        AppLoginModal
    },
    data() {
        return {
            isOpen: false,
            active: false,
            show: false,
            overlayPosition: { left: 0, top: 0 },
            isActiveOverlay: false,
            loginModal:false,


            router,
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

            menuItem3: [
                { label: 'Dove', link: '#', active: 0 },
                { label: 'Check-in', link: '#' },
                { label: 'Check-out', link: '#' },
                { label: 'Chi', link: '#' },
            ],
            menuHidden: [
                { label: 'Soggiorni', link: '#', active: 0 },
                { label: 'Esperienze', link: '#' },
                { label: 'Esperienze Online', link: '#' },
            ],




        }
    },
    methods: {
        getApartments() {
            console.log('GET APARTMENTS');
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
        },
        toggleSearchbar() {
            this.isOpen = !this.isOpen;
        },
        openAppDestination(index) {
            this.show = true;
            const currentItem = this.menuItem3[index];
            this.menuItem3.forEach(item => item.active = false);
            currentItem.active = index;
            const itemPosition = currentItem.$el.getBoundingClientRect();
            this.overlayPosition = { left: itemPosition.left, top: itemPosition.bottom };
            this.isActiveOverlay = true;
            setTimeout(() => {
                this.isActiveOverlay = false;
            }, 500);

        },
        getLogin() {
            if (this.loginModal) {
                this.loginModal = false;
                } else {
                this.loginModal = true;
                }
            }
    },

    mounted() {
        this.menuItem3[0].active = 0;
        this.getApartments();
    }
}
</script>

<template>
    <header>
        <nav class="navbar">
            <div class="container-fluid">
                <!-- MENU LOGO -->
                <AppLogo />

                <!-- MENU HIDDEN 2°SEARCHBAR -->
                <div class="menu-hidden" v-if="isOpen">
                    <ul>
                        <li class="item" v-for="(item, index) in menuHidden" :key="index"
                            :class="{ active: item.active === index }">
                            {{ item.label }}
                        </li>
                    </ul>
                </div>


                <!-- MENU CENTRALE-->
                <div class="searchbar first" :class="{ open: isOpen }">
                    <!-- Prima searchbar -->
                    <ul class="group-list" v-if="!isOpen">
                        <li class="item" v-for="(item, index) in menuItems" :key="index" @click="toggleSearchbar">
                            <a :href="item.link">{{ item.label }}</a>
                            <i class="line"></i>
                        </li>
                        <li class="item icon" @click="toggleSearchbar">
                            <a href="#">
                                <font-awesome-icon class="myicon" icon="fa-solid fa-magnifying-glass" />
                            </a>
                        </li>
                    </ul>

                    <!-- Seconda searchbar -->
                    <ul class="group-list" v-else>
                        <div class="overlay" :class="{ active: isActiveOverlay }"
                            :style="{ left: overlayPosition.left + 'px', top: overlayPosition.top + 'px' }"></div>
                        <li class="item" v-for="(item, index) in menuItem3" :key="item.label"
                            :class="{ active: item.active === index }" @click="openAppDestination(index)">
                            <a :href="item.link">{{ item.label }}</a>
                            <i class="line" :class="{ active: item.active === index }"></i>
                        </li>

                        <!-- ICONA SEARCH -->
                        <li class="item big-search">
                            <a href="#">
                                <font-awesome-icon class="myicon" icon="fa-solid fa-magnifying-glass" />
                            </a>
                            <button class="button-search">Cerca</button>
                        </li>
                    </ul>

                    <AppDestination :show="show" />

                </div>

                <!-- MENU A DESTRA -->
                <div class="right-menu">
                    <ul class="group-list">
                        <li class="item" v-for="item in menuItems2" :key="item.label">
                            <a :href="item.link">{{ item.label }}</a>
                        </li>
                        <li class="item">
                            <font-awesome-icon :icon="menuItems2[1].icon" class="globe"  />
                        </li>
                    </ul>
                           
                    <!-- MENU DI LOGIN -->
                    <ul class="group-list ">
                        <li class="item menu-bars d-inline-block">
                            <font-awesome-icon :icon="menuHamb[0].icon" class="bars" @click="getLogin()"/>
                        </li>
                        <AppLoginModal :loginModal="loginModal" />
                        <li class="item d-inline-block">
                            <font-awesome-icon :icon="menuHamb[1].icon" class="user" />
                        </li>
                    </ul>
                    
                 

                </div>
            </div>


        </nav>
    </header>

    <!-- <div>
        <router-link class="customLink" to="/login">login</router-link> <br>
        <router-link to="/register">register</router-link>
    </div> -->

    <div class="cardsContainer">
        <AppCard v-for="apartment in apartments" :apartment="apartment" />
    </div>

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
        -->
    <button @click="loadMore()">LOAD MORE</button>
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/variables.scss';

.cardsContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem 1rem;
    flex-wrap: wrap;

    max-width: 1860px;
}

header {
    width: 100%;
    background-color: white;
    padding: 15px 20px;
    border-bottom: 1px solid #e2dbdb;
    z-index: 1;
    position: relative;
    .navbar {
        max-width: 100%;
        width: 100%;
        .container-fluid {
            display: flex;
            align-items: center;
            .menu-hidden {
                width: 100%;
                text-align: center;
                margin: 0 auto;
              
                .item {
                    font-size: 16px;
                    letter-spacing: 1.5px;
                    margin-right: 30px;
                    font-weight: lighter, bolder;
                    transition: all 0.4s ease-in;
                    cursor: pointer;
                    

                    &:hover {
                        border-bottom: 1.5px solid #B8B8B8;
                        padding: 8px 0px;
                        font-weight: lighter;
                    }
                }

                .active {
                    border-bottom: 1.5px solid black;
                    padding: 8px 0px;
                }
            }

            .first {
                margin: 0 auto;
                transform: translate(-30%, -0%);
                width: 30%;
             
            }

            .searchbar,
            .open,
            .menu-hidden {
             
   
                .group-list,
                .group-list:last-child {
                    border: 1px solid #B8B8B8;
                    padding: 12px 25px;
                    border-radius: 50px;
                    text-align: center;
                    -webkit-box-shadow: 1px 2px 9px -1px #B8B8B8;
                    box-shadow: 1px 2px 9px -1px #B8B8B8;
                    transition: box-shadow 0.5s ease-in-out;
                    cursor: pointer;


                    &:hover {
                        -webkit-box-shadow: 1px 1px 6px 1px #B8B8B8;
                        box-shadow: 1px 1px 6px 1px #B8B8B8;
                    }

                    .item {
                        margin-right: 2px;

                        a {
                            text-decoration: none;
                        }
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
                        background-color:$color-one-light;

                        .myicon {
                            color: white;
                        }
                    }

                }
            }

            .searchbar.open {
                padding: 50px 0px;
                width: 80%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-70%, 20%);


                .overlay,
                .active {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 30%;
                    height: 100%;
                    background-color: white;
                    border: 1px solid white;
                    z-index: 999;
                    border-radius: 50px;
                }

                .group-list {
                    position: absolute;
                    top: 25%;
                    left: 30%;
                    width: 80%;
                    display: flex;
                    align-items: center;
                    background-color: #d8d7d7;
                    border: none;
                    padding: 5px 10px;

                    .active {
                        position: relative;
                        z-index: 9999;
                        left: 30px;
                    }

                    .line.active {
                        background-color: transparent;
                    }
                    .item {
                        font-size: 16px;
                        line-height: 10%;
                        transition: transform 0.5s;
                        &:hover {
                            transform: scale(0.95);
                        }
                    }
                    .item:nth-child(3) {
                        margin-left: 40px;
                    }
                    .line {
                        margin-left: 110px;
                        vertical-align: top;
                    }


                    .big-search {
                        background-image: linear-gradient(to right, $color-one-dark, $color-one-light);
                        padding: 20px 45px;
                        border-radius: 50px;
                        transition: all 0.5s ease-in;
        
                        &:hover {
                            padding: 15px 10px;
                            padding-right: 50px;
                            background-image: linear-gradient(to left, $color-one-light, $color-two-dark);
                              
                             .myicon {
                                display: none;
                             }
                             .button-search {
                                 display: block;
                             }
                        }

                        

                        .myicon {
                            color: white;
                            font-size: 20px;
                            vertical-align: middle;
                            
                        }

                            .button-search {
                                border: none;
                                background: none;
                                width: 0px;
                                color: white;
                                display: none;
                                font-size: 18px;
                                padding: 10px 10px;

                    }
                    }
                }
            }

            .right-menu {
                width: calc(100% / 4);
                display: flex;
                justify-content: center;
                align-items: baseline;
                position: fixed;
                top: 10px;
                right: 10px;
               

                .globe {
                    color: white;
                    background-color: black;
                    border-radius: 50px;
                    font-size: 16px;
                    vertical-align: middle;
                }

                .group-list:first-child {
                    .item {
                        transition: transform 1s ease-in-out, box-shadow 0.5s ease-in-out;

                        &:hover {
                            transform: scale(1.2);
                            border: 1px solid #e6e2e2;
                            padding: 8px 10px;
                            border-radius: 50px;
                            background: #e6e2e2;
                        }

                        a {
                            text-decoration: none;
                        }
                    }
                }

               

                .group-list:last-child {
                    border: 1px solid #e0dcdc;
                    border-radius: 50px;
                    margin-left: 18px;
                    padding: 10px 0px;
                    transition: transform 0.8s ease-in-out, box-shadow 0.5s ease-in-out;

                    &:hover {
                        -webkit-box-shadow: 1px 1px 6px 1px #B8B8B8;
                        box-shadow: 1px 1px 6px 1px #B8B8B8;
                        transform: scale(1.2);
                    }

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
</style>
