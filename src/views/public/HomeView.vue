<script>

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppAside from '../../components/AppAside.vue'
import AppLoginModal from '../../components/AppLoginModal.vue';
import AppMenuSearch from '../../components/AppMenuSearch.vue';
import AppMain from '../../components/AppMain.vue'

export default {
    name: 'HomeView',
    components: {
        AppLogo,
        AppLoginModal,
        AppMenuSearch,
        AppAside,
        AppMain
    },
    data() {
        return {
            isOpen: false,
            active: false,
            loginModal: false,
       
            menuItems: [
                { label: 'Ovunque', link: '#' },
                { label: '01 giu - 31 ago', link: '#' },
                { label: '1 ospite', link: '#' },

            ],

            menuItems2: [
                { label: 'Affitta con Boolbnb', link: '#' },
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
        toggleSearchbar() {
            this.isOpen = !this.isOpen;
        },

        getLogin() {
            if (this.loginModal) {
                this.loginModal = false;
            } else {
                this.loginModal = true;
            }
        },
    },
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
                </div>

                <!-- SEARCHBAR GRANDE NASCOSTA  -->
                <AppMenuSearch :isOpen="isOpen" />

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
                        <li class="item menu-bars d-inline-block">
                            <font-awesome-icon :icon="menuHamb[0].icon" class="bars" @click="getLogin()" />
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

     <AppAside/>
     <AppMain/>
  

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
        <div class="btn-container">
            <button @click="loadMore()">LOAD MORE</button>
        </div>
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/variables.scss';



header {
    width: 100%;
    background-color: white;
    padding: 15px 20px;
    border-bottom: 1px solid #e2dbdb;
    z-index: 2;
    position: relative;
    position: sticky;
    top:0;
    left: 0;
       @include for-tablet-up {
                    padding: 0px 0px;
                 }
    .navbar {
        max-width: 100%;
        width: 100%;

        .container-fluid {
            display: flex;
            align-items: center;
            justify-content: space-between;
        
            .menu-hidden {
                @include for-tablet-up {
                    display: none;
              }
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
               margin-top: 35px;
                 @include for-tablet-up {
                  width: 80%;
                  margin-top: 28px;   
            }
    
            }


            .searchbar,
            .open,
              
            .menu-hidden {
                position: absolute;
                top: 15%;
                left: 50%;
                transform: translate(-50%, -50%);
             
       
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

                    .item:nth-child(3), .item:nth-child(2) {
                          @include for-tablet-up {
                                   display: none;
                                    
                                }
                    }

                    .item:nth-child(1) {
                         @include for-tablet-up {
                                   margin-right: 150px;
                                    
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
                        background-color: $color-one-light;

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
                   @include for-tablet-up {
                         width: 30%;
                   }
               
               

                .globe {
                    color: white;
                    background-color: black;
                    border-radius: 50px;
                    font-size: 16px;
                    vertical-align: middle;
                }

                .group-list:first-child {
                           @include for-tablet-up {
                           display: none;
                   }
               
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

.btn-container {
    text-align: center;
    margin: 15px auto;
    button{
        padding: 7px 14px;
        border-radius: 8px;
        border: 1px solid #ccc;
        cursor: pointer;
        &:hover{
            background-color: #ccc;
        }
    }
}





</style>
