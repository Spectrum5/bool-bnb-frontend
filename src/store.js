import {
    reactive
} from 'vue';

// import axios per fare call api
import axios from 'axios';

export const store = reactive({
    errors: [],
    user: null,
    filterModalOpen: false,
    test: 'store.js funziona!',
    images: [
        {
            img: 'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        },
        {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHTRKk6eSVY0cdIDwD_u94q7vzCMqzyxwbA&usqp=CAU',
        },
        {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3pTIp6MjgnoYU7nBl-zCrBSZkJ-br0cyPqzkyhMfR2HbB6AR--zn5uNcmr9lhntbtMkY&usqp=CAU',
        },
        {
            img: '',
        }
    ],
})