<script>

// Components
import AppDashboardLayoutVue from '../AppDashboardLayout.vue';
import AppButton from '../../../components/AppButton.vue';
import AppErrorForm from '../../../components/AppErrorForm.vue';

// Utilities
import axios from 'axios';
import { store } from '../../../store';

export default {
    name: 'SponsorPayment',
    components: {
        AppDashboardLayoutVue,
        AppErrorForm,
        AppButton
    },
    data() {
        return {
            cardNumber: "",
            cardNumberOne: "0000",
            cardNumberTwo: "0000",
            cardNumberThree: "0000",
            cardNumberFour: "0000",
            maxDigits: false,
            cardName: "",
            cardMonth: "Month",
            cardYear: "Year",
            rotateCard: false,
            cardCVV: "",
            store,
            paymentDone: false
        };
    },
    methods: {
        deleteError(fieldName) {
            // toglie l'errore in store.error così da poter fare ogni volta un nuovo controllo da capo
            const index = this.store.errors.findIndex(error => error.field === fieldName);
            if (index >= 0) {
                this.store.errors.splice(index, 1);
            }
        },
        addError(message, field) {
            // Controlla se in store.errors sono presenti errori con lo stesso campo di quello passato
            // e se non ci sono aggiunge l'errore passato come argomento, altrimenti no
            if (this.store.errors.length == 0) {
                this.store.errors.push({
                    message: message,
                    field: field
                });
            }
            else {
                if (!this.store.errors.some(error => error.field == field)) {
                    this.store.errors.push({
                        message: message,
                        field: field
                    });
                }
            }
        },
        checkInput(e) {
            e = e || window.event;
            let keycode = e.key;

            let allowedDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"];
            if (!allowedDigits.includes(keycode)) {
                e.preventDefault();
            }

            setTimeout(() => {
                if (this.cardNumber.length == 0) {
                    this.cardNumberOne = "0000";
                    this.cardNumberTwo = "0000";
                    this.cardNumberThree = "0000";
                    this.cardNumberFour = "0000";
                }
                else {

                    if ((this.cardNumber.length == 4) || (this.cardNumber.length == 9) || (this.cardNumber.length == 14)) {
                        if (keycode != "Backspace") {
                            this.cardNumber += " ";
                        }
                    }
                    else if ((this.cardNumber.length == 5) || (this.cardNumber.length == 10) || (this.cardNumber.length == 15)) {
                        if (keycode == "Backspace") {
                            let temp = this.cardNumber.slice(0, -1);
                            this.cardNumber = temp;
                        }
                    }
                    this.cardNumberOne = this.cardNumber.slice(0, 4).toString();
                    this.cardNumberTwo = this.cardNumber.slice(5, 9).toString();
                    this.cardNumberThree = this.cardNumber.slice(10, 14).toString();
                    this.cardNumberFour = this.cardNumber.slice(15, 19).toString();
                }
            }, 10)
        },
        handlePayment() {
            this.validateData();
        },
        holderValidation() {
            let cardNameInput = document.getElementById('card_holder');
            cardNameInput.classList.remove('invalid');

            this.deleteError('card_holder');

            // First Name Length
            if (cardNameInput.value.trim().length == 0) {
                this.addError('Il campo intestatario carta deve essere compilato', 'card_holder');
                cardNameInput.classList.add('invalid');
            }
            else if (cardNameInput.value.trim().length < 3) {
                this.addError('Il campo intestatario deve essere almeno di 3 caratteri', 'card_holder');
                cardNameInput.classList.add('invalid');
            }
            else if (cardNameInput.value.trim().length > 64) {
                this.addError('Il campo intestatario non deve superare i 64 caratteri', 'card_holder');
                cardNameInput.classList.add('invalid');
            }
        },
        cardNumberValidation() {
            let cardNumberInput = document.getElementById('card_number');
            cardNumberInput.classList.remove('invalid');

            this.deleteError('card_number');

            // First Name Length
            if (this.cardNumber.length == 0) {
                this.addError('Il campo numero carta deve essere compilato', 'card_number');
                cardNumberInput.classList.add('invalid');
            }
            else if (this.cardNumber.length < 19) {
                this.addError('Il campo numero carta deve essere di 16 cifre', 'card_number');
                cardNumberInput.classList.add('invalid');
            }
            else if (this.cardNumber.length > 19) {
                this.addError('Il campo numero carta non deve superare le 16 cifre', 'card_number');
                cardNumberInput.classList.add('invalid');
            }
        },
        cardMonthValidation() {
            let cardDateMonthInput = document.getElementById('card_date_month');
            cardDateMonthInput.classList.remove('invalid');

            this.deleteError('card_date_month');

            const n = parseInt(this.cardMonth);
            if (isNaN(n)) {
                this.addError('Il campo mese di scadenza deve essere compilato ', 'card_date_month');
                cardDateMonthInput.classList.add('invalid');
            }

            if (n == undefined || n == null) {
                this.addError('Il campo mese di scadenza deve essere compilato', 'card_date_month');
                cardDateMonthInput.classList.add('invalid');
            }
            else if (n < 1) {
                this.addError('Il campo mese di scadenza deve essere è invalido', 'card_date_month');
                cardDateMonthInput.classList.add('invalid');
            }
            else if (n > 12) {
                this.addError('Il campo mese di scadenza deve essere è invalido', 'card_date_month');
                cardDateMonthInput.classList.add('invalid');
            }
        },
        cardYearValidation() {
            let cardDateYearInput = document.getElementById('card_date_year');
            cardDateYearInput.classList.remove('invalid');

            this.deleteError('card_date_year');

            const now = new Date();

            let n = parseInt(`20${this.cardYear}`)

            if (isNaN(n)) {
                this.addError('Il campo anno di scadenza deve essere compilato ', 'card_date_year');
                cardDateYearInput.classList.add('invalid');
            }
            else if (n == undefined || n == null) {
                this.addError('Il campo anno di scadenza deve essere compilato', 'card_date_year');
                cardDateYearInput.classList.add('invalid');
            }
            else if (n < now.getFullYear()) {
                this.addError('Il campo anno di scadenza è invalido', 'card_date_year');
                cardDateYearInput.classList.add('invalid');
            }
            else if (n > now.getFullYear() + 10) {
                this.addError('Il campo anno di scadenza è invalido', 'card_date_year');
                cardDateYearInput.classList.add('invalid');
            }
        },
        cardCVVValidation() {
            let cardCVVInput = document.getElementById('cardCVV');
            cardCVVInput.classList.remove('invalid');

            this.deleteError('cardCVV');

            if (this.cardCVV.length == 0) {
                this.addError('Il campo CVV deve essere compilato', 'cardCVV');
                cardCVVInput.classList.add('invalid');
            }
            else if (this.cardCVV.length < 3) {
                this.addError('Il campo CVV deve essere di 3 cifre', 'cardCVV');
                cardCVVInput.classList.add('invalid');
            }
            else if (this.cardCVV.length > 3) {
                this.addError('Il campo CVV non deve superare le 3 cifre', 'cardCVV');
                cardCVVInput.classList.add('invalid');
            }
        },
        shakeInputs() {
            if (this.store.errors.length > 0) {
                this.store.errors.forEach(error => {
                    document.querySelector(`#${error.field}`).classList.add('shake');
                    setTimeout(() => {
                        document.querySelector(`#${error.field}`).classList.remove('shake');
                    }, 300)
                });
            }
        },
        validateData() {
            // Front End Validation
            console.log('Validazione dati pagamento...');
            this.store.errors = [];

            this.cardNumberValidation();
            this.holderValidation();
            this.cardMonthValidation();
            this.cardYearValidation();
            this.cardCVVValidation();

            this.shakeInputs();

            // Controlla se validazione e' andata a buon fine
            if (this.store.errors.length == 0) this.postPaymentData();
            else console.log('Hai inserito dati non corretti. Riprova.');
        },
        postPaymentData() {
            axios.post('http://localhost:8000/api/sponsors/handlePayment', {
                apartment_id: this.store.apartment_id,
                sponsor_id: this.store.sponsor_id
            })
                .then((response) => {
                    console.log('Risposta Pagamento', response);
                }
                )
                .catch((response) => {
                    console.log('Errore Pagamento', response);
                    this.addError('Errore del server. Riprovare piú tardi', 'server_error');
                })
            setTimeout(() => {
                this.paymentDone = true;
            }, 1500)
        }
    },
    mounted() {
        document.title = 'Dashboard | Sponsor';
    }
};
</script>

