<script>

// Components
import AppLogo from '../../components/AppLogo.vue';

// Utilities
import axios from 'axios';
// import {router} from '../../router';


export default {
    name: 'HomeView',
    components: {
        AppLogo
    },
    data() {
        return {
            isOpen: false,
            active: 0,
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

            menuItem3: [
                { label: 'Dove', link: '#', active: 0 },
                { label: 'Check-in', link: '#' },
                { label: 'Check-out', link: '#' },
                { label: 'Chi', link: '#' },
            ],
            menuHidden: [
                { label: 'Soggioni', link: '#', active: 0 },
                { label: 'Esperienze', link: '#' },
                { label: 'Esperienze Online', link: '#' },
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
        },
        toggleSearchbar() {
            this.isOpen = !this.isOpen;
        },



        mounted() {
            this.getApartments();
            this.menuItem3[0].active = 0;
        }
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
                        <div class="overlay"></div>
                        <li class="item" v-for="(item, index) in menuItem3" :key="index"
                            :class="{ active: item.active === index }" @click="active = index">
                            <a :href="item.link">{{ item.label }}</a>
                            <i class="line" :class="{ active: item.active === index }"></i>
                        </li>

                        <!-- ICONA SEARCH -->
                        <li class="item big-search">
                            <a href="#">
                                <font-awesome-icon class="myicon" icon="fa-solid fa-magnifying-glass" />
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- MENU A DESTRA -->
                <div class="right-menu">
                    <ul class="group-list">
                        <li class="item" v-for="item in menuItems2" :key="item.label">
                            <a :href="item.link">{{ item.label }}</a>
                        </li>
                        <li class="item">
                            <font-awesome-icon :icon="menuItems2[1].icon" class="globe" />
                        </li>
                    </ul>

                    <!-- MENU DI LOGIN -->
                    <ul class="group-list ">
                        <li class="item d-inline-block">
                            <font-awesome-icon :icon="menuHamb[0].icon" class="bars" />
                        </li>
                        <li class="item d-inline-block">
                            <font-awesome-icon :icon="menuHamb[1].icon" class="user" />
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
    width: 100%;
    background-color: white;
    padding: 10px 50px;
    border-bottom: 1px solid #e2dbdb;
    position: relative;


    .navbar {
        .container-fluid {

            .logo-container {
                width: 200px;
                height: 100px;
                border: none;
                position: fixed;
                top: 10px;
                left: 10px;

                h2 {
                    color: #ff4a86;
                    padding: 10px 0px;
                }
            }

            .menu-hidden {
                width: 100%;
                text-align: center;
                margin: 0 auto;

                .item {
                    font-size: 16px;
                    letter-spacing: 1.5px;
                    margin-right: 30px;
                    font-weight: lighter, bolder;
                }

                .active {
                    border-bottom: 1.5px solid black;
                    padding: 8px 0px;
                }
            }

            .first {
                margin: 0 auto;
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

            .searchbar.open {
                padding: 50px 0px;
                margin-left: 220px;

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40%;
                    height: 100%;
                    background-color: white;
                    border: 1px solid white;
                    z-index: 999;
                    border-radius: 50px;
                }

                .group-list {
                    width: 60%;
                    padding: 18px 40px;
                    position: absolute;
                    top: 70%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #d8d7d7;
                    border: none;

                    .active {
                        position: relative;
                        z-index: 9999;

                    }

                    .line.active {
                        background-color: transparent;
                    }

                    .item:nth-child(3) {
                        margin-left: 200px;
                    }

                    .item {
                        font-size: 16px;
                        line-height: 50%;
                    }

                    .line {
                        margin-left: 40px;
                    }

                    .big-search {
                        background-color: #ff4a86;
                        padding: 13px 13px;
                        border-radius: 50px;


                        .myicon {
                            color: white;
                            font-size: 20px;
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

                .group-list:last-child {
                    border: 1px solid #e0dcdc;
                    border-radius: 50px;

                    margin-left: 18px;
                    padding: 10px 0px;


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
}</style>