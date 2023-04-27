<script>

// Utilities
import axios from 'axios';
import { store } from '../../store';

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
            store,
            openFilters: false,
            searchUrl: '',
            searchForm: {
                address: null,
                rooms_number: null,
                beds_number: null,
                bathrooms_number: null,
                services: []
            },
            allServices: []
            // isOpen: false,
            // active: false,
            // loginModal: false,

            // menuItems: [
            //     { label: 'Ovunque', link: '#' },
            //     { label: '01 giu - 31 ago', link: '#' },
            //     { label: '1 ospite', link: '#' },

            // ],

            // menuItems2: [
            //     { label: 'Affitta con Airbnb', link: '#' },
            //     { icon: 'fa-solid fa-globe', link: '#' },
            // ],
            // menuHamb: [
            //     { icon: 'fa-solid fa-bars', link: '#' },
            //     { icon: 'fa-solid fa-circle-user', link: '#' }
            // ],

            // menuItem3: [
            //     { label: 'Dove', link: '#', active: 0 },
            //     { label: 'Check-in', link: '#' },
            //     { label: 'Check-out', link: '#' },
            //     { label: 'Chi', link: '#' },
            // ],
            // menuHidden: [
            //     { label: 'Soggiorni', link: '#', active: 0 },
            //     { label: 'Esperienze', link: '#' },
            //     { label: 'Esperienze Online', link: '#' },
            // ],

        }
    },
    methods: {
        // toggleSearchbar() {
        //     this.isOpen = !this.isOpen;
        // },

        // getLogin() {
        //     if (this.loginModal) {
        //         this.loginModal = false;
        //     } else {
        //         this.loginModal = true;
        //     }
        // },
        getServices() {
            axios.get('http://localhost:8000/api/services')
                .then(response => {
                    console.log(response.data.services);
                    this.allServices = response.data.services;
                })
        },
        handleSearch() {
            if (this.searchForm.address != '' || this.searchForm.rooms_number > 0 || this.searchForm.beds_number > 0 || this.searchForm.bathrooms_number > 0 || this.searchForm.services.length > 0) {

                this.calcUrl();
                this.$router.push(this.searchUrl);

                if (this.searchForm.address != '') this.store.searchForm.address = this.searchForm.address;
                if (this.searchForm.rooms_number > 0) this.store.searchForm.rooms_number = this.searchForm.rooms_number;
                if (this.searchForm.beds_number > 0) this.store.searchForm.beds_number = this.searchForm.beds_number;
                if (this.searchForm.bathrooms_number > 0) this.store.searchForm.bathrooms_number = this.searchForm.bathrooms_number;
                if (this.searchForm.services.length > 0) this.store.searchForm.services = this.searchForm.services;
            }
        },
        calcUrl() {
            this.searchUrl = '/apartments/search?';

            let size = 0;

            // Calcolo numero campi compilati form
            for (const field in this.searchForm) {
                if (Array.isArray(this.searchForm[field])) {
                    if (this.searchForm[field].length > 0) {
                        size++;
                    }
                }
                else {
                    if (this.searchForm[field] != null) {
                        size++;
                    }
                }
            }

            let index = 1;
            // Generazione Url
            for (const field in this.searchForm) {
                if (this.searchForm[field] != null && this.searchForm[field].length > 0) {
                    this.searchUrl += `${field}=${this.searchForm[field]}`
                    if (index < size) {
                        this.searchUrl += '&'
                    }
                    index++;
                }
            }
        }
    },
    mounted() {
        this.getServices();
        
        const address = document.querySelector('#address');
        const autocomplete = new google.maps.places.Autocomplete(address);
        const self = this;
        autocomplete.addListener('place_changed', function () {
            const place = autocomplete.getPlace();
            const address = place.formatted_address;
            self.searchForm.address = address;
            // aggiornamento degli altri campi del form con i dati trovati
        });


    }
}
</script>

