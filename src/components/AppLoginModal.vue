<script>

// Utilities
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';



export default {
    name: 'AppLoginModal',
    components: {
       
    },
    data() {
        return {
            store,
            router,
           
        }
    },
    props: {
          loginModal: {
           type: Boolean,
           default: false,
          },
    },
    methods: {
        // getImages() {
        //     axios.get(`http://localhost:8000/api/images/${this.apartment.id}`)
        //         .then((response) => {
        //             this.images = response.data.images;
        //             console.log('Images', response.data);
        //         })
        // },
       
    },
    mounted() {
       
    }
}
</script>


<template>
    <ul id="login-modal" v-if="loginModal == true">
       <li class="item-link">
          <router-link to="/register">Registrati</router-link>
       </li>
       <li class="item-link">
          <router-link class="customLink" to="/login">Accedi</router-link> <br>
       </li>
       <i></i>
       <li >
          <a href="#">Affitta con airbnb</a>
       </li>
       <li >
          <a href="#">Assistenza</a>
       </li>
    </ul>
  
</template>


<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;

#login-modal {
  border-radius: 10px;  
  border: 1px solid $color-one-light;
  width: 250px;
  padding: 30px 20px;
  position: absolute;
  top: 150%;
  right: 30%;
  list-style: none;
  background-color:$light-color-one;
  z-index: 9999;

       .item-link, li {
           list-style: none;
           padding: 8px 10px; 
           transition: all 0.2s ease-in-out;
           position: relative;
           top: 0;

          &:hover {
            top: -5px;
           
          }



        
       }

       i {
        display: block;
        width: 100%;
        height: 1px;
        background-color:$color-one-light;
        margin: 10px 0;
}


       li {
        font-size: 13px;

     
       }
  

}

 a {
   text-decoration: none;
      color: $color-one-light;
       transition: all 1s ease;

      &:hover {
         font-size: 16px;
         color:$color-one-dark ; 
      }
  }
</style>