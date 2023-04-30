import {
    reactive
} from 'vue';

// import axios per fare call api
import axios from 'axios';

export const store = reactive({
    errors: [],
    user: null,
    filterModalOpen: false,
    overlayOpen: false,
    searchForm: {
        address: null,
        radius: 20,
        lat: null,
        lng: null,
        rooms_number: null,
        beds_number: null,
        bathrooms_number: null,
        services: []
    },

    // modale giada
    showModal: false,
    editedApartment: false,

    clear() {
        this.overlayOpen = false
    }
})