<template>
    <div class="container search">

        <form @submit.prevent="handleSearch()">
            <div class="group">
                <label for="address">Dove vuoi andare?</label>
                <input type="text" id="address" name="address" placeholder="Inserisci la destinazione"
                    v-model="searchForm.address">
            </div>

            <div class="group">
                <label for="rooms_number">Di quante camere hai bisogno?</label>
                <input type="text" id="rooms_number" name="rooms_number" placeholder="Inserisci il numero di camere"
                    v-model="searchForm.rooms_number">
            </div>

            <div class="group">
                <label for="beds_number">Di quanti letti hai bisogno?</label>
                <input type="text" id="beds_number" name="beds_number" placeholder="Inserisci il numero di letti"
                    v-model="searchForm.beds_number">
            </div>

            <div class="group" @click.self="openFilters = !openFilters">
                <label for="advanced_filters" @click.self="openFilters = !openFilters">Filtri avanzati</label>
                <div>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" @click.self="openFilters = !openFilters" />
                </div>

                <div class="filters" v-if="openFilters">
                    <div class="group">
                        <label for="bathrooms_number">Di quanti bagni hai bisogno?</label>
                        <input type="text" id="bathrooms_number" name="bathrooms_number"
                            placeholder="Inserisci il numero di bagni" v-model="searchForm.bathrooms_number">
                    </div>
                    <div class="group">
                        <label for="services">Di quali servizi hai bisogno?</label>
                        <div class="services">
                            <div class="service" v-for="service in allServices">
                                <input type="checkbox" :name="service.name" :id="service.name" :value="service.id"
                                    v-model="this.searchForm.services">
                                <label :for="service.name">{{ service.name }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="group">
                <button @click="handleSearch()">
                    Cerca
                </button>
            </div>
        </form>

    </div>

    <!-- <header>
        <nav class="navbar">
            <div class="container-fluid">
               
                <AppLogo />

                
                <div class="menu-hidden" v-if="isOpen">
                    <ul>
                        <li class="item" v-for="(item, index) in menuHidden" :key="index"
                            :class="{ active: item.active === index }">
                            {{ item.label }}
                        </li>
                    </ul>
                </div>


                
                <div class="searchbar first" :class="{ open: isOpen }">
                   
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

                
                <AppMenuSearch :isOpen="isOpen" />

                
                <div class="right-menu">
                    <ul class="group-list">
                        <li class="item" v-for="item in menuItems2" :key="item.label">
                            <a :href="item.link">{{ item.label }}</a>
                        </li>
                        <li class="item">
                            <font-awesome-icon :icon="menuItems2[1].icon" class="globe" />
                        </li>
                    </ul>

                    
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
     <AppMain/> -->


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
</template>

<style lang="scss" scoped>
@import '../../styles/partials/mixins.scss';
@import '../../styles/partials/variables.scss';

.container.search {
    padding: 1rem 0;

    form {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .group {
            position: relative;
        }

        .group>label {
            display: block;
            margin-bottom: 5px;
        }
    }
}


.filters {
    position: absolute;
    top: 100%;
    right: 0;
    border: 1px solid red;
    z-index: 20;
    background-color: gray;
}

.service {
    margin-bottom: 5px;
}


// header {
//     width: 100%;
//     background-color: white;
//     padding: 15px 20px;
//     border-bottom: 1px solid #e2dbdb;
//     z-index: 2;
//     position: relative;
//     position: sticky;
//     top:0;
//     left: 0;
//        @include for-tablet-up {
//                     padding: 0px 0px;
//                  }
//     .navbar {
//         max-width: 100%;
//         width: 100%;

//         .container-fluid {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;

//             .menu-hidden {
//                 @include for-tablet-up {
//                     display: none;
//               }
//                 .item {
//                     font-size: 16px;
//                     letter-spacing: 1.5px;
//                     margin-right: 30px;
//                     font-weight: lighter, bolder;
//                     transition: all 0.4s ease-in;
//                     cursor: pointer;
//                     &:hover {
//                         border-bottom: 1.5px solid #B8B8B8;
//                         padding: 8px 0px;
//                         font-weight: lighter;
//                     }
//                  }
//                 .active {
//                     border-bottom: 1.5px solid black;
//                     padding: 8px 0px;
//                 }
//             }

//             .first {
//                margin-top: 35px;
//                  @include for-tablet-up {
//                   width: 80%;
//                   margin-top: 28px;   
//             }

//             }


//             .searchbar,
//             .open,

//             .menu-hidden {
//                 position: absolute;
//                 top: 15%;
//                 left: 50%;
//                 transform: translate(-50%, -50%);


//                 .group-list,
//                 .group-list:last-child {
//                     border: 1px solid #B8B8B8;
//                     padding: 12px 25px;
//                     border-radius: 50px;
//                     text-align: center;
//                     -webkit-box-shadow: 1px 2px 9px -1px #B8B8B8;
//                     box-shadow: 1px 2px 9px -1px #B8B8B8;
//                     transition: box-shadow 0.5s ease-in-out;
//                     cursor: pointer;


//                     &:hover {
//                         -webkit-box-shadow: 1px 1px 6px 1px #B8B8B8;
//                         box-shadow: 1px 1px 6px 1px #B8B8B8;
//                     }
//                     .item {
//                         margin-right: 2px;

//                         a {
//                             text-decoration: none;
//                         }
//                     }

//                     .item:nth-child(3), .item:nth-child(2) {
//                           @include for-tablet-up {
//                                    display: none;

//                                 }
//                     }

//                     .item:nth-child(1) {
//                          @include for-tablet-up {
//                                    margin-right: 150px;

//                                 }
//                     }

//                     .line {
//                         display: inline-block;
//                         color: black;
//                         background-color: black;
//                         width: 20px;
//                         height: 1px;
//                         transform: rotate(90deg);
//                         vertical-align: middle;
//                     }

//                     .icon {
//                         border: 1px solid none;
//                         padding: 6px 9px;
//                         border-radius: 50px;
//                         background-color: $color-one-light;

//                         .myicon {
//                             color: white;
//                         }
//                     }

//                 }
//             }

//             .right-menu {
//                 width: calc(100% / 4);
//                 display: flex;
//                 justify-content: center;
//                 align-items: baseline;
//                    @include for-tablet-up {
//                          width: 30%;
//                    }



//                 .globe {
//                     color: white;
//                     background-color: black;
//                     border-radius: 50px;
//                     font-size: 16px;
//                     vertical-align: middle;
//                 }

//                 .group-list:first-child {
//                            @include for-tablet-up {
//                            display: none;
//                    }

//                     .item {
//                         transition: transform 1s ease-in-out, box-shadow 0.5s ease-in-out;

//                         &:hover {
//                             transform: scale(1.2);
//                             border: 1px solid #e6e2e2;
//                             padding: 8px 10px;
//                             border-radius: 50px;
//                             background: #e6e2e2;
//                         }

//                         a {
//                             text-decoration: none;
//                         }
//                     }
//                 }

//                 .group-list:last-child {
//                     border: 1px solid #e0dcdc;
//                     border-radius: 50px;
//                     margin-left: 18px;
//                     padding: 10px 0px;
//                     transition: transform 0.8s ease-in-out, box-shadow 0.5s ease-in-out;

//                     &:hover {
//                         -webkit-box-shadow: 1px 1px 6px 1px #B8B8B8;
//                         box-shadow: 1px 1px 6px 1px #B8B8B8;
//                         transform: scale(1.2);
//                     }

//                     .user {
//                         font-size: 28px;
//                         color: #6d6a6a;
//                     }

//                     .bars {
//                         font-size: 15px;
//                         padding-left: 10px;
//                     }
//                 }
//             }

//             .item {
//                 display: inline-block;
//                 margin-right: 10px;
//                 font-size: 14px;
//                 font-weight: lighter, bolder;
//                 color: black;
//                 vertical-align: middle;

//                 a {
//                     color: black;
//                 }
//             }
//         }
//     }
// }
</style>