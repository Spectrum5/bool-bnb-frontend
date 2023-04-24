## PRIORITA'
Ricerca per Filtri (Localita', Stanze, Letti, Servizi, Raggio entro la localita')
Ordine Risultati per Distanza dalla localita'
Autocompletamento Indirizzo Localita'
Messaggi di Conferma Eliminazione // GIADA OK
Redirect // GIADA OK PER CREATE E EDIT

Loader Iniziale con Logo
LOADER IMMAGINI CARDS
EFFETTO HOVER CARDS
GESTIRE VISUALIZZAZIONI
MOSTRARE VISUALIZZAZIONI NELLE CARDS
VALIDAZIONI messaggio (compreso tra 10 e 4096 caratteri)
Calcolo Coordinate per Apartment Store
Modale Conferma Apartment Delete
Aggiunta immagini Apartments
Statistiche (Visualizzazioni)
Inserimento di Sponsorizzazione
Gestione Pagamento
Sidebar Statistiche

## BONUS
Ricerca in Apartment Index
Aggiunta Immagine User
Statistiche (Num. Messaggi ricevuti)

<!-- ------------------------------------------------ -->

ICONA PISCINA: <font-awesome-icon icon="fa-solid fa-water-ladder" />
ICONA WIFI: <font-awesome-icon icon="fa-solid fa-wifi" />
ICONA CAR: <font-awesome-icon icon="fa-solid fa-car-side" />
ICONA ASCIUGACAPELLI: 
ICONA CUCINA: <font-awesome-icon icon="fa-solid, fa-utensils" />
ICONA TV: <font-awesome-icon icon="fa-solid, fa-tv" />
ICONA ARIA COND: <font-awesome-icon icon="fa-solid fa-snowflake" />
ICONA SAUNA: 
ICONA PORTINERIA: <font-awesome-icon icon="fa-solid fa-user-lock" />
ICONA PULIZIE: <font-awesome-icon icon="fa-solid fa-broom" />
ICONA LAVATRICE: <font-awesome-icon icon="fa-solid fa-soap" />
ICONA ANIMALI: <font-awesome-icon icon="fa-solid fa-paw" />
ICONA CASSAFORTE: <font-awesome-icon icon="fa-solid fa-vault" />

<!--  -->
ICONA LETTO: <i class="fa-solid fa-bed"></i>

