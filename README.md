# Progetto Finale Boolean | BoolBnb

La sezione FrontEnd del progetto è stata sviluppata in VueJS 3.0.
Sono state utilizzate librerie/tecnologie come Axios, Vue-Router e SwiperJS.

## Classe #84 | Team 2
- [Salvatore Capano](https://github.com/SalvatoreCapano)
- [Giada Ortesta](https://github.com/GiadaMarzapane)
- [Sergio Tosku](https://github.com/Spectrum5)
- [Lucia Calenda](https://github.com/CalendaLucia)

## Features
### Pagine Pubbliche
#### Home Page
- Sezione Appartamenti in Evidenza: visualizzazione degli ultimi 10 Appartamenti sponsorizzati, con possibilità di visualizzare ulteriori Appartamenti sponsorizzati
- Sezione Esplora: Visualizzazione di tutti gli Appartamenti presenti sul sito, in ordine di data di aggiunta, con possibilità di visualizzarne altri tramite Scroll Infinito
- Ricerca Rapida: Ricerca di Appartamenti per indirizzo, con autocompletamento

#### Search Page
- Sezione I tuoi Risultati: Visualizzazione degli Appartamenti nel raggio di 20km dall'indirizzo cercato, ordinati per sponsorizzazione e distanza dall'indirizzo
- Ricerca Avanzata: Ricerca di Appartamenti per indirizzo, con autocompletamento, con filtri per km dall'indirizzo cercato, numero stanze minime, numero bagni minimi, numero letti minimi e servizi necessari.

#### Pagina Appartamento Singolo
- Visualizzazione di tutti i dati relativi all'Appartamento selezionato: Nome, Indirizzo, Immagini, n. camere, n. bagni, n. letti, metri quadri, descrizione, servizi, prezzo a notte.
- Grado di sponsorizzazione: in alto viene mostrata una targhetta con il livello di sponsor dell'Appartamento
- Struttura dell'apaprtamento: viene mostrata la divisione dei letti nelle varie camere
- Mappa centrata all'indirizzo dell'Appartamento
- Form di contatto: l'utente può inviare un messaggio al proprietario dell'appartamento

### Pagine Autenticazione
#### Login
- Login tramite email e password con FE validation

#### Registrazione
- Registrazione che richiede nome, cognome, data di nascita, email, password e conferma password con FE validation

### Dashboard
#### Appartamenti
- Lista dei propri Appartamenti inseriti sulla piattaforma
- Visualizzazione di uno dei propri Appartamenti con relativi dati nel dettaglio
- Aggiunta di un nuovo Appartamento con FE validation (con possibilità di renderlo momentaneamente non visibile alla ricerca)
- Modifica di un Appartamento esistente con FE validation
- Eliminazione di un Appartamento esistente con conferma di eliminazione

#### Messaggi
- Visualizzazione di tutti i messagi ricevuti, con email mittente, data di invio, corpo messaggio e appartamento di riferimento

#### Sponsor
- Possibilità di sponsorizzare uno dei propri Appartamenti con uno dei piani disponibili
- Simulazione di Pagamento con inserimento dei propri dati, con FE validation

#### Statistiche
- Visualizzazione del numero di visualizzazioni ricevute da ogni appartamento per mese, nell'anno corrente

### Extra
- Nelle cards degli appartamenti sono mostrate tutte le immagini relative ad esso con un carousel
- Nelle cards degli appartamenti sono mostrati tutti i dati relative ad esso come nome, indirizzo, visualizzazioni, prezzo a notte
- Visualizzando un appartamento, aumentano le sue visualizzazioni di 1
- Tutti i campi form di indirizzo sono dotati di autocompletamento
- Tutti i form sono dotati di validazione FrontEnd che impedisce l'invio dei dati al BackEnd se i dati sono errati, mostrando il messaggio di errore preciso ed evidenziando il campo errato
- Il campo email nel form di invio messaggio si autocompila se l'utente è loggato
- Tutte le sezioni che prevedono una richiesta di dati al BackEnd sono dotate di messaggi nei casi in cui i dati non dovessero essere trovati o ci sia un errore nel recupero
- Tutte le operazioni dell'applicazione avvengono in modo rapido senza refresh
- Nel caso in cui si tenti di accedere ad una pagina non esistente si viene reindirizzati ad una pagina Not Found
- Tutte le rotte sono protette per impedire l'accesso alle pagine di autenticazione nel caso l'utente sia autenticato o alle pagine private nel caso l'utente non sia autenticato
- L'intera applicazione è Responsive

## Link alla repository BackEnd
[BoolBnb | BackEnd](https://github.com/Spectrum5/bool-bnb-backend)