<template>
    <AppDashboardLayoutVue :title="'Piani di Sponsor'">
        <main>
            <div class="formContainer">

                <div class="card" :class="(rotateCard) ? ('rotated') : ('')">
                    <div class="cardInner">
                        <div class="cardFront">
                            <div class="cardHeader">
                                <img src="../../../assets/images/chip.png" alt="card-visa">
                                <img src="../../../assets/images/visa.png" alt="card-visa">
                            </div> <!-- /cardHeader-->

                            <div class="cardNumberGroup">
                                <span class="cardNumberItem">{{ cardNumberOne }}</span>
                                <span class="cardNumberItem">{{ cardNumberTwo }}</span>
                                <span class="cardNumberItem">{{ cardNumberThree }}</span>
                                <span class="cardNumberItem">{{ cardNumberFour }}</span>
                            </div> <!-- /cardNumberGroup-->

                            <div class="cardDataGroup">
                                <div class="cardDataName">
                                    <label>card holder</label>
                                    <span v-if="cardName">{{ cardName }}</span>
                                    <span v-else>your name</span>
                                </div> <!-- /cardDataName-->

                                <div class="cardDataExp">
                                    <label>expires</label>
                                    <div>
                                        <span v-if="cardMonth != 'Month'">{{ cardMonth }}</span>
                                        <span v-else>mm</span>
                                    </div>
                                    /
                                    <div>
                                        <span v-if="cardYear != 'Year'">{{ cardYear }}</span>
                                        <span v-else>yy</span>
                                    </div>
                                </div> <!-- /cardDataExp-->
                            </div> <!-- /cardDataGroup-->
                        </div> <!-- /cardFront-->

                        <div class="cardBack">
                            <div class="cardBar">
                            </div> <!-- /cardBar-->

                            <div class="cardCVVContainer">
                                <label for="">cvv</label>
                                <div>{{ cardCVV }}</div>
                            </div> <!-- /cardCVVContainer-->

                            <div class="cardFooter">
                                <img src="img/visa.png" alt="card-visa">
                            </div> <!-- /cardFooter-->
                        </div> <!-- /cardBack-->

                    </div> <!-- /cardInner-->
                </div> <!-- /card-->

                <form @submit.prevent="handlePayment()">
                    <!-- CardNumber -->
                    <div class="row">
                        <div class="group large">
                            <label for="card_number">card number</label>
                            <input type="text" id="card_number" maxlength="19" placeholder="0000 0000 0000 0000"
                                v-model="cardNumber" @keydown="checkInput(event)"
                                v-on:blur="cardNumberValidation()" :disabled="paymentDone">
                        </div>
                    </div>

                    <!-- Card Holder -->
                    <div class="row">
                        <div class="group large">
                            <label for="card_holder">card holder</label>
                            <input type="text" id="card_holder" placeholder="Your Name" v-model="cardName"
                                v-on:blur="holderValidation()" :disabled="paymentDone">
                        </div>
                    </div>

                    <!-- ExpDate, CVV -->
                    <div class="row inline-center">
                        <div class="group small exp_date">
                            <label>expiration date</label>
                            <select name="" id="card_date_month" v-model="cardMonth" v-on:blur="cardMonthValidation()"
                                :disabled="paymentDone">
                                <option selected>Month</option>
                                <option value="01">jan</option>
                                <option value="02">feb</option>
                                <option value="03">mar</option>
                                <option value="04">apr</option>
                                <option value="05">may</option>
                                <option value="06">jun</option>
                                <option value="07">jul</option>
                                <option value="08">aug</option>
                                <option value="09">sep</option>
                                <option value="10">oct</option>
                                <option value="11">nov</option>
                                <option value="12">dec</option>
                            </select>
                        </div>

                        <div class="group small">
                            <select name="" id="card_date_year" v-model="cardYear" v-on:blur="cardYearValidation()"
                                :disabled="paymentDone">
                                <option selected>Year</option>
                                <option value="24">2024</option>
                                <option value="23">2023</option>
                                <option value="25">2025</option>
                                <option value="26">2026</option>
                                <option value="27">2027</option>
                                <option value="28">2028</option>
                                <option value="29">2029</option>
                                <option value="30">2030</option>
                                <option value="31">2031</option>
                                <option value="32">2032</option>
                                <option value="33">2033</option>
                                <option value="34">2034</option>
                                <option value="35">2035</option>
                            </select>
                        </div>

                        <div class="group small">
                            <label for="cardCVV">cvv</label>
                            <input type="text" id="cardCVV" placeholder="###" maxlength="3" @focus="rotateCard = true"
                                @blur="rotateCard = false" v-model="cardCVV" :disabled="paymentDone" v-on:blur="cardCVVValidation()">
                        </div>
                    </div>

                    <!-- Submit -->
                    <div class="row">
                        <AppButton :label="'Sponsorizza'" :type="'solid'" :palette="'secondary'" v-if="!paymentDone" />
                        <AppButton :label="'Pagamento Completato'" :type="'solid'" :palette="'success'" :disabled="true"
                            v-else />
                    </div>
                </form>
                <AppErrorForm v-if="store.errors.length > 0" />

            </div> <!-- /container-->

            <div class="price">
                <span>Importo: <strong>{{ store.sponsor_price }} €</strong></span>
            </div>
        </main>
    </AppDashboardLayoutVue>