<!-- VARIABILE PER HOTEL -->
let hotels = [ 
    ["nome"=> "Hotel Italia",
    "address"=> "Calle Tiepolo 1364, 30125 Venezia VE, Italia"],
    ["nome"=> "Hotel Splendido",
    "address"=> "Sabi Sand Game Reserve, Mpumalanga, Sudafrica"],
    ["nome"=> "Casa Paradiso",
    "address"=> "Campo Santa Maria del Giglio, 2467, 30124 Venezia VE, Italia"],
    ["nome"=> "Casa Belvedere",
    "address"=> "Salita Baratta, 16, 16034 Portofino GE, Italia"],
    ["nome"=> "Casa Excelsior",
    "address"=> "North Ghubra 32, Way No. 3215, Stati Uniti"],
    ["nome"=> "Hotel Presidential",
    "address"=> "9641 Sunset Blvd, Beverly Hills, CA 90210, Stati Uniti"],
    ["nome"=> "Hotel Astoria",
    "address"=> "50 Central Park South, New York, NY 10019, Stati Uniti"],
    ["nome"=> "Hotel Majestic",
    "address"=> "Peninsula Papagayo, Guanacaste, Costa Rica"],
    ["nome"=> "Suite Victoria",
    "address"=> "Strand, London WC2R 0EZ, Regno Unito"],
    ["nome"=> "Suite Imperiale",
    "address"=> "Via Ludovisi, 49, 00187 Roma RM, Italia"],
    ["nome"=> "Hotel Savoy",
    "address"=> "1 Rue des Carrieres, Quebec City, QC G1R 4P5, Canada"],
    ["nome"=> "Suite Bangkok",
    "address"=> "Khao Rd, Wachira Phayaban, Dusit, Bangkok 10300, Thailandia"],
    ["nome"=> "Hotel San Marco",
    "address"=> "Riva degli Schiavoni, 4196, 30122 Venezia VE, Italia"],
    ["nome"=> "Hotel Vertical",
    "address"=> "West Corniche Road, Abu Dhabi, Emirati Arabi Uniti"],
    ["nome"=> "Suite Royal",
    "address"=> "330 N Wabash Ave, Chicago, IL 60611, Stati Uniti"],
    ["nome"=> "Hotel Universal",
    "address"=> "Av. Malecón de la Reserva 1035, Miraflores, Lima, Perù"],
    ["nome"=> "Suite Europa",
    "address"=> "Carretera Cancun Tulum Km 62, Playa del Carmen, Q.R., Messico"],
    ["nome"=> "Oasis Resort",
    "address"=> "Vommuli Island, Dhaalu Atoll, Maldive"],
    ["nome"=> "Suite La Favorita",
    "address"=> "31 Avenue George V, 75008 Paris, Francia"],
    ["nome"=> "Hotel Mar Azul",
    "address"=> "Martha Salotti 445, Buenos Aires, Argentina"],
    ["nome"=> "Loft di Marè",
    "address"=> "Motu Tehotu BP 547, Bora Bora 98730, Polinesia Francese"],
    ["nome"=> "Casa degli Alberi",
    "address"=> "Via Regina, 8, 22019 Tremezzina CO, Italia"],
    ["nome"=> "Suite Verde",
    "address"=> "Crescent Rd - Dubai - Emirati Arabi Uniti"],
    ["nome"=> "Appartamento del Vino",
    "address"=> "15 Place Vendôme, 75001 Paris, Francia"],
    ["nome"=> "Riad del Relax",
    "address"=> "Avenue Prince Moulay Rachid, Marrakech 40000, Marocco"],
    ["nome"=> "Mini Loft al Mare",
    "address"=> "S.S. Amalfitana, 9, 84011 Amalfi SA, Italia"],
    ["nome"=> "Casa del Sole",
    "address"=> "Dock Rd, Victoria & Alfred Waterfront, Cape Town, 8001, Sudafrica"],
    ["nome"=> "Appartamento della Luna",
    "address"=> "Piazza San Giovanni del Toro, 2, 84010 Ravello SA, Italia"],
    ["nome"=> "Panorama Apartments",
    "address"=> "Gotthardstrasse 4, 6490 Andermatt, Svizzera"],
    ["nome"=> "Loft del Mare",
    "address"=> "Boulevard J.F. Kennedy, 06600 Antibes, Francia"],
    ["nome"=> "Mini Appartamento del Bosco",
    "address"=> "Baie des Flamands, 97133, Saint Barthélemy"],
    ["nome"=> "Casa della Montagna",
    "address"=> "Unter den Linden 77, 10117 Berlin, Germania"],
    ["nome"=> "Appartamento del Fiume",
    "address"=> "Amelia Island, 4750 Amelia Island Pkwy, Amelia Island, FL 32034, Stati Uniti"],
    ["nome"=> "Suite del Giardino",
    "address"=> "Kawasan Pariwisata, Nusa Dua, Lot S6, PO Box 44, Nusa Dua, Bali 80363, Indonesia"],
    ["nome"=> "Loft della Città",
    "address"=> "Via del Babuino, 9, 00187 Roma RM, Italia"],
    ["nome"=> "Casa della Spiaggia",
    "address"=> "10 Bayfront Avenue, Singapore"],
    ["nome"=> "Mini Appartamento Tiffany",
    "address"=> "768 5th Ave, New York, NY 10019, Stati Uniti"],
    ["nome"=> "Appartamento del Parco",
    "address"=> "Kärntner Ring 9, 1010 Wien, Austria"],
    ["nome"=> "Suite Reale 30° Piano",
    "address"=> "Jumeirah St, Umm Suqeim 3, Dubai, Emirati Arabi Uniti"],
    ["nome"=> "Loft del Cielo",
    "address"=> "Hong Kong, International Commerce Centre, 1 Austin Road West, Kowloon, Hong Kong"]
]