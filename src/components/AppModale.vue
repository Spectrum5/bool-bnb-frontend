<script>

import { store } from '../store';
import { router } from '../router';
import axios from 'axios';


export default {
    name: 'AppModale',
    data() {
        return {
            store,
            router,
            close: false,
            services: [], // servizi disponibili

          
            apartments: [], // tutti gli appartamenti
            select_services: "", // servizi selezionati dall'utente
            selected_services: [], // servizi selezionati dall'utente
            filteredApartments: [],
            selected_apartments: []
         
    
        
        }
    },  
    props: {
          openFilter: {
           type: Boolean,
           default: false,
        },
           
    },
    components: {
      
    },
     methods: {
         closeX() {
          this.close = !this.close;
         },
        //  getServices() {
        //     const url = 'http://127.0.0.1:8000/api';
        //     axios.get(url + '/services',              
                
        //     ).then(response => {
        //          this.services = response.data.services;
        //          console.log(this.services, 'servizi');
        //     })
        //  },

        getApartment() {
            const url = 'http://127.0.0.1:8000/api';
            axios.get(url + '/apartments', {
                headers: {
                "Access-Control-Allow-Origin": "*"                
                }
            }).then(response => {
                    this.apartments = response.data.apartments;
                    console.log(this.apartments, 'appartamenti');
            })
         },
             filterDestinations() {
                if (this.selected_services.length === 0) {
                    this.filteredApartments = this.apartments;
                } else {
                    const filterApartments = this.apartments.filter(apartment => {
                        const apartment_services = apartment.services.map(service => service.id);
                        return this.selected_services.every(service_id => apartment_services.includes(service_id));
                    });
                    this.filteredApartments = filterApartments;
                }
            }


       
               
    },
    watch: {
    selected_services: function() {
        this.filterDestinations();
    }
},


  

    mounted() {
        this.getServices();
         console.log('filter components');
         this.getApartment();
        console.log('id lucia');
        this.filteredApartments = this.selected_apartments;
        console.log(this.filteredApartments, 'filtrare');
       
    },



}
</script>

<template>
          <!-- MODALE DI RICERCA AVANZATA -->
          <div class="modal fade" tabindex="-1" role="dialog"  v-if="store.filterModalOpen == true">
            <article class="modal-dialog modal-content" role="document">
                <header class="modal-header">
                    <h1 class="modal-title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path fill="currentColor" d="M14 9V4H5v16h6.056c.328.417.724.785 1.18 1.085l1.39.915H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8v1h-7zm-2 2h9v5.949c0 .99-.501 1.916-1.336 2.465L16.5 21.498l-3.164-2.084A2.953 2.953 0 0 1 12 16.95V11zm2 5.949c0 .316.162.614.436.795l2.064 1.36 2.064-1.36a.954.954 0 0 0 .436-.795V13h-5v3.949z" />
                        </svg>
                        Filtri
                    </h1>
                    <button class="icon-button" @click="store.filterModalOpen = false">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                        </svg>
                    </button>
                </header>
                <section class="modal-container-body rtf">
                    <h3>Servizi essenziali</h3>
                    <div class="services-container">
                        <div class="service checkbox" v-for="service in services" :key="service.id">
                            <label class="checkbox-wrapper" :for="'service-' + service.id">
                                <input class="checkbox-input" type="checkbox" :id="'service-' + service.id" :value="service.id" v-model="selected_services" >
                                <span class="checkbox-tile">
                                   <span class="checkbox-icon">
                                       <font-awesome-icon :icon="`fa-solid fa-${service.icon}`" />
                                    </span>
                                    <span class="checkbox-label"> {{ service.name }}</span>
                                </span>
                             </label>
                        </div>
                    </div>
                    <i></i>

                    <div class="other-services">
                        <h3>Letti</h3>
                        <div class="row" v-for="i in 10" :key="i">
                          <label class="rad-label">
                            <input type="radio" class="rad-input" name="rad" :value="i">
                            <div class="rad-design"></div>
                            <div class="rad-text">{{ i }}</div>
                          </label>
                        </div>
                    </div>
                    <i></i>

                    <div class="other-services">
                       <h3>Bagni</h3>
                      <div class="row" v-for="i in 10" :key="i">
                          <label class="rad-label">
                            <input type="radio" class="rad-input" name="rad" :value="i">
                            <div class="rad-design"></div>
                            <div class="rad-text">{{ i }}</div>
                          </label>
                        </div>
                    </div>
                     <i></i>
                    <div class="button-filter">
                      <button type="button" class='glowing-btn'  @click="filterDestinations"><span class='glowing-txt'>Apply<span class='faulty-letter'>fil</span>ter</span></button>
                    </div>
                </section>
                <footer class="modal-footer">
                    <button type="button" class="btn">Cancella tutto</button>
                    <button  type="button" class="btn" data-dismiss="modal">Mostra 645 alloggi</button>
                </footer>
            </article>

          </div>
</template>

<style lang="scss" scoped>
@import '../styles/partials/mixins.scss';
@import '../styles/partials/variables.scss';
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap");

  

