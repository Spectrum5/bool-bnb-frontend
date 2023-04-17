import {
    reactive
} from 'vue'
import axios from 'axios';
// import axios per fare call api

export const store = reactive ({
    test : 'store.js funziona'
})