</template>

<style lang="scss" scoped>
@use '../../../styles/partials/form.scss' as *;
@use '../../../styles/partials/mixins.scss' as *;

main {
    max-width: calc(100vw - 200px);
    height: 100%;
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;
    justify-content: center;
    align-items: center;
}

.price {
    text-align: center;
    margin-top: 1rem;
}

.formContainer {
    margin-top: 8rem;
    padding-top: 9rem;

    position: relative;

    background-color: #fdfdfd;
    @include customShadow;
}

.row:last-child:deep button {
    width: 100%;
}

.row.inline-center {
    align-items: flex-end;
}

.formContainer form select:focus option:first-child {
    display: none;
}

/* CARD */
.formContainer>.card {
    width: 420px;
    aspect-ratio: 500/293;
    border-radius: inherit;

    position: absolute;
    top: calc(-247px / 2);
    left: 50%;
    transform: translate(-50%);

    perspective: 1000px;
}

.card .cardInner {
    width: 100%;
    height: 100%;

    position: relative;
    text-align: center;

    transition: transform 0.8s;
    transform-style: preserve-3d;
    border-radius: inherit;
}

.card.rotated .cardInner {
    transform: rotateY(180deg);
}

.cardFront,
.cardBack {
    width: 100%;
    height: 100%;

    position: absolute;
    -webkit-backface-visibility: hidden;
    /* Per Safari */
    backface-visibility: hidden;

    border-radius: inherit;
    box-shadow: 0px 2px 20px 2px #30303090;
    background: rgb(51, 51, 51);
    background: linear-gradient(28deg, rgba(51, 51, 51, 1) 0%, rgba(2, 2, 2, 1) 50%, rgba(51, 51, 51, 1) 100%);
}