.modal {
        position: fixed; 
        z-index: 100; 
        left: 50%;
        top:55%;
        transform: translate(-50%, -50%);
        width: 50%; 
        height: 80%;
        padding: 4rem 2rem;
        border-radius: .8rem;
        border: 3px solid $color-one-dark;
        overflow: scroll; /* Enable scroll if needed */
        color: hsl(0, 0%, 100%);
        background: linear-gradient(to right bottom, hsl(236, 50%, 50%), hsl(195, 50%, 50%));
        box-shadow: .4rem .4rem 2.4rem .2rem hsla(236, 50%, 50%, 0.3);

        .modal-title::before {
             content: '';
                position: absolute;
                top: 0%;
                left: 100%;
                transform: translate(-50%, -50%);
                width: 18rem;
                height: 18rem;
                border: 1px solid hsla(0, 0%, 100%, .2);
                border-radius: 100rem;
                pointer-events: none;
        }

        .icon-button {
            position: absolute;
            right: 0;
            top:0;
            transform: translate(-50%, 50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background-color: transparent;
            border: 1px solid hsla(0, 0%, 100%, .2);

            svg {
                color: white;
            }
        }
h3 {
    padding: 20px 0px;
}
.services-container {
    @include largeContainer;
    @include flexStart(60px);
    flex-wrap: wrap;
   
      .checkbox-input {
            clip: rect(0 0 0 0);
            clip-path: inset(100%);
            height: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
            width: 1px;

            &:checked + .checkbox-tile {
                border-color: $color-one-dark;
                box-shadow: 0 5px 10px rgba(#000, 0.1);
                color: $color-one-dark;
                &:before {
                    transform: scale(1);
                    opacity: 1;
                    background-color: $color-one-dark;
                    border-color: $color-one-light;
                }
                
                .checkbox-icon, .checkbox-label {
                    color: $color-one-dark;
                }
            }

            &:focus + .checkbox-tile {
                border-color: $color-one-dark;
                box-shadow: 0 5px 10px rgba(#000, 0.1), 0 0 0 4px $color-one-light;
                &:before {
                    transform: scale(1);
                    opacity: 1;
                }
            }
     }

     .checkbox-tile {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 6rem;
            min-height: 6rem;
            border-radius: 0.5rem;
            border: 2px solid #b5bfd9;
            background-color: #fff;
            box-shadow: 0 5px 10px rgba(#000, 0.1);
            transition: 0.15s ease;
            cursor: pointer;
            position: relative;

                &:before {
                    content: "";
                    position: absolute;
                    display: block;
                    width: 1.25rem;
                    height: 1.25rem;
                    border: 2px solid #b5bfd9;
                    background-color: #fff;
                    border-radius: 50%;
                    top: 0.25rem;
                    left: 0.25rem;
                    opacity: 0;
                    transform: scale(0);
                    transition: 0.25s ease;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
                    background-size: 12px;
                    background-repeat: no-repeat;
                    background-position: 50% 50%;
                }

                &:hover {
                    border-color: #2260ff;
                    &:before {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
}

    .checkbox-icon {
        transition: .375s ease;
        color: #494949;
        svg {
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    .checkbox-label {
        color: #707070;
        transition: .375s ease;
        text-align: center;
          font-size: 0.8rem;
    }

.button-filter {
    padding: 40px 0px;

    button {
        border: none;
        padding: 10px 10px;
        border-radius: 10px;
        background: linear-gradient($color-two-light, $color-one-light);

        &:hover {
           background: linear-gradient($color-one-light, $color-two-light);
        }
    }
}


i {
        text-align: center;
        display:block;
        margin-bottom: 4rem;
        padding-bottom: 4rem;
        border-bottom: 1px solid hsla(0, 0%, 100%, .4);
}
}
        .other-services {
            @include flexStart(20px);
            padding-top: 30px;
            .rad-label {
                display: flex;
                align-items: center;
                border-radius: 100px;
                padding: 5px 5px;
                margin: 10px 0;

                    cursor: pointer;
                    transition: .3s;
                    }
                .rad-label:hover,
                .rad-label:focus-within {
                  background: hsla(0, 0%, 80%, .14);
                }

                .rad-input {
                    position: absolute;
                    left: 0;
                    width: 1px;
                    height: 1px;
                    opacity: 0;
                    z-index: -1;
                    }

            .rad-design {
                width: 22px;
                height: 22px;
                border-radius: 100px;
                background: linear-gradient(to right bottom, hsl(154, 97%, 62%), hsl(225, 97%, 62%));
                position: relative;
                }

                .rad-design::before {
                content: '';
                    display: inline-block;
                    width: inherit;
                    height: inherit;
                    border-radius: inherit;
                    background: hsl(0, 0%, 90%);
                    transform: scale(1.1);
                    transition: .3s;
                }

                .rad-input:checked+.rad-design::before {
                   transform: scale(0);
                }

                .rad-text {
                    color: hsl(0, 0%, 60%);
                    margin-left: 14px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    font-size: 18px;
                    font-weight: 900;
                    transition: .3s;
                }

                .rad-input:checked~.rad-text {
                   color: hsl(0, 0%, 40%);
                }
}
}




</style>
