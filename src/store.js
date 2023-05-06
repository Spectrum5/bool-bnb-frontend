import {
    reactive
} from 'vue';

// import axios per fare call api
import axios from 'axios';

export const store = reactive({
    errors: [],
    user: null,
    filterModalOpen: false,
    menuMobileOpen: false,
    menuDesktopOpen: false,
    servicesMenuOpen: false,
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
    apartment_id: null,
    sponsor_id: null,
    sponsor_price: null,

    loadingWidth: 0,

    // modale giada
    showModal: false,
    editedApartment: false,

    clear() {
        this.overlayOpen = false;
        this.menuMobileOpen = false;
        this.menuDesktopOpen = false;
        this.servicesMenuOpen = false;
        this.errors = [];
    },

    setAutocomplete(fieldName, self) {
        const addressInput = document.querySelector(`#${fieldName}`)
        let autocomplete = new google.maps.places.Autocomplete(addressInput);
        autocomplete.addListener('place_changed', function () {
            let place = autocomplete.getPlace();
            let address = place.formatted_address;
            self.form.address = address;
        });
    },

    // Front End Validation
    addError(message, field) {
        // Controlla se in store.errors sono presenti errori con lo stesso campo di quello passato
        // e se non ci sono aggiunge l'errore passato come argomento, altrimenti no
        if (this.errors.length == 0) {
            this.errors.push({
                message: message,
                field: field
            });
        }
        else {
            if (!this.errors.some(error => error.field == field)) {
                this.errors.push({
                    message: message,
                    field: field
                });
            }
        }
    },
    deleteErrors(fieldName) {
        // toglie l'errore in store.error così da poter fare ogni volta un nuovo controllo da capo
        const index = this.errors.findIndex(error => error.field === fieldName);
        if (index >= 0) {
            this.errors.splice(index, 1);
        }
    },
    shakeInputs() {
        const notShakingInput = ['services'];
        
        if (this.errors.length > 0) {
            this.errors.forEach(error => {
                if (!notShakingInput.includes(error.field)) {
                    document.querySelector(`#${error.field}`).classList.add('shake');
                    setTimeout(() => {
                        document.querySelector(`#${error.field}`).classList.remove('shake');
                    }, 300)
                }
            });
        }
    },
    firstNameValidation(fieldName) {
        const firstNameInput = document.querySelector(`#${fieldName}`)
        firstNameInput.classList.remove('invalid');

        this.deleteErrors('first_name');

        // First Name Length
        if (firstNameInput.value.trim().length == 0) {
            this.addError('Il campo nome deve essere compilato', 'first_name');
            firstNameInput.classList.add('invalid');
        }
        else if (firstNameInput.value.trim().length < 3) {
            this.addError('Il campo nome deve essere almeno di 3 caratteri', 'first_name');
            firstNameInput.classList.add('invalid');
        }
        else if (firstNameInput.value.trim().length > 128) {
            this.addError('Il campo nome non deve superare i 128 caratteri', 'first_name');
            firstNameInput.classList.add('invalid');
        }
    },
    lastNameValidation(fieldName) {
        const lastNameInput = document.querySelector(`#${fieldName}`)
        lastNameInput.classList.remove('invalid');

        this.deleteErrors('last_name');

        // Last Name Length
        if (lastNameInput.value.trim().length == 0) {
            this.addError('Il campo cognome deve essere compilato', 'last_name');
            lastNameInput.classList.add('invalid');
        }
        else if (lastNameInput.value.trim().length < 3) {
            this.addError('Il campo cognome deve essere almeno di 3 caratteri', 'last_name');
            lastNameInput.classList.add('invalid');
        }
        else if (lastNameInput.value.trim().length > 128) {
            this.addError('Il campo cognome non deve superare i 128 caratteri', 'last_name');
            lastNameInput.classList.add('invalid');
        }
        // else {
        //     const index = this.store.errors.findIndex(error => error.field === "last_name");
        //     this.store.errors.splice(index, 1);
        // }
    },
    emailValidation(fieldName) {
        const emailInput = document.querySelector(`#${fieldName}`)
        emailInput.classList.remove('invalid');
        this.deleteErrors('email');

        // Email Validation
        if (emailInput.value.trim().length == 0) {
            this.addError('Il campo email deve essere compilato', 'email');
            emailInput.classList.add('invalid');
        }
        else if (emailInput.value.trim().length < 10) {
            this.addError('L\'email deve essere lunga almeno 10 caratteri', 'email');
            emailInput.classList.add('invalid');
        }
        else if (emailInput.value.trim().length > 64) {
            this.addError('L\'email non deve superare i 64 caratteri', 'email');
            emailInput.classList.add('invalid');
        }
        else if (!emailInput.value.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            this.addError('La tua email contiene caratteri non permessi', 'email');
            emailInput.classList.add('invalid');
        }
        else {
            const index = this.errors.findIndex(error => error.field === "email");
            this.errors.splice(index, 1);
        }
    },
    passwordValidation(fieldName) {
        const passwordInput = document.querySelector(`#${fieldName}`)
        passwordInput.classList.remove('invalid');

        this.deleteErrors('password');

        // Password Lenght
        if (passwordInput.value.length == 0) {
            this.addError('Il campo password deve essere compilato', 'password');
            passwordInput.classList.add('invalid');
        }
        else if (passwordInput.value.length < 10) {
            this.addError('La password deve essere lunga almeno 10 caratteri', 'password');
            passwordInput.classList.add('invalid');
        }
        else if (passwordInput.value.length > 64) {
            this.addError('La password non deve superare i 64 caratteri', 'password');
            passwordInput.classList.add('invalid');
        }
    },
    passwordConfirmationValidation(fieldName, otherFieldName) {
        const passwordConfirmationInput = document.querySelector(`#${fieldName}`)
        const passwordInput = document.querySelector(`#${otherFieldName}`)
        passwordConfirmationInput.classList.remove('invalid');

        this.deleteErrors('password_confirmation');

        // Password Confirmation
        if (passwordConfirmationInput.value.length == 0) {
            this.addError('Il campo conferma password deve essere compilato', 'password_confirmation');
            passwordConfirmationInput.classList.add('invalid');
        }
        if (passwordInput.value != passwordConfirmationInput.value) {
            this.addError('Le password inserite non coincidono', 'password_confirmation');
            passwordConfirmationInput.classList.add('invalid');
        }
    },
    dateOfBirthValidation(fieldName) {
        const datOfBirthInput = document.querySelector(`#${fieldName}`)
        datOfBirthInput.classList.remove('invalid');

        this.deleteErrors('date_of_birth');

        const [year, month, day] = datOfBirthInput.value.split('-');
        const now = new Date();

        if (datOfBirthInput.value == '' || datOfBirthInput.value == null) {
            this.addError('Devi impostare una data di nascita', 'date_of_birth');
            datOfBirthInput.classList.add('invalid');
        }
        else if (datOfBirthInput.value != null) {
            if ((now.getFullYear() - year) <= 9) {
                this.addError('Devi avere almeno 9 anni per poterti registrare', 'date_of_birth');
                datOfBirthInput.classList.add('invalid');
            }

            if (month < 1 || month > 12) {
                this.addError('Il mese deve essere compreso tra 1 e 12', 'date_of_birth');
                datOfBirthInput.classList.add('invalid');
            }
            if (day < 1 || day > 31) {
                this.addError('Il giorno di nascita deve essere compreso tra 1 e 31', 'date_of_birth');
                datOfBirthInput.classList.add('invalid');
            }
        }
        // else {
        //     const index = this.store.errors.findIndex(error => error.field === "date_of_birth");
        //     this.store.errors.splice(index, 1);
        // }
    },
    messageValidation(fieldName) {
        const messageInput = document.querySelector(`#${fieldName}`)
        messageInput.classList.remove('invalid');
        this.deleteErrors('message');

        const messageValue = messageInput.value.trim();

        if (messageValue.length == 0) {
            this.addError('Non hai inserito un messaggio', 'message');
            messageInput.classList.add('invalid');
        }
        else if (messageValue.length < 10) {
            this.addError('Il messaggio deve essere di almeno 10 caratteri', 'message');
            messageInput.classList.add('invalid');
        } else if (messageValue.length > 4096) {
            this.addError('Il messaggio deve essere di massimo 4096 caratteri', 'message');
            messageInput.classList.add('invalid');
        } else {
            const index = this.errors.findIndex(error => error.field === "message");
            this.errors.splice(index, 1);
        }
    },
    titleValidation(fieldName) {
        const titleInput = document.querySelector(`#${fieldName}`)
        titleInput.classList.remove('invalid');

        this.deleteErrors('title');

        // Title Length
        if (titleInput.value.trim().length === 0) {
            this.addError('Il campo nome deve essere compilato', 'title');
            titleInput.classList.add('invalid');
        } else if (titleInput.value.trim().length < 3) {
            this.addError('Il campo nome deve essere almeno di 3 caratteri', 'title');
            titleInput.classList.add('invalid');
        } else if (titleInput.value.trim().length > 50) {
            this.addError('Il campo nome non deve superare i 128 caratteri', 'title');
            titleInput.classList.add('invalid');
        }
    },
    addressValidation(fieldName) {
        const addressInput = document.querySelector(`#${fieldName}`)
        addressInput.classList.remove('invalid');

        this.deleteErrors('address');

        if (addressInput.value.trim().length === 0) {
            this.addError('Il campo indirizzo deve essere compilato', 'address');
            addressInput.classList.add('invalid');
        } else if (addressInput.value.trim().length < 3) {
            this.addError('Il campo indirizzo deve essere almeno di 3 caratteri', 'address');
            addressInput.classList.add('invalid');
        } else if (addressInput.value.trim().length > 512) {
            this.addError('Il campo indirizzo non deve superare i 512 caratteri', 'address');
            addressInput.classList.add('invalid');
        }
    },
    imageValidation(fieldName, previewUrls) {
        const fileInput = document.querySelector(`#${fieldName}`)
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        fileInput.classList.remove('invalid');

        this.deleteErrors('images');

        if (!fileInput.value) {
            this.addError('Devi selezionare almeno un\'immagine', 'images');
            fileInput.classList.add('invalid');
        } else if (!allowedExtensions.exec(fileInput.value)) {
            this.addError('L\'immagine deve essere in formato JPG, JPEG o PNG', 'images');
            fileInput.classList.add('invalid');
        }
        else if (previewUrls.length > 3) {
            this.addError('Puoi selezionare fino a un massimo di tre immagini', 'images');
            fileInput.classList.add('invalid');
        }
    },
    priceValidation(fieldName) {
        const priceInput = document.querySelector(`#${fieldName}`)

        priceInput.classList.remove('invalid');
        this.deleteErrors('price');

        if (priceInput.value.trim().length === 0) {
            this.addError('Il campo prezzo deve essere compilato', 'price');
            priceInput.classList.add('invalid');
        } else if (isNaN(priceInput.value.trim())) {
            this.addError('Il campo prezzo deve contenere solo numeri', 'price');
            priceInput.classList.add('invalid');
        } else if (priceInput.value.trim() <= 59 || priceInput.value.trim() > 1500) {
            this.addError('Il campo prezzo deve essere compreso tra 60 e 1500', 'price');
            priceInput.classList.add('invalid');
        }
    },
    roomsNumberValidation(fieldName) {
        const roomsNumberInput = document.querySelector(`#${fieldName}`)

        roomsNumberInput.classList.remove('invalid');
        this.deleteErrors('rooms_number');

        if (roomsNumberInput.value.trim().length === 0) {
            this.addError('Il campo stanze deve essere compilato', 'rooms_number');
            roomsNumberInput.classList.add('invalid');
        } else if (isNaN(roomsNumberInput.value.trim())) {
            this.addError('Il campo stanze deve contenere solo numeri', 'rooms_number');
            roomsNumberInput.classList.add('invalid');
        } else if (roomsNumberInput.value.trim() <= 0 || roomsNumberInput.value.trim() > 8) {
            this.addError('Il campo stanze deve essere compreso tra 1 e 8', 'rooms_number');
            roomsNumberInput.classList.add('invalid');
        }
    },
    bedsNumberValidation(fieldName) {
        const bedsNumberInput = document.querySelector(`#${fieldName}`)

        bedsNumberInput.classList.remove('invalid');
        this.deleteErrors('beds_number');

        if (bedsNumberInput.value.trim().length === 0) {
            this.addError('Il campo posti letto deve essere compilato', 'beds_number');
            bedsNumberInput.classList.add('invalid');
        } else if (isNaN(bedsNumberInput.value.trim())) {
            this.addError('Il campo posti letto deve contenere solo numeri', 'beds_number');
            bedsNumberInput.classList.add('invalid');
        } else if (bedsNumberInput.value.trim() <= 0 || bedsNumberInput.value.trim() > 16) {
            this.addError('Il campo posti letto deve essere compreso tra 1 e 16', 'beds_number');
            bedsNumberInput.classList.add('invalid');
        }
    },
    bathroomsNumberValidation(fieldName) {
        const bathroomsNumberInput = document.querySelector(`#${fieldName}`)

        bathroomsNumberInput.classList.remove('invalid');
        this.deleteErrors('bathrooms_number');

        if (bathroomsNumberInput.value.trim().length === 0) {
            this.addError('Il campo numero di bagni deve essere compilato', 'bathrooms_number');
            bathroomsNumberInput.classList.add('invalid');
        } else if (isNaN(bathroomsNumberInput.value.trim())) {
            this.addError('Il campo numero di bagni deve contenere solo numeri', 'bathrooms_number');
            bathroomsNumberInput.classList.add('invalid');
        } else if (bathroomsNumberInput.value.trim() <= 0 || bathroomsNumberInput.value.trim() > 8) {
            this.addError('Il campo numero di bagni deve essere compreso tra 1 e 8', 'bathrooms_number');
            bathroomsNumberInput.classList.add('invalid');
        }
    },
    descriptionValidation(fieldName) {
        const descriptionInput = document.querySelector(`#${fieldName}`)

        descriptionInput.classList.remove('invalid');
        this.deleteErrors('description');

        const descriptionValue = descriptionInput.value.trim();

        if (descriptionValue.length == 0) {
            this.addError('La descrizione deve essere compilata', 'description');
            descriptionInput.classList.add('invalid');
        }
        else if (descriptionValue.length < 10) {
            this.addError('La descrizione deve essere di almeno 10 caratteri', 'description');
            descriptionInput.classList.add('invalid');
        } else if (descriptionValue.length > 4096) {
            this.addError('La descrizione deve essere di massimo 4096 caratteri', 'description');
            descriptionInput.classList.add('invalid');
        }
    },
    sizeValidation(fieldName) {
        const sizeInput = document.querySelector(`#${fieldName}`)

        sizeInput.classList.remove('invalid');
        this.deleteErrors('size');

        if (sizeInput.value.trim().length === 0) {
            this.addError('Il campo mq deve essere compilato', 'size');
            sizeInput.classList.add('invalid');
        } else if (isNaN(sizeInput.value.trim())) {
            this.addError('Il campo mq deve essere un numero', 'size');
            sizeInput.classList.add('invalid');
        } else if (sizeInput.value.trim() < 50) {
            this.addError('Il campo mq deve essere maggiore di 50', 'size');
            sizeInput.classList.add('invalid');
        } else if (sizeInput.value.trim() > 500) {
            this.addError('Il campo mq non deve superare i 500 mq', 'size');
            sizeInput.classList.add('invalid');
        }
    },
    visibilityValidation(fieldName) {
        const visibilityInput = document.querySelector(`#${fieldName}`)

        console.log('VISIBILITY', visibilityInput.value)

        visibilityInput.classList.remove('invalid');
        this.deleteErrors('visibility');

        if (visibilityInput.value != true && visibilityInput.value != false) {
            this.addError('Il campo visibilità non è valido', 'visibility');
            visibilityInput.classList.add('invalid');
        }
    },
    servicesValidation(services) {
        this.deleteErrors('services');

        if (services.length == 0) {
            this.addError('Devi selezionare almeno un servizio', 'services');
        }
    },
})