.cardFront {
    padding: 1rem;
}

.cardBack {
    transform: rotateY(180deg);
    padding: 1rem 0;
}

.card .cardHeader {
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 2rem;
    user-select: none;
}

.card img {
    max-height: 100%;
    display: block;
}

.card img:last-child {
    height: 20px;
    filter: brightness(100) saturate(0);
}

.card .cardNumberGroup {
    margin-bottom: 2rem;
    padding: 0 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;

    color: white;
}

.card .cardNumberGroup .cardNumberItem {
    flex-basis: 20%;
    height: 35px;
    text-align: left;

    font-size: 2rem;
}

.card .cardDataGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card .cardDataGroup .cardDataName {
    flex-basis: 70%;
    text-align: left;
}

.card .cardDataGroup .cardDataExp {
    flex-basis: 30%;
    color: white;
    text-align: right;
}

.card .cardDataGroup .cardDataExp div {
    display: inline-block;
}

.card label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #ffffff80;
    text-transform: capitalize;

    display: block;
    user-select: none;
}

.card .cardDataGroup span {
    display: inline-block;
    color: white;
    text-transform: uppercase;

    height: 25px;
    width: 100%;
}

.cardBack .cardBar {
    height: 50px;
    margin-top: 0.5rem;

    background-color: #00000090;
}

.cardBack .cardCVVcontainer {
    margin-top: 1.5rem;

    text-align: right;
    padding: 0 1rem;
}

.cardBack .cardCVVContainer div {
    height: 40px;
    border-radius: 6px;

    margin-top: 5px;
    padding-right: 5px;

    line-height: 40px;
    font-size: 1.1rem;

    background-color: #ededed;
}

.cardBack .cardFooter {
    margin-top: 1.5rem;
    padding-right: 1rem;
}

.cardBack .cardFooter img {
    margin-left: auto;
}

.container form button:hover {
    background-color: #2f79e9;
}

.container form button:active {
    background-color: #4d8ae6;
}
</style>