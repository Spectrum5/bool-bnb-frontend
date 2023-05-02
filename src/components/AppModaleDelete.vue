<script>

import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppModaleDelete',
    data() {
        return {
            store,
            router,
        }
    },
    methods: {

        // When the user clicks on <span> (x), close the modal
        // closeModal() {
        //     let modal = document.getElementById("myModal");
        //     modal.style.display = "none";
        // }
        
    },
    props:{
        action: Function
    },

    methods: {
        openModal() {
            // Get the modal
            let modal = document.getElementById("myModal");

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    this.store.showModal = false;
                }
            }
        },
    },
    mounted() {
        this.openModal
    }
}
</script>

<template>
    <!-- Trigger/Open The Modal -->
        <div id="myModal" class="modal" v-if="store.showModal">
          <!-- Modal content -->
          <div class="modal-content">
            <span class="close" @click="store.showModal = false">&times;</span>
            <p>Sei sicuro di voler eliminare il tuo appartamento?</p>
            <div>
                <button class="btn btn-show" @click="store.showModal = false">Annulla</button>
                <button class="btn btn-delete" @click="this.action">Elimina</button>
            </div>
          </div>
        </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;

/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.1); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 2px solid $danger-color-dark;
    border-radius: 10px;
    width: 50%; /* Could be more or less, depending on screen size */
    position: relative;
    div{
        margin-top: 40px;
        margin-right: 10px;
        button{
            margin-right: 16px;
        }
    }
}

/* The Close Button */
.close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 10px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.btn {
    padding: 7px 10px;
    border-radius: 10px;
    margin-right: 5px;
    cursor: pointer;
}
.btn-delete {
    background-color: #f56372;
    border: 2px solid #f56372;
}
.btn-show {
    background-color: #f5f5f5;
    border: 2px solid #141414;
}